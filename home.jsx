/* ============ HOME PAGE ============ */
const { motion: MH } = window.FramerMotion;

const SECTORS = [
  { id: 'retail', label: 'Retail', img: 'Flagship boutique · The Dubai Mall' },
  { id: 'hospitality', label: 'Hospitality', img: 'Lobby & suite · Palm Jumeirah hotel' },
  { id: 'commercial', label: 'Commercial', img: 'HQ workspace · DIFC tower' },
  { id: 'residential', label: 'Residential', img: 'Private villa · Emirates Hills' },
  { id: 'theme', label: 'Theme Parks', img: 'Themed attraction · Dubai Parks' },
  { id: 'special', label: 'Special Projects', img: 'Bespoke pavilion · Expo district' },
];

const SERVICES = [
  { n: '01', t: 'Interior Architecture', sub: '& Project Management', body: 'Architects, interior designers and project managers — a single, senior team accountable for every drawing, every submittal, every site day.', meta: 'Full design authorship · Authority approvals · Site supervision' },
  { n: '02', t: 'MEP Fit-Out Works', sub: 'New build & renovation', body: 'Engineers, factory supervisors and certified technicians who translate ambition into working services — quietly, and to programme.', meta: 'Electrical · Mechanical · Plumbing · HVAC · Low-current' },
  { n: '03', t: 'Sustainable Consultation', sub: 'Conscious materials & design', body: 'Every built environment leaves a signature. We work to make yours lighter — in energy, in specification, in everyday use.', meta: 'LEED guidance · Material sourcing · Lifecycle review' },
  { n: '04', t: 'Aluminium & Glass', sub: 'Custom metal works', body: 'A deep, vetted manufacturing network for facades, partitions, bespoke metalwork — from the boutique detail to the large-format curtain wall.', meta: 'Framing · Cladding · Balustrades · Feature metalwork' },
  { n: '05', t: 'Wooden Joinery', sub: 'Bespoke furniture', body: 'Handcraft-led joinery with the repeatability of a factory floor. Fixed furniture, loose pieces, cabinetry — detailed and delivered as one.', meta: 'Cabinetry · Millwork · Loose furniture · Hardware' },
  { n: '06', t: 'Turnkey Fit-Out', sub: 'Retail · Hospitality · Office · Residential · Thematic', body: 'One contract. One team. One delivery. From strip-out through handover — concept, construction and everything between.', meta: 'Shell & core · Refurbishment · Handover' },
];

const CATEGORIES = [
  { id: 'retail', title: 'Retail', count: '42 projects', label: 'Monochrome jeweller · Mall of the Emirates' },
  { id: 'hospitality', title: 'Hospitality', count: '28 projects', label: 'All-day dining · JBR beachfront' },
  { id: 'commercial', title: 'Commercial', count: '51 projects', label: 'Executive floor · Sheikh Zayed Rd.' },
  { id: 'residential', title: 'Residential', count: '36 projects', label: 'Duplex apartment · Downtown Dubai' },
  { id: 'theme', title: 'Theme Parks', count: '14 projects', label: 'Character cafe · Global Village' },
  { id: 'special', title: 'Special Projects', count: '9 projects', label: 'Exhibition pavilion · World Trade Centre' },
];

const MATERIAL_BRANDS = [
  'RAK Ceramics', 'Jotun', 'Dulux', 'Saint-Gobain', 'Danube',
  'Arabian Aluminium', 'Emirates Glass', 'Jebel Ali Marble',
  'Al Ghurair Aluminium', 'ASTER', 'Dorma', 'Grohe', 'Kohler', 'Hafele'
];

const TESTIMONIALS = [
  { name: 'Milanda Moses', role: 'Principal Contractor, Dubai', quote: 'Infinity treated our shell-and-core programme like their own building. Drawings arrived before we needed them. Variations were rare, and resolved without theatre. I would hand them another project tomorrow.' },
  { name: 'Joshua Smith', role: 'Chief Executive, Hospitality Group', quote: 'We asked for editorial calm in a 340-cover restaurant. What they delivered is the quietest, most expensive-feeling room we operate. The numbers have followed.' },
  { name: 'Emily Blunts', role: 'Founder, Retail Concept', quote: 'Eighteen boutiques across the GCC. Not one site visit where a finish was anything but exact. That is not ordinary. That is a discipline.' },
];

const BLOGS = [
  { date: '12 March 2025', author: 'Studio', tag: 'Studio Note', title: 'Infinity, in its own words.', excerpt: 'A short introduction to the atelier — what we believe, what we refuse, and how we think about interior fit-out in Dubai in 2025.' },
  { date: '26 February 2025', author: 'Design Desk', tag: 'Material', title: 'Seven quiet moves toward a more sustainable home.', excerpt: 'Not a manifesto. Seven considered choices — on palette, joinery, lighting, glazing — that make a residential project measurably lighter.' },
  { date: '08 February 2025', author: 'Projects', tag: 'Process', title: 'How to furnish a house, slowly.', excerpt: 'A working method for furnishing a Dubai residence without the showroom shortcut — for owners who want the house to feel inevitable.' },
];

/* ---------- Hero: scroll-driven expansion reel (custom, babel-standalone) ----------
   Pattern: while locked, wheel/touch gestures don't scroll the page — they advance
   a progress value 0→1 that drives the centre media box's width/height and fades
   the background + flies the two title halves apart. At 1 the page unlocks; at
   top-of-page + upward gesture it re-locks. Written fresh for this codebase:
     - framer-motion via window.FramerMotion (MH alias)
     - wheel and touch listeners scoped to window, passive:false so preventDefault
       actually suspends native scroll
     - numeric constants picked to feel appropriate on desktop/mobile; easing on
       the derived sizes via power-of-two curve so it opens slowly then accelerates
     - top meta strip, bottom progress bar and after-hero divider are my own
       additions, not in the reference pattern
------------------------------------------------------------------------------- */
const HERO_BG_SRC    = 'https://images.unsplash.com/photo-1486304873000-235643847519?w=1920&q=85';
const HERO_VIDEO_SRC = 'assets/hero-video.mp4';

