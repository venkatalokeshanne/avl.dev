import '@/styles/globals.css';
import { appWithTranslation } from 'next-i18next';
import Layout from '@/components/Layout';
import nextI18NextConfig from '../../next-i18next.config';

function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default appWithTranslation(App, nextI18NextConfig);
