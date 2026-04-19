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
          <img src="assets/infinity-logo-transparent.png" alt="Infinity Turnkey Interior Decoration L.L.C" className="h-14 md:h-20 w-auto logo-dark-invert" />
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
          <div className="flex items-center gap-5">
            <img src="assets/infinity-logo-transparent.png" alt="Infinity Turnkey Interior Decoration L.L.C" className="h-20 md:h-24 w-auto logo-dark-invert" />
            <span className="font-mono-mini text-[var(--ivory-faint)]">© 2025 Infinity Turnkey Interiors L.L.C · All Rights Reserved</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono-mini text-[var(--ivory-faint)] tracking-[0.22em] uppercase text-[10px] mr-2 hidden sm:inline">Follow us</span>
            {[
              { name: 'Instagram', href: '#', svg: <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.8" fill="currentColor"/></svg> },
              { name: 'LinkedIn',  href: '#', svg: <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8h4.56v14H.22V8zm7.9 0h4.37v1.92h.06c.61-1.15 2.1-2.36 4.33-2.36 4.63 0 5.48 3.04 5.48 7v7.44h-4.56v-6.6c0-1.58-.03-3.6-2.19-3.6-2.2 0-2.53 1.71-2.53 3.48V22H8.12V8z"/></svg> },
              { name: 'Twitter',   href: '#', svg: <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true"><path d="M18.244 2H21l-6.53 7.46L22 22h-6.9l-4.6-5.93L5 22H2l7.03-8L2 2h6.92l4.15 5.5L18.24 2zm-2.42 18h1.85L7.24 4H5.27l10.56 16z"/></svg> },
              { name: 'Facebook',  href: '#', svg: <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.89h-2.33v6.99A10 10 0 0 0 22 12z"/></svg> },
              { name: 'Pinterest', href: '#', svg: <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.23 2.63 7.85 6.34 9.3-.09-.79-.17-2 .03-2.86.19-.78 1.2-4.95 1.2-4.95s-.3-.61-.3-1.52c0-1.42.83-2.48 1.86-2.48.88 0 1.3.66 1.3 1.45 0 .88-.56 2.2-.85 3.42-.24 1.02.51 1.86 1.52 1.86 1.82 0 3.22-1.92 3.22-4.7 0-2.46-1.77-4.18-4.3-4.18-2.93 0-4.64 2.2-4.64 4.47 0 .89.34 1.84.77 2.36.08.1.1.19.07.3-.08.32-.25 1.02-.28 1.16-.04.19-.15.23-.34.14-1.26-.59-2.04-2.42-2.04-3.9 0-3.18 2.3-6.09 6.64-6.09 3.48 0 6.19 2.48 6.19 5.8 0 3.46-2.18 6.25-5.21 6.25-1.02 0-1.97-.53-2.3-1.15l-.62 2.38c-.23.87-.84 1.95-1.25 2.61A10 10 0 0 0 22 12c0-5.52-4.48-10-10-10z"/></svg> },
            ].map((s) => (
              <a
                key={s.name}
                href={s.href}
                aria-label={s.name}
                onClick={(e) => { if (s.href === '#') e.preventDefault(); }}
                className="w-9 h-9 rounded-full bg-[var(--char2)] border border-[var(--hairline)] text-[var(--ivory-dim)] flex items-center justify-center hover:bg-[var(--gold)] hover:text-[var(--ink)] hover:border-[var(--gold)] transition-colors duration-300"
              >
                {s.svg}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Brand mark at the very end of the footer */}
      <div className="relative w-full border-t border-[var(--hairline)] bg-[var(--ink)] overflow-hidden">
        <div
          aria-hidden="true"
          className="font-display text-center text-gold leading-[0.85] py-10 md:py-14 select-none"
          style={{
            fontSize: 'clamp(56px, 15vw, 240px)',
            letterSpacing: '0.04em',
            fontWeight: 400,
            color: 'var(--gold)',
            WebkitTextStroke: '0.5px var(--gold)',
            opacity: 0.95,
          }}
        >
          INFINITY
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
