// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightThemeNova from 'starlight-theme-nova';
import starlightImageZoom from 'starlight-image-zoom';
import { unified } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { remarkQdocs, rehypeBaseLinks } from './src/plugins/qdocs.mjs';
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
const withBase = (/** @type {string} */ p) => `${base.replace(/\/$/, '')}${p}`;
const repoUrl = owner && repo ? `https://github.com/${owner}/${repo}` : undefined;

const roman = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

export default defineConfig({
	site,
	base,
	trailingSlash: 'always',
	markdown: {
		processor: unified({
			remarkPlugins: [remarkMath, [remarkQdocs, { base }]],
			rehypePlugins: [
				[rehypeKatex, { macros: katexMacros, strict: 'ignore', throwOnError: false, output: 'htmlAndMathml' }],
				[rehypeBaseLinks, { base }],
			],
		}),
	},
	integrations: [
		starlight({
			title: 'Intro to Quantum Computing',
			description:
				'Lecture notes and exercises of the Introduction to Quantum Computing course, transcribed from the handwritten originals and organised by topic.',
			logo: { src: './src/assets/logo.svg', replacesTitle: false },
			favicon: '/favicon.svg',
			social: repoUrl ? [{ icon: 'github', label: 'GitHub', href: repoUrl }] : [],
			customCss: ['katex/dist/katex.min.css', './src/styles/custom.css'],
			components: {
				// Combines the Nova theme's MarkdownContent with starlight-image-zoom's.
				MarkdownContent: './src/components/MarkdownContent.astro',
			},
			tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 3 },
			lastUpdated: false,
			pagination: true,
			plugins: [
				starlightThemeNova({
					nav: [
						{ label: 'Notes', href: withBase('/notes/introduction/') },
						{ label: 'Exercises', href: withBase('/exercises/') },
						{ label: 'Sources', href: withBase('/sources/') },
					],
				}),
				starlightImageZoom({ showCaptions: false }),
			],
			sidebar: [
				{
					label: 'Start here',
					items: [
						{ label: 'Home', link: '/' },
						{ slug: 'sources', label: 'Original notes & sources' },
					],
				},
				...parts.map((part, i) => ({
					label: `${roman[i]}. ${part.label}`,
					items: part.topics.map((t) => ({ slug: `notes/${t.slug}` })),
				})),
				{
					label: 'Exercises',
					items: [
						{ slug: 'exercises', label: 'Overview' },
						...parts
							.filter((p) => p.exercises?.length)
							.map((p) => ({ slug: `exercises/${p.slug}`, label: p.label })),
					],
				},
			],
		}),
	],
});
