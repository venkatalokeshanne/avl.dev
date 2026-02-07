import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        {/* ── Favicon ──────────────────────────────── */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* ── Google Search Console verification ───── */}
        <meta name="google-site-verification" content="24a919a3cb45d843" />

        {/* ── Preconnect for speed ─────────────────── */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* ── Global meta ──────────────────────────── */}
        <meta name="theme-color" content="#101014" />
        <meta name="msapplication-TileColor" content="#101014" />
        <meta name="application-name" content="avl.dev" />
        <meta name="apple-mobile-web-app-title" content="avl.dev — Venkata Lokesh Anne" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />

        {/* ── Bing, Yandex, Pinterest ──────────────── */}
        {/* Add verification codes here once registered */}
        {/* <meta name="msvalidate.01" content="BING_CODE" /> */}
        {/* <meta name="yandex-verification" content="YANDEX_CODE" /> */}
      </Head>
      <body>
        {/* Prevent flash of wrong theme on load */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var t = localStorage.getItem('theme');
                  if (t === 'light' || (!t && window.matchMedia('(prefers-color-scheme: light)').matches)) {
                    document.documentElement.setAttribute('data-theme', 'light');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
