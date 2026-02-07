import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Link from 'next/link';

function formatDate(dateString) {
  if (!dateString) return '';
  const d = new Date(dateString);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function Blog({ posts = [] }) {
  const { t } = useTranslation('common');

  if (!posts || posts.length === 0) return null;

  return (
    <section className="py-20 md:py-28 px-6" id="blog">
      <div className="max-w-3xl mx-auto">
        <p className="comment mb-4">{'// '}{t('blog.comment')}</p>
        <h2>{t('blog.heading')}</h2>
        <p className="text-chalk/70 mt-4 leading-relaxed text-base mb-10">
          {t('blog.description')}
        </p>

        <div className="space-y-4">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block bg-paper border border-[var(--border)] hover:border-[var(--border-strong)] rounded-lg overflow-hidden transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row">
                {/* Cover image */}
                {post.cover_image_url && (
                  <div className="sm:w-44 sm:shrink-0 h-32 sm:h-auto relative overflow-hidden">
                    <Image
                      src={post.cover_image_url}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, 176px"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col">
                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono text-accent/70 bg-accent/10 px-1.5 py-0.5 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <h3 className="text-chalk font-semibold text-sm group-hover:text-accent transition-colors leading-snug">
                    {post.title}
                  </h3>

                  {post.excerpt && (
                    <p className="text-chalk/50 text-xs mt-1.5 leading-relaxed line-clamp-2">
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
                      → read more
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Link to all articles on RuntimeMind */}
        <div className="mt-8 font-mono text-sm">
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
  );
}
