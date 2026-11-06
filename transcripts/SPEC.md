# Transcription spec (handwritten lecture notes → Markdown + LaTeX)

Goal: a **faithful** digital transcription of handwritten lecture notes for an "Introduction to
Quantum Computing" course. These transcripts are later cut into topic pages of a docs website
(Astro Starlight, KaTeX math). Faithfulness is the #1 priority: keep the author's wording,
phrasing, order, examples and level of detail. Do **not** summarise, embellish, add
explanations, or "improve" the text. Fix nothing except obvious slips of the pen.

## Inputs

- Page images for viewing: `/tmp/qnotes/pages/LNN-PP.png` (150 dpi, ~928×1238 px), e.g. `L03-05.png`.
- Hi-res renders (2×, for cropping only): `/tmp/qnotes/hires/LNN-PP.png`.
- Grid helper: `/tmp/qnotes/tools/grid.sh L03-05` → writes `/tmp/qnotes/grid/L03-05.png`, the
  viewing image with a labelled 50 px coordinate grid. Use it to pick crop boxes.
- Crop helper: `/tmp/qnotes/tools/crop.sh L03-05 X Y W H OUT.png` — box in *viewing-image*
  coordinates; it crops the hi-res render, auto-trims whitespace and adds a border.
- Math checker: `node /tmp/qnotes/tools/checkmath.mjs FILE.md` — renders every math node with
  KaTeX and reports errors / stray `$`. Your file must pass with 0 problems.

Read every page image yourself (Read tool). If a passage is hard to read, crop/zoom it with the
crop helper and Read the crop. Zooming dense equations is cheap — do it whenever unsure about an
index, sign, dagger, conjugate bar, subscript, ket label, etc.

## Output

1. `transcripts/lectures/LNN.md` (paths relative to `/home/chronos/repos/intro-to-quantum-docs/`).
2. Figure crops in `transcripts/figures/` named `LNN-pPP-K.png` (K = 1, 2, … per page).

### File structure

```markdown
# Lecture N

<!-- page 1 -->

## First underlined heading in the notes

Text…

<!-- page 2 -->

…continues…
```

- Put `<!-- page P -->` on its own line (blank lines around it) exactly where page P begins —
  even mid-section or mid-paragraph (then split the paragraph there). Every page gets a marker.
- Drop the "Lecture N" title line itself (it is the `# Lecture N` line).
- Headings: underlined section titles in the notes → `##`. A clearly subordinate heading (e.g.
  "Deterministic strategies" inside "GHZ game") → `###`. Use the notes' own heading text
  verbatim (keep their capitalisation). Never invent headings for unheaded text.
- Horizontal separator lines drawn across the page are not needed (omit them).

### Text

- Verbatim wording, including first person ("I could just state them…"), abbreviations
  ("w.p.", "e.g.", "i.e.", "s.t."), and parenthetical remarks.
