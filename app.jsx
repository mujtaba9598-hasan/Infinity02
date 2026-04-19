/* ============ APP ROOT: ROUTER, TWEAKS, PAGE TRANSITIONS ============ */
const { motion: MA, AnimatePresence: APA } = window.FramerMotion;

/* Tweaks defaults */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#C9A961",
  "ink": "#0A0A0A",
  "cream": "#F5F1E8",
  "green": "#324D3C",
  "showTopBar": true,
  "heroOverlayOpacity": 0.35,
  "radius": 20
}/*EDITMODE-END*/;

function TweaksPanel({ open, values, onChange }) {
  return (
    <div className={`tweaks ${open ? 'on' : ''}`}>
      <div className="font-mono-mini text-gold mb-2">Tweaks</div>
      <label>Gold accent</label>
      <input type="color" value={values.accent} onChange={e => onChange({ accent: e.target.value })} />
      <label>Ink</label>
      <input type="color" value={values.ink} onChange={e => onChange({ ink: e.target.value })} />
      <label>Cream / Ivory</label>
      <input type="color" value={values.cream} onChange={e => onChange({ cream: e.target.value })} />
      <label>Top bar</label>
      <select value={values.showTopBar ? 'on' : 'off'} onChange={e => onChange({ showTopBar: e.target.value === 'on' })}>
        <option value="on">Show</option><option value="off">Hide</option>
      </select>
      <label>Hero overlay · {values.heroOverlayOpacity.toFixed(2)}</label>
      <input type="range" min="0" max="0.8" step="0.05" value={values.heroOverlayOpacity} onChange={e => onChange({ heroOverlayOpacity: parseFloat(e.target.value) })} />
    </div>
  );
}

function applyTweaks(values) {
  const r = document.documentElement;
  r.style.setProperty('--gold', values.accent);
  r.style.setProperty('--ink', values.ink);
  r.style.setProperty('--ivory', values.cream);
  r.style.setProperty('--radius', `${values.radius}px`);
  document.body.style.background = values.ink;
}

function App() {
  const [route, setRoute] = useState(() => (location.hash.replace('#', '') || 'home'));
  const [introDone, setIntroDone] = useState(() => sessionStorage.getItem('infinity_intro') === '1');
  const [tweaks, setTweaks] = useState(TWEAK_DEFAULTS);
  const [tweaksOpen, setTweaksOpen] = useState(false);

  /* Mouse-tracked glow border for every GlowCard in the tree */
  useGlowPointer();

  /* Hash routing */
  useEffect(() => {
    const onHash = () => setRoute(location.hash.replace('#', '') || 'home');
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const go = (id) => {
    location.hash = id;
    setRoute(id);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  /* Apply tweaks */
  useEffect(() => { applyTweaks(tweaks); }, [tweaks]);
  const onTweak = (edits) => {
    setTweaks(prev => {
      const next = { ...prev, ...edits };
      window.parent?.postMessage({ type: '__edit_mode_set_keys', edits }, '*');
      return next;
    });
  };

  /* Edit mode activation */
  useEffect(() => {
    const handler = (e) => {
      if (e.data?.type === '__activate_edit_mode') setTweaksOpen(true);
      if (e.data?.type === '__deactivate_edit_mode') setTweaksOpen(false);
    };
    window.addEventListener('message', handler);
    window.parent?.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', handler);
  }, []);

  /* Lenis smooth scroll */
  useEffect(() => {
    if (!window.Lenis) return;
    const lenis = new window.Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    window.__lenis = lenis;
    const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    if (window.ScrollTrigger) {
      lenis.on('scroll', window.ScrollTrigger.update);
      window.gsap?.ticker.add((time) => { lenis.raf(time * 1000); });
      window.gsap?.ticker.lagSmoothing(0);
    }
    return () => lenis.destroy();
  }, []);

  /* Intro dismissal */
  const dismissIntro = () => {
    sessionStorage.setItem('infinity_intro', '1');
    setIntroDone(true);
    /* Refresh ScrollTrigger after overlay vanishes */
    setTimeout(() => window.ScrollTrigger?.refresh(), 100);
  };

  /* ScrollTrigger refresh on route change */
  useEffect(() => {
    setTimeout(() => {
      window.ScrollTrigger?.refresh();
      window.scrollTo({ top: 0, behavior: 'auto' });
      window.__lenis?.scrollTo(0, { immediate: true });
    }, 80);
  }, [route]);

  /* Announce to speaker-notes style label */
  useEffect(() => {
    window.parent?.postMessage({ slideIndexChanged: ['home','about','services','projects','associates','news','contact'].indexOf(route) }, '*');
  }, [route]);

  const PAGES = {
    home: <HomePage overlayOpacity={tweaks.heroOverlayOpacity} />,
    about: <AboutPage />,
    services: <ServicesPage />,
    projects: <ProjectsPage />,
    associates: <AssociatesPage />,
    news: <NewsPage />,
    contact: <ContactPage />,
  };

  return (
    <RouteCtx.Provider value={{ route, go }}>
      {!introDone && <IntroOverlay onDone={dismissIntro} />}
      <div className="grain" />
      <CustomCursor />
      <TopBar show={tweaks.showTopBar} />
      <Nav />

      <APA mode="wait">
        <MA.main
          key={route}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.6, ease: [0.77, 0, 0.18, 1] }}
          data-screen-label={route}
        >
          {PAGES[route] || PAGES.home}
        </MA.main>
      </APA>

      <Footer />
      <WhatsAppPill />
      <TweaksPanel open={tweaksOpen} values={tweaks} onChange={onTweak} />
    </RouteCtx.Provider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