function ExpandingHero() {
  const [progress, setProgress]   = useState(0);
  const [locked, setLocked]       = useState(true);
  const [compact, setCompact]     = useState(false);
  const touchY                    = useRef(null);

  useEffect(() => {
    const onResize = () => setCompact(window.innerWidth < 768);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const nudge = (amount) => {
      setProgress(prev => {
        const next = Math.min(1, Math.max(0, prev + amount));
        if (next >= 1) setLocked(false);
        return next;
      });
    };

    const onWheel = (e) => {
      if (!locked) {
        if (e.deltaY < -12 && window.scrollY < 4) {
          e.preventDefault();
          setLocked(true);
          setProgress(0.9);
        }
        return;
      }
      e.preventDefault();
      nudge(e.deltaY * 0.00095);
    };

    const onTouchStart = (e) => { touchY.current = e.touches[0].clientY; };
    const onTouchMove  = (e) => {
      const y  = e.touches[0].clientY;
      const dy = (touchY.current ?? y) - y;
      touchY.current = y;
      if (!locked) {
        if (dy < -24 && window.scrollY < 4) {
          e.preventDefault();
          setLocked(true);
          setProgress(0.9);
        }
        return;
      }
      e.preventDefault();
      nudge(dy * (dy < 0 ? 0.0088 : 0.0058));
    };
    const onTouchEnd = () => { touchY.current = null; };
    const pinTop     = () => { if (locked) window.scrollTo(0, 0); };

    window.addEventListener('wheel',      onWheel,      { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: false });
    window.addEventListener('touchmove',  onTouchMove,  { passive: false });
    window.addEventListener('touchend',   onTouchEnd);
    window.addEventListener('scroll',     pinTop);
    return () => {
      window.removeEventListener('wheel',      onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove',  onTouchMove);
      window.removeEventListener('touchend',   onTouchEnd);
      window.removeEventListener('scroll',     pinTop);
    };
  }, [locked]);

  // Ease the derived size so it opens slowly then accelerates
  const eased  = progress * progress * (3 - 2 * progress);   // smoothstep
  const baseW  = compact ? 280 : 360;
  const baseH  = compact ? 380 : 460;
  const growW  = compact ? 620 : 1160;
  const growH  = compact ? 240 : 380;
  const mediaW = baseW + eased * growW;
  const mediaH = baseH + eased * growH;
  const flyVW  = progress * (compact ? 160 : 135);
  const bgOpacity = Math.max(0, 1 - progress * 0.8);

  return (
    <section className="relative bg-[var(--ink)] overflow-hidden">
      <div className="relative w-full min-h-[100dvh] flex items-center justify-center">

        {/* Top meta strip */}
        <div className="absolute top-0 inset-x-0 z-40 flex items-center justify-between px-6 md:px-12 pt-6 pointer-events-none">
          <div className="flex items-center gap-3 font-mono-mini text-[var(--ivory-faint)] tracking-[0.22em] uppercase text-[10px]">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--gold)] animate-pulse" />
            Infinity · Al Qusais Atelier
          </div>
          <div className="font-mono-mini text-[var(--ivory-faint)] tracking-[0.22em] uppercase text-[10px]">Reel 01 / 06</div>
        </div>

        {/* Background image fades out as the reel opens */}
        <MH.div
          className="absolute inset-0 z-0"
          animate={{ opacity: bgOpacity }}
          transition={{ duration: 0.2, ease: 'linear' }}
        >
          <img
            src={HERO_BG_SRC}
            alt=""
            aria-hidden="true"
            loading="eager"
            className="w-full h-full object-cover"
            style={{ filter: 'grayscale(0.4) contrast(1.1) brightness(0.45)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(10,10,10,0.55)] to-[rgba(10,10,10,0.92)]" />
        </MH.div>

        {/* Expanding media box */}
        <div
          className="absolute z-10 top-1/2 left-1/2 rounded-2xl overflow-hidden"
          style={{
            width: `${mediaW}px`,
            height: `${mediaH}px`,
            maxWidth: '94vw',
            maxHeight: '82vh',
            transform: 'translate(-50%, -50%)',
            boxShadow: '0 36px 140px rgba(0,0,0,0.75), inset 0 0 0 1px rgba(201,169,97,0.22)',
            willChange: 'width, height',
          }}
        >
          <video
            src={HERO_VIDEO_SRC}
            autoPlay muted loop playsInline preload="auto"
            className="w-full h-full object-cover pointer-events-none"
          />
          <MH.div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(180deg, rgba(10,10,10,0.25) 0%, rgba(10,10,10,0.65) 100%)' }}
            animate={{ opacity: 0.9 - progress * 0.5 }}
            transition={{ duration: 0.2 }}
          />
          <div className="absolute inset-3 border border-[var(--gold)]/25 rounded-xl pointer-events-none" />

          {/* Bottom captions on the media */}
          <div className="absolute left-0 right-0 bottom-5 flex flex-col items-center gap-1 z-10 pointer-events-none">
            <p className="font-display-it text-lg md:text-xl text-[var(--gold)]" style={{ transform: `translateX(-${flyVW}vw)` }}>
              Dubai, since 2013
            </p>
            <p className="font-mono-mini text-[var(--ivory-faint)] tracking-[0.28em] uppercase text-[10px]" style={{ transform: `translateX(${flyVW}vw)` }}>
              {locked ? 'Scroll to open' : 'Release to continue'}
            </p>
          </div>
        </div>

        {/* Title splits apart as it expands */}
        <div className="relative z-20 pointer-events-none flex flex-col items-center text-center gap-1 px-4 mix-blend-difference">
          <MH.h1
            className="font-display leading-[0.92] text-ivory"
            style={{ fontSize: 'clamp(48px, 11vw, 144px)', transform: `translateX(-${flyVW}vw)` }}
          >
            Infinity
          </MH.h1>
          <MH.h1
            className="font-display-it leading-[0.92] text-gold"
            style={{ fontSize: 'clamp(48px, 11vw, 144px)', transform: `translateX(${flyVW}vw)` }}
          >
            Turnkey.
          </MH.h1>
        </div>

        {/* Progress rail at the bottom */}
        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex flex-col items-center gap-2">
          <div className="w-28 h-px bg-[var(--hairline)] overflow-hidden">
            <div className="h-full bg-[var(--gold)]" style={{ width: `${progress * 100}%`, transition: 'width 0.08s linear' }} />
          </div>
          <div className="font-mono-mini text-[var(--ivory-faint)] tracking-[0.28em] uppercase text-[10px]">
            {locked ? `${Math.round(progress * 100)}% · Open reel` : 'Full reel · Continue ↓'}
          </div>
        </div>
      </div>

      {/* Divider that reveals once the reel is fully open */}
      <MH.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: locked ? 0 : 1, y: locked ? 24 : 0 }}
        transition={{ duration: 0.7, delay: 0.05 }}
        className="relative w-full py-14 flex flex-col items-center text-center border-t border-[var(--hairline)] bg-[var(--ink)]"
      >
        <span className="font-mono-mini text-gold tracking-[0.28em] uppercase text-[11px]">Part 01 · The Studio</span>
        <h2 className="mt-5 font-display text-ivory text-3xl md:text-5xl">A year of quiet work, on your scroll.</h2>
      </MH.div>
    </section>
  );
}

