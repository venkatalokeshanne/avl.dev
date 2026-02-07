import { useTranslation } from 'next-i18next';

export default function Skills() {
  const { t } = useTranslation('common');

  return (
    <section className="py-20 md:py-28 px-6">
      <div className="max-w-3xl mx-auto">
        <p className="comment mb-4">{'// '}{t('skills.comment')}</p>
        <h2>{t('skills.heading')}</h2>
        <p className="text-chalk/70 mt-4 leading-relaxed text-base mb-8">
          {t('skills.description')}
        </p>

        {/* Terminal-style skills */}
        <div className="bg-paper border border-[var(--border)] rounded-lg p-5 md:p-6 font-mono text-sm">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[var(--border)]">
            <span className="w-2.5 h-2.5 rounded-full bg-ember/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-accent/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-leaf/80" />
            <span className="text-muted text-xs ml-2">technical skills</span>
          </div>
          <div className="space-y-2 text-chalk/70">
            <p>
              <span className="text-accent">Front-End</span>
              {'     → React.js, Redux, Next.js, JavaScript, HTML5/CSS3, Material-UI, PWA'}
            </p>
            <p>
              <span className="text-sky">Back-End</span>
              {'      → Node.js, Express.js, REST APIs, Microservices'}
            </p>
            <p>
              <span className="text-ember">Databases</span>
              {'    → MongoDB, IndexedDB'}
            </p>
            <p>
              <span className="text-leaf">Testing</span>
              {'      → Jest, React Testing Library, Cypress'}
            </p>
            <p>
              <span className="text-accent">DevOps</span>
              {'       → Git, Docker, Jenkins, Kubernetes, CI/CD, Webpack'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
