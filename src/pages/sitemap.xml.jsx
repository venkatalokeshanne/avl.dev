import { getAllPublishedSlugs } from '@/lib/supabase';

const SITE_URL = 'https://www.avl.dev';

function generateSiteMap(blogSlugs) {
  const now = new Date().toISOString().split('T')[0];

  const staticPages = [
    { path: '', priority: '1.0', changefreq: 'weekly' },
    { path: '/about', priority: '0.8', changefreq: 'monthly' },
    { path: '/work', priority: '0.8', changefreq: 'monthly' },
    { path: '/blog', priority: '0.9', changefreq: 'daily' },
    { path: '/work/frtb-dashboard', priority: '0.7', changefreq: 'monthly' },
    { path: '/work/virtual-tour', priority: '0.7', changefreq: 'monthly' },
    { path: '/work/solis-pwa', priority: '0.7', changefreq: 'monthly' },
    { path: '/work/devotree-portfolio', priority: '0.7', changefreq: 'monthly' },
  ];

  const locales = ['en', 'fr'];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${staticPages
  .map(
    (page) => `
  <url>
    <loc>${SITE_URL}${page.path}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    ${locales
      .map(
        (locale) =>
          `<xhtml:link rel="alternate" hreflang="${locale}" href="${SITE_URL}${locale === 'en' ? '' : '/' + locale}${page.path}" />`
      )
      .join('\n    ')}
  </url>`
  )
  .join('')}
${blogSlugs
  .map(
    (slug) => `
  <url>
    <loc>${SITE_URL}/blog/${slug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
    ${locales
      .map(
        (locale) =>
          `<xhtml:link rel="alternate" hreflang="${locale}" href="${SITE_URL}${locale === 'en' ? '' : '/' + locale}/blog/${slug}" />`
      )
      .join('\n    ')}
  </url>`
  )
  .join('')}
</urlset>`;
}

export async function getServerSideProps({ res }) {
  let blogSlugs = [];
  try {
    blogSlugs = await getAllPublishedSlugs();
  } catch (e) {
    // continue with empty
  }

  const sitemap = generateSiteMap(blogSlugs);

  res.setHeader('Content-Type', 'text/xml');
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=43200');
  res.write(sitemap);
  res.end();

  return { props: {} };
}

export default function SiteMap() {
  // getServerSideProps handles the response
  return null;
}