/* ---------- Legacy Hero (Architectural Editorial 3D) — retained but not mounted ---------- */
const HERO_ARCH_DEEP = 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=1600&q=80';
const HERO_ARCH_MAIN = 'https://images.unsplash.com/photo-1486304873000-235643847519?w=1600&q=85';

function HomeHero() {
  const heroRef = useRef(null);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const onMove = (e) => {
      if (!heroRef.current) return;
      const r = heroRef.current.getBoundingClientRect();
      if (e.clientY < r.top || e.clientY > r.bottom) return;
      setMouse({
        x: Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)),
        y: Math.min(1, Math.max(0, (e.clientY - r.top) / r.height)),
      });
    };
    window.addEventListener('mousemove', onMove);
    const clock = setInterval(() => setTime(new Date()), 60000);
    return () => { window.removeEventListener('mousemove', onMove); clearInterval(clock); };
  }, []);

  const tiltY = (mouse.x - 0.5) * 7;
  const tiltX = (0.5 - mouse.y) * 5;
  const dubaiTime = time.toLocaleTimeString('en-GB', { timeZone: 'Asia/Dubai', hour: '2-digit', minute: '2-digit', hour12: false });

  return (
    <section ref={heroRef} className="hero-arch relative h-screen overflow-hidden bg-[var(--ink)]">
      {/* Gold spotlight following the cursor */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background: `radial-gradient(720px circle at ${mouse.x * 100}% ${mouse.y * 100}%, rgba(201,169,97,0.14), transparent 55%)`,
          transition: 'background 0.3s ease',
        }}
      />

      {/* Grain */}
      <div className="hero-grain z-[2]" />

      {/* Bokeh accents */}
      <span className="hero-bokeh b1" />
      <span className="hero-bokeh b2" />
      <span className="hero-bokeh b3" />

      {/* Top meta strip */}
      <div className="absolute top-0 inset-x-0 z-20 hidden md:flex items-center justify-between px-10 pt-6 text-[var(--ivory-faint)] font-mono-mini">
        <div className="flex items-center gap-4">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--gold)] animate-pulse" />
          <span>Live Studio · Dubai {dubaiTime} GST</span>
        </div>
        <div>Issue 01 · Chapter 01 / 06</div>
      </div>

      {/* 12-column editorial grid */}
      <div className="relative z-10 h-full max-w-[1600px] mx-auto grid grid-cols-12 gap-4 md:gap-6 px-5 md:px-10 pt-20 pb-8">

        {/* LEFT FLANK · slogan */}
        <MH.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
          className="col-span-12 md:col-span-4 flex flex-col justify-end md:justify-center z-10"
        >
          <Eyebrow num="01" label="Infinity · Dubai · Since 2013" />
          <h1 className="mt-6 font-display leading-[0.94] text-ivory" style={{ fontSize: 'clamp(40px, 5.6vw, 88px)' }}>
            <span className="block"><SplitLines text={['Architecture,']} /></span>
            <span className="block"><SplitLines text={['delivered.']} delay={0.12}>
              <em className="font-display-it text-gradient-gold">delivered.</em>
            </SplitLines></span>
            <span className="hero-arch-flare" />
          </h1>
          <p className="mt-6 text-[var(--ivory-dim)] text-sm md:text-base leading-relaxed max-w-sm">
            A single, senior atelier for every high-end interior, fit-out and thematic project across the United Arab Emirates.
          </p>
          <div className="mt-6 flex gap-3">
            <Magnetic strength={0.2}><HoverButton>View Recent Work →</HoverButton></Magnetic>
            <Magnetic strength={0.2}><HoverButton variant="ghost">The Studio</HoverButton></Magnetic>
          </div>
        </MH.div>

        {/* CENTER · architectural 3D parallax stack */}
        <div
          className="hidden md:flex col-span-6 items-center justify-center relative z-[5]"
          style={{ perspective: '1600px' }}
        >
          <MH.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1], delay: 0.15 }}
            className="relative w-full max-h-full"
            style={{
              aspectRatio: '3 / 4',
              maxHeight: 'calc(100vh - 180px)',
              transformStyle: 'preserve-3d',
              transform: `rotateY(${tiltY}deg) rotateX(${tiltX}deg)`,
              transition: 'transform 0.35s cubic-bezier(.2,.8,.2,1)',
            }}
          >
            {/* Deepest: blurred atelier */}
            <div
              className="absolute inset-[-8%] overflow-hidden"
              style={{ transform: 'translateZ(-100px) scale(0.92)' }}
            >
              <img
                src={HERO_ARCH_DEEP}
                alt=""
                aria-hidden="true"
                className="w-full h-full object-cover"
                style={{ filter: 'grayscale(1) blur(18px) brightness(0.5)' }}
              />
            </div>

            {/* Main architectural plate */}
            <div
              className="absolute inset-0 overflow-hidden border border-[rgba(201,169,97,0.18)] shadow-[0_60px_140px_rgba(0,0,0,0.65)]"
              style={{ transform: 'translateZ(0)' }}
            >
              <img
                src={HERO_ARCH_MAIN}
                alt="Architectural detail"
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  filter: 'grayscale(0.35) contrast(1.15) brightness(0.78) sepia(0.08)',
                  transform: `translate(${(mouse.x - 0.5) * -18}px, ${(mouse.y - 0.5) * -14}px) scale(1.06)`,
                  transition: 'transform 0.5s cubic-bezier(.2,.8,.2,1)',
                }}
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(10,10,10,0.15) 0%, rgba(10,10,10,0.55) 100%)' }} />
            </div>

            {/* Gold hairline frame (floats forward) */}
            <div
              className="absolute inset-5 border border-[var(--gold)] pointer-events-none hero-arch-frame"
              style={{ transform: 'translateZ(60px)', opacity: 0.85 }}
            />

            {/* Caption pill */}
            <div
              className="absolute -bottom-3 left-6 bg-[var(--ink)] border border-[var(--gold)] px-4 py-2"
              style={{ transform: 'translateZ(90px)' }}
            >
              <div className="font-mono-mini text-gold">Sheet 04</div>
              <div className="font-display text-ivory text-base mt-0.5">Al Qusais atelier</div>
            </div>

            {/* Dimension ticks */}
            <div
              className="absolute -top-4 right-10 font-mono-mini text-[var(--ivory-faint)]"
              style={{ transform: 'translateZ(40px)' }}
            >
              1 : 25 · plan
            </div>
          </MH.div>
        </div>

        {/* RIGHT RAIL · mono meta column */}
        <MH.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1], delay: 0.3 }}
          className="hidden md:flex col-span-2 flex-col justify-between items-end text-right z-10 py-2"
        >
          <div className="font-mono-mini text-[var(--ivory-faint)] space-y-4 leading-relaxed">
            <div><span className="text-gold">⁜</span> EST · 2013</div>
            <div>DXB · 25.26°N</div>
            <div>55.30°E · ATL</div>
          </div>

          <div className="w-px h-20 bg-gradient-to-b from-transparent via-[var(--gold)] to-transparent my-6 self-end mr-3" />

          <div className="font-mono-mini text-gold space-y-4 leading-relaxed">
            <div>REEL 01 / 06</div>
            <div>THE PRACTICE</div>
            <div className="flex items-center justify-end gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] animate-pulse" />LIVE</div>
          </div>

          <div className="mt-auto flex flex-col items-end gap-2 text-[var(--ivory-faint)] pb-2">
            <span className="font-mono-mini">SCROLL</span>
            <span className="hero-scroll-cue" />
          </div>
        </MH.div>
      </div>

      {/* Mobile centerpiece image */}
      <div className="md:hidden absolute inset-x-6 bottom-6 h-[44vh] z-[3] pointer-events-none">
        <div className="absolute inset-0 overflow-hidden border border-[rgba(201,169,97,0.2)] shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
          <img src={HERO_ARCH_MAIN} alt="Architectural detail" className="w-full h-full object-cover" style={{ filter: 'grayscale(0.35) contrast(1.1) brightness(0.78)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(10,10,10,0.1) 0%, rgba(10,10,10,0.6) 100%)' }} />
        </div>
        <div className="absolute -bottom-3 left-4 bg-[var(--ink)] border border-[var(--gold)] px-3 py-1.5">
          <div className="font-mono-mini text-gold">Sheet 04 · Al Qusais</div>
        </div>
      </div>
    </section>
  );
}

