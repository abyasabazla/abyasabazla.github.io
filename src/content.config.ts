import { defineCollection, type ImageFunction } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';

export const seoSchemaWithoutImage = z.object({
  title: z.string(),
  description: z.string(),
  type: z.string().optional(),
  keywords: z.string().optional(),
  canonicalUrl: z.string().optional(),
  twitter: z.object({
    creator: z.string().optional(),
  }).optional(),
  robots: z.string().optional(),
})

const seoSchema = (image: ImageFunction) =>
  z.object({
    image: image().optional(),
  }).merge(seoSchemaWithoutImage);

const pageCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/pages' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    seo: seoSchema(image),
  }),
});

const linkCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.yml', base: './src/content/links' }),
  schema: z.object({
    label: z.string(),
    name: z.string(),
    url: z.string(),
  }),
});

const jobCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/jobs' }),
  schema: z.object({
    title: z.string(),
    company: z.string(),
    location: z.string(),
    from: z.number(),
    to: z.number().or(z.enum(['Now'])),
    url: z.string(),
    images: z.array(
      z.object({
        src: z.string(), // Gunakan string untuk URL
        alt: z.string().optional(),
      })
    ).optional(),
  }),
});

const talkCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/talks' }),
  schema: z.object({
    title: z.string(),
    year: z.number(),
    event: z.string(),
    location: z.string(),
    url: z.string(),
    images: z.array(
      z.object({
        src: z.string(), // Gunakan string untuk URL
        alt: z.string().optional(),
      })
    ).optional(),
  }),
});

const awardCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/awards' }),
  schema: z.object({
    title: z.string(),
    year: z.number(),
    event: z.string(),
    location: z.string(),
    url: z.string(),
    images: z.array(
      z.object({
        src: z.string(), // Gunakan string untuk URL
        alt: z.string().optional(),
      })
    ).optional(),
  }),
});

const eduCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/education' }),
  schema: z.object({
    title: z.string(),
    company: z.string(),
    location: z.string(),
    from: z.number(),
    to: z.number().or(z.enum(['Now'])),
    url: z.string(),
    images: z.array(
      z.object({
        src: z.string(), // Gunakan string untuk URL
        alt: z.string().optional(),
      })
    ).optional(),
  }),
});

const postCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/posts' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    date: z.date(),
    image: image().optional(),
    seo: seoSchema(image),
  }),
});

export const collections = {
  pages: pageCollection,
  links: linkCollection,
  jobs: jobCollection,
  talks: talkCollection,
  awards: awardCollection,
  edu: eduCollection,
  posts: postCollection,
};
