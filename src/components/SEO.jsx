import Head from 'next/head';
import { useRouter } from 'next/router';

const SITE_URL = 'https://www.avl.dev';
const SITE_NAME = 'Venkata Anne | Full Stack Developer & DevOps Engineer';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

/**
 * Reusable SEO component for all pages.
 *
 * @param {string} title       — Page title
 * @param {string} description — Meta description (max ~155 chars)
 * @param {string} path        — Page path (e.g. '/about')
 * @param {string} ogImage     — Open Graph image URL
 * @param {string} ogType      — Open Graph type (website, article, profile)
 * @param {object} article     — Article metadata for blog posts
 * @param {object[]} jsonLd    — Array of JSON-LD structured data objects
 * @param {boolean} noindex    — Whether to noindex the page
 */
export default function SEO({
  title,
  description,
  path = '',
  ogImage,
  ogType = 'website',
  article = null,
  jsonLd = [],
  noindex = false,
}) {
  const router = useRouter();
  const locale = router.locale || 'en';
  const altLocale = locale === 'en' ? 'fr' : 'en';

  const fullTitle = title
    ? `${title} | Venkata Anne — Full Stack Developer`
    : SITE_NAME;
  const desc =
    description ||
    'Venkata Anne — Full stack developer & DevOps engineer with 7+ years of experience. React.js, Node.js, Docker, Kubernetes. Based in Paris, France. Available worldwide.';
  const canonical = `${SITE_URL}${locale === 'fr' ? '/fr' : ''}${path}`;
  const image = ogImage || DEFAULT_OG_IMAGE;

  return (
    <Head>
      {/* Core */}
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={canonical} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      {/* Multi-language alternate links */}
      <link rel="alternate" hrefLang="en" href={`${SITE_URL}${path}`} />
      <link rel="alternate" hrefLang="fr" href={`${SITE_URL}/fr${path}`} />
      <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}${path}`} />

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="avl.dev — Venkata Anne" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content={locale === 'fr' ? 'fr_FR' : 'en_US'} />
      <meta property="og:locale:alternate" content={altLocale === 'fr' ? 'fr_FR' : 'en_US'} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={image} />

      {/* Article-specific */}
      {article && (
        <>
          <meta property="article:published_time" content={article.publishedAt} />
          {article.modifiedAt && (
            <meta property="article:modified_time" content={article.modifiedAt} />
          )}
          <meta property="article:author" content="Venkata Anne" />
          {article.tags?.map((tag) => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Extra SEO keywords — target phrases */}
      <meta
        name="keywords"
        content="Venkata Anne, Venkata Lokesh Anne, full stack developer, fullstack developer, frontend developer, React developer, Node.js developer, DevOps engineer, developer in France, developer in Paris, developer in India, fullstack developer France, fullstack developer India, React.js, Next.js, Docker, Kubernetes, Jenkins, CI/CD, JavaScript developer, web developer, software engineer, développeur full stack, développeur web Paris, développeur React France"
      />

      {/* Geo targeting */}
      <meta name="geo.region" content="FR-75" />
      <meta name="geo.placename" content="Paris, France" />
      <meta name="geo.position" content="48.8566;2.3522" />
      <meta name="ICBM" content="48.8566, 2.3522" />

      {/* Author */}
      <meta name="author" content="Venkata Anne" />

      {/* JSON-LD Structured Data */}
      {jsonLd.map((data, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
    </Head>
  );
}

/* ── Reusable JSON-LD generators ─────────────────────── */

export function personSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name: 'Venkata Anne',
    alternateName: ['Venkata Anne', 'Lokesh Anne', 'Anne Venkata Lokesh'],
    url: SITE_URL,
    image: `${SITE_URL}/og-image.png`,
    jobTitle: 'Full Stack Developer & DevOps Engineer',
    description:
      'Full stack developer and DevOps engineer with 7+ years of experience building React.js, Node.js, and cloud-native applications. Based in Paris, France.',
    knowsAbout: [
      'Full Stack Development',
      'Frontend Development',
      'Backend Development',
      'DevOps',
      'React.js',
      'Next.js',
      'Node.js',
      'Express.js',
      'Redux',
      'JavaScript',
      'TypeScript',
      'Docker',
      'Kubernetes',
      'Jenkins',
      'CI/CD',
      'MongoDB',
      'REST APIs',
      'Microservices',
      'PWA',
      'Material-UI',
      'Git',
      'Agile',
      'Cypress',
      'Jest',
    ],
    worksFor: {
      '@type': 'Organization',
      name: 'Meritis',
      url: 'https://www.meritis.fr',
    },
    alumniOf: [
      {
        '@type': 'EducationalOrganization',
        name: 'EPITA',
        url: 'https://www.epita.fr',
        address: { '@type': 'PostalAddress', addressLocality: 'Paris', addressCountry: 'France' },
      },
      {
        '@type': 'EducationalOrganization',
        name: 'GIET (JNTU Kakinada)',
        address: { '@type': 'PostalAddress', addressLocality: 'Andhra Pradesh', addressCountry: 'India' },
      },
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Paris',
      addressRegion: 'Île-de-France',
      addressCountry: 'France',
    },
    nationality: { '@type': 'Country', name: 'India' },
    sameAs: [
      'https://www.linkedin.com/in/venkatalokesh',
      'https://github.com/venkatalokeshanne',
      'https://www.runtimemind.com',
    ],
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: 'avl.dev',
    description:
      'Portfolio of Venkata Anne — Full Stack Developer & DevOps Engineer. React.js, Node.js, Docker, Kubernetes. Paris, France.',
    author: { '@id': `${SITE_URL}/#person` },
    inLanguage: ['en', 'fr'],
  };
}

export function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function articleSchema(post) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt || post.seo_description || '',
    image: post.cover_image_url || DEFAULT_OG_IMAGE,
    datePublished: post.published_at,
    dateModified: post.updated_at || post.published_at,
    author: { '@id': `${SITE_URL}/#person` },
    publisher: {
      '@type': 'Person',
      name: 'Venkata Anne',
      url: SITE_URL,
    },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
    keywords: post.tags?.join(', ') || '',
    wordCount: post.read_time_minutes ? post.read_time_minutes * 200 : undefined,
  };
}

export function profilePageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: { '@id': `${SITE_URL}/#person` },
    dateCreated: '2024-01-01',
    dateModified: new Date().toISOString().split('T')[0],
  };
}