- Underlined words/phrases inside running text (usually defined terms) → `**bold**`.
- Numbered / bulleted lists → Markdown lists (keep the notes' numbering).
- Labelled blocks: ONLY when the notes themselves label a block, wrap it in a directive:
  - "Ex", "Example", "E.g." as a block label → `:::example` … `:::`
    (if the label carries a title, use `:::example[Title]`)
  - "Def", "Definition" → `:::definition[Term]` (or just `:::definition`)
  - "Thm"/"Theorem", "Lemma", "Claim", "Fact", "Proposition" → `:::theorem[Theorem]`,
    `:::theorem[Lemma]`, … (bracket = the label as written, plus name if any)
  - "Proof", "Pf" → `:::proof` … `:::`
  - "Note:", "Remark:", "Warning", "Important" → `:::note` … `:::` (keep the word "Note:" out —
    the box shows it). If the note is a single inline sentence in a paragraph, leave it as text
    ("Note: …") instead.
  - "Exercise" / "Check" prompts inside the lecture → `:::exercise` … `:::`
  Put blank lines inside directives around display math. Keep directives flat (no nesting).
- Margin annotations / arrows pointing at a term: attach them in the most natural verbatim way:
  - annotation of a term inside an equation → `\underbrace{…}_{\text{annotation}}` or
    `\overbrace{…}^{\text{…}}` (this is preferred: it mirrors the handwritten arrows), or
  - a parenthetical in the sentence: "… the Hamiltonian $H$ (a Hermitian matrix) …", or
  - an indented italic line right after the equation: `*(This has to hold for all states $\ket{\psi}$.)*`
- Crossed-out text: omit. Inserted text (carets / words squeezed in): include in place.
- Unreadable bits: best guess followed by `[?]`, and add an HTML comment
  `<!-- unclear: what you could not read -->`. Keep these rare: zoom first.

### Math (KaTeX)

- Inline `$…$`, display on separate lines:

  ```
  $$
  \ket{\psi} = \sum_{i=1}^n \alpha_i \ket{i}
  $$
  ```
- Bra-ket: `\ket{\psi}`, `\bra{\phi}`, `\braket{\phi|\psi}`, `\braket{\phi|A|\psi}` (KaTeX
  built-ins). Outer products: `\ketbra{\psi}{\phi}` (→ |ψ⟩⟨φ|) or write `\ket{i}\!\bra{j}`.
  Extra macros available: `\abs{x}`, `\norm{x}`, `\Tr`, `\tr`, `\C`, `\R`, `\N`, `\Z`, `\F`.
  Do NOT use `\newcommand`, `\def`, `\DeclareMathOperator`, `\usepackage`, `align` (use
  `\begin{aligned}…\end{aligned}` inside `$$`), `\qquad\text{}` is fine, `\tag` is fine.
- Matrices/vectors: `\begin{pmatrix}…\end{pmatrix}`; case splits: `\begin{cases}`; multi-line
  derivations: `\begin{aligned} … &= … \\ &= … \end{aligned}`; braces grouping lines:
  `\left.\begin{aligned}…\end{aligned}\right\}\text{ comment}`.
- Boxed equations/results → `\boxed{…}`.
- Dagger `^\dagger`, conjugate `\bar{z}` / `\overline{…}` (as written), transpose `^\mathsf{T}`,
  tensor `\otimes`, XOR `\oplus`, Hadamard `H`, Paulis `X, Y, Z`, identity `I` (as written).
- Keep the notes' notation even if unusual (e.g. if they write `U^*`, write `U^*`).
- No `$` signs in plain text (the checker flags them). Escape a literal dollar as `\$` if ever needed.

### Figures

Use a crop (figure image) only for genuine drawings: quantum circuits, Bloch spheres, plots,
geometric pictures, game/protocol diagrams with players and arrows, boxed schematic drawings.
Do NOT crop things you can typeset: equations, matrices, tables (→ Markdown table or LaTeX
`array`), simple lists. If a drawing is embedded in text (e.g. a small diagram to the right of a
paragraph), crop only the drawing, and transcribe the text normally.

1. Run `grid.sh` on the page, Read the gridded image, choose a generous box around the drawing
   that does not include neighbouring text lines.
2. Run `crop.sh`, then Read the output. Iterate until the whole drawing (incl. its labels) is
   inside and stray text is not. The helper auto-trims whitespace, so generous margins are fine.
3. Embed it where it appears:

   ```markdown
   ![Circuit: Hadamard on the first qubit followed by a CNOT](figures/L05-p03-1.png)
   ```
   Alt text = short factual description of the drawing (what a screen reader needs). If the
   notes write a caption/label next to it, transcribe that as normal text below the image.

For quantum circuits, ALSO add (right after the image) a faithful text description only if the
notes describe the circuit in words nearby — otherwise the image alone is fine.

## Final step

1. `node /tmp/qnotes/tools/checkmath.mjs transcripts/lectures/LNN.md` → must report 0 problems.
2. Re-read your file once against the page images, page by page, to catch skipped lines,
   wrong signs/indices and missing figures.
3. Reply with a short report (≤ 350 words, no file dumps):
   - `Lecture N title guess:` a 3–7 word description of what the lecture is about
   - Outline: one line per `##`/`###` heading: `heading | pages | 8–15 word summary`
     (include a pseudo-entry `(intro, no heading) | pages | …` for unheaded opening text)
   - Figures: count + filenames
   - Uncertain readings: list (page, what)
