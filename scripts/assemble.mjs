#!/usr/bin/env node
// Builds the topic pages of the site from the faithful per-lecture / per-sheet transcripts.
//
//   transcripts/lectures/LNN.md   ──┐
//   transcripts/exercises/ENN.md  ──┼─►  src/content/docs/{notes,exercises}/*.md, sources.md, index.mdx
//   src/topics.mjs (topic map)    ──┘    src/assets/figures/*.png
//
// Run with `npm run assemble`. Generated pages are overwritten, so make content fixes in the
// transcripts (they are the source of truth) and re-run this script.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import GithubSlugger from 'github-slugger';
import { parts, lectures as lectureTitles, sheetNotes } from '../src/topics.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const T = (...p) => path.join(ROOT, 'transcripts', ...p);
const DOCS = path.join(ROOT, 'src', 'content', 'docs');
const FIG_OUT = path.join(ROOT, 'src', 'assets', 'figures');
const FIG_REL = '../../../assets/figures/';
const pad = (n) => String(n).padStart(2, '0');
const roman = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

const errors = [];
const warn = (m) => errors.push(m);

// ---------------------------------------------------------------- parsing

/** Split a transcript into sections at `##` headings, tracking handwritten page numbers. */
function parseTranscript(file, kind, num) {
	const src = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
	const lines = src.split('\n');
	const footnotes = {};
	const sections = [];
	let cur = null;
	let pendingPage = null;
	let page = 1;
	let inFence = false;
	const newSection = (heading, startPage) => {
		cur = { kind, num, heading, startPage, pages: new Set([startPage]), lines: [], hasContent: false };
		sections.push(cur);
	};
	newSection(null, 1); // intro (text before the first `##`)
	const tag = kind === 'lecture' ? 'lecture' : 'sheet';
	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];
		if (/^\s*(```|~~~)/.test(line)) inFence = !inFence;
		if (!inFence) {
			if (/^# /.test(line)) continue; // "# Lecture N" / "# Exercises N"
			const fn = line.match(/^\[\^([\w-]+)\]:\s*(.*)$/);
			if (fn) {
				footnotes[fn[1]] = fn[2];
				continue;
			}
			const pm = line.match(/^\s*<!--\s*page\s+(\d+)\s*-->\s*$/);
			if (pm) {
				pendingPage = Number(pm[1]);
				page = pendingPage;
				continue;
			}
			if (line.trim() === '') {
				cur.lines.push(line);
				continue;
			}
			if (/^## /.test(line)) {
				newSection(line.replace(/^##\s+/, '').trim(), pendingPage ?? page);
				pendingPage = null;
				continue;
			}
		}
		if (pendingPage !== null) {
			if (cur.hasContent) {
				// indent like the content that follows, so a page break inside a list item stays inside it
				const indent = /^\s*(\d+\.|[-*+])\s/.test(line) ? '' : line.match(/^\s*/)[0];
				cur.lines.push('', `${indent}::pagebreak{${tag}="${num}" page="${pendingPage}"}`, '');
			} else {
				cur.startPage = pendingPage;
				cur.pages = new Set([pendingPage]);
			}
			cur.pages.add(pendingPage);
			pendingPage = null;
		}
		cur.lines.push(line);
		cur.hasContent = true;
	}
	return { sections: sections.filter((s) => s.heading !== null || s.hasContent), footnotes };
}

const norm = (s) =>
	s
		.toLowerCase()
		.replace(/[`*_$\\]/g, '')
		.replace(/[–—]/g, '-')
		.replace(/\s+/g, ' ')
		.trim();

