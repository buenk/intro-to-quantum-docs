// Lets src/styles/tweakcn.css hold a theme copied straight from tweakcn (https://tweakcn.com).
//
// tweakcn exports a shadcn/Tailwind stylesheet: light colours on `:root`, dark colours on `.dark`,
// plus Tailwind-only rules (`@import "tailwindcss"`, `@theme inline`, `@apply`, ...). This site has
// no Tailwind and Starlight switches modes with `data-theme` on <html>, so at build time this plugin
// rewrites the file to:
//   - keep only the custom properties from `:root` and `.dark` (also when nested in `@layer base`,
//     as in tweakcn's Tailwind v3 export) and drop everything else;
//   - move the dark values to `:root[data-theme='dark']`;
//   - wrap bare HSL channels (`0 0% 100%`, Tailwind v3 + hsl) in `hsl()`;
//   - append src/styles/tweakcn-bridge.css, which maps the shadcn tokens onto starlight-theme-black.
// If the file holds no theme, it compiles to nothing and the site keeps its default look.

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const themeFile = fileURLToPath(new URL('../styles/tweakcn.css', import.meta.url));
const bridgeFile = fileURLToPath(new URL('../styles/tweakcn-bridge.css', import.meta.url));

/** Top-level `prelude { body }` blocks of a stylesheet; `;`-terminated statements are skipped. */
function blocks(/** @type {string} */ css) {
	const out = [];
	let depth = 0;
	let preludeStart = 0;
	let bodyStart = 0;
	let prelude = '';
	for (let i = 0; i < css.length; i++) {
		const c = css[i];
		if (c === '{') {
			if (depth++ === 0) {
				prelude = css.slice(preludeStart, i).trim();
				bodyStart = i + 1;
			}
		} else if (c === '}') {
			if (--depth === 0) {
				out.push({ prelude, body: css.slice(bodyStart, i) });
				preludeStart = i + 1;
			}
		} else if (c === ';' && depth === 0) {
			preludeStart = i + 1;
		}
	}
	return out;
}

/** Custom-property declarations (`--name: value`) of the `:root` / `.dark` rules, recursing into `@layer`. */
function collect(/** @type {string} */ css, /** @type {{ light: string[], dark: string[] }} */ acc) {
	for (const { prelude, body } of blocks(css)) {
		if (prelude.startsWith('@layer')) collect(body, acc);
		const target = prelude === ':root' ? acc.light : prelude === '.dark' ? acc.dark : null;
		if (!target) continue;
		for (const decl of body.split(';')) {
			const m = decl.match(/^\s*(--[\w-]+)\s*:\s*([\s\S]+?)\s*$/);
			if (!m) continue;
			const value = /^-?[\d.]+(deg)?\s+[\d.]+%\s+[\d.]+%$/.test(m[2]) ? `hsl(${m[2]})` : m[2];
			target.push(`\t${m[1]}: ${value};`);
		}
	}
	return acc;
}

/** @returns {import('vite').Plugin} */
export function tweakcnTheme() {
	return {
		name: 'qdocs-tweakcn-theme',
		enforce: 'pre',
		transform(code, id) {
			if (id.split('?')[0] !== themeFile) return;
			this.addWatchFile(bridgeFile);
			const { light, dark } = collect(code.replace(/\/\*[\s\S]*?\*\//g, ''), { light: [], dark: [] });
			if (!light.length && !dark.length) return { code: '', map: null };
			const css = [
				light.length ? `:root {\n${light.join('\n')}\n}` : '',
				dark.length ? `:root[data-theme='dark'] {\n${dark.join('\n')}\n}` : '',
				readFileSync(bridgeFile, 'utf8'),
			];
			return { code: css.join('\n\n'), map: null };
		},
	};
}
