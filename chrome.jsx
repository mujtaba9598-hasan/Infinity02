/* ============ GLOBAL CHROME: NAV, FOOTER, CURSOR, INTRO, WHATSAPP ============ */
const { motion: M, AnimatePresence: AP } = window.FramerMotion;

/* ---------- Custom Cursor ---------- */
function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  useEffect(() => {
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;
    const onMove = (e) => {
      mx = e.clientX; my = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
      }
    };
    window.addEventListener('mousemove', onMove);

    let raf;
    const loop = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const hoverables = 'a, button, .sector-pill, .proj, .cert, [data-cursor=hover], input, select, textarea';
    const onOver = (e) => {
      if (e.target.closest(hoverables)) {
        dotRef.current?.classList.add('hover');
        ringRef.current?.classList.add('hover');
      }
    };
    const onOut = (e) => {
      if (e.target.closest(hoverables)) {
        dotRef.current?.classList.remove('hover');
        ringRef.current?.classList.remove('hover');
      }
    };
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <>
      <div ref={ringRef} className="cursor-ring" />
      <div ref={dotRef} className="cursor-dot" />
    </>
  );
}

/* ---------- Intro Animation ---------- */
function IntroOverlay({ onDone }) {
  const logoRef = useRef(null);
  const ruleRef = useRef(null);
  const capRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    const gsap = window.gsap;
    const tl = gsap.timeline({ onComplete: () => {
      setTimeout(onDone, 50);
    }});
    tl.to(logoRef.current, { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' })
      .to(ruleRef.current, { width: '280px', duration: 1.0, ease: 'power2.inOut' }, '-=0.5')
      .to(capRef.current, { opacity: 1, duration: 0.6 }, '-=0.4')
      .to({}, { duration: 0.7 })
      .to([capRef.current, ruleRef.current, logoRef.current], { opacity: 0, y: -8, duration: 0.6, ease: 'power2.in', stagger: 0.05 })
      .to(overlayRef.current, { opacity: 0, duration: 0.7, ease: 'power2.inOut' }, '-=0.3');
  }, []);

  return (
    <div ref={overlayRef} className="intro-overlay">
      <div ref={logoRef} className="intro-logo">
        <img src="assets/infinity-logo-transparent.png" alt="Infinity Turnkey Interior Decoration L.L.C" className="w-full logo-dark-invert" />
      </div>
      <div ref={ruleRef} className="intro-rule" />
      <div ref={capRef} className="intro-caption">Turnkey Interior Decoration · Since 2013</div>
    </div>
  );
}

/* ---------- Top Announcement Bar ---------- */
function TopBar({ show }) {
  if (!show) return null;
  return (
    <div className="hidden md:flex items-center justify-between px-8 py-2 bg-[var(--char)] border-b border-[var(--hairline)] text-[10px] tracking-[0.22em] uppercase text-[var(--ivory-dim)]">
      <div className="flex items-center gap-8">
        <span>Al Qusais, Dubai · United Arab Emirates</span>
        <span className="opacity-50">·</span>
        <span className="text-gold">Est. 2013</span>
      </div>
      <div className="flex items-center gap-6">
        <a href="tel:+971554447864" className="hover:text-gold transition-colors">+971 55 444 7864</a>
        <span className="opacity-30">/</span>
        <a href="mailto:sales@infinity-fitout.com" className="hover:text-gold transition-colors">sales@infinity-fitout.com</a>
      </div>
    </div>
  );
}

/* ---------- Navigation ---------- */
const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'projects', label: 'Projects' },
  { id: 'associates', label: 'Associates' },
  { id: 'news', label: 'Journal' },
  { id: 'contact', label: 'Contact' },
];

/* ---------- Fluid mobile menu icons (inline lucide replacements) ---------- */
const _CI = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };
const CIMenu  = ({ size = 24 }) => <svg width={size} height={size} {..._CI}><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="15" y2="18"/></svg>;
const CIX     = ({ size = 24 }) => <svg width={size} height={size} {..._CI}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
const CIHome  = ({ size = 22 }) => <svg width={size} height={size} {..._CI}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const CIUser  = ({ size = 22 }) => <svg width={size} height={size} {..._CI}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const CIGrid  = ({ size = 22 }) => <svg width={size} height={size} {..._CI}><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>;
const CIBrief = ({ size = 22 }) => <svg width={size} height={size} {..._CI}><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>;
const CIUsers = ({ size = 22 }) => <svg width={size} height={size} {..._CI}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const CIPaper = ({ size = 22 }) => <svg width={size} height={size} {..._CI}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="13" y2="17"/></svg>;
const CIMail  = ({ size = 22 }) => <svg width={size} height={size} {..._CI}><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="2 7 12 13 22 7"/></svg>;

const NAV_ICONS = {
  home: <CIHome />, about: <CIUser />, services: <CIGrid />,
  projects: <CIBrief />, associates: <CIUsers />, news: <CIPaper />, contact: <CIMail />,
};

