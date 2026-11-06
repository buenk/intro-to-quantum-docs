// Markdown extensions for the quantum lecture-notes site.
//
// Container directives (theorem-style boxes):
//   :::definition[Optional title]  :::theorem[Lemma]  :::example  :::proof  :::exercise
//
// Leaf directives:
//   ::extag{sheet="4" exercise="2"}                   "Exercise sheet 4 · Exercise 2" label
//   ::pagebreak{lecture="3" page="5"}                 where a handwritten page starts
//   ::pagesources{label="Notes:" notes="/notes/y/"}   link chips
//
// Page-level sources (lecture/sheet and pages) are not Markdown: they come from the page's
// `sources` frontmatter and are rendered at the bottom of the page by src/components/Footer.astro.
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

const icon = (name) => {
	const paths = {
		notes:
			'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zm0 0v6h6M8 13h8M8 17h5',
		sheet:
			'M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11',
		external: 'M14 3h7v7m0-7L10 14M19 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5',
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

/** Small label under an exercise heading: which sheet and exercise it is. */
function renderExtag(attrs) {
	return h('p', { className: ['qd-extag', 'not-content'], dataPagefindIgnore: '' }, [
		`Exercise sheet ${Number(attrs.sheet)}`,
		attrs.exercise ? ` · Exercise ${attrs.exercise}` : '',
	]);
}

function renderPagebreak(attrs) {
	const text = attrs.lecture ? `Lecture ${Number(attrs.lecture)} · page ${attrs.page}` : `Sheet ${Number(attrs.sheet)} · page ${attrs.page}`;
	return h('div', { className: ['qd-pagebreak', 'not-content'], dataPagefindIgnore: '', role: 'separator' }, [h('span', text)]);
}

function renderPageSources(attrs, base) {
	const extra = [];
	if (attrs.exercises)
		extra.push(h('a', { className: ['qd-chip', 'qd-chip--link'], href: withBase(base, attrs.exercises) }, ['Exercises on this topic', icon('arrow')]));
	if (attrs.notes)
		extra.push(h('a', { className: ['qd-chip', 'qd-chip--link'], href: withBase(base, attrs.notes) }, ['Read the lecture notes', icon('arrow')]));
	return h('div', { className: ['qd-pagesources', 'not-content'], dataPagefindIgnore: '' }, [
		h('span', { className: ['qd-pagesources__title'] }, attrs.label || 'Compiled from'),
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
			if (node.type === 'leafDirective' && node.name === 'extag') {
				applyHast(node, renderExtag(node.attributes || {}));
				return SKIP;
			}
			if (node.type === 'leafDirective' && node.name === 'pagebreak') {
				applyHast(node, renderPagebreak(node.attributes || {}));
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