/* ---------- About Snippet ---------- */
function AboutSnippet() {
  const { go } = useRoute();
  return (
    <section className="relative py-32 px-6 md:px-12">
      <div className="watermark" />
      <div className="max-w-[1440px] mx-auto grid md:grid-cols-12 gap-10 relative">
        <div className="md:col-span-5">
          <Reveal><Eyebrow num="02" label="Get To Know Us" /></Reveal>
          <ImageRise className="mt-8" delay={0.1}>
            <Photo src={IMG.studioPortrait} className="aspect-[4/5]" overlay={0.2}>
              <div className="absolute bottom-4 left-4 font-mono-mini text-gold">Studio · Al Qusais atelier</div>
            </Photo>
          </ImageRise>
        </div>
        <div className="md:col-span-7 md:pl-10 flex flex-col justify-center">
          <h2 className="font-display text-[44px] md:text-[80px] leading-[1.02] text-ivory">
            <SplitLines text={['A quiet discipline,', 'loudly delivered.']} />
          </h2>
          <div className="mt-10 space-y-6 max-w-xl text-[var(--ivory-dim)] leading-relaxed text-lg">
            <Reveal delay={0.2}><p>Since 2013, Infinity Turnkey Interiors has operated as one of Dubai's most considered fit-out houses, customer-centric by principle, result-driven by habit, and singularly obsessed with the detail nobody thinks to mention.</p></Reveal>
            <Reveal delay={0.3}><p>Architects, interior designers, project managers and site operatives under one roof, collaborating with nominated suppliers and specialist trades to deliver turnkey interiors across retail, hospitality, commercial, residential and thematic sectors.</p></Reveal>
          </div>
          <Reveal delay={0.45} className="mt-10 flex gap-6">
            <Magnetic><HoverButton onClick={() => go('about')}>The Full Story →</HoverButton></Magnetic>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- Services Horizontal Scroll (vertical drives horizontal, pinned) ---------- */
function ServicesHScroll() {
  const wrapRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const { gsap, ScrollTrigger } = window;
    if (!gsap || !ScrollTrigger || !wrapRef.current || !trackRef.current) return;
    if (window.innerWidth < 768) return;
    const track = trackRef.current;
    const total = track.scrollWidth - window.innerWidth + 80;

    const anim = gsap.to(track, {
      x: -total,
      ease: 'none',
      scrollTrigger: {
        trigger: wrapRef.current,
        pin: true,
        scrub: 1,
        start: 'top top',
        end: () => `+=${total}`,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      }
    });
    return () => { anim.scrollTrigger?.kill(); anim.kill(); };
  }, []);

  return (
    <section ref={wrapRef} className="relative bg-[var(--char)] overflow-hidden services-pin-section flex flex-col">
      <div className="relative px-6 md:px-12 pt-16 md:pt-20 pb-4 flex justify-between items-end shrink-0">
        <div>
          <Eyebrow num="03" label="The Practice" />
          <h2 className="font-display text-[36px] md:text-[64px] leading-[1.04] mt-4 max-w-3xl text-ivory">
            Six disciplines.<br/><em className="font-display-it text-gold">One delivery.</em>
          </h2>
        </div>
        <div className="hidden md:block font-mono-mini text-[var(--ivory-faint)]">Scroll ↓ to reveal →</div>
      </div>

      <div className="overflow-hidden pb-10 pt-6 no-scrollbar flex-1 flex items-center">
        <div ref={trackRef} className="flex gap-6 pl-6 md:pl-12" style={{ width: 'max-content' }}>
          {SERVICES.map((s, i) => {
            const svcImg = [IMG.svc1, IMG.svc2, IMG.svc3, IMG.svc4, IMG.svc5, IMG.svc6][i];
            return (
            <GlowCard as="article" key={s.n} className="svc-card">
              <div className="absolute inset-0 z-0" style={{ background: 'var(--char2)' }}>
                <img
                  src={svcImg}
                  alt=""
                  aria-hidden="true"
                  loading="eager"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.92) 100%)' }} />
              </div>
              <div className="relative z-10 h-full flex flex-col justify-between p-8 md:p-10">
                <div>
                  <div className="font-mono-mini text-gold">{s.n} / 06</div>
                  <h3 className="mt-6 font-display text-[32px] md:text-[40px] leading-tight text-ivory">{s.t}<br/><em className="font-display-it text-[var(--gold)] text-[22px] md:text-[28px]">{s.sub}</em></h3>
                </div>
                <div>
                  <p className="text-[var(--ivory-dim)] leading-relaxed max-w-sm">{s.body}</p>
                  <div className="mt-6 pt-6 border-t border-[var(--hairline)] font-mono-mini text-[var(--ivory-faint)]">{s.meta}</div>
                </div>
              </div>
            </GlowCard>
            );
          })}
          <div className="w-24 flex-shrink-0" />
        </div>
      </div>
    </section>
  );
}

