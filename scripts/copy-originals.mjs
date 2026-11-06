#!/usr/bin/env node
// Copies the original PDFs from original_notes/ into public/pdfs/ so they are served for
// download. Runs automatically before `npm run dev` / `npm run build` (public/pdfs is git-ignored,
// so the PDFs are stored in the repository only once).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pairs = [
	['original_notes/lecture_notes', 'public/pdfs/lectures'],
	['original_notes/exercises', 'public/pdfs/exercises'],
];
let n = 0;
for (const [from, to] of pairs) {
	const src = path.join(root, from);
	const dst = path.join(root, to);
	fs.mkdirSync(dst, { recursive: true });
	for (const f of fs.readdirSync(src).filter((f) => f.toLowerCase().endsWith('.pdf'))) {
		fs.copyFileSync(path.join(src, f), path.join(dst, f));
		n++;
	}
}
console.log(`Copied ${n} original PDFs into public/pdfs/.`);
