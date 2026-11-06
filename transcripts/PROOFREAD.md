# Proofreading pass (second pair of eyes)

A first agent transcribed the pages into Markdown + KaTeX following `transcripts/SPEC.md`
(read it: it defines the conventions — directives, page markers, figures, math macros). The
first agent worked fast and did NOT re-read its output. Your job: make the transcript an exact,
faithful copy of the source pages. You are the last line of defence before publication.

## Procedure, for every page P (do not skip pages)

1. Read the page image (lectures: `/tmp/qnotes/pages/LNN-PP.png`; exercise sheets:
   `/tmp/qnotes/ex/ENN-PP.png`).
2. Read the transcript block between `<!-- page P -->` and the next marker.
3. Compare line by line, and zoom (`/tmp/qnotes/tools/crop.sh <PAGE> X Y W H /tmp/qnotes/zoom/<name>.png`,
   then Read it; `grid.sh <PAGE>` gives coordinates) into every dense formula. Check:
   - missing / extra / reordered sentences, words changed or paraphrased (must be verbatim);
   - math: signs, indices, subscripts vs superscripts, daggers `†`, conjugate bars, transposes,
     fractions, square roots, ket/bra labels, sums' ranges, matrix entries, ⊗ vs ×, ⊕ vs +;
   - annotations (arrows/braces/margin notes) present and attached sensibly;
   - lists/numbering, underlined terms → **bold**, labelled blocks → directives (per spec);
   - nothing added that isn't in the notes (remove invented annotations/explanations; a
     drawn arrow or label may be represented, but not new prose);
   - stray HTML entities (`&gt;`, `&lt;`, `&amp;`) in text/math/code → use the real characters.
4. Fix errors directly in the file with the Edit tool. Keep the existing headings and page
   markers unless they are actually wrong.

## Figures

Read EVERY figure crop referenced in the file (`transcripts/figures/...`). It must contain the
complete drawing including its labels, and no stray fragments of neighbouring text. If not,
re-crop with `crop.sh` to the same filename (it overwrites) and Read it again. If a figure is
really just a table/equation/matrix that can be typeset, typeset it instead and delete the
image reference (leave the png). If a genuine drawing is missing, crop and add it.

## Finish

- `node /tmp/qnotes/tools/checkmath.mjs <file>` → 0 problems.
- Reply in ≤ 200 words: number of corrections by category (wording, math, structure,
  figures), the most significant fixes (page + what), and anything still doubtful.
