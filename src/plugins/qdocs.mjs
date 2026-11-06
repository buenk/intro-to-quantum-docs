// Markdown extensions for the quantum lecture-notes site.
//
// Container directives (theorem-style boxes):
//   :::definition[Optional title]  :::theorem[Lemma]  :::example  :::proof  :::exercise
//
// Leaf directives:
//   ::source{lecture="3" pages="2-4"}                 section provenance (lecture notes)
//   ::source{sheet="4" exercise="2" pages="1-2"}      provenance (exercise sheets)
//   ::pagebreak{lecture="3" page="5"}                 where a handwritten page starts
//   ::pagesources{items="L03:1-4;L04:2" exercises="/exercises/x/" notes="/notes/y/"}
//
// Paragraphs that only contain images become <figure class="note-figure">.
// A rehype plugin prefixes the deploy `base` to root-relative links/images.

import { visit, SKIP } from 'unist-util-visit';
import { h } from 'hastscript';

const BOX_TYPES = {
	definition: 'Definition',
	theorem: 'Theorem',
	example: 'Example',
	proof: 'Proof',
	exercise: 'Exercise',
};

const pad = (n) => String(n).padStart(2, '0');

/** "2-4" → [2,3,4]; "5" → [5]; "2,5" → [2,5] */
function parsePages(spec) {
	if (!spec) return [];
	const out = [];
	for (const part of String(spec).split(',')) {
		const [a, b] = part.split('-').map((s) => parseInt(s.trim(), 10));
		if (Number.isNaN(a)) continue;
		for (let p = a; p <= (Number.isNaN(b) || b === undefined ? a : b); p++) out.push(p);
	}
	return out;
}

const fmtPages = (pages) => {
	if (!pages.length) return '';
	if (pages.length === 1) return `page ${pages[0]}`;
	return `pages ${pages[0]}–${pages[pages.length - 1]}`;
};

const icon = (name) => {
	const paths = {
		notes:
			'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zm0 0v6h6M8 13h8M8 17h5',
		sheet:
			'M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11',
		download: 'M12 3v12m0 0l-5-5m5 5l5-5M5 21h14',
		external: 'M14 3h7v7m0-7L10 14M19 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5',
		scan: 'M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2M7 8h10M7 12h10M7 16h6',
		arrow: 'M5 12h14m-6-6l6 6-6 6',
	};
	return h(
		'svg',
		{
			className: ['qd-icon'],
			viewBox: '0 0 24 24',
			width: 16,
			height: 16,
			fill: 'none',
			stroke: 'currentColor',
			strokeWidth: 2,
			strokeLinecap: 'round',
			strokeLinejoin: 'round',
			ariaHidden: 'true',
		},
		[h('path', { d: paths[name] })]
	);
};

function withBase(base, path) {
	const b = base.endsWith('/') ? base.slice(0, -1) : base;
	return `${b}${path}`;
}

function sourceInfo(attrs, base) {
	const pages = parsePages(attrs.pages);
	if (attrs.lecture) {
		const id = `L${pad(attrs.lecture)}`;
		return {
			kind: 'notes',
			id,
			pages,
			label: [h('strong', `Lecture ${Number(attrs.lecture)}`), pages.length ? `, ${fmtPages(pages)}` : ''],
			pdf: withBase(base, `/pdfs/lectures/${id}.pdf`),
			scanAlt: (p) => `Lecture ${Number(attrs.lecture)}, handwritten page ${p}`,
		};
	}
	const id = `E${pad(attrs.sheet)}`;
	return {
		kind: 'sheet',
		id,
		pages,
		label: [
			h('strong', `Exercise sheet ${Number(attrs.sheet)}`),
			attrs.exercise ? `, Exercise ${attrs.exercise}` : '',
		],
		pdf: withBase(base, `/pdfs/exercises/${id}.pdf`),
		scanAlt: (p) => `Exercise sheet ${Number(attrs.sheet)}, page ${p}`,
	};
}