/* ---------- FluidMenu: 21st.dev fluid-menu adapted for babel-standalone
     Source used lucide-react + shadcn cn() + Tailwind arbitrary-variant selectors
     (e.g. [div[data-expanded=true]_&]). Port keeps the key behaviour:
      - first circle is the toggle (Menu <-> X with rotate/scale crossfade)
      - other circles are stacked behind at rest; on expand they translate down
        by index * 56px and fade in with cubic-bezier easing
      - clipPath jitter (50% at 50% 55%) on all but the last chip gives the
        melting-drip visual when they collapse back together
      - dark luxury palette: char2 bg, gold icon, hairline border
      - active route gets a gold bg instead of gold icon
------------------------------------------------------------------------- */
function FluidMenu() {
  const { route, go } = useRoute();
  const [expanded, setExpanded] = useState(false);

  useEffect(() => { setExpanded(false); }, [route]);

  const handleItem = (id) => {
    setExpanded(false);
    setTimeout(() => go(id), 120);
  };

  return (
    <div className="relative w-16 h-16 lg:hidden" data-expanded={expanded}>
      {/* Toggle */}
      <button
        onClick={() => setExpanded(v => !v)}
        className="relative w-16 h-16 rounded-full bg-[var(--char2)] border border-[var(--hairline)] text-gold flex items-center justify-center z-50 shadow-[0_8px_24px_rgba(0,0,0,0.55)] hover:bg-[var(--gold)] hover:text-[var(--ink)] transition-colors duration-300"
        aria-label={expanded ? 'Close menu' : 'Open menu'}
        aria-expanded={expanded}
      >
        <span className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ease-in-out ${expanded ? 'opacity-0 scale-0 rotate-180' : 'opacity-100 scale-100 rotate-0'}`}>
          <CIMenu />
        </span>
        <span className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ease-in-out ${expanded ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-0 -rotate-180'}`}>
          <CIX />
        </span>
      </button>

      {/* Orbit items */}
      {NAV_LINKS.map((l, index) => {
        const isActive = route === l.id;
        return (
          <button
            key={l.id}
            onClick={() => handleItem(l.id)}
            aria-label={l.label}
            style={{
              transform: `translateY(${expanded ? (index + 1) * 56 : 0}px) scale(${expanded ? 1 : 0.92})`,
              opacity: expanded ? 1 : 0,
              zIndex: 40 - index,
              clipPath: index === NAV_LINKS.length - 1 ? 'circle(50% at 50% 50%)' : 'circle(50% at 50% 55%)',
              transition: `transform 360ms cubic-bezier(.4,0,.2,1) ${expanded ? index * 30 : (NAV_LINKS.length - index) * 22}ms, opacity 320ms ease ${expanded ? index * 30 : 0}ms`,
              pointerEvents: expanded ? 'auto' : 'none',
              backfaceVisibility: 'hidden',
            }}
            className={`absolute top-0 left-0 w-16 h-16 rounded-full flex items-center justify-center will-change-transform border border-[var(--hairline)] shadow-[0_8px_24px_rgba(0,0,0,0.55)] ${isActive ? 'bg-[var(--gold)] text-[var(--ink)]' : 'bg-[var(--char2)] text-gold active:bg-[var(--gold)] active:text-[var(--ink)]'}`}
          >
            {NAV_ICONS[l.id]}
          </button>
        );
      })}
    </div>
  );
}

