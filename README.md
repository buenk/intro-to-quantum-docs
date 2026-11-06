# Introduction to Quantum Computing — lecture notes & exercises

A documentation website for the handwritten lecture notes and exercise sheets of the
*Introduction to Quantum Computing* course, built with [Astro Starlight](https://starlight.astro.build),
the [Black theme](https://starlight-theme-black.vercel.app/) and the
[Libron](https://github.com/nicoverbruggen/libron) typeface.

- **Organised by topic, not by lecture.** 35 topic pages in 9 parts, plus 9 exercise pages.
- **Faithful.** The wording and explanations are the lecturer's own, transcribed verbatim.
- **Traceable.** The bottom of every page names the lecture (or exercise sheets) and pages it was
  transcribed from.
  Thin page markers in the text show where each handwritten page starts, and the
  [sources page](src/content/docs/sources.md) maps every lecture section to its new home.
- **Math** is typeset with KaTeX; circuits, Bloch spheres and diagrams are cropped from the
  notes themselves (they invert automatically in dark mode, and zoom on click).

## Status and copyright

This is an unofficial study aid made by a student. It is not endorsed by the lecturer or the
university. The lecture notes and exercise sheets are by Maris Ozols. The original PDFs and page scans are not part of this repository or the site, and the site asks search engines not to index it. If you are the author and want something changed or removed, please [open an issue](https://github.com/buenk/intro-to-quantum-docs/issues).

## Quick start

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # static site in dist/
npm run preview
```

Requires Node.js ≥ 22.23 (Astro 7).

## Deploying to GitHub Pages

1. Push this repository to GitHub (default branch `main`).
2. In the repository, open **Settings → Pages** and set **Source** to **GitHub Actions**.
3. Every push to `main` runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml),
   which builds and publishes the site.

`site` and `base` are derived automatically from the repository name (`GITHUB_REPOSITORY`), so
the site works at `https://<user>.github.io/<repo>/` without configuration. For a custom domain,
set `SITE_URL` and `BASE_PATH` (e.g. `BASE_PATH=/`) in the workflow's build step.

## How the content is produced

```
original_notes/          the original PDFs and page scans (scans/), local only (git-ignored, never published)
transcripts/             ← source of truth for the text
  lectures/LNN.md        faithful per-lecture transcription (Markdown + KaTeX, page markers)
  exercises/ENN.md       faithful per-sheet transcription
  figures/*.png          drawings cropped from the scans (circuits, diagrams, plots)
  SPEC.md, PROOFREAD.md  transcription conventions
src/topics.mjs           ← the topic map: which lecture sections / exercises go on which page
scripts/assemble.mjs     builds src/content/docs/** from transcripts + topic map
src/content/docs/        GENERATED pages (notes/, exercises/, sources.md, index.mdx)
src/plugins/qdocs.mjs    Markdown extensions (boxes, source badges, page breaks, figures)
```

Each transcript was made by reading the page images (the handwriting cannot be text-extracted),
then proofread page by page against the scans by a second pass.

### Fixing a typo or a formula

Edit the transcript in `transcripts/` and regenerate the pages:

```sh
npm run assemble
```

`assemble` overwrites everything in `src/content/docs/`, so make content fixes in the
transcripts, not in the generated pages. It also checks that every lecture section and every
exercise is used exactly once, and fails otherwise.

### Reorganising topics

Edit `src/topics.mjs` (the sidebar is built from it too) and run `npm run assemble`. Sections are
referenced by the beginning of their `##` heading in the transcript, e.g.

```js
{ lecture: 3, from: 'Expressing a state in a different basis', to: 'Measurement in a different basis' }
{ sheet: 8, ex: [1, 2, 3] }
```

## Markdown extensions

Available in any page (and used by the transcripts):

| Syntax | Renders as |
| --- | --- |
| `$…$`, `$$…$$` | KaTeX math. Macros: `\ket`, `\bra`, `\braket`, `\ketbra{a}{b}`, `\abs`, `\norm`, `\Tr`, `\C`, `\R`, … ([list](src/katex-macros.json)) |
| `:::definition[Name]` … `:::` | Definition box (also `:::theorem[Lemma]`, `:::example`, `:::proof`, `:::exercise`) |
| `:::note` … `:::` | Starlight aside (also `tip`, `caution`, `danger`) |
| `::extag{sheet="4" exercise="2"}` | Small "Exercise sheet 4 · Exercise 2" label under an exercise title |
| `::pagebreak{lecture="3" page="5"}` | Marks where a handwritten page starts |
| `![alt](path "w=320")` | Figure, displayed 320 px wide |

The sources block at the bottom of a page comes from its frontmatter (rendered by
[`src/components/Footer.astro`](src/components/Footer.astro)):

```yaml
sources: [{ "lecture": 1, "pages": "9-14" }]        # or { "sheet": 4, "pages": "1-3" }
exercisesLink: "/exercises/foundations/#qubits-and-the-bloch-sphere"   # optional
```

## Theme and fonts

- Theme: [`starlight-theme-black`](https://github.com/adrian-ub/starlight-theme-black). Its
  `<Head>` override is replaced by [`src/components/Head.astro`](src/components/Head.astro)
  (registered by the small `qdocs-head` plugin in `astro.config.mjs`) so that Libron is loaded
  instead of Geist Sans.
- Text font: **Libron**, self-hosted from [`src/assets/fonts/libron/`](src/assets/fonts/libron/)
  through Astro's Fonts API. Code uses Geist Mono (from the theme).
- Site-specific styles (boxes, source badges, figures, typography fixes) live in
  [`src/styles/custom.css`](src/styles/custom.css).

## Credits

Lecture notes and exercise sheets: the course lecturer(s) of *Introduction to Quantum
Computing*. This site only re-typesets and reorganises them; all content belongs to its authors.

Libron © 2026 Nico Verbruggen, based on Readerly and Newsreader, licensed under the
[SIL Open Font License 1.1](src/assets/fonts/libron/OFL.txt) (Reserved Font Name "Libron").
