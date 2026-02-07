import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '../../../next-i18next.config';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import Footer from '@/components/sections/Footer';
import { getPostBySlug, getAllPublishedSlugs } from '@/lib/supabase';

function formatDate(dateString) {
  if (!dateString) return '';
  const d = new Date(dateString);
  return d.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function BlogPost({ post }) {
  const { t } = useTranslation('common');
  const router = useRouter();

  if (router.isFallback) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <p className="text-muted font-mono animate-pulse-soft">loading...</p>
      </section>
    );
  }

  if (!post) {
    return (
      <>
        <section className="min-h-screen flex items-center px-6">
          <div className="max-w-3xl mx-auto w-full text-center">
            <h1 className="text-accent">Article not found.</h1>
            <p className="text-chalk/60 mt-4">
              This article doesn&apos;t exist or has been unpublished.
            </p>
            <Link
              href="/#blog"
              className="inline-block mt-8 text-accent hover:text-ember font-mono text-sm transition-colors"
            >
              ← back to blog
            </Link>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{post.title} — avl.dev</title>
        {post.seo_description && (
          <meta name="description" content={post.seo_description} />
        )}
        {post.cover_image_url && (
          <meta property="og:image" content={post.cover_image_url} />
        )}
      </Head>

      <article className="min-h-screen px-6 py-20 md:py-28">
        <div className="max-w-2xl mx-auto">
          {/* Back link */}
          <Link
            href="/#blog"
            className="inline-block mb-10 text-accent hover:text-ember font-mono text-sm transition-colors"
          >
            ← back to blog
          </Link>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.slice(0, 5).map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-mono text-accent/80 bg-accent/10 px-2 py-0.5 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="mb-4">{post.title}</h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 text-sm font-mono text-muted/70 mb-8">
            <span>{formatDate(post.published_at)}</span>
            {post.read_time_minutes && (
              <>
                <span>·</span>
                <span>{post.read_time_minutes} min read</span>
              </>
            )}
            {post.view_count > 0 && (
              <>
                <span>·</span>
                <span>{post.view_count} views</span>
              </>
            )}
          </div>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-chalk/60 text-lg leading-relaxed mb-8 border-l-2 border-accent/30 pl-4 italic">
              {post.excerpt}
            </p>
          )}

          {/* Cover image */}
          {post.cover_image_url && (
            <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-10 border border-[var(--border)]">
              <Image
                src={post.cover_image_url}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 672px"
                priority
              />
            </div>
          )}

          {/* Divider */}
          <div className="border-t border-[var(--border)] mb-10" />

          {/* Article content (HTML from Supabase) */}
          <div
            className="article-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Footer divider */}
          <div className="border-t border-[var(--border)] mt-16 pt-8">
            <div className="flex items-center justify-between text-sm font-mono text-muted/60">
              <Link
                href="/#blog"
                className="text-accent hover:text-ember transition-colors"
              >
                ← all articles
              </Link>
              <a
                href={`https://www.runtimemind.com/articles/${post.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted/50 hover:text-accent transition-colors"
              >
                view on RuntimeMind ↗
              </a>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </>
  );
}

export async function getStaticPaths() {
  const slugs = await getAllPublishedSlugs();
  const locales = ['en', 'fr'];

  const paths = slugs.flatMap((slug) =>
    locales.map((locale) => ({ params: { slug }, locale }))
  );

  return {
    paths,
    fallback: true, // ISR — generate new posts on-demand
  };
}

export async function getStaticProps({ params, locale }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return { notFound: true };
  }

  return {
    props: {
      post,
      ...(await serverSideTranslations(locale, ['common'], nextI18NextConfig)),
    },
    revalidate: 3600,
  };
}
