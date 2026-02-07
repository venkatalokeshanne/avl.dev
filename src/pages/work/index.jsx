import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '../../../next-i18next.config';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import Footer from '@/components/sections/Footer';

const projects = [
  { key: 'proj_1', color: 'accent', tags: ['React.js', 'Redux', 'Material-UI', 'Cypress'] },
  { key: 'proj_2', color: 'sky', tags: ['React', 'Redux Toolkit', 'Unreal Engine', '3DVista'] },
  { key: 'proj_3', color: 'leaf', tags: ['React', 'PWA', 'IndexedDB', 'Drupal 8'] },
  { key: 'proj_4', color: 'ember', tags: ['React', 'HTML', 'CSS', 'JavaScript'] },
];

export default function Work() {
  const { t } = useTranslation('common');

  return (
    <>
      <section className="px-6">
        <div className="max-w-3xl mx-auto w-full pt-28 pb-16">
          <p className="comment mb-4">{'// '}{t('work.comment')}</p>
          <h1>{t('work.heading')}</h1>
          <p className="text-chalk/70 mt-6 leading-relaxed text-base mb-10">
            {t('work.description')}
          </p>

          <div className="space-y-4">
            {projects.map((proj) => (
              <Link
                key={proj.key}
                href={`/work/${t(`projects.${proj.key}.slug`)}`}
                className="group block bg-paper border border-[var(--border)] hover:border-[var(--border-strong)] rounded-lg p-5 md:p-6 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-ember/60" />
                    <span className="w-2 h-2 rounded-full bg-accent/60" />
                    <span className="w-2 h-2 rounded-full bg-leaf/60" />
                    <span className="text-muted text-xs font-mono ml-2">
                      {t(`projects.${proj.key}.file`)}
                    </span>
                  </div>
                  <span className={`text-${proj.color} text-xs font-mono`}>
                    {t(`projects.${proj.key}.status`)}
                  </span>
                </div>

                <h3 className={`text-${proj.color} font-semibold`}>
                  {t(`projects.${proj.key}.name`)}
                </h3>
                <p className="text-chalk/60 text-sm mt-2 leading-relaxed">
                  {t(`projects.${proj.key}.desc`)}
                </p>

                <div className="flex items-center justify-between mt-4 pt-3 border-t border-[var(--border)]">
                  <div className="flex flex-wrap gap-2">
                    {proj.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-mono text-muted/80 bg-[var(--surface)] border border-[var(--border)] px-2 py-0.5 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-muted/60 group-hover:text-accent text-xs font-mono transition-colors">
                    → details
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], nextI18NextConfig)),
    },
  };
}
