import { useTranslation } from 'next-i18next';

const services = [
  { key: 'frontend', icon: '◻', color: 'accent', borderColor: 'border-accent/20 hover:border-accent/40', tags: ['React', 'Next.js', 'Redux', 'Material-UI'] },
  { key: 'backend', icon: '◼', color: 'sky', borderColor: 'border-sky/20 hover:border-sky/40', tags: ['Node.js', 'Express', 'MongoDB', 'Microservices'] },
  { key: 'fullstack', icon: '◈', color: 'ember', borderColor: 'border-ember/20 hover:border-ember/40', tags: ['Docker', 'Jenkins', 'Kubernetes', 'CI/CD'] },
  { key: 'consulting', icon: '◎', color: 'leaf', borderColor: 'border-leaf/20 hover:border-leaf/40', tags: ['Jest', 'Cypress', 'Performance', 'Memoization'] },
];

export default function Services() {
  const { t } = useTranslation('common');

  return (
    <section className="py-20 md:py-28 px-6">
      <div className="max-w-3xl mx-auto">
        <p className="comment mb-4">{'// '}{t('services.comment')}</p>
        <h2>{t('services.heading')}</h2>
        <p className="text-chalk/70 mt-4 leading-relaxed text-base mb-10">
          {t('services.description')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((svc) => (
            <div
              key={svc.key}
              className={`bg-paper border ${svc.borderColor} rounded-lg p-5 transition-all duration-300 group`}
            >
              <div className="flex items-start gap-3">
                <span className={`text-${svc.color} text-lg mt-0.5`}>{svc.icon}</span>
                <div>
                  <h3 className={`text-${svc.color} text-sm font-medium`}>
                    {t(`services.${svc.key}.title`)}
                  </h3>
                  <p className="text-chalk/60 text-sm mt-2 leading-relaxed">
                    {t(`services.${svc.key}.desc`)}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {svc.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono text-muted/70 bg-[var(--surface)] px-1.5 py-0.5 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
