import { useTranslation } from 'next-i18next';
import Image from 'next/image';

const timeline = [
  {
    key: 'exp_5',
    color: 'accent',
    dotColor: 'bg-accent',
    logo: '/cacib.png',
  },
  {
    key: 'exp_4',
    color: 'sky',
    dotColor: 'bg-sky',
    logo: '/artysium.avif',
  },
  {
    key: 'exp_3',
    color: 'ember',
    dotColor: 'bg-ember',
    logo: '/itss.jpg',
  },
  {
    key: 'exp_2',
    color: 'leaf',
    dotColor: 'bg-leaf',
    logo: null,
  },
  {
    key: 'exp_1',
    color: 'muted',
    dotColor: 'bg-muted',
    logo: '/gaitview.png',
  },
];

export default function Experience() {
  const { t } = useTranslation('common');

  return (
    <section className="py-20 md:py-28 px-6">
      <div className="max-w-3xl mx-auto">
        <p className="comment mb-4">{'// '}{t('experience.comment')}</p>
        <h2>{t('experience.heading')}</h2>
        <p className="text-chalk/70 mt-4 leading-relaxed text-base mb-10">
          {t('experience.description')}
        </p>

        {/* Terminal-style git log */}
        <div className="bg-paper border border-[var(--border)] rounded-lg p-5 md:p-6 font-mono text-sm">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[var(--border)]">
            <span className="w-2.5 h-2.5 rounded-full bg-ember/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-accent/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-leaf/80" />
            <span className="text-muted text-xs ml-2">career timeline</span>
          </div>

          <div className="space-y-6">
            {timeline.map((item, i) => (
              <div key={item.key} className="flex gap-4">
                {/* Timeline line */}
                <div className="flex flex-col items-center">
                  <div className={`w-2.5 h-2.5 rounded-full ${item.dotColor} shrink-0 mt-1`} />
                  {i < timeline.length - 1 && (
                    <div className="w-px flex-1 bg-[var(--border-strong)] mt-1" />
                  )}
                </div>

                {/* Content */}
                <div className="pb-2 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className={`text-${item.color} font-medium text-sm`}>
                        {t(`experience.${item.key}.role`)}
                      </p>
                      <p className="text-muted/80 text-xs mt-0.5">
                        {t(`experience.${item.key}.company`)}
                        <span className="text-muted/60"> · </span>
                        {t(`experience.${item.key}.period`)}
                      </p>
                    </div>
                    {item.logo && (
                      <div className="shrink-0 w-9 h-9 rounded-md bg-white border border-[var(--border)] overflow-hidden flex items-center justify-center p-1">
                        <Image
                          src={item.logo}
                          alt=""
                          width={28}
                          height={28}
                          className="object-contain"
                        />
                      </div>
                    )}
                  </div>
                  <p className="text-chalk/60 text-xs mt-2 leading-relaxed">
                    {t(`experience.${item.key}.desc`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
