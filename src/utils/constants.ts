/**
 * Site-wide constants.
 *
 * ✏️  Edit these to personalize your portfolio.
 *     These are used by the Navbar, Footer, SEO meta tags, etc.
 */

export const SITE_TITLE = 'Juan Fernández Gómez';
export const SITE_DESCRIPTION =
  'Software Engineer & Creative Technologist. Building clean, accessible web experiences.';

/** Navigation links shown in the Navbar */
export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Posts', href: '/posts' },
  { label: 'Projects', href: '/projects' },
] as const;

/** Available themes — must match filenames in src/styles/themes/ */
export const THEMES = [
  { id: 'bold', label: 'Bold' },
] as const;

export const DEFAULT_THEME = 'bold';

/** OG Image fallback */
export const OG_IMAGE = '/og-image.png';
