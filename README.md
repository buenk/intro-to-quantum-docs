# Introduction to Quantum Computing — lecture notes & exercises

A documentation website for the handwritten lecture notes and exercise sheets of the
*Introduction to Quantum Computing* course, built with [Astro Starlight](https://starlight.astro.build)
and the [Nova theme](https://starlight-theme-nova.pages.dev/).

- **Organised by topic, not by lecture.** 35 topic pages in 9 parts, plus 9 exercise pages.
- **Faithful.** The wording and explanations are the lecturer's own, transcribed verbatim.
- **Traceable.** Every section shows which lecture (or exercise sheet) and which page it came
  from, links to the original PDF at that page, and can expand the scanned original page inline.
  The [sources page](src/content/docs/sources.md) maps every lecture section to its new home.
- **Math** is typeset with KaTeX; circuits, Bloch spheres and diagrams are cropped from the
  notes themselves (they invert automatically in dark mode, and zoom on click).

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
original_notes/          the original PDFs (lecture_notes/L01–L13, exercises/E01–E13)
transcripts/             ← source of truth for the text
  lectures/LNN.md        faithful per-lecture transcription (Markdown + KaTeX, page markers)
  exercises/ENN.md       faithful per-sheet transcription
  figures/*.png          drawings cropped from the scans (circuits, diagrams, plots)
  SPEC.md, PROOFREAD.md  transcription conventions
src/topics.mjs           ← the topic map: which lecture sections / exercises go on which page
scripts/assemble.mjs     builds src/content/docs/** from transcripts + topic map
src/content/docs/        GENERATED pages (notes/, exercises/, sources.md, index.mdx)
src/plugins/qdocs.mjs    Markdown extensions (boxes, source badges, page breaks, figures)
public/scans/            page scans shown under "Original page"
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
| `::source{lecture="3" pages="2-4"}` | Source badge: lecture + pages, PDF links, expandable original scans |
| `::source{sheet="4" exercise="2" pages="1"}` | Same, for an exercise sheet |
| `::pagebreak{lecture="3" page="5"}` | Marks where a handwritten page starts |
| `![alt](path "w=320")` | Figure, displayed 320 px wide |

## Credits

Lecture notes and exercise sheets: the course lecturer(s) of *Introduction to Quantum
Computing*. This site only re-typesets and reorganises them; all content belongs to its authors.
