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

/* ---------- Hero ---------- */
function HomeHero({ overlayOpacity }) {
  const [active, setActive] = useState('retail');
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Hero image */}
      <Photo src={IMG.heroReel} className="absolute inset-0" overlay={0}>
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 20% 30%, rgba(201,169,97,0.12), transparent 55%), linear-gradient(180deg, rgba(10,10,10,${overlayOpacity + 0.1}) 0%, rgba(10,10,10,${overlayOpacity + 0.55}) 100%)` }} />
        <div className="absolute top-1/2 right-10 -translate-y-1/2 hidden lg:flex items-center gap-3 text-[var(--ivory-faint)]">
          <span className="w-2 h-2 rounded-full bg-[var(--gold)] animate-pulse" />
          <span className="font-mono-mini">Reel · Ch. 01 / 06</span>
        </div>
      </Photo>

      {/* Content overlay */}
      <div className="relative z-10 min-h-screen flex flex-col px-6 md:px-12 pt-16 pb-10">
        <div className="flex-1 flex flex-col justify-center max-w-[1440px] mx-auto w-full">
          <div className="max-w-5xl">
            <Eyebrow num="01 / 06" label="Infinity Turnkey — Dubai, Since 2013" />

            <h1 className="mt-8 font-display text-[48px] sm:text-[72px] md:text-[112px] xl:text-[140px] leading-[0.95]">
              <SplitLines text={['Creative solutions']} className="block text-ivory" />
              <span className="block">
                <span className="line-mask block">
                  <span className="line-inner in" style={{ transitionDelay: '0.25s' }}>
                    <em className="font-display-it text-gold">by Infinity.</em>
                  </span>
                </span>
              </span>
            </h1>

            <div className="mt-10 grid md:grid-cols-12 gap-6 md:gap-10 items-end">
              <p className="md:col-span-6 text-[var(--ivory-dim)] text-base md:text-lg leading-relaxed max-w-lg">
                The design & contracting atelier. A single, senior team for every high-end interior, fit-out and thematic project across the United Arab Emirates.
              </p>
              <div className="md:col-span-6 flex flex-wrap gap-4 md:justify-end">
                <Magnetic strength={0.2}><button className="btn-gold">View Recent Work →</button></Magnetic>
                <Magnetic strength={0.2}><button className="btn-ghost">The Studio</button></Magnetic>
              </div>
            </div>
          </div>
        </div>

        {/* Sector pills */}
        <div className="mt-auto pt-12">
          <div className="flex items-center justify-between mb-6">
            <div className="font-mono-mini text-[var(--ivory-faint)]">Sectors we work in —</div>
            <div className="font-mono-mini text-gold hidden md:block">{SECTORS.find(s => s.id === active)?.label} · showcase</div>
          </div>
          <div className="flex flex-wrap gap-3">
            {SECTORS.map((s) => (
              <button key={s.id} onClick={() => setActive(s.id)}
                className={`sector-pill ${active === s.id ? 'on' : ''}`}>
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sector preview card — bottom right */}
      <div className="absolute bottom-10 right-6 md:right-12 z-20 hidden lg:block">
        <MH.div
          key={active}
          initial={{ opacity: 0, x: 40, filter: 'blur(8px)' }}
          animate={{ opacity: 1, x: 0, filter: 'blur(0)' }}
          transition={{ duration: 0.7, ease: [0.77, 0, 0.18, 1] }}
          className="w-[340px]"
        >
          <Photo src={IMG[active]} className="aspect-[4/5]" overlay={0.25}>
            <div className="absolute bottom-4 left-4 font-mono-mini text-gold">{SECTORS.find(s => s.id === active)?.img}</div>
          </Photo>
          <div className="mt-4 flex items-center justify-between">
            <div className="font-display text-2xl text-ivory">{SECTORS.find(s => s.id === active)?.label}</div>
            <div className="font-mono-mini text-gold">View →</div>
          </div>
        </MH.div>
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
          <Eyebrow num="02" label="Get To Know Us" />
          <MaskReveal className="mt-8">
            <Photo src={IMG.studioPortrait} className="aspect-[4/5]" overlay={0.2}>
              <div className="absolute bottom-4 left-4 font-mono-mini text-gold">Studio · Al Qusais atelier</div>
            </Photo>
          </MaskReveal>
        </div>
        <div className="md:col-span-7 md:pl-10 flex flex-col justify-center">
          <h2 className="font-display text-[44px] md:text-[80px] leading-[1.02] text-ivory">
            <SplitLines text={['A quiet discipline,', 'loudly delivered.']} />
          </h2>
          <div className="mt-10 space-y-6 max-w-xl text-[var(--ivory-dim)] leading-relaxed text-lg">
            <p>Since 2013, Infinity Turnkey Interiors has operated as one of Dubai's most considered fit-out houses — customer-centric by principle, result-driven by habit, and singularly obsessed with the detail nobody thinks to mention.</p>
            <p>Architects, interior designers, project managers and site operatives under one roof — collaborating with nominated suppliers and specialist trades to deliver turnkey interiors across retail, hospitality, commercial, residential and thematic sectors.</p>
          </div>
          <div className="mt-10 flex gap-6">
            <Magnetic><button onClick={() => go('about')} className="btn-gold">The Full Story →</button></Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Services Horizontal Scroll (native swipe) ---------- */
function ServicesHScroll() {
  return (
    <section className="relative bg-[var(--char)] overflow-hidden">
      <div className="relative px-6 md:px-12 pt-24 pb-10 flex justify-between items-end">
        <div>
          <Eyebrow num="03" label="The Practice" />
          <h2 className="font-display text-[44px] md:text-[80px] leading-[1.02] mt-6 max-w-3xl text-ivory">
            Six disciplines.<br/><em className="font-display-it text-gold">One delivery.</em>
          </h2>
        </div>
        <div className="hidden md:block font-mono-mini text-[var(--ivory-faint)]">Swipe → sideways</div>
      </div>

      <div className="overflow-x-auto pb-24 pt-16" style={{ scrollbarWidth: 'thin' }}>
        <div className="flex gap-6 pl-6 md:pl-12" style={{ width: 'max-content' }}>
          {SERVICES.map((s, i) => {
            const svcImg = [IMG.svc1, IMG.svc2, IMG.svc3, IMG.svc4, IMG.svc5, IMG.svc6][i];
            return (
            <article key={s.n} className="svc-card">
              <div className="absolute inset-0">
                <img src={svcImg} alt={s.t} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.88) 100%)' }} />
              </div>
              <div className="relative h-full flex flex-col justify-between p-8 md:p-10">
                <div>
                  <div className="font-mono-mini text-gold">{s.n} / 06</div>
                  <h3 className="mt-6 font-display text-[32px] md:text-[40px] leading-tight text-ivory">{s.t}<br/><em className="font-display-it text-[var(--gold)] text-[22px] md:text-[28px]">{s.sub}</em></h3>
                </div>
                <div>
                  <p className="text-[var(--ivory-dim)] leading-relaxed max-w-sm">{s.body}</p>
                  <div className="mt-6 pt-6 border-t border-[var(--hairline)] font-mono-mini text-[var(--ivory-faint)]">{s.meta}</div>
                </div>
              </div>
            </article>
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
        end: () => `+=${total}`,
        invalidateOnRefresh: true,
      }
    });
    return () => { anim.scrollTrigger?.kill(); anim.kill(); };
  }, []);

  return (
    <section ref={wrapRef} className="relative py-24 md:py-32 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="flex items-end justify-between mb-16">
          <div>
            <Eyebrow num="04" label="Project Categories" />
            <h2 className="font-display text-[44px] md:text-[80px] leading-[1.02] mt-6 text-ivory">Where we have built.</h2>
          </div>
          <a onClick={(e)=>{e.preventDefault(); go('projects');}} href="#projects" className="font-eyebrow text-gold link-underline hidden md:block">All Projects →</a>
        </div>
      </div>

      <div className="overflow-x-auto md:overflow-hidden pb-4" style={{ scrollbarWidth: 'thin' }}>
        <div ref={trackRef} className="flex gap-5 pl-6 md:pl-12" style={{ width: 'max-content' }}>
          {CATEGORIES.map((c, i) => {
            const catImg = IMG[c.id] || IMG.retail;
            return (
            <article key={c.id} className="w-[280px] sm:w-[380px] md:w-[440px] flex-shrink-0 proj">
              <Photo src={catImg} className="aspect-[3/4]" overlay={0.15}>
                <div className="ph-label">{c.label}</div>
              </Photo>
              <div className="proj-meta">
                <div className="font-mono-mini text-gold">{c.count}</div>
                <div className="font-display text-3xl text-ivory mt-2">{c.title}</div>
              </div>
              <div className="pt-5 flex items-end justify-between">
                <div>
                  <div className="font-mono-mini text-[var(--ivory-faint)]">Category 0{i+1}</div>
                  <div className="font-display text-2xl text-ivory mt-1">{c.title}</div>
                </div>
                <div className="font-mono-mini text-gold">{c.count}</div>
              </div>
            </article>
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
          <MaskReveal>
            <Photo src={IMG.expertise} className="aspect-[4/5]" overlay={0.2}>
              <div className="absolute bottom-4 left-4 font-mono-mini text-gold">Drawing room · AutoCAD desk</div>
            </Photo>
          </MaskReveal>
        </div>
        <div className="md:col-span-7 md:pl-8 flex flex-col justify-center">
          <Eyebrow num="05" label="Our Expertise" />
          <h2 className="font-display text-[44px] md:text-[72px] leading-[1.04] mt-6 text-ivory">
            Measured<br/><em className="font-display-it text-gold">in decades</em>, not deadlines.
          </h2>
          <div className="mt-12 space-y-2">
            <ExpertiseBar label="Interior Design" pct={95} />
            <ExpertiseBar label="Architecture" pct={85} />
            <ExpertiseBar label="Lighting Work" pct={78} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Recent Work video ---------- */
function RecentWork() {
  return (
    <section className="relative py-24 px-6 md:px-12">
      <div className="max-w-[1440px] mx-auto">
        <div className="text-center mb-16">
          <Eyebrow num="06" label="On Film" />
          <h2 className="font-display text-[44px] md:text-[80px] leading-[1.02] mt-6 text-ivory">A year of quiet work.</h2>
          <p className="mt-6 text-[var(--ivory-dim)] max-w-xl mx-auto">Three minutes. Twelve projects. One company's approach to detail — shown, not described.</p>
        </div>
        <div className="relative aspect-[16/9] group cursor-none">
          <Photo src={IMG.reel} className="absolute inset-0" overlay={0}>
            <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.2) 30%, rgba(0,0,0,0.75) 100%)' }} />
          </Photo>
          <Magnetic strength={0.4} className="absolute inset-0 flex items-center justify-center">
            <button className="w-28 h-28 md:w-36 md:h-36 rounded-full border border-[var(--gold)] flex items-center justify-center relative group-hover:bg-[var(--gold)] transition-colors duration-500">
              <div className="absolute inset-0 rounded-full border border-[var(--gold)] animate-ping opacity-30" />
              <svg viewBox="0 0 24 24" className="w-8 h-8 md:w-10 md:h-10 text-gold group-hover:text-[var(--ink)] transition-colors ml-1" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </button>
          </Magnetic>
          <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 font-mono-mini text-[var(--ivory-dim)]">Watch · Showreel 2025</div>
          <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 font-mono-mini text-gold">03:24</div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Testimonials ---------- */
function Testimonials() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % TESTIMONIALS.length), 7000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative py-32 px-6 md:px-12 bg-[var(--char)]">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-16 text-center">
          <Eyebrow num="07" label="Client Testimony" />
          <h2 className="font-display text-[44px] md:text-[72px] leading-[1.02] mt-6 text-ivory">What they are saying.</h2>
        </div>

        <div className="relative min-h-[320px]">
          <AP mode="wait">
            <MH.blockquote
              key={idx}
              initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0)' }}
              exit={{ opacity: 0, y: -30, filter: 'blur(8px)' }}
              transition={{ duration: 0.7, ease: [0.77, 0, 0.18, 1] }}
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

/* ---------- Materials Ticker ---------- */
function MaterialsTicker() {
  const row = (
    <>
      {MATERIAL_BRANDS.map((b, i) => (
        <span key={i} className="ticker-item">
          {b}<span className="dot" />
        </span>
      ))}
    </>
  );
  return (
    <section className="relative py-16 border-y border-[var(--hairline)] overflow-hidden bg-[var(--ink)]">
      <div className="marquee-slow">
        <div className="marquee-track">
          {row}{row}
        </div>
      </div>
      <div className="text-center mt-6 font-mono-mini text-[var(--ivory-faint)]">Specified Materials · UAE Supply Network</div>
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
          <div className="md:col-span-5">
            <Eyebrow num="08" label="Partners & Clients" />
            <h2 className="font-display text-[44px] md:text-[72px] leading-[1.02] mt-6 text-ivory">
              Two hundred clients,<br/><em className="font-display-it text-gold">one standard.</em>
            </h2>
          </div>
          <div className="md:col-span-7 md:pl-8 flex items-end">
            <p className="text-[var(--ivory-dim)] text-lg max-w-lg">A private ledger built over thirteen years — boutique owners, operators, developers and family offices across the United Arab Emirates.</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 border-t border-l border-[var(--hairline)]">
          {clients.map((c, i) => (
            <div key={i} className="aspect-[3/2] border-b border-r border-[var(--hairline)] flex items-center justify-center relative group overflow-hidden">
              <div className="absolute inset-0 bg-[var(--gold)] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <span className="relative font-display text-lg md:text-xl text-[var(--ivory-dim)] group-hover:text-[var(--ink)] transition-colors duration-500">{c}</span>
            </div>
          ))}
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
          <div>
            <Eyebrow num="09" label="From the Journal" />
            <h2 className="font-display text-[44px] md:text-[72px] leading-[1.02] mt-6 text-ivory">Latest dispatches.</h2>
          </div>
          <a onClick={(e)=>{e.preventDefault(); go('news');}} href="#news" className="font-eyebrow text-gold link-underline hidden md:block">Read All →</a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {BLOGS.map((b, i) => {
            const blogImg = [IMG.blog1, IMG.blog2, IMG.blog3][i] || IMG.blog1;
            return (
            <article key={i} className="proj group">
              <Photo src={blogImg} className="aspect-[4/5]" overlay={0.15}>
                <div className="absolute top-4 left-4 font-mono-mini text-gold bg-[rgba(10,10,10,0.6)] px-3 py-1 backdrop-blur-sm">{b.tag}</div>
              </Photo>
              <div className="pt-6">
                <div className="flex items-center gap-4 font-mono-mini text-[var(--ivory-faint)]">
                  <span>{b.date}</span><span>·</span><span>{b.author}</span>
                </div>
                <h3 className="mt-4 font-display text-2xl md:text-[28px] leading-tight text-ivory group-hover:text-gold transition-colors">{b.title}</h3>
                <p className="mt-4 text-[var(--ivory-dim)] leading-relaxed">{b.excerpt}</p>
                <div className="mt-6 font-mono-mini text-gold link-underline inline-block">Read Article →</div>
              </div>
            </article>
            );
          })}
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
          <Magnetic><button onClick={() => go('contact')} className="btn-gold">Begin a Conversation →</button></Magnetic>
          <Magnetic><a href="tel:+971554447864" className="btn-ghost">+971 55 444 7864</a></Magnetic>
        </div>
      </div>
    </section>
  );
}

/* ---------- Home Page ---------- */
function HomePage({ overlayOpacity }) {
  return (
    <>
      <HomeHero overlayOpacity={overlayOpacity} />
      <AboutSnippet />
      <ServicesHScroll />
      <CategoriesScroll />
      <StatsBlock />
      <ExpertiseBlock />
      <RecentWork />
      <Testimonials />
      <MaterialsTicker />
      <ClientsGrid />
      <BlogPreview />
      <FinalCTA />
    </>
  );
}

Object.assign(window, { HomePage, SECTORS, SERVICES, CATEGORIES, MATERIAL_BRANDS, TESTIMONIALS, BLOGS });