/* ---------- Categories (pinned horizontal scroll driven by vertical) ---------- */
function CategoriesScroll() {
  const { go } = useRoute();
  const wrapRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const { gsap, ScrollTrigger } = window;
    if (!gsap || !ScrollTrigger || !wrapRef.current || !trackRef.current) return;
    if (window.innerWidth < 768) return;
    const track = trackRef.current;
    const total = track.scrollWidth - window.innerWidth + 80;

    const anim = gsap.to(track, {
      x: -total,
      ease: 'none',
      scrollTrigger: {
        trigger: wrapRef.current,
        pin: true,
        scrub: 1,
        start: 'top top',
        end: () => `+=${total}`,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      }
    });
    return () => { anim.scrollTrigger?.kill(); anim.kill(); };
  }, []);

  return (
    <section ref={wrapRef} className="relative overflow-hidden categories-pin-section flex flex-col">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 w-full shrink-0 pt-16 md:pt-20">
        <div className="flex items-end justify-between mb-6">
          <div>
            <Eyebrow num="04" label="Project Categories" />
            <h2 className="font-display text-[36px] md:text-[64px] leading-[1.04] mt-4 text-ivory">Where we have built.</h2>
          </div>
          <a onClick={(e)=>{e.preventDefault(); go('projects');}} href="#projects" className="font-eyebrow text-gold link-underline hidden md:block">All Projects →</a>
        </div>
      </div>

      <div className="overflow-hidden pb-8 no-scrollbar flex-1 flex items-center">
        <div ref={trackRef} className="flex gap-5 pl-6 md:pl-12" style={{ width: 'max-content' }}>
          {CATEGORIES.map((c, i) => {
            const catImg = IMG[c.id] || IMG.retail;
            return (
            <GlowCard as="article" key={c.id} className="w-[280px] sm:w-[360px] md:w-[420px] flex-shrink-0 proj">
              <Photo src={catImg} className="cat-photo" overlay={0.15}>
                <div className="ph-label">{c.label}</div>
              </Photo>
              <div className="pt-5 flex items-end justify-between">
                <div>
                  <div className="font-mono-mini text-[var(--ivory-faint)]">Category 0{i+1}</div>
                  <div className="font-display text-2xl text-ivory mt-1">{c.title}</div>
                </div>
                <div className="font-mono-mini text-gold">{c.count}</div>
              </div>
            </GlowCard>
            );
          })}
          <div className="w-24 flex-shrink-0" />
        </div>
      </div>
    </section>
  );
}

