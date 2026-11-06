// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightThemeBlack from 'starlight-theme-black';
import starlightImageZoom from 'starlight-image-zoom';
import { unified } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { remarkQdocs, rehypeBaseLinks } from './src/plugins/qdocs.mjs';
import { tweakcnTheme } from './src/plugins/tweakcn.mjs';
import { parts } from './src/topics.mjs';
import katexMacros from './src/katex-macros.json' with { type: 'json' };

// ---------------------------------------------------------------------------
// GitHub Pages: derive `site` and `base` from the repository the build runs in
// (GITHUB_REPOSITORY="owner/repo" is set by GitHub Actions). Override with
// SITE_URL / BASE_PATH, e.g. for a custom domain: SITE_URL=https://example.org BASE_PATH=/
// ---------------------------------------------------------------------------
const [owner, repo] = (process.env.GITHUB_REPOSITORY ?? '').split('/');
const isUserSite = repo && repo.toLowerCase() === `${owner}.github.io`.toLowerCase();
const site = process.env.SITE_URL ?? (owner ? `https://${owner}.github.io` : 'http://localhost:4321');
const base = process.env.BASE_PATH ?? (repo && !isUserSite ? `/${repo}` : '/');
const repoUrl =
	process.env.REPO_URL ?? (owner && repo ? `https://github.com/${owner}/${repo}` : 'https://github.com/buenk/intro-to-quantum-docs');

const roman = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

// Libron (OFL, https://github.com/nicoverbruggen/libron), self-hosted from src/assets/fonts/libron.
const libron = (/** @type {string} */ file) => [`./src/assets/fonts/libron/${file}.woff2`];

/**
 * Registered after starlight-theme-black so our <Head> (which loads Space Grotesk and Libron
 * instead of Geist Sans) replaces the theme's own <Head> override.
 * @type {import('@astrojs/starlight/types').StarlightPlugin}
 */
const qdocsHead = {
	name: 'qdocs-head',
	hooks: {
		'config:setup'({ config, updateConfig }) {
			updateConfig({ components: { ...config.components, Head: './src/components/Head.astro' } });
		},
	},
};

export default defineConfig({
	site,
	base,
	trailingSlash: 'always',
	vite: { plugins: [tweakcnTheme()] },
	fonts: [
		// UI and headings: Space Grotesk (OFL), downloaded from Fontsource at build time.
		{
			provider: fontProviders.fontsource(),
			name: 'Space Grotesk',
			cssVariable: '--font-space-grotesk',
			weights: ['300 700'],
			styles: ['normal'],
			subsets: ['latin', 'latin-ext'],
			fallbacks: ['ui-sans-serif', 'system-ui', 'sans-serif'],
		},
		// Reading text: Libron.
		{
			provider: fontProviders.local(),
			name: 'Libron',
			cssVariable: '--font-libron',
			fallbacks: ['Georgia', 'serif'],
			options: {
				variants: [
					{ src: libron('Libron-Regular'), weight: 400, style: 'normal' },
					{ src: libron('Libron-Italic'), weight: 400, style: 'italic' },
					{ src: libron('Libron-Bold'), weight: 700, style: 'normal' },
					{ src: libron('Libron-BoldItalic'), weight: 700, style: 'italic' },
				],
			},
		},
	],
	markdown: {
		processor: unified({
			remarkPlugins: [remarkMath, [remarkQdocs, { base }]],
			rehypePlugins: [
				[
					rehypeKatex,
					{
						macros: katexMacros,
						strict: 'ignore',
						throwOnError: false,
						output: 'htmlAndMathml',
						// \htmlClass is only used by our own macros (e.g. \textcircled → .qd-circled)
						trust: (ctx) => ctx.command === '\\htmlClass',
					},
				],
				[rehypeBaseLinks, { base }],
			],
		}),
	},
	integrations: [
		starlight({
			title: 'Intro to Quantum Computing',
			description:
				'Lecture notes and exercises of the Introduction to Quantum Computing course, transcribed from the handwritten originals and organised by topic.',
			favicon: '/favicon.svg',
			social: [{ icon: 'github', label: 'GitHub', href: repoUrl }],
			// tweakcn.css: optional pasted tweakcn theme, rewritten by the tweakcnTheme() Vite plugin below.
			customCss: ['katex/dist/katex.min.css', './src/styles/custom.css', './src/styles/tweakcn.css'],
			components: {
				// Adds the page's sources block (lecture/sheet, PDFs, scans) at the bottom of every page.
				Footer: './src/components/Footer.astro',
			},
			tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 3 },
			lastUpdated: false,
			pagination: true,
			plugins: [
				starlightThemeBlack({
					// Root-relative: the theme adds the base path itself.
					navLinks: [
						{ label: 'Notes', link: '/notes/introduction/' },
						{ label: 'Exercises', link: '/exercises/' },
						{ label: 'Sources', link: '/sources/' },
					],
					// Collapsible sidebar groups (state is remembered while navigating).
					sidebar: { useDropdowns: true },
					docs: {
						showMarkdownActions: {
							prompt: "I'm reading these lecture notes on quantum computing: {url}\nHelp me understand them. Be ready to explain concepts, work through examples, or check my reasoning.",
							agents: { chatgpt: true, claude: true, v0: false, scira: false },
						},
					},
				}),
				qdocsHead,
				starlightImageZoom({ showCaptions: false }),
			],
			sidebar: [
				{
					label: 'Start here',
					items: [
						{ label: 'Home', link: '/' },
						{ slug: 'sources', label: 'Original notes & sources' },
						{ slug: 'exercises', label: 'All exercises' },
					],
				},
				// One group per part: its topic pages, then that part's exercises.
				...parts.map((part, i) => ({
					label: `${roman[i]}. ${part.label}`,
					collapsed: false,
					items: [
						...part.topics.map((t) => ({ slug: `notes/${t.slug}` })),
						...(part.exercises?.length ? [{ slug: `exercises/${part.slug}`, label: 'Exercises' }] : []),
					],
				})),
			],
		}),
	],
});