function Nav() {
  const { route, go } = useRoute();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`sticky top-0 z-40 transition-all duration-500 ${scrolled ? 'bg-[rgba(10,10,10,0.85)] backdrop-blur-xl border-b border-[var(--hairline)]' : 'bg-transparent'}`}>
      <div className="flex items-center justify-between px-6 md:px-10 py-5">
        {/* Logo */}
        <a onClick={(e) => { e.preventDefault(); go('home'); }} href="#home" className="flex items-center gap-3">
          <img src="assets/infinity-logo-transparent.png" alt="Infinity Turnkey Interior Decoration L.L.C" className="h-11 md:h-14 w-auto logo-dark-invert" />
        </a>

        {/* Center nav (desktop) */}
        <div className="hidden lg:flex items-center gap-10">
          {NAV_LINKS.map((l) => (
            <a key={l.id} href={`#${l.id}`} onClick={(e) => { e.preventDefault(); go(l.id); }}
               className={`nav-link ${route === l.id ? 'active' : ''}`}>
              {l.label}
            </a>
          ))}
        </div>

        {/* CTA (desktop) */}
        <div className="hidden lg:flex items-center gap-6">
          <div className="text-right">
            <div className="font-mono-mini text-[var(--ivory-faint)]">Request a Quote</div>
            <a href="tel:+971554447864" className="text-gold font-display text-[18px] tracking-normal">+971 55 444 7864</a>
          </div>
          <Magnetic strength={0.25}>
            <HoverButton onClick={() => go('contact')}>
              <span>Start a Project</span>
              <span>→</span>
            </HoverButton>
          </Magnetic>
        </div>

        {/* Mobile: fluid menu */}
        <FluidMenu />
      </div>
    </nav>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  const { go } = useRoute();
  return (
    <footer className="relative bg-[var(--char2)] border-t border-[var(--hairline)]">
      <div className="watermark" />
      <div className="relative px-6 md:px-12 pt-24 pb-10 max-w-[1440px] mx-auto">
        {/* Big statement */}
        <div className="grid md:grid-cols-12 gap-10 pb-16 border-b border-[var(--hairline)]">
          <div className="md:col-span-7">
            <Eyebrow num="—" label="Infinity Turnkey Interiors" />
            <h3 className="font-display text-[44px] md:text-[72px] leading-[1.02] mt-6 text-ivory">
              Design you live with. <br/><em className="font-display-it text-gold">Craft you feel.</em>
            </h3>
            <p className="mt-8 max-w-md text-[var(--ivory-dim)] leading-relaxed">
              A customer-centric, result-driven atelier — quietly shaping Dubai's retail, hospitality, commercial and residential spaces since 2013.
            </p>
          </div>

          <div className="md:col-span-2">
            <div className="font-eyebrow text-gold mb-5">Explore</div>
            <ul className="space-y-3 text-[var(--ivory-dim)]">
              {['about','services','associates','projects','contact'].map((id) => (
                <li key={id}>
                  <a onClick={(e) => { e.preventDefault(); go(id); }} href={`#${id}`} className="link-underline capitalize">{id === 'about' ? 'Company' : id}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <div className="font-eyebrow text-gold mb-5">Studio</div>
            <address className="not-italic text-[var(--ivory-dim)] leading-relaxed">
              Al Qusais Industrial Area<br/>P.O. Box 234127<br/>Dubai, United Arab Emirates
            </address>
            <div className="mt-6 space-y-2">
              <a href="tel:+971554447864" className="block text-ivory link-underline">+971 55 444 7864</a>
              <a href="tel:+97143361168" className="block text-[var(--ivory-dim)] link-underline">+971 4 336 1168</a>
              <a href="mailto:sales@infinity-fitout.com" className="block text-gold link-underline">sales@infinity-fitout.com</a>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="grid md:grid-cols-2 gap-10 py-12 border-b border-[var(--hairline)] items-center">
          <div>
            <div className="font-eyebrow text-gold mb-3">Atelier Dispatch</div>
            <p className="font-display text-2xl md:text-3xl text-ivory">A quiet quarterly letter — new work, material studies, rarely more.</p>
          </div>
          <form onSubmit={(e)=>{e.preventDefault();}} className="flex gap-4 items-end">
            <input type="email" placeholder="Your email address" className="field flex-1" />
            <HoverButton type="submit">Subscribe →</HoverButton>
          </form>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pt-10">
          <div className="flex items-center gap-4">
            <img src="assets/infinity-logo-transparent.png" alt="Infinity Turnkey Interior Decoration L.L.C" className="h-12 w-auto logo-dark-invert" />
            <span className="font-mono-mini text-[var(--ivory-faint)]">© 2025 Infinity Turnkey Interiors L.L.C · All Rights Reserved</span>
          </div>
          <div className="flex items-center gap-5">
            {['Twitter','Facebook','LinkedIn','Pinterest'].map((s) => (
              <a key={s} href="#" className="font-mono-mini text-[var(--ivory-dim)] hover:text-gold transition-colors">{s}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Floating WhatsApp ---------- */
function WhatsAppPill() {
  return (
    <a href="https://wa.me/971554447864" target="_blank" rel="noopener"
       className="wa-pill fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[var(--gold)] text-[var(--ink)] flex items-center justify-center"
       aria-label="WhatsApp us">
      <svg viewBox="0 0 32 32" className="w-7 h-7" fill="currentColor">
        <path d="M16 3C8.8 3 3 8.8 3 16c0 2.6.8 5 2.1 7L3 29l6.2-2c2 1.1 4.3 1.7 6.8 1.7 7.2 0 13-5.8 13-13S23.2 3 16 3zm7.5 18.4c-.3.9-1.8 1.7-2.6 1.8-.7.1-1.6.1-2.5-.2-.6-.2-1.3-.4-2.3-.8-4-1.7-6.6-5.8-6.8-6-.2-.3-1.6-2.1-1.6-4s1-2.9 1.4-3.3c.4-.4.8-.5 1-.5h.8c.3 0 .6-.1.9.7.3.8 1.1 2.7 1.2 2.9.1.2.1.4 0 .7-.1.3-.2.4-.4.7-.2.2-.4.5-.6.7-.2.2-.4.4-.2.8.2.4 1 1.6 2.1 2.6 1.4 1.3 2.6 1.7 3 1.9.4.2.6.1.8-.1.2-.2.9-1.1 1.2-1.4.2-.4.5-.3.8-.2.3.1 2 .9 2.3 1.1.3.2.6.2.7.4 0 .1 0 1-.3 1.9z"/>
      </svg>
    </a>
  );
}

Object.assign(window, { CustomCursor, IntroOverlay, TopBar, Nav, Footer, WhatsAppPill });