function renderSource(attrs, base) {
	const s = sourceInfo(attrs, base);
	const first = s.pages[0] ?? 1;
	const scans = s.pages.map((p) => {
		const src = withBase(base, `/scans/${s.id}-${pad(p)}.webp`);
		return h('a', { href: src, target: '_blank', rel: 'noopener', className: ['qd-scan'], title: 'Open the scan in full size' }, [
			h('img', { src, alt: s.scanAlt(p), loading: 'lazy', decoding: 'async' }),
			h('span', { className: ['qd-scan__label'] }, `p. ${p}`),
		]);
	});
	const what = s.kind === 'notes' ? 'handwritten page' : 'sheet page';
	const row = [
		h('span', { className: ['qd-source__label'] }, [icon(s.kind === 'notes' ? 'notes' : 'sheet'), h('span', ['Source: ', ...s.label])]),
		h('span', { className: ['qd-source__links'] }, [
			h('a', { href: `${s.pdf}#page=${first}`, target: '_blank', rel: 'noopener', title: 'Open the original PDF at this page' }, [icon('external'), 'PDF']),
			h('a', { href: s.pdf, download: '', title: 'Download the original PDF' }, [icon('download'), 'Download']),
		]),
	];
	if (!scans.length) return h('div', { className: ['qd-source', 'not-content', `qd-source--${s.kind}`], dataPagefindIgnore: '' }, [h('div', { className: ['qd-source__row'] }, row)]);
	return h('details', { className: ['qd-source', 'not-content', `qd-source--${s.kind}`], dataPagefindIgnore: '' }, [
		h('summary', { className: ['qd-source__row'] }, [
			...row,
			h('span', { className: ['qd-source__toggle'], title: `Show the original ${what}${scans.length > 1 ? 's' : ''}` }, [
				icon('scan'),
				h('span', { className: ['qd-source__toggle-text'] }, scans.length > 1 ? `Original pages` : `Original page`),
				h('span', { className: ['qd-source__chev'], ariaHidden: 'true' }),
			]),
		]),
		h('div', { className: ['qd-scans'] }, scans),
	]);
}

function renderPagebreak(attrs, base) {
	const isLecture = Boolean(attrs.lecture);
	const id = isLecture ? `L${pad(attrs.lecture)}` : `E${pad(attrs.sheet)}`;
	const pdf = withBase(base, `/pdfs/${isLecture ? 'lectures' : 'exercises'}/${id}.pdf#page=${attrs.page}`);
	const text = isLecture ? `Lecture ${Number(attrs.lecture)} · page ${attrs.page}` : `Sheet ${Number(attrs.sheet)} · page ${attrs.page}`;
	return h('div', { className: ['qd-pagebreak', 'not-content'], dataPagefindIgnore: '', role: 'separator' }, [
		h('a', { href: pdf, target: '_blank', rel: 'noopener', title: 'Open this page of the original PDF' }, text),
	]);
}

function renderPageSources(attrs, base) {
	const chips = String(attrs.items || '')
		.split(';')
		.map((s) => s.trim())
		.filter(Boolean)
		.map((item) => {
			const [id, pages] = item.split(':');
			const isLecture = id.startsWith('L');
			const n = Number(id.slice(1));
			const pdf = withBase(base, `/pdfs/${isLecture ? 'lectures' : 'exercises'}/${id}.pdf`);
			const pg = parsePages(pages);
			const range = pg.length > 1 ? `pp. ${pg[0]}–${pg[pg.length - 1]}` : pg.length ? `p. ${pg[0]}` : '';
			return h('a', { className: ['qd-chip'], href: pdf, download: '', title: `Download the original ${isLecture ? 'lecture notes' : 'exercise sheet'} (PDF)` }, [
				icon('download'),
				h('span', [h('strong', isLecture ? `Lecture ${n}` : `Sheet ${n}`), range ? ` ${range}` : '']),
			]);
		});
	const extra = [];
	if (attrs.exercises)
		extra.push(h('a', { className: ['qd-chip', 'qd-chip--link'], href: withBase(base, attrs.exercises) }, ['Exercises on this topic', icon('arrow')]));
	if (attrs.notes)
		extra.push(h('a', { className: ['qd-chip', 'qd-chip--link'], href: withBase(base, attrs.notes) }, ['Read the lecture notes', icon('arrow')]));
	return h('div', { className: ['qd-pagesources', 'not-content'], dataPagefindIgnore: '' }, [
		h('span', { className: ['qd-pagesources__title'] }, attrs.label || 'Compiled from'),
		...chips,
		...extra,
	]);
}