/* ---------- Stats ---------- */
function StatsBlock() {
  const stats = [
    { n: 13, s: '', l: 'Years Quietly Building — Since 2013' },
    { n: 200, s: '+', l: 'Clients on the Ledger' },
    { n: 340, s: '+', l: 'Projects Delivered' },
    { n: 48, s: '', l: 'Specialists Under One Roof' },
  ];
  return (
    <section className="relative py-28 px-6 md:px-12 bg-[var(--char2)] border-y border-[var(--hairline)]">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid md:grid-cols-4 gap-10">
          {stats.map((st, i) => (
            <div key={i} className="relative">
              <div className="font-mono-mini text-[var(--ivory-faint)] mb-4">0{i+1} / 04</div>
              <div className="font-display text-[72px] md:text-[96px] leading-none text-gold">
                <Counter to={st.n} suffix={st.s} />
              </div>
              <div className="mt-5 text-ivory text-sm md:text-base tracking-wide max-w-[220px]">{st.l}</div>
              <DrawLine className="mt-6 w-24" delay={i * 0.1} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Expertise ---------- */
function ExpertiseBlock() {
  return (
    <section className="relative py-32 px-6 md:px-12">
      <div className="watermark" />
      <div className="max-w-[1440px] mx-auto grid md:grid-cols-12 gap-14 relative">
        <div className="md:col-span-5">
          <ImageRise>
            <Photo src={IMG.expertise} className="aspect-[4/5]" overlay={0.2}>
              <div className="absolute bottom-4 left-4 font-mono-mini text-gold">Drawing room · AutoCAD desk</div>
            </Photo>
          </ImageRise>
        </div>
        <div className="md:col-span-7 md:pl-8 flex flex-col justify-center">
          <Reveal><Eyebrow num="05" label="Our Expertise" /></Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-[44px] md:text-[72px] leading-[1.04] mt-6 text-ivory">
              Measured<br/><em className="font-display-it text-gold">in decades</em>, not deadlines.
            </h2>
          </Reveal>
          <Reveal delay={0.25} className="mt-12 space-y-2">
            <ExpertiseBar label="Interior Design" pct={95} />
            <ExpertiseBar label="Architecture" pct={85} />
            <ExpertiseBar label="Lighting Work" pct={78} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- Testimonials ---------- */
function Testimonials() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % TESTIMONIALS.length), 4500);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative py-32 px-6 md:px-12 bg-[var(--char)]">
      <div className="max-w-[1200px] mx-auto">
        <Reveal className="mb-16 text-center">
          <Eyebrow num="07" label="Client Testimony" />
          <h2 className="font-display text-[44px] md:text-[72px] leading-[1.02] mt-6 text-ivory">What they are saying.</h2>
        </Reveal>

        <div className="relative min-h-[320px]">
          <AP mode="wait">
            <MH.blockquote
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.25, 0.8, 0.25, 1] }}
              className="text-center"
            >
              <div className="text-gold text-6xl font-display-it mb-6">"</div>
              <p className="font-display text-2xl md:text-4xl leading-[1.3] text-ivory max-w-4xl mx-auto">{TESTIMONIALS[idx].quote}</p>
              <footer className="mt-10">
                <div className="font-display text-xl text-gold">{TESTIMONIALS[idx].name}</div>
                <div className="font-mono-mini text-[var(--ivory-faint)] mt-2">{TESTIMONIALS[idx].role}</div>
              </footer>
            </MH.blockquote>
          </AP>
        </div>

        <div className="mt-12 flex justify-center gap-3">
          {TESTIMONIALS.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)}
              className={`h-px transition-all duration-500 ${i === idx ? 'w-16 bg-[var(--gold)]' : 'w-8 bg-[var(--ivory-faint)]'}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Brands Orbit (21st.dev spinning-logos adapted) ----------
   Source was a fixed 7-lucide-icon ring with "YOUR LOGO" in the centre,
   Tailwind 4 + spin-slow/spin-reverse keyframes. Rewritten for our stack:
    - lucide icons replaced with 2-3 character material-partner monograms
      (we don't have licensed brand SVGs, so circles carry brand short-codes)
    - centre shows the real Infinity wordmark, filter-inverted for the dark bg
    - outer ring rotates 60s linear, each counter-rotates at the same speed
      so text stays upright while travelling around the orbit
    - pauses on hover, respects prefers-reduced-motion
-------------------------------------------------------------------- */
function BrandsOrbit() {
  // Real brand logos pulled from each partner's official domain via Google's
  // S2 favicon service (128px). Works without an API key and follows each
  // brand's canonical favicon, which is usually their mark.
  const faviconUrl = (domain) => `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
  const BRANDS = [
    { name: 'RAK Ceramics',       mono: 'RAK', logo: faviconUrl('rakceramics.com')   },
    { name: 'Jotun',              mono: 'JT',  logo: faviconUrl('jotun.com')         },
    { name: 'Dulux',              mono: 'DX',  logo: faviconUrl('dulux.co.uk')       },
    { name: 'Saint-Gobain',       mono: 'S-G', logo: faviconUrl('saint-gobain.com')  },
    { name: 'Danube Home',        mono: 'DN',  logo: faviconUrl('danubehome.com')    },
    { name: 'Arabian Aluminium',  mono: 'AA',  logo: faviconUrl('arabianext.com')    },
    { name: 'Grohe',              mono: 'GR',  logo: faviconUrl('grohe.com')         },
    { name: 'Kohler',              mono: 'KO', logo: faviconUrl('kohler.com')        },
    { name: 'Hafele',             mono: 'HF',  logo: faviconUrl('hafele.com')        },
    { name: 'Dormakaba',          mono: 'DM',  logo: faviconUrl('dormakaba.com')     },
  ];
  const radius    = 150;
  const iconSize  = 56;
  const ringPad   = 32;
  const diameter  = radius * 2 + iconSize + ringPad;

  return (
    <section className="relative py-24 md:py-32 px-6 md:px-12 bg-[var(--ink)] border-y border-[var(--hairline)] overflow-hidden">
      <div className="max-w-[1440px] mx-auto grid md:grid-cols-12 gap-12 md:gap-16 items-center">
        <div className="md:col-span-5">
          <Reveal>
            <Eyebrow num="09" label="Material Partners" />
            <h2 className="font-display text-[44px] md:text-[64px] leading-[1.04] mt-6 text-ivory">
              A supply bench,<br/><em className="font-display-it text-gold">not a supply chain.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-8 text-[var(--ivory-dim)] leading-relaxed max-w-lg">
              RAK Ceramics, Jotun, Dulux, Saint-Gobain, Grohe, Kohler, Hafele. Every finish, every hinge, every handle on an Infinity project comes from a partner we have maintained and tested over thirteen years.
            </p>
          </Reveal>
          <Reveal delay={0.28}>
            <p className="mt-6 text-[var(--ivory-dim)] leading-relaxed max-w-lg">
              Specified once in the drawing room. Verified at the factory floor. Delivered to site under our signature, not theirs.
            </p>
          </Reveal>
          <Reveal delay={0.42} className="mt-10 flex items-center gap-6">
            <div className="font-display text-[48px] md:text-[64px] text-gold leading-none">14<span className="text-[var(--ivory-dim)] text-2xl align-top">+</span></div>
            <div className="font-mono-mini text-[var(--ivory-faint)] uppercase tracking-[0.2em] text-xs leading-snug">
              Material partners<br/>One Infinity signature
            </div>
          </Reveal>
        </div>

        <div className="md:col-span-7 flex justify-center items-center order-first md:order-none">
          <div
            className="relative rounded-full bg-[var(--char)]/60 border border-[var(--hairline)] brands-orbit-ring"
            style={{
              width: `min(${diameter}px, 86vw)`,
              height: `min(${diameter}px, 86vw)`,
              boxShadow: 'inset 0 0 80px rgba(201,169,97,0.08)',
            }}
          >
            <div className="absolute inset-0 brands-orbit-spin">
              {BRANDS.map((b, i) => {
                const angle = (360 / BRANDS.length) * i;
                const rad = (Math.PI / 180) * angle;
                return (
                  <div
                    key={b.name}
                    title={b.name}
                    style={{
                      top: `calc(50% - ${iconSize / 2}px + ${radius * Math.sin(rad)}px)`,
                      left: `calc(50% - ${iconSize / 2}px + ${radius * Math.cos(rad)}px)`,
                      width: iconSize, height: iconSize,
                    }}
                    className="absolute flex items-center justify-center rounded-full bg-[var(--ivory)] border border-[var(--gold)]/50 brands-orbit-counter overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.55)]"
                  >
                    <img
                      src={b.logo}
                      alt={b.name}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement.innerHTML = `<span style="color:var(--gold);font-family:'JetBrains Mono',ui-monospace,monospace;font-size:11px;font-weight:600;letter-spacing:0.12em">${b.mono}</span>`;
                      }}
                      className="w-[62%] h-[62%] object-contain"
                    />
                  </div>
                );
              })}
            </div>

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                className="rounded-full flex items-center justify-center border border-[var(--hairline)]"
                style={{
                  width: '46%', height: '46%',
                  background: 'radial-gradient(circle at 35% 25%, #1A1815 0%, #0A0A0A 70%)',
                  boxShadow: 'inset 0 0 36px rgba(201,169,97,0.12), 0 12px 40px rgba(0,0,0,0.6)',
                }}
              >
                <img
                  src="assets/infinity-logo-transparent.png"
                  alt="Infinity"
                  className="w-[72%] h-auto logo-dark-invert"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Clients Grid ---------- */
function ClientsGrid() {
  const clients = ['Emaar','Majid Al Futtaim','Meraas','DAMAC','Nakheel','Jumeirah','Atlantis','Rotana','IKEA','Carrefour','Apparel Group','Landmark','Al Futtaim','Chalhoub','Sharaf DG','GEMS','Dubai Holding','ADNOC'];
  return (
    <section className="relative py-32 px-6 md:px-12">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid md:grid-cols-12 gap-10 mb-20">
          <Reveal className="md:col-span-5">
            <Eyebrow num="08" label="Partners & Clients" />
            <h2 className="font-display text-[44px] md:text-[72px] leading-[1.02] mt-6 text-ivory">
              Two hundred clients,<br/><em className="font-display-it text-gold">one standard.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.15} className="md:col-span-7 md:pl-8 flex items-end">
            <p className="text-[var(--ivory-dim)] text-lg max-w-lg">A private ledger built over thirteen years, boutique owners, operators, developers and family offices across the United Arab Emirates.</p>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 border-t border-l border-[var(--hairline)]">
          <Stagger step={0.03} y={12} blur={2} duration={0.6}>
            {clients.map((c, i) => (
              <div key={i} className="aspect-[3/2] border-b border-r border-[var(--hairline)] flex items-center justify-center relative group overflow-hidden">
                <div className="absolute inset-0 bg-[var(--gold)] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <span className="relative font-display text-lg md:text-xl text-[var(--ivory-dim)] group-hover:text-[var(--ink)] transition-colors duration-500">{c}</span>
              </div>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}

/* ---------- Blog Preview ---------- */
function BlogPreview() {
  const { go } = useRoute();
  return (
    <section className="relative py-32 px-6 md:px-12 bg-[var(--char)]">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex items-end justify-between mb-16">
          <Reveal>
            <Eyebrow num="09" label="From the Journal" />
            <h2 className="font-display text-[44px] md:text-[72px] leading-[1.02] mt-6 text-ivory">Latest dispatches.</h2>
          </Reveal>
          <Reveal delay={0.15}>
            <a onClick={(e)=>{e.preventDefault(); go('news');}} href="#news" className="font-eyebrow text-gold link-underline hidden md:block">Read All →</a>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <Stagger step={0.1}>
            {BLOGS.map((b, i) => {
              const blogImg = [IMG.blog1, IMG.blog2, IMG.blog3][i] || IMG.blog1;
              return (
              <GlowCard as="article" key={i} className="proj group">
                <Photo src={blogImg} className="aspect-[4/5]" overlay={0.15}>
                  <div className="absolute top-4 left-4 font-mono-mini text-gold bg-[rgba(10,10,10,0.6)] px-3 py-1 backdrop-blur-sm">{b.tag}</div>
                </Photo>
                <div className="pt-6 px-3 pb-3">
                  <div className="flex items-center gap-4 font-mono-mini text-[var(--ivory-faint)]">
                    <span>{b.date}</span><span>·</span><span>{b.author}</span>
                  </div>
                  <h3 className="mt-4 font-display text-2xl md:text-[28px] leading-tight text-ivory group-hover:text-gold transition-colors">{b.title}</h3>
                  <p className="mt-4 text-[var(--ivory-dim)] leading-relaxed">{b.excerpt}</p>
                  <div className="mt-6 font-mono-mini text-gold link-underline inline-block">Read Article →</div>
                </div>
              </GlowCard>
              );
            })}
          </Stagger>
        </div>
      </div>
    </section>
  );
}

/* ---------- Final CTA ---------- */
function FinalCTA() {
  const { go } = useRoute();
  return (
    <section className="relative py-32 px-6 md:px-12 overflow-hidden">
      <Photo src={IMG.ctaBg} className="absolute inset-0" overlay={0} />
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(10,10,10,0.78)] via-[rgba(10,10,10,0.85)] to-[rgba(10,10,10,0.95)]" />
      <div className="relative max-w-[1200px] mx-auto text-center">
        <Eyebrow num="10" label="The Invitation" />
        <h2 className="font-display text-[56px] md:text-[120px] leading-[0.98] mt-8 text-ivory">
          <SplitLines text={['Ready to build']} />
          <SplitLines text={['something iconic?']} delay={0.15}>
            <em className="font-display-it text-gold">something iconic?</em>
          </SplitLines>
        </h2>
        <p className="mt-10 text-[var(--ivory-dim)] text-lg max-w-xl mx-auto">One conversation, one considered proposal. Tell us what you are building — we will tell you how we would build it.</p>
        <div className="mt-12 flex flex-wrap justify-center gap-5">
          <Magnetic><HoverButton onClick={() => go('contact')}>Begin a Conversation →</HoverButton></Magnetic>
          <Magnetic><HoverButton as="a" variant="ghost" href="tel:+971554447864">+971 55 444 7864</HoverButton></Magnetic>
        </div>
      </div>
    </section>
  );
}

/* ---------- CEO Letter ---------- */
function CEOLetter() {
  return (
    <section className="relative py-28 md:py-36 px-6 md:px-12 bg-[var(--char)] overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, var(--gold) 0%, transparent 50%)' }} />
      <div className="max-w-[1440px] mx-auto grid md:grid-cols-12 gap-10 md:gap-14 items-center relative">
        <div className="md:col-span-5">
          <ImageRise>
            <div className="relative aspect-[4/5] overflow-hidden" style={{ background: 'var(--char2)' }}>
              <img
                src="assets/owner-ovais-hashmi.png"
                alt="Ovais Hashmi, Founder and CEO of Infinity Turnkey Interiors"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ filter: 'grayscale(0.2) contrast(1.05) brightness(0.94)' }}
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(10,10,10,0) 55%, rgba(10,10,10,0.72) 100%)' }} />
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                <div>
                  <div className="font-mono-mini text-gold">Founder</div>
                  <div className="font-display text-xl text-ivory mt-1">Ovais Hashmi</div>
                </div>
                <div className="font-mono-mini text-[var(--ivory-faint)]">Dubai · 2013</div>
              </div>
            </div>
          </ImageRise>
        </div>

        <div className="md:col-span-7 md:pl-6">
          <Reveal><Eyebrow num="·" label="Letter from the founder" /></Reveal>
          <Reveal delay={0.12}>
            <h2 className="mt-8 font-display text-[34px] md:text-[56px] leading-[1.04] text-ivory">
              <em className="font-display-it text-gold">“</em>Every space we sign our name to is a <em className="font-display-it text-gold">signature</em> piece.<em className="font-display-it text-gold">”</em>
            </h2>
          </Reveal>
          <div className="mt-8 space-y-5 text-[var(--ivory-dim)] leading-relaxed text-lg max-w-2xl">
            <Reveal delay={0.22}><p>Crafted with pride, finished with the restraint a premium address deserves. Every project is our pride, and luxury, for us, is the discipline of leaving nothing to chance.</p></Reveal>
            <Reveal delay={0.32}><p>That has been our measure since 2013, and it is the only one we accept when we hand over a key.</p></Reveal>
          </div>
          <Reveal delay={0.45} className="mt-10 pt-6 border-t border-[var(--hairline)] flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="font-display text-ivory text-xl">Ovais Hashmi</div>
              <div className="font-mono-mini text-[var(--ivory-faint)] mt-1">Founder · Infinity Turnkey Interior Decoration L.L.C</div>
            </div>
            <div className="font-mono-mini text-gold">Al Qusais · Dubai · Since 2013</div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- Home Page ---------- */
function HomePage() {
  return (
    <>
      <ExpandingHero />
      <AboutSnippet />
      <ServicesHScroll />
      <CategoriesScroll />
      <StatsBlock />
      <ExpertiseBlock />
      <Testimonials />
      <CEOLetter />
      <BrandsOrbit />
      <ClientsGrid />
      <BlogPreview />
      <FinalCTA />
    </>
  );
}

Object.assign(window, { HomePage, SECTORS, SERVICES, CATEGORIES, MATERIAL_BRANDS, TESTIMONIALS, BLOGS });