/** Heading text for display (math → unicode so the table of contents stays clean). */
function displayHeading(raw) {
	const sub = { 0: '₀', 1: '₁', 2: '₂', 3: '₃', 4: '₄', 5: '₅', 6: '₆', 7: '₇', 8: '₈', 9: '₉' };
	return raw
		.replace(/\$([^$]+)\$/g, (_, m) =>
			m
				.replace(/\\ket\{([^}]*)\}/g, (_, k) => `|${k.replace(/-/g, '−')}⟩`)
				.replace(/\\C\b/g, 'ℂ')
				.replace(/\\otimes/g, '⊗')
				.replace(/_\{?(\d)\}?/g, (_, d) => sub[d])
				.replace(/\\[a-zA-Z]+/g, '')
				.replace(/[{}]/g, '')
				.replace(/\s+/g, ' ')
				.trim()
		)
		.replace(/`/g, '')
		.replace(/:\s*$/, '')
		.trim();
}

function pagesSpec(pages) {
	const ps = [...pages].sort((a, b) => a - b);
	if (!ps.length) return '';
	return ps.length === 1 ? `${ps[0]}` : `${ps[0]}-${ps[ps.length - 1]}`;
}

// ---------------------------------------------------------------- load transcripts

const lectureData = {};
for (const f of fs.readdirSync(T('lectures')).filter((f) => /^L\d+\.md$/.test(f)).sort()) {
	const n = Number(f.slice(1, 3));
	lectureData[n] = parseTranscript(T('lectures', f), 'lecture', n);
	lectureData[n].used = new Map();
}
const sheetData = {};
for (const f of fs.readdirSync(T('exercises')).filter((f) => /^E\d+\.md$/.test(f)).sort()) {
	const n = Number(f.slice(1, 3));
	const d = parseTranscript(T('exercises', f), 'sheet', n);
	for (const s of d.sections) {
		const m = s.heading?.match(/^Exercise\s+(\d+)\s*(?:\((.*)\))?\s*$/);
		if (m) {
			s.exercise = Number(m[1]);
			s.title = m[2] ? displayHeading(m[2]) : null;
			s.cirq = /cirq/i.test(m[2] || '');
		}
	}
	d.used = new Map();
	sheetData[n] = d;
}

// The Cirq paragraph on sheet 5 is sheet-level text for all programming exercises.
let cirqIntro = null;
for (const s of sheetData[5].sections) {
	const idx = s.lines.findIndex((l) => l.startsWith('You can access the following exercises'));
	if (idx >= 0) {
		cirqIntro = { text: s.lines[idx], page: 2 };
		s.lines.splice(idx, 1);
		// drop a now-dangling page break right before it
		for (let j = s.lines.length - 1; j >= 0 && (s.lines[j].trim() === '' || s.lines[j].startsWith('::pagebreak')); j--) s.lines.pop();
	}
}

// ---------------------------------------------------------------- figures

const usedFigures = new Set();
// Crops come from 2x renders (300 dpi lectures / 260 dpi sheets). Display them at roughly the
// scale of the handwriting on a page, via a `w=` width hint read by src/plugins/qdocs.mjs.
const FIG_SCALE = 0.45;
function pngWidth(file) {
	const buf = fs.readFileSync(file);
	return buf.readUInt32BE(16);
}
function fixFigures(text) {
	return text.replace(/\]\((?:\.\.\/)?figures\/([^)\s]+\.png)(?:\s+"[^"]*")?\)/g, (_, name) => {
		usedFigures.add(name);
		const f = T('figures', name);
		if (!fs.existsSync(f)) {
			warn(`missing figure ${name}`);
			return `](${FIG_REL}${name})`;
		}
		return `](${FIG_REL}${name} "w=${Math.round(pngWidth(f) * FIG_SCALE)}")`;
	});
}

// ---------------------------------------------------------------- resolve topic refs

function resolveNotes(ref, where) {
	const L = lectureData[ref.lecture];
	if (!L) return warn(`${where}: no lecture ${ref.lecture}`), [];
	const heads = L.sections;
	const find = (q) => {
		const i = heads.findIndex((s) => s.heading && norm(s.heading).startsWith(norm(q)));
		if (i < 0) warn(`${where}: L${ref.lecture} has no section starting with "${q}"`);
		return i;
	};
	let picked = [];
	if (ref.intro) picked = heads.filter((s) => s.heading === null);
	else if (ref.sections) picked = ref.sections.map(find).filter((i) => i >= 0).map((i) => heads[i]);
	else if (ref.from) {
		const a = find(ref.from);
		const b = find(ref.to ?? ref.from);
		if (a >= 0 && b >= 0) picked = heads.slice(a, b + 1);
	}
	for (const s of picked) {
		if (L.used.has(s)) warn(`${where}: L${ref.lecture} "${s.heading ?? '(intro)'}" used twice (also in ${L.used.get(s)})`);
		L.used.set(s, where);
	}
	return picked.map((s) => ({ section: s, introHeading: ref.intro ? ref.heading : undefined }));
}

function resolveExercises(ref, where) {
	const S = sheetData[ref.sheet];
	if (!S) return warn(`${where}: no sheet ${ref.sheet}`), [];
	let picked = [];
	if (ref.ex) {
		for (const k of ref.ex) {
			const s = S.sections.find((s) => s.exercise === k);
			if (!s) warn(`${where}: sheet ${ref.sheet} has no exercise ${k}`);
			else picked.push(s);
		}
	}
	if (ref.sections) {
		for (const q of ref.sections) {
			const s = S.sections.find((s) => s.heading && norm(s.heading).startsWith(norm(q)));
			if (!s) warn(`${where}: sheet ${ref.sheet} has no section "${q}"`);
			else picked.push(s);
		}
	}
	for (const s of picked) {
		if (S.used.has(s)) warn(`${where}: E${ref.sheet} "${s.heading}" used twice`);
		S.used.set(s, where);
	}
	return picked;
}

// ---------------------------------------------------------------- rendering helpers

function frontmatter(obj) {
	const esc = (v) => JSON.stringify(v);
	const lines = ['---'];
	for (const [k, v] of Object.entries(obj)) {
		if (v === undefined) continue;
		if (Array.isArray(v)) lines.push(`${k}: ${JSON.stringify(v)}`);
		else if (typeof v === 'object' && v !== null) {
			lines.push(`${k}:`);
			for (const [k2, v2] of Object.entries(v)) lines.push(`  ${k2}: ${typeof v2 === 'string' ? esc(v2) : v2}`);
		} else lines.push(`${k}: ${typeof v === 'string' ? esc(v) : v}`);
	}
	lines.push('---', '');
	return lines.join('\n');
}

function trimBlank(lines) {
	let a = 0;
	let b = lines.length;
	while (a < b && lines[a].trim() === '') a++;
	while (b > a && lines[b - 1].trim() === '') b--;
	return lines.slice(a, b);
}

/** Section body with footnotes made unique and re-attached. */
function bodyWithFootnotes(section, footnotes, prefix) {
	let text = trimBlank(section.lines).join('\n');
	const used = [];
	text = text.replace(/\[\^([\w-]+)\](?!:)/g, (_, id) => {
		if (footnotes[id] !== undefined && !used.includes(id)) used.push(id);
		return `[^${prefix}-${id}]`;
	});
	if (used.length) text += '\n\n' + used.map((id) => `[^${prefix}-${id}]: ${footnotes[id]}`).join('\n');
	return fixFigures(text);
}

const pageAnchors = {}; // "lecture:3:Heading" → url#anchor (for the sources page)

// ---------------------------------------------------------------- polished pages

// Pages with `polished: true` in their frontmatter have had their wording edited by hand. They are
// kept as they are instead of being regenerated, so update them by hand if a transcript changes.
const polished = new Map(); // relativePath → { content, anchors }
for (const dir of ['notes', 'exercises']) {
	const d = path.join(DOCS, dir);
	if (!fs.existsSync(d)) continue;
	for (const f of fs.readdirSync(d).filter((f) => f.endsWith('.md'))) {
		const content = fs.readFileSync(path.join(d, f), 'utf8');
		const fm = content.match(/^---\n([\s\S]*?)\n---\n/);
		if (!fm || !/^polished:\s*true\s*$/m.test(fm[1])) continue;
		const slugger = new GithubSlugger();
		const anchors = new Set([...content.matchAll(/^#{2,3} (.*)$/gm)].map((m) => slugger.slug(m[1])));
		for (const m of content.matchAll(/assets\/figures\/([^)\s"]+\.png)/g)) usedFigures.add(m[1]);
		polished.set(`${dir}/${f}`, { content, anchors });
	}
}

// ---------------------------------------------------------------- notes pages

const out = []; // [relativePath, content]
const topicIndex = {}; // slug → { part, topic, lecturePages }

parts.forEach((part, pi) => {
	part.topics.forEach((topic) => {
		topicIndex[topic.slug] = { part, partIndex: pi, topic };
	});
});

for (const [pi, part] of parts.entries()) {
	for (const topic of part.topics) {
		const where = `notes/${topic.slug}`;
		const url = `/notes/${topic.slug}/`;
		const slugger = new GithubSlugger();
		const items = topic.notes.flatMap((ref) => resolveNotes(ref, where));
		const kept = polished.get(`notes/${topic.slug}.md`);
		// a polished page may have renamed its headings: link to the page itself then
		const anchorUrl = (anchor) => (kept && !kept.anchors.has(anchor) ? url : `${url}#${anchor}`);
		const lectPages = new Map();
		for (const { section } of items) {
			const set = lectPages.get(section.num) ?? new Set();
			section.pages.forEach((p) => set.add(p));
			lectPages.set(section.num, set);
		}
		const hasExercises = part.exercises?.some((g) => g.topic === topic.slug);
		const exUrl = hasExercises ? `/exercises/${part.slug}/#${new GithubSlugger().slug(topic.title)}` : undefined;
		const sources = [...lectPages].map(([n, ps]) => ({ lecture: n, pages: pagesSpec(ps) }));
		const body = [];
		for (const { section, introHeading } of items) {
			const heading = section.heading ?? introHeading ?? null;
			if (heading) {
				const disp = displayHeading(heading);
				body.push(`## ${disp}`, '');
				const anchor = slugger.slug(disp);
				pageAnchors[`lecture:${section.num}:${section.heading ?? '(intro)'}`] = { url: anchorUrl(anchor), title: topic.title, heading: disp };
			} else {
				pageAnchors[`lecture:${section.num}:(intro)`] = { url, title: topic.title, heading: null };
			}
			// register ### headings in the slugger so later anchors get the right suffixes
			for (const l of section.lines) if (/^### /.test(l)) slugger.slug(displayHeading(l.slice(4)));
			body.push(bodyWithFootnotes(section, {}, `L${section.num}`).replace(/^### (.*)$/gm, (_, h) => `### ${displayHeading(h)}`), '');
		}
		const fm = frontmatter({
			title: topic.title,
			description: topic.description,
			sources,
			exercisesLink: exUrl,
		});
		out.push([`notes/${topic.slug}.md`, fm + body.join('\n').replace(/\n{3,}/g, '\n\n')]);
	}
}

// ---------------------------------------------------------------- exercise pages

const exerciseAnchors = {}; // "sheet:N:k" → url#anchor
for (const [pi, part] of parts.entries()) {
	if (!part.exercises?.length) continue;
	const url = `/exercises/${part.slug}/`;
	const slugger = new GithubSlugger();
	const groups = [...part.exercises].sort(
		(a, b) => part.topics.findIndex((t) => t.slug === a.topic) - part.topics.findIndex((t) => t.slug === b.topic)
	);
	const sheetPages = new Map();
	const body = [];
	for (const g of groups) {
		const topic = part.topics.find((t) => t.slug === g.topic);
		if (!topic) {
			warn(`exercises/${part.slug}: unknown topic ${g.topic}`);
			continue;
		}
		body.push(`## ${topic.title}`, '');
		slugger.slug(topic.title);
		body.push(`::pagesources{label="Notes:" notes="/notes/${topic.slug}/"}`, '');
		for (const ref of g.items) {
			const secs = resolveExercises(ref, `exercises/${part.slug}`);
			if (ref.sheet === 13 && ref.sections && sheetNotes[13]) {
				body.push(`*${sheetNotes[13]}* <small>(footnote on the title of exercise sheet 13)</small>`, '');
			}
			for (const s of secs) {
				const set = sheetPages.get(s.num) ?? new Set();
				s.pages.forEach((p) => set.add(p));
				sheetPages.set(s.num, set);
				const title = s.exercise ? s.title ?? `Exercise ${s.num}.${s.exercise}` : displayHeading(s.heading);
				body.push(`### ${title}`, '');
				const anchor = slugger.slug(title);
				if (s.exercise) exerciseAnchors[`sheet:${s.num}:${s.exercise}`] = { url: `${url}#${anchor}`, label: part.label, title };
				else exerciseAnchors[`sheet:${s.num}:${s.heading}`] = { url: `${url}#${anchor}`, label: part.label, title };
				if (s.exercise) body.push(`::extag{sheet="${s.num}" exercise="${s.exercise}"}`, '');
				if (s.cirq) {
					body.push(':::note[Programming exercise]', 'This is a Cirq exercise; see [how the programming exercises work](/exercises/#programming-exercises).', ':::', '');
				}
				const text = bodyWithFootnotes(s, sheetData[s.num].footnotes, `E${s.num}`);
				if (text.trim()) body.push(text, '');
			}
		}
	}
	const sources = [...sheetPages].sort((a, b) => a[0] - b[0]).map(([n, ps]) => ({ sheet: n, pages: pagesSpec(ps) }));
	const fm = frontmatter({
		title: `Exercises: ${part.label}`,
		description: `Exercises on ${part.summary.charAt(0).toLowerCase()}${part.summary.slice(1)}`,
		sources,
	});
	out.push([`exercises/${part.slug}.md`, fm + body.join('\n').replace(/\n{3,}/g, '\n\n')]);
}

// ---------------------------------------------------------------- coverage checks

for (const [n, L] of Object.entries(lectureData))
	for (const s of L.sections) if (!L.used.has(s)) warn(`L${pad(n)} section "${s.heading ?? '(intro)'}" is not used by any topic`);
for (const [n, S] of Object.entries(sheetData))
	for (const s of S.sections) if (!S.used.has(s)) warn(`E${pad(n)} section "${s.heading ?? '(intro)'}" is not used by any exercise page`);

// ---------------------------------------------------------------- exercises index

{
	const body = [];
	body.push(
		'The exercise sheets of the course, regrouped by topic. Every exercise shows which sheet it comes from, and the original sheets are linked at the bottom of each page.',
		''
	);
	for (const [pi, part] of parts.entries()) {
		if (!part.exercises?.length) continue;
		const count = part.exercises.flatMap((g) => g.items).reduce((acc, r) => acc + (r.ex?.length ?? 0), 0);
		const sheets = [...new Set(part.exercises.flatMap((g) => g.items.map((r) => r.sheet)))].sort((a, b) => a - b);
		body.push(`- **[${part.label}](/exercises/${part.slug}/)** — ${count} exercises, from sheet${sheets.length > 1 ? 's' : ''} ${sheets.join(', ')}`);
	}
	body.push('', '## Programming exercises', '');
	body.push(
		'Several sheets contain programming exercises (marked *Cirq*). Only their titles appear on the sheets. Exercise sheet 5 explains:',
		''
	);
	body.push(`> ${cirqIntro?.text ?? ''}`, '');
	body.push('## All exercise sheets', '');
	body.push('| Sheet | Exercises | Original |', '| --- | --- | --- |');
	for (const [n, S] of Object.entries(sheetData)) {
		const exs = S.sections
			.filter((s) => s.exercise)
			.map((s) => {
				const a = exerciseAnchors[`sheet:${n}:${s.exercise}`];
				return `[${s.exercise}. ${(s.title ?? 'Untitled').replace(/\|/g, '\\|')}](${a.url})`;
			})
			.join('<br/>');
		body.push(`| **Sheet ${n}** | ${exs} | [PDF](/pdfs/exercises/E${pad(n)}.pdf) |`);
	}
	out.push([
		'exercises/index.md',
		frontmatter({ title: 'Exercises', description: 'All exercises of the course, organised by topic.' }) + body.join('\n'),
	]);
}

// ---------------------------------------------------------------- sources page

{
	const body = [];
	body.push(
		'Everything on this site is a transcription of the handwritten lecture notes and the exercise sheets of the course. Here you can download the originals, and see which lecture or sheet ended up on which page of this site.',
		'',
		':::tip[Reading in lecture order]',
		'The site is organised by topic. To follow the course lecture by lecture, use the lists below: each entry links to the place where that part of the lecture now lives.',
		':::',
		'',
		'## Lecture notes',
		''
	);
	body.push('| Lecture | Topics | Pages | Original |', '| --- | --- | --- | --- |');
	for (const [n, L] of Object.entries(lectureData)) {
		const pages = Math.max(...L.sections.flatMap((s) => [...s.pages]));
		body.push(`| **[Lecture ${n}](#lecture-${n})** | ${lectureTitles[n] ?? ''} | ${pages} | [PDF](/pdfs/lectures/L${pad(n)}.pdf) |`);
	}
	body.push('');
	for (const [n, L] of Object.entries(lectureData)) {
		const pages = Math.max(...L.sections.flatMap((s) => [...s.pages]));
		body.push(`### Lecture ${n}`, '', `*${lectureTitles[n] ?? ''}*`, '');
		body.push(`[Open the PDF](/pdfs/lectures/L${pad(n)}.pdf) · ${pages} pages`, '');
		for (const s of L.sections) {
			const a = pageAnchors[`lecture:${n}:${s.heading ?? '(intro)'}`];
			if (!a) continue;
			const label = s.heading ? displayHeading(s.heading) : 'Opening remarks';
			body.push(`- ${label} <small>(p. ${pagesSpec(s.pages).replace('-', '–')})</small> → [${a.title}${a.heading && a.heading !== label ? '' : ''}](${a.url})`);
		}
		body.push('');
	}
	body.push('## Exercise sheets', '');
	for (const [n, S] of Object.entries(sheetData)) {
		const pages = Math.max(...S.sections.flatMap((s) => [...s.pages]));
		body.push(`### Exercise sheet ${n}`, '');
		body.push(`[Open the PDF](/pdfs/exercises/E${pad(n)}.pdf) · ${pages} page${pages > 1 ? 's' : ''}`, '');
		for (const s of S.sections) {
			const key = s.exercise ? `sheet:${n}:${s.exercise}` : `sheet:${n}:${s.heading}`;
			const a = exerciseAnchors[key];
			if (!a) continue;
			const label = s.exercise ? `Exercise ${s.exercise}${s.title ? ` (${s.title})` : ''}` : displayHeading(s.heading);
			body.push(`- ${label} → [${a.label}](${a.url})`);
		}
		body.push('');
	}
	out.push([
		'sources.md',
		frontmatter({
			title: 'Original notes and sources',
			description: 'Download the original handwritten lecture notes and exercise sheets, and see where each part ended up.',
			tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 2 },
		}) + body.join('\n'),
	]);
}

