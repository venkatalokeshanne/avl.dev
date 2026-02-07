import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '../../../next-i18next.config';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '@/components/sections/Footer';
import { getPublishedPosts } from '@/lib/supabase';
import SEO, { breadcrumbSchema } from '@/components/SEO';

function formatDate(dateString) {
  if (!dateString) return '';
  const d = new Date(dateString);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function BlogIndex({ posts }) {
  const { t } = useTranslation('common');

  return (
    <>
      <SEO
        title="Blog"
        description="Articles by Venkata Anne about React.js, Node.js, Docker, DevOps, Java, and full stack web development. Tips, tutorials, and lessons from real projects."
        path="/blog"
        jsonLd={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Blog', path: '/blog' },
          ]),
        ]}
      />

      <section className="min-h-screen px-6 py-20 md:py-28">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <Link
            href="/"
            className="inline-block mb-10 text-accent hover:text-ember font-mono text-sm transition-colors"
          >
            ← back home
          </Link>

          <p className="comment mb-4">{'// '}{t('blog.comment')}</p>
          <h1 className="mb-4">{t('blog.heading')}</h1>
          <p className="text-chalk/70 leading-relaxed text-base mb-12">
            {t('blog.description')}
          </p>

          {/* Posts list */}
          {(!posts || posts.length === 0) ? (
            <p className="text-muted font-mono text-sm">No articles published yet.</p>
          ) : (
            <div className="space-y-5">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block bg-paper border border-[var(--border)] hover:border-[var(--border-strong)] rounded-lg overflow-hidden transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row">
                    {/* Cover image */}
                    {post.cover_image_url && (
                      <div className="sm:w-48 sm:shrink-0 h-36 sm:h-auto relative overflow-hidden">
                        <Image
                          src={post.cover_image_url}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 640px) 100vw, 192px"
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-5 flex-1 flex flex-col">
                      {/* Tags */}
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          {post.tags.slice(0, 4).map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] font-mono text-accent/70 bg-accent/10 px-1.5 py-0.5 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <h3 className="text-chalk font-semibold text-base group-hover:text-accent transition-colors leading-snug">
                        {post.title}
                      </h3>

                      {post.excerpt && (
                        <p className="text-chalk/50 text-sm mt-2 leading-relaxed line-clamp-2">
                          {post.excerpt}
                        </p>
                      )}

                      {/* Meta */}
                      <div className="flex items-center gap-3 mt-auto pt-3 text-[11px] font-mono text-muted/60">
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
                        <span className="ml-auto text-muted/40 group-hover:text-accent/60 transition-colors">
                          → read
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* RuntimeMind link */}
          <div className="mt-12 pt-8 border-t border-[var(--border)] font-mono text-sm">
            <a
              href="https://www.runtimemind.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-ember transition-colors"
            >
              → {t('blog.see_all')}
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export async function getStaticProps({ locale }) {
  let posts = [];
  try {
    posts = await getPublishedPosts(50);
  } catch (e) {
    console.warn('Failed to fetch blog posts:', e.message);
  }

  return {
    props: {
      posts,
      ...(await serverSideTranslations(locale, ['common'], nextI18NextConfig)),
    },
    revalidate: 3600,
  };
}
