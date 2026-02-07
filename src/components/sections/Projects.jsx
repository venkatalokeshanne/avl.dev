import { useTranslation } from 'next-i18next';
import Link from 'next/link';

const projects = [
  { key: 'proj_1', color: 'accent', tags: ['React.js', 'Redux', 'Material-UI', 'Cypress'] },
  { key: 'proj_2', color: 'sky', tags: ['React', 'Redux Toolkit', 'Unreal Engine', '3DVista'] },
  { key: 'proj_3', color: 'leaf', tags: ['React', 'PWA', 'IndexedDB', 'Drupal 8'] },
  { key: 'proj_4', color: 'ember', tags: ['React', 'HTML', 'CSS', 'JavaScript'] },
];

export default function Projects() {
  const { t } = useTranslation('common');

  return (
    <section id="projects" className="py-20 md:py-28 px-6">
      <div className="max-w-3xl mx-auto">
        <p className="comment mb-4">{'// '}{t('projects.comment')}</p>
        <h2>{t('projects.heading')}</h2>
        <p className="text-chalk/70 mt-4 leading-relaxed text-base mb-10">
          {t('projects.description')}
        </p>

        <div className="space-y-4">
          {projects.map((proj) => (
            <Link
              key={proj.key}
              href={`/work/${t(`projects.${proj.key}.slug`)}`}
              className="group block bg-paper border border-[var(--border)] hover:border-[var(--border-strong)] rounded-lg p-5 md:p-6 transition-all duration-300 cursor-pointer"
            >
              {/* Window header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-ember/60" />
                  <span className="w-2 h-2 rounded-full bg-accent/60" />
                  <span className="w-2 h-2 rounded-full bg-leaf/60" />
                  <span className="text-muted text-xs font-mono ml-2">
                    {t(`projects.${proj.key}.file`)}
                  </span>
                </div>
                <span className={`text-${proj.color} text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity`}>
                  {t(`projects.${proj.key}.status`)}
                </span>
              </div>

              <h3 className={`text-${proj.color} font-semibold`}>
                {t(`projects.${proj.key}.name`)}
              </h3>
              <p className="text-chalk/60 text-sm mt-2 leading-relaxed">
                {t(`projects.${proj.key}.desc`)}
              </p>

              {/* Tags + link */}
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
                  → view details
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 font-mono text-sm">
          <Link
            href="/work"
            className="text-accent hover:text-ember transition-colors"
          >
            → {t('projects.see_all')}
          </Link>
        </div>
      </div>
    </section>
  );
}