// ---------------------------------------------------------------- home page

{
	const cards = parts
		.map(
			(p, i) =>
				`\t<LinkCard title="${roman[i]} · ${p.label.replace(/"/g, '&quot;')}" description="${p.topics.map((t) => t.title).join(' · ').replace(/"/g, '&quot;')}" href={withBase('/notes/${p.topics[0].slug}/')} />`
		)
		.join('\n');
	const page = `---
title: Introduction to Quantum Computing
description: Lecture notes and exercises of the Introduction to Quantum Computing course, organised by topic.
template: splash
hero:
  layout: media-right
  image:
    light: ../../assets/hero-bloch-light.png
    dark: ../../assets/hero-bloch-dark.png
    alt: The Bloch sphere, as drawn in Lecture 1
  tagline: The handwritten lecture notes and exercise sheets, transcribed and organised by topic. Every page links back to the original notes.
  actions:
    - text: Start reading
      link: notes/introduction/
      icon: right-arrow
    - text: Exercises
      link: exercises/
      variant: minimal
      icon: pencil
    - text: Original PDFs
      link: sources/
      variant: minimal
      icon: document
---

import { CardGrid, LinkCard } from '@astrojs/starlight/components';

export const withBase = (p) => import.meta.env.BASE_URL.replace(/\\/$/, '') + p;

## Lecture notes by topic

<CardGrid>
${cards}
</CardGrid>

## How to read this site

- **By topic:** use the sidebar. At the bottom of each page you find the lecture and pages it was transcribed from, with a link to the original PDF.
- **By lecture:** the [sources page](sources/) lists each lecture section by section, with links to where it now lives.
- **Originals:** at the bottom of each page, *Show the original pages* reveals the scans of the handwritten notes.
- **Exercises:** each topic links to its [exercises](exercises/), grouped the same way.
`;
	out.push(['index.mdx', page]);
}

// ---------------------------------------------------------------- write

if (errors.length) {
	console.error('Problems:\n  ' + errors.join('\n  '));
	if (!process.argv.includes('--force')) process.exit(1);
}
for (const dir of ['notes', 'exercises']) fs.rmSync(path.join(DOCS, dir), { recursive: true, force: true });
for (const [rel, content] of out) {
	const p = path.join(DOCS, rel);
	fs.mkdirSync(path.dirname(p), { recursive: true });
	fs.writeFileSync(p, polished.get(rel)?.content ?? content);
}
fs.rmSync(FIG_OUT, { recursive: true, force: true });
fs.mkdirSync(FIG_OUT, { recursive: true });
for (const f of usedFigures) if (fs.existsSync(T('figures', f))) fs.copyFileSync(T('figures', f), path.join(FIG_OUT, f));
console.log(`Wrote ${out.length} pages and ${usedFigures.size} figures.`);
