import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

const slides = [
  {
    id: 'intro',
    color: 'accent',
    logo: null,
    company: null,
    terminal: '$ whoami',
    title: "Hey, I'm Lokesh.",
    body: "Welcome to my corner of the internet. Let me walk you through my journey — from a small town in India to building banking software in Paris.",
    more: null,
    detail: '// grab a coffee, this will be quick ☕',
  },
  {
    id: 'india',
    color: 'sky',
    logo: '/giet.jpg',
    company: 'GIET (JNTU Kakinada)',
    terminal: '$ cat education/undergrad.log',
    title: 'Where it all started.',
    body: "B.Tech in Computer Science from GIET, India. This is where I wrote my first line of code, built my first project, and fell in love with the web.",
    more: "Four years of fundamentals — data structures, algorithms, databases, networking. Built academic projects in Java and web tech. Graduated ready to build real things.",
    detail: '2013 – 2017 · Andhra Pradesh, India',
  },
  {
    id: 'gaitview',
    color: 'muted',
    logo: '/gaitview.png',
    company: 'Gait View',
    terminal: '$ git log --first-job',
    title: 'First real job.',
    body: "Full stack developer — built a school ERP system from scratch end-to-end. JSP, JavaScript, jQuery, database integration. Learned what it means to ship real software that people actually use.",
    more: "Built the academic module for student registration and tuition fees. Implemented business logic, dynamic web pages with client-side validations, and integrated payment management systems. Two years of learning how production code works.",
    detail: 'Jan 2017 – Dec 2018 · India',
  },
  {
    id: 'paris',
    color: 'ember',
    logo: '/epita.png',
    company: 'EPITA & Quadient',
    terminal: '$ ssh venkata@paris',
    title: 'Moved to Paris.',
    body: "Packed my bags for a Master's at EPITA. New country, new language, new challenges.",
    more: "During my research year at Quadient Shipping, I worked on space optimization — algorithms to minimize parcel volume and shipping costs, optimizing positioning of parcels in pallets and trucks. A completely different kind of problem-solving.",
    detail: '2019 – 2020 · EPITA, Paris',
  },
  {
    id: 'itss',
    color: 'ember',
    logo: '/itss.jpg',
    company: 'ITSS Dev',
    terminal: '$ npm run build --offline',
    title: 'Offline-first PWA.',
    body: "Built an offline web app with React, IndexedDB, and PWA features — users can work without internet and data persists locally.",
    more: "Set up CAS-based Single Sign-On authentication. Integrated IJBox document management with client platforms. Also built and managed Drupal 8 websites for clients including IJBox, Verrecchia, and DFM Avocat. Learned to juggle multiple projects with different stacks.",
    detail: 'Sep 2020 – Jun 2021 · Paris',
  },
  {
    id: 'artysium',
    color: 'sky',
    logo: '/artysium.avif',
    company: 'Artysium',
    terminal: '$ render --engine=unreal',
    title: 'Luxury meets tech.',
    body: "Built immersive virtual tours for luxury brands. React + Redux Toolkit + Unreal Engine + 3DVista. Making 3D product experiences feel real in a browser.",
    more: "Integrated Unreal Engine into an e-commerce site for photorealistic product interactions. Created reusable, test-driven components with automated testing. Performance optimization was critical — minimizing loading times while maintaining high-quality graphics for a demanding luxury audience.",
    detail: 'Jun 2021 – Feb 2022 · Paris',
  },
  {
    id: 'cacib',
    color: 'accent',
    logo: '/cacib.png',
    company: 'Crédit Agricole CIB',
    terminal: '$ deploy frtb-dashboard --prod',
    title: 'Banking & risk.',
    body: "Currently building the FRTB interface in GAIA for the market risk team — complex data grids, dynamic forms, and microservices.",
    more: "React.js with Redux, Material-UI components, React Table for data grids with sorting, pagination and filtering. Designing complex forms with multi-level validation. Also resolving backend bugs and adding API endpoints for the frtb-data microservice. Jest, RTL, and Cypress for testing. 3-week Agile sprints with the MRR SA team.",
    detail: 'Mar 2022 – present · Paris',
  },
  {
    id: 'now',
    color: 'leaf',
    logo: null,
    company: null,
    terminal: '$ cat status.txt',
    title: "That's me today.",
    body: "7+ years, 20+ projects, ∞ cups of coffee. Full stack developer who loves clean code, good UX, and solving hard problems. Thanks for stopping by — explore around!",
    more: null,
    detail: '// open to new opportunities',
  },
];

