import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '../../next-i18next.config';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Footer from '@/components/sections/Footer';
import SEO, { personSchema, breadcrumbSchema } from '@/components/SEO';

export default function AboutPage() {
  const { t } = useTranslation('common');

  return (
    <>
      <SEO
        title="About"
        description="Venkata Anne — Full stack developer & DevOps engineer based in Paris. MSc from EPITA, B.Tech from GIET (India). 7+ years building React, Node.js, Docker & Kubernetes applications. Fluent in English, French, Hindi, Telugu."
        path="/about"
        ogType="profile"
        jsonLd={[
          personSchema(),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'About', path: '/about' },
          ]),
        ]}
      />
      <section className="min-h-screen flex items-center px-6">
        <div className="max-w-3xl mx-auto w-full pt-24">
          <p className="comment mb-4">{'// '}{t('about_page.comment')}</p>
          <h1>{t('about_page.heading')}</h1>
          <p className="text-chalk/70 mt-6 leading-relaxed text-base">
            {t('about_page.description')}
          </p>

          {/* Quick facts — terminal style */}
          <div className="mt-10 bg-paper border border-[var(--border)] rounded-lg p-5 font-mono text-sm">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[var(--border)]">
              <span className="w-2.5 h-2.5 rounded-full bg-ember/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-accent/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-leaf/80" />
              <span className="text-muted text-xs ml-2">about.json</span>
            </div>
            <div className="space-y-1 text-chalk/70">
              <p><span className="text-accent">{'"role"'}</span>: {'"Full Stack Developer"'},</p>
              <p><span className="text-sky">{'"location"'}</span>: {'"Paris, France"'},</p>
              <p><span className="text-leaf">{'"experience"'}</span>: {'"7+ years"'},</p>
              <p><span className="text-accent">{'"education"'}</span>: {'"MSc Computer Science — EPITA, Paris"'},</p>
              <p><span className="text-ember">{'"coffee"'}</span>: <span className="text-accent">true</span></p>
            </div>
          </div>

          {/* Education */}
          <div className="mt-8 bg-paper border border-[var(--border)] rounded-lg p-5 font-mono text-sm">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[var(--border)]">
              <span className="w-2.5 h-2.5 rounded-full bg-ember/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-accent/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-leaf/80" />
              <span className="text-muted text-xs ml-2">{t('about_page.education_title')}</span>
            </div>
            <div className="space-y-4 text-muted">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-accent">{t('about_page.edu_1_degree')}</p>
                  <p className="text-chalk/80 text-xs mt-0.5">{t('about_page.edu_1_school')}</p>
                  <p className="text-muted/70 text-xs mt-0.5">{t('about_page.edu_1_period')}</p>
                </div>
                <div className="shrink-0 w-10 h-10 rounded-md bg-white border border-[var(--border)] overflow-hidden flex items-center justify-center p-1">
                  <Image src="/epita.png" alt="EPITA" width={32} height={32} className="object-contain" />
                </div>
              </div>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sky">{t('about_page.edu_2_degree')}</p>
                  <p className="text-chalk/80 text-xs mt-0.5">{t('about_page.edu_2_school')}</p>
                  <p className="text-muted/70 text-xs mt-0.5">{t('about_page.edu_2_period')}</p>
                </div>
                <div className="shrink-0 w-10 h-10 rounded-md bg-white border border-[var(--border)] overflow-hidden flex items-center justify-center p-1">
                  <Image src="/giet.jpg" alt="GIET" width={32} height={32} className="object-contain" />
                </div>
              </div>
            </div>
          </div>

          {/* Languages */}
          <div className="mt-8 mb-16">
            <p className="comment mb-4">{'// '}{t('about_page.languages_title')}</p>
            <div className="flex flex-wrap gap-3 font-mono text-sm">
              <span className="bg-paper border border-[var(--border)] px-3 py-1.5 rounded text-chalk/80">
                <span className="text-accent">en</span> English
              </span>
              <span className="bg-paper border border-[var(--border)] px-3 py-1.5 rounded text-chalk/80">
                <span className="text-sky">fr</span> Français
              </span>
              <span className="bg-paper border border-[var(--border)] px-3 py-1.5 rounded text-chalk/80">
                <span className="text-leaf">te</span> తెలుగు
              </span>
              <span className="bg-paper border border-[var(--border)] px-3 py-1.5 rounded text-chalk/80">
                <span className="text-ember">hi</span> हिन्दी
              </span>
              <span className="bg-paper border border-[var(--border)] px-3 py-1.5 rounded text-muted/70">
                <span className="text-muted">es</span> Español
              </span>
            </div>
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
