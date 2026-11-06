# Polishing spec (notes pages → readable wording)

The notes pages in `src/content/docs/notes/` are faithful transcriptions of terse handwritten lecture
notes. Your job is to make your assigned pages **readable**, not to rewrite them into a textbook.
Sections I and II are already done; use them as the reference for tone and degree of change.

## The user's own words (verbatim)

The original request, about the page `notes/probabilistic-bits` (it showed a screenshot of the
"Probability quantifies likelihood:" / "Probabilistic bit = …" / "Note: …" / "Vector notation:" part):

> i would like you to polish the wording on this site. Currently, it is all taken verbatim from the
> lecture notes, but sometimes, this is quite simpplified.
>
> take something like this: [screenshot]
> This could use a lot more explanation and cleaner formatting instead of just
> Term: definition.
>
> Could you reformat just this page: http://127.0.0.1:4321/notes/probabilistic-bits/ so it's a bit
> more readable? Keep it quite minimal, but just so it's easier to read. Like just a bit more
> explanation around probability quantifies likelihood. Keeping the thread a bit clearer throughout
> the entier text. ETC

When they asked for the remaining sections, they said to give these exact instructions "so they
don't overexplain or overedit". The rules below are those instructions made concrete, including
the scope they added for Section II. Where in doubt, do less.

## The user's instructions (follow these exactly)

- Keep it **quite minimal**. Add a little connective explanation (why an idea comes next, what a
  formula means) so the thread is clear.
- Write abbreviations out (w.p., iff, s.t., resp., wrt, …), turn bare labels ("Term: definition",
  "Note: …", "Recall: …") into sentences.
- `:::definition[...]` / `:::example[...]` boxes are allowed for key definitions and examples, but
  use them sparingly (Section I/II use only a few).
- Keep **all math and all figures**. Don't add new content.
- **Only expand pages that are cryptic or too short.** Pages that already read reasonably well get a
  light touch (grammar, a few connecting words, labels → sentences) and nothing more. Do not
  overly expand every page.
- **Don't add anything unnecessary.** No new examples, theorems, history, facts or worked
  calculations that aren't in the notes; no motivational filler; no meta narration ("In this
  section…", "Let's…"); no summaries or recap paragraphs at the end of a page or section.

What *is* fine: a short sentence linking ideas that are already on the page or on an earlier page
(with a link); a one-line "why" that follows directly from what the page states; saying in words
what a displayed formula says, when the formula alone is cryptic.

## Use the clarity skill

Load the **clarity** skill in **rewrite** mode before editing (Skill tool, `skill: "clarity"`). If the
Skill tool is unavailable, read `/home/chronos/.claude/skills/clarity/SKILL.md`,
`references/edit.md` and `references/medium.md` (rows: Documentation/Reference, Academic) directly.
Its safeguards apply: preserve truth and attribution, make the least invasive change that solves
the problem, one self-review pass, don't iterate everything into the same register.

## Calibrate first

Before editing, read these polished pages to see the target: `notes/qubits.md` (Section I) and
`notes/dirac-notation.md`, `notes/eigenvalues-and-special-matrices.md` (heavier edits), and
`notes/tensor-product.md`, `notes/matrices-and-vectors.md` (light edits). `git diff HEAD -- <file>`
shows how much they changed (ignore frontmatter and `::source`/`::pagesources` directive changes;
those come from a separate pipeline change).

## Verify against the handwritten notes

For every page, read the scans of the pages listed in its frontmatter `sources`:
`public/scans/LNN-PP.webp` (two-digit lecture and page, e.g. lecture 3 page 1 → `L03-01.webp`).
The raw transcription is in `transcripts/lectures/LNN.md`. The Read tool may not open `.webp`;
convert first, e.g. `python3 -c "from PIL import Image; im=Image.open('public/scans/L03-01.webp');
im.thumbnail((1000,1400)); im.save('/tmp/qdocs-polish/scans/L03-01.png')"`, then Read the PNG.
Use them to check that:

- your wording says what the lecturer wrote (no meaning drift, no strengthened or weakened claims);
- the transcription itself is right where the text looks odd.

If the original has an obvious slip (e.g. `∈ ℂ` where `∈ ℂⁿ` is clearly meant), fix it and list it
in your report. Mark every such fix with a footnote, as the user asked: put `[^fix-N]` right
after the corrected text and add `[^fix-N]: Corrected from the original notes, which have …` (one
short sentence, plus a reason if it isn't obvious) at the end of the page. Typos and transcription
errors (where the scan was right) don't get a footnote. For anything that is more than an obvious slip, don't change the maths: describe it
in your report instead.

## Hard rules

- Edit **only your assigned pages** in `src/content/docs/notes/`. No other files (no config, CSS,
  exercises, other sections' pages, transcripts).
- Add `polished: true` to the frontmatter, on the line after `description:` (see the done pages).
  Leave `title`, `description`, `sources`, `exercisesLink` untouched.
- **Keep every existing `##` heading text exactly as it is.** Other pages and the sources page link
  to those anchors. You may add `###` subheadings.
- Keep `::pagebreak{lecture="…" page="…"}` lines. They mark where a handwritten page starts; keep
  each one directly before the first content from that page.
- Keep figure lines (`![alt](../../../assets/figures/… "w=…")`) unchanged, including alt text and
  width.
- Directive syntax: `:::definition[Title]`, `:::theorem[Label]`, `:::example`, `:::proof`,
  `:::exercise`, `:::note`, each closed by `:::`. KaTeX macros are in `src/katex-macros.json`
  (`\ket`, `\bra`, `\braket`, `\ketbra`, `\abs`, `\norm`, `\C`, `\R`, …); use the existing ones.
  Quotes inside `\text{…}` in math are written ``` ``like this'' ```, not `"like this"` (KaTeX
  renders straight double quotes as two closing quotes).
- Links: site-root paths like `/notes/qubits/#general-qubit-operation`. Check that the anchor
  exists (GitHub slug of a `##`/`###` heading in the target page).
- Do **not** run `npm run assemble` (it regenerates pages), builds, dev servers, or any git command
  that changes state (commit, stash, checkout, reset). `git diff` / `git show` are fine.

## Workflow per page

1. Copy the original to `/tmp/qdocs-polish/orig/<slug>.md` before editing.
2. Read the page and its scans; decide: light touch, or cryptic/too short → more explanation.
3. Edit.
4. Self-review (required; earlier agents skipped this): `diff /tmp/qdocs-polish/orig/<slug>.md
   src/content/docs/notes/<slug>.md` and read every added sentence. Cut any that adds content,
   repeats the formula without helping, or is filler. Check that every `$$` block and figure from
   the original is still there.
5. Render check: the user's dev server runs at `http://localhost:4321`. `curl -s
   http://localhost:4321/notes/<slug>/ | grep -c katex-error` must be 0. If the server isn't
   responding, don't start one; say so in your report.

## Report (keep it short, under ~250 words)

Per page: light / medium / heavy edit, and one line on what changed. Then list every place where
the page now says something the handwritten notes don't say literally (slip fixes, added
conditions, clarifications that are claims), and anything you were unsure about.