export default function JourneyModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  const [typing, setTyping] = useState('');
  const [showContent, setShowContent] = useState(false);
  const [expanded, setExpanded] = useState(false);

  // Only show once per visitor
  useEffect(() => {
    const seen = localStorage.getItem('journey_seen');
    if (!seen) {
      const timer = setTimeout(() => setIsOpen(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  // Typing effect for terminal command
  useEffect(() => {
    if (!isOpen) return;
    setTyping('');
    setShowContent(false);
    setExpanded(false);

    const cmd = slides[current].terminal;
    let i = 0;
    const interval = setInterval(() => {
      setTyping(cmd.slice(0, i + 1));
      i++;
      if (i >= cmd.length) {
        clearInterval(interval);
        setTimeout(() => setShowContent(true), 200);
      }
    }, 35);

    return () => clearInterval(interval);
  }, [current, isOpen]);

  const close = useCallback(() => {
    setIsOpen(false);
    localStorage.setItem('journey_seen', 'true');
  }, []);

  const next = useCallback(() => {
    if (current < slides.length - 1) {
      setCurrent((c) => c + 1);
    } else {
      close();
    }
  }, [current, close]);

  const prev = useCallback(() => {
    if (current > 0) setCurrent((c) => c - 1);
  }, [current]);

  const toggleMore = useCallback(() => {
    setExpanded((e) => !e);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'Enter') {
        if (expanded || !slides[current].more) next();
        else toggleMore();
      } else if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, next, prev, close, expanded, current, toggleMore]);

  if (!isOpen) return null;

  const slide = slides[current];
  const isLast = current === slides.length - 1;
  const hasMore = !!slide.more;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={close}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-[var(--ink)] border border-[var(--border-strong)] rounded-xl shadow-2xl overflow-hidden animate-fade-in">
        {/* Terminal titlebar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)] bg-[var(--paper)]">
          <div className="flex items-center gap-2">
            <button onClick={close} className="w-3 h-3 rounded-full bg-ember/80 hover:bg-ember transition-colors" title="Close" />
            <span className="w-3 h-3 rounded-full bg-accent/80" />
            <span className="w-3 h-3 rounded-full bg-leaf/80" />
            <span className="text-muted text-xs font-mono ml-3">my-journey.sh</span>
          </div>
          <button
            onClick={close}
            className="text-muted hover:text-chalk text-xs font-mono transition-colors"
          >
            skip →
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 min-h-[340px] flex flex-col">
          {/* Terminal command with typing effect */}
          <div className="font-mono text-sm mb-6">
            <span className="text-leaf">~</span>
            <span className="text-muted"> </span>
            <span className="text-chalk/80">{typing}</span>
            {!showContent && (
              <span className="inline-block w-2 h-4 bg-accent/80 ml-0.5 animate-pulse" />
            )}
          </div>

          {/* Slide body — fades in after typing */}
          <div
            className={`flex-1 transition-all duration-300 ${
              showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
          >
            {/* Logo + Title row */}
            <div className="flex items-center gap-3 mb-1">
              {slide.logo && (
                <div className="shrink-0 w-10 h-10 rounded-lg bg-white border border-[var(--border)] overflow-hidden flex items-center justify-center p-1">
                  <Image
                    src={slide.logo}
                    alt=""
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
              )}
              <div>
                {slide.company && (
                  <p className="text-muted text-[11px] font-mono">{slide.company}</p>
                )}
                <h3 className={`text-${slide.color} text-lg font-semibold`}>
                  {slide.title}
                </h3>
              </div>
            </div>

            <p className="text-chalk/70 leading-relaxed text-sm mt-3">
              {slide.body}
            </p>

            {/* Expandable "see more" content */}
            {hasMore && (
              <div className="mt-3">
                {!expanded ? (
                  <button
                    onClick={toggleMore}
                    className="text-accent/70 hover:text-accent text-xs font-mono transition-colors"
                  >
                    ▸ see more...
                  </button>
                ) : (
                  <div className="animate-fade-in">
                    <div className="border-l-2 border-accent/20 pl-3 mt-1">
                      <p className="text-chalk/60 leading-relaxed text-sm">
                        {slide.more}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            <p className="text-muted/60 text-xs font-mono mt-4">
              {slide.detail}
            </p>
          </div>

          {/* Footer: progress + navigation */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-[var(--border)]">
            {/* Progress dots */}
            <div className="flex items-center gap-1.5">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === current
                      ? 'bg-accent w-5'
                      : i < current
                      ? 'bg-accent/40'
                      : 'bg-[var(--border-strong)]'
                  }`}
                />
              ))}
              <span className="text-muted/50 text-[10px] font-mono ml-2">
                {current + 1}/{slides.length}
              </span>
            </div>

            {/* Nav buttons */}
            <div className="flex items-center gap-2">
              {current > 0 && (
                <button
                  onClick={prev}
                  className="text-muted hover:text-chalk text-xs font-mono px-3 py-1.5 rounded border border-[var(--border)] hover:border-[var(--border-strong)] transition-all"
                >
                  ← prev
                </button>
              )}
              {hasMore && !expanded ? (
                <button
                  onClick={toggleMore}
                  className="text-xs font-mono px-4 py-1.5 rounded transition-all text-accent border border-accent/30 hover:border-accent/60 hover:bg-accent/10"
                >
                  see more ↓
                </button>
              ) : (
                <button
                  onClick={next}
                  className={`text-xs font-mono px-4 py-1.5 rounded transition-all ${
                    isLast
                      ? 'bg-accent text-ink font-medium hover:bg-accent/90'
                      : 'text-accent border border-accent/30 hover:border-accent/60 hover:bg-accent/10'
                  }`}
                >
                  {isLast ? "let's go →" : expanded ? 'continue →' : 'next →'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
