import { useTranslation } from 'next-i18next';

export default function Contact() {
  const { t } = useTranslation('common');

  return (
    <section className="py-20 md:py-28 px-6" id="contact">
      <div className="max-w-2xl mx-auto">
        <p className="comment mb-4">{'// '}{t('contact.comment')}</p>
        <h2>{t('contact.heading')}</h2>
        <p className="text-chalk/70 mt-4 leading-relaxed text-base">
          {t('contact.description')}
        </p>

        <form
          className="mt-8 space-y-3"
          action="https://formsubmit.co/annevlokesh@gmail.com"
          method="POST"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              type="text"
              name="name"
              placeholder={t('contact.placeholder_name')}
              required
              className="w-full px-4 py-3 bg-paper border border-[var(--border)] rounded-lg text-chalk placeholder-muted text-sm font-mono focus:outline-none focus:border-accent/40 transition-colors"
            />
            <input
              type="email"
              name="email"
              placeholder={t('contact.placeholder_email')}
              required
              className="w-full px-4 py-3 bg-paper border border-[var(--border)] rounded-lg text-chalk placeholder-muted text-sm font-mono focus:outline-none focus:border-accent/40 transition-colors"
            />
          </div>
          <textarea
            name="message"
            placeholder={t('contact.placeholder_message')}
            required
            rows={5}
            className="w-full px-4 py-3 bg-paper border border-[var(--border)] rounded-lg text-chalk placeholder-muted text-sm font-mono focus:outline-none focus:border-accent/40 transition-colors resize-none"
          />
          <button
            type="submit"
            className="font-mono text-sm text-ink bg-accent hover:bg-accent/90 px-6 py-2.5 rounded-lg transition-colors font-medium"
          >
            {t('contact.send')} →
          </button>
        </form>
      </div>
    </section>
  );
}
