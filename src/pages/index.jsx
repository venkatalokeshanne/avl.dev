import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '../../next-i18next.config';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Experience from '@/components/sections/Experience';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Services from '@/components/sections/Services';
import Philosophy from '@/components/sections/Philosophy';
import Blog from '@/components/sections/Blog';
import Connect from '@/components/sections/Connect';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/sections/Footer';
import JourneyModal from '@/components/JourneyModal';
import SEO, { personSchema, websiteSchema, profilePageSchema } from '@/components/SEO';

export default function Home({ blogPosts }) {
  return (
    <>
      <SEO
        description="Venkata Lokesh Anne — Full stack developer & DevOps engineer with 7+ years of experience. React.js, Node.js, Docker, Kubernetes, CI/CD. Currently at Crédit Agricole CIB, Paris. Available for freelance & full-time roles worldwide."
        path=""
        jsonLd={[personSchema(), websiteSchema(), profilePageSchema()]}
      />
      <JourneyModal />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Services />
      <Blog posts={blogPosts} />
      <Philosophy />
      <Connect />
      <Contact />
      <Footer />
    </>
  );
}

export async function getStaticProps({ locale }) {
  // Fetch blog posts from Supabase
  let blogPosts = [];
  try {
    const { getPublishedPosts } = require('@/lib/supabase');
    blogPosts = await getPublishedPosts(6);
  } catch (e) {
    console.warn('Failed to fetch blog posts:', e.message);
  }

  return {
    props: {
      blogPosts,
      ...(await serverSideTranslations(locale, ['common'], nextI18NextConfig)),
    },
    revalidate: 3600,
  };
}
