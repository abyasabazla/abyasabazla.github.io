import type { z } from 'astro/zod';
import MetaDefaultImage from '@/assets/images/meta-default.jpg';
import avatar from '@/assets/images/avatar.jpeg';
import type { seoSchemaWithoutImage } from '@/content.config';
import astroConfig from 'astro.config.mjs';

export type AuthorInfo = {
  name: string;
  avatar: any;
  headline: string;
  username?: string;
  location?: string;
  pronouns?: string;
}

export type Seo = z.infer<typeof seoSchemaWithoutImage> & {
  image?: any;
}

type DefaultConfigurationType = {
  baseUrl: string,
  author: AuthorInfo;
  seo: Seo;
}

export const DEFAULT_CONFIGURATION: DefaultConfigurationType = {
  baseUrl: astroConfig.site || 'https://getcvfolio.com',
  author: {
    avatar,
    name: 'Abyasa Bazla Wismaya',
    headline: 'Cyber Security Enthusiast',
    username: '@abysabzla',
    location: 'Central Jakarta',
    pronouns: 'He/Him',
  },
  seo: {
    title: 'Abyasa Bazla Wismaya — Portofolio & Curicullum Vitae',
    description: 'Abyasa Bazla Wismaya Cyber Security Enthusiast in Central Jakarta',
    type: 'website',
    image: MetaDefaultImage,
    twitter: {
      creator: '@cvfolio'
    },
    robots: 'noindex, nofollow',
  }
};