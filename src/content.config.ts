import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { docsLoader, i18nLoader } from '@astrojs/starlight/loaders';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';
import { ExtendDocsSchema } from 'starlight-theme-black/schema';

/** Where a page's content comes from; rendered at the bottom of the page (src/components/Footer.astro). */
const Source = z.union([
	z.object({ lecture: z.number().int(), pages: z.string() }),
	z.object({ sheet: z.number().int(), pages: z.string() }),
]);

export const collections = {
	docs: defineCollection({
		loader: docsLoader(),
		schema: docsSchema({
			extend: ExtendDocsSchema.extend({
				sources: z.array(Source).optional(),
				/** Link to the exercises on the same topic (notes pages). */
				exercisesLink: z.string().optional(),
				/** Wording edited by hand; `npm run assemble` keeps the page instead of regenerating it. */
				polished: z.boolean().optional(),
			}),
		}),
	}),
	i18n: defineCollection({ loader: i18nLoader(), schema: i18nSchema() }),
};