function applyHast(node, el) {
	node.data = node.data || {};
	node.data.hName = el.tagName;
	node.data.hProperties = el.properties;
	node.data.hChildren = el.children;
	node.children = [];
}

export function remarkQdocs(options = {}) {
	const base = options.base || '/';
	return (tree) => {
		visit(tree, (node, index, parent) => {
			// Theorem-style boxes
			if (node.type === 'containerDirective' && BOX_TYPES[node.name]) {
				let title = BOX_TYPES[node.name];
				let titleChildren = null;
				const first = node.children[0];
				if (first?.type === 'paragraph' && first.data?.directiveLabel) {
					titleChildren = first.children;
					node.children.shift();
				}
				const titleNode = {
					type: 'paragraph',
					data: { hName: 'p', hProperties: { className: ['qd-box__title'] } },
					children: titleChildren
						? node.name === 'theorem'
							? titleChildren // theorem label is the whole title, e.g. "Lemma"
							: [{ type: 'text', value: `${title} ` }, { type: 'emphasis', data: { hName: 'span', hProperties: { className: ['qd-box__name'] } }, children: [{ type: 'text', value: '(' }, ...titleChildren, { type: 'text', value: ')' }] }]
						: [{ type: 'text', value: title }],
				};
				node.data = {
					hName: node.name === 'proof' ? 'div' : 'section',
					hProperties: { className: ['qd-box', `qd-box--${node.name}`] },
				};
				node.children = [
					titleNode,
					{ type: 'paragraph', data: { hName: 'div', hProperties: { className: ['qd-box__body'] } }, children: node.children },
				];
				return;
			}
			if (node.type === 'leafDirective' && node.name === 'source') {
				applyHast(node, renderSource(node.attributes || {}, base));
				return SKIP;
			}
			if (node.type === 'leafDirective' && node.name === 'pagebreak') {
				applyHast(node, renderPagebreak(node.attributes || {}, base));
				return SKIP;
			}
			if (node.type === 'leafDirective' && node.name === 'pagesources') {
				applyHast(node, renderPageSources(node.attributes || {}, base));
				return SKIP;
			}
			// Width hint from the generator: ![alt](src "w=320") → style="width:320px"
			if (node.type === 'image' && typeof node.title === 'string' && /^w=\d+$/.test(node.title)) {
				const w = Number(node.title.slice(2));
				node.title = null;
				node.data = node.data || {};
				node.data.hProperties = { ...(node.data.hProperties || {}), style: `width:${w}px` };
				return;
			}
			// Image-only paragraphs → figure
			if (node.type === 'paragraph' && parent && node.children.length) {
				const meaningful = node.children.filter((c) => !(c.type === 'text' && !c.value.trim()) && c.type !== 'break');
				if (meaningful.length && meaningful.every((c) => c.type === 'image')) {
					node.data = { hName: 'figure', hProperties: { className: ['note-figure'] } };
				}
			}
		});
	};
}

/** Prefix `base` to root-relative href/src attributes in the rendered HTML. */
export function rehypeBaseLinks(options = {}) {
	const base = (options.base || '/').replace(/\/$/, '');
	return (tree) => {
		if (!base) return;
		visit(tree, 'element', (node) => {
			for (const attr of ['href', 'src']) {
				const v = node.properties?.[attr];
				if (typeof v === 'string' && v.startsWith('/') && !v.startsWith('//') && !v.startsWith(base + '/') && v !== base) {
					node.properties[attr] = base + v;
				}
			}
		});
	};
}
