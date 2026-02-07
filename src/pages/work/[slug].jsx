import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '../../../next-i18next.config';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '@/components/sections/Footer';

const projectsData = [
  {
    key: 'proj_1',
    color: 'accent',
    logo: '/cacib.png',
    tags: ['React.js', 'Redux', 'Material-UI', 'React Table', 'React Forms', 'Jest', 'RTL', 'Cypress', 'Microservices'],
  },
  {
    key: 'proj_2',
    color: 'sky',
    logo: '/artysium.avif',
    tags: ['React', 'Redux Toolkit', 'Unreal Engine', '3DVista', 'Agile'],
  },
  {
    key: 'proj_3',
    color: 'leaf',
    logo: '/itss.jpg',
    tags: ['React', 'PWA', 'IndexedDB', 'CAS SSO', 'Drupal 8', 'PHP'],
  },
  {
    key: 'proj_4',
    color: 'ember',
    logo: null,
    tags: ['React', 'HTML', 'CSS', 'JavaScript', 'Responsive Design'],
  },
];

export default function ProjectDetail() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { slug } = router.query;

  const project = projectsData.find(
    (p) => t(`projects.${p.key}.slug`) === slug
  );

  if (!project) {
    return (
      <>
        <section className="min-h-screen flex items-center px-6">
          <div className="max-w-3xl mx-auto w-full text-center">
            <h1 className="text-accent">{t('project_detail.not_found')}</h1>
            <p className="text-chalk/60 mt-4">{t('project_detail.not_found_desc')}</p>
            <Link href="/" className="text-accent font-mono text-sm mt-8 inline-block hover:text-ember transition-colors">
              {t('project_detail.go_back')}
            </Link>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  const highlights = t(`projects.${project.key}.highlights`, { returnObjects: true });

  return (
    <>
      <section className="min-h-screen px-6">
        <div className="max-w-3xl mx-auto w-full pt-28 pb-16">
          {/* Back link */}
          <Link
            href="/#projects"
            className="text-muted hover:text-accent font-mono text-sm transition-colors inline-block mb-10"
          >
            {t('project_detail.back')}
          </Link>

          {/* Project header — terminal style */}
          <div className="bg-paper border border-[var(--border)] rounded-lg p-5 md:p-6 font-mono text-sm">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[var(--border)]">
              <span className="w-2.5 h-2.5 rounded-full bg-ember/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-accent/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-leaf/80" />
              <span className="text-muted text-xs ml-2">{t(`projects.${project.key}.file`)}</span>
            </div>

            <div className="space-y-1.5 text-chalk/70">
              <p>
                <span className={`text-${project.color}`}>{'"status"'}</span>:{' '}
                {t(`projects.${project.key}.status`)}
              </p>
              <p>
                <span className={`text-${project.color}`}>{'"role"'}</span>:{' '}
                {`"${t(`projects.${project.key}.role`)}"`}
              </p>
              <p>
                <span className={`text-${project.color}`}>{'"company"'}</span>:{' '}
                {`"${t(`projects.${project.key}.company`)}"`}
              </p>
              <p>
                <span className={`text-${project.color}`}>{'"period"'}</span>:{' '}
                {`"${t(`projects.${project.key}.period`)}"`}
              </p>
            </div>
          </div>

          {/* Project title */}
          <div className="mt-10 flex items-center gap-4">
            {project.logo && (
              <div className="shrink-0 w-12 h-12 rounded-lg bg-white border border-[var(--border)] overflow-hidden flex items-center justify-center p-1">
                <Image src={project.logo} alt="" width={40} height={40} className="object-contain" />
              </div>
            )}
            <h1>
              <span className={`text-${project.color}`}>{t(`projects.${project.key}.name`)}</span>
            </h1>
          </div>

          {/* Long description */}
          <div className="mt-6 space-y-4">
            {t(`projects.${project.key}.long_desc`)
              .split('\n\n')
              .map((paragraph, i) => (
                <p key={i} className="text-chalk/70 leading-relaxed text-base">
                  {paragraph}
                </p>
              ))}
          </div>

          {/* Tech stack */}
          <div className="mt-10">
            <p className="comment mb-4">{'// '}{t('project_detail.tech_label')}</p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className={`text-xs font-mono text-chalk/70 bg-paper border border-${project.color}/20 px-3 py-1 rounded`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Key contributions */}
          <div className="mt-10">
            <p className="comment mb-4">{'// '}{t('project_detail.highlights_label')}</p>
            <div className="bg-paper border border-[var(--border)] rounded-lg p-5 md:p-6">
              <ul className="space-y-3">
                {Array.isArray(highlights) &&
                  highlights.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <span className={`text-${project.color} mt-0.5 text-xs`}>▸</span>
                      <span className="text-chalk/70 leading-relaxed">{item}</span>
                    </li>
                  ))}
              </ul>
            </div>
          </div>

          {/* Back to projects */}
          <div className="mt-12 flex gap-6 font-mono text-sm">
            <Link
              href="/#projects"
              className="text-accent hover:text-ember transition-colors"
            >
              {t('project_detail.back')}
            </Link>
            <Link
              href="/#contact"
              className="text-muted hover:text-chalk transition-colors"
            >
              → {t('hero.cta_hello')}
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { slug: 'frtb-dashboard' }, locale: 'en' },
      { params: { slug: 'virtual-tour' }, locale: 'en' },
      { params: { slug: 'solis-pwa' }, locale: 'en' },
      { params: { slug: 'devotree-portfolio' }, locale: 'en' },
      { params: { slug: 'frtb-dashboard' }, locale: 'fr' },
      { params: { slug: 'virtual-tour' }, locale: 'fr' },
      { params: { slug: 'solis-pwa' }, locale: 'fr' },
      { params: { slug: 'devotree-portfolio' }, locale: 'fr' },
    ],
    fallback: false,
  };
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], nextI18NextConfig)),
    },
  };
}
