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

function Nav() {
  const { route, go } = useRoute();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => { setOpen(false); }, [route]);

  return (
    <nav className={`sticky top-0 z-40 transition-all duration-500 ${scrolled ? 'bg-[rgba(10,10,10,0.85)] backdrop-blur-xl border-b border-[var(--hairline)]' : 'bg-transparent'}`}>
      <div className="flex items-center justify-between px-6 md:px-10 py-5">
        {/* Logo */}
        <a onClick={(e) => { e.preventDefault(); go('home'); }} href="#home" className="flex items-center gap-3">
          <img src="assets/infinity-logo-transparent.png" alt="Infinity Turnkey Interior Decoration L.L.C" className="h-11 md:h-14 w-auto logo-dark-invert" />
        </a>

        {/* Center nav */}
        <div className="hidden lg:flex items-center gap-10">
          {NAV_LINKS.map((l) => (
            <a key={l.id} href={`#${l.id}`} onClick={(e) => { e.preventDefault(); go(l.id); }}
               className={`nav-link ${route === l.id ? 'active' : ''}`}>
              {l.label}
            </a>
          ))}
        </div>

        {/* CTA */}
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

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="lg:hidden text-ivory" aria-label="menu">
          <div className="flex flex-col gap-[5px]">
            <span className="w-7 h-px bg-ivory" />
            <span className="w-7 h-px bg-ivory" />
            <span className="w-5 h-px bg-gold self-end" />
          </div>
        </button>
      </div>

      <AP>
        {open && (
          <M.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden lg:hidden bg-[var(--ink)] border-t border-[var(--hairline)]">
            <div className="flex flex-col p-8 gap-6">
              {NAV_LINKS.map((l) => (
                <a key={l.id} href={`#${l.id}`} onClick={(e) => { e.preventDefault(); go(l.id); }}
                   className={`font-display text-3xl ${route === l.id ? 'text-gold' : 'text-ivory'}`}>
                  {l.label}
                </a>
              ))}
              <HoverButton onClick={() => go('contact')} className="self-start mt-4">Start a Project →</HoverButton>
            </div>
          </M.div>
        )}
      </AP>
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
