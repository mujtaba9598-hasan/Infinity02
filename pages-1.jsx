/* ============ ABOUT + SERVICES + PROJECTS PAGES ============ */
const { motion: MP, AnimatePresence: APP } = window.FramerMotion;

/* ---------- Inline icon set (adapted from lucide for babel-standalone, no lucide-react import) ---------- */
const _IP = { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };
const _IP14 = Object.assign({}, _IP, { width: 14, height: 14, strokeWidth: 1.8 });
const IPen       = () => <svg {..._IP}><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/></svg>;
const IHome      = () => <svg {..._IP}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const IPenTool   = () => <svg {..._IP}><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><circle cx="11" cy="11" r="2"/></svg>;
const IPaint     = () => <svg {..._IP}><path d="M6.5 11.5 12.5 5.5a1 1 0 0 1 1.4 0l4.6 4.6a1 1 0 0 1 0 1.4l-6 6a1 1 0 0 1-1.4 0L6.5 12.9a1 1 0 0 1 0-1.4z"/><path d="M18 13l2-2M5 21c0 1 .5 1.5 1.5 1.5S8 22 8 21c0-1-1.5-3-1.5-3S5 20 5 21z"/></svg>;
const IRuler     = () => <svg {..._IP}><path d="M21.3 8.7 8.7 21.3a1 1 0 0 1-1.4 0l-4.6-4.6a1 1 0 0 1 0-1.4L15.3 2.7a1 1 0 0 1 1.4 0l4.6 4.6a1 1 0 0 1 0 1.4z"/><path d="m14.5 12.5 2-2M11.5 9.5l2-2M8.5 6.5l2-2M17.5 15.5l2-2"/></svg>;
const IBuilding  = () => <svg {..._IP}><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/></svg>;
const IAward     = () => <svg {..._IP}><circle cx="12" cy="8" r="6"/><path d="M15.5 12.9 17 22l-5-3-5 3 1.5-9.1"/></svg>;
const IUsers     = () => <svg {..._IP}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const ICalendar  = () => <svg {..._IP}><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>;
const ITrend     = () => <svg {..._IP}><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>;
const ISparkles  = () => <svg {..._IP14}><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3z"/></svg>;
const ICheck     = () => <svg {..._IP14}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>;
const IStar      = () => <svg {..._IP14}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
const IArrow     = () => <svg {..._IP14}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>;
const IZap       = () => <svg {..._IP14}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>;

/* ---------- About / What We Do (adapted from 21st.dev about-us-section.tsx) ---------- */
function AboutWhatWeDo() {
  const services = [
    { Icon: IPen,      Sec: ISparkles, title: 'Interior Architecture', body: 'End to end interior schemes, from concept through construction. A senior team accountable for every drawing and every site day.', pos: 'left' },
    { Icon: IHome,     Sec: ICheck,    title: 'Exterior & Facade',     body: 'Aluminium and glass. Curtain walls, cladding and bespoke metalwork engineered for the Gulf climate.', pos: 'left' },
    { Icon: IPenTool,  Sec: IStar,     title: 'Design Authorship',     body: 'Concept to detail, drawn in house. Every scheme carries a signature, every joint is specified, nothing is left to chance.', pos: 'left' },
    { Icon: IPaint,    Sec: ISparkles, title: 'Finishes & Decoration', body: 'Joinery, stone, upholstery, painting. A curated network of long-standing trades delivering the finish a premium address deserves.', pos: 'right' },
    { Icon: IRuler,    Sec: ICheck,    title: 'Planning & Programme',  body: 'Meticulous planning from day one. Clear timelines, transparent budgets, and a project director accountable to your calendar.', pos: 'right' },
    { Icon: IBuilding, Sec: IStar,     title: 'Turnkey Execution',     body: 'One contract. One team. One delivery. From strip-out through handover, we run the site, you receive the key.', pos: 'right' },
  ];

  const stats = [
    { Icon: IAward,    value: 340, label: 'Projects Delivered',    suffix: '+' },
    { Icon: IUsers,    value: 200, label: 'Clients on the Ledger', suffix: '+' },
    { Icon: ICalendar, value: 13,  label: 'Years in Dubai',        suffix: ''  },
    { Icon: ITrend,    value: 48,  label: 'Specialists In-house',  suffix: ''  },
  ];

  return (
    <section className="relative py-24 md:py-32 px-6 md:px-12 bg-[var(--ink)] overflow-hidden">
      {/* Decorative blurs */}
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-[var(--gold)]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-[var(--gold)]/8 blur-3xl pointer-events-none" />

      {/* Floating dots */}
      <MP.div
        className="absolute top-1/2 left-[22%] w-3 h-3 rounded-full bg-[var(--gold)]/50 pointer-events-none"
        animate={{ y: [0, -15, 0], opacity: [0.45, 1, 0.45] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
      <MP.div
        className="absolute bottom-[30%] right-[22%] w-4 h-4 rounded-full bg-[var(--gold)]/30 pointer-events-none"
        animate={{ y: [0, 20, 0], opacity: [0.45, 1, 0.45] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <Reveal className="flex flex-col items-center mb-5">
          <span className="font-mono-mini text-gold mb-3 flex items-center gap-2">
            <IZap /> Discover our practice
          </span>
          <h2 className="font-display text-[44px] md:text-[64px] text-ivory text-center leading-[1.02]">
            Our Practice<span className="font-display-it text-gold">.</span>
          </h2>
          <DrawLine className="w-24 mt-5" />
        </Reveal>

        <Reveal delay={0.15}>
          <p className="text-center max-w-2xl mx-auto mb-16 text-[var(--ivory-dim)] leading-relaxed">
            Architects, interior designers and project managers under one roof. We blend design authorship with on-site discipline to deliver interiors that feel inevitable, on a programme that holds.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="space-y-14">
            {services.filter(s => s.pos === 'left').map((s, i) => (
              <AboutServiceItem key={`l-${i}`} s={s} direction="left" delay={i * 0.1} />
            ))}
          </div>

          {/* Center image */}
          <div className="flex justify-center items-center order-first md:order-none mb-8 md:mb-0">
            <Reveal className="relative w-full max-w-xs" y={30}>
              <div className="relative aspect-[3/4] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)] group cursor-none">
                <img
                  src={IMG.atelier}
                  alt="Infinity studio, Al Qusais atelier"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  style={{ filter: 'grayscale(0.35) contrast(1.08) brightness(0.72)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)]/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                  <button className="inline-flex items-center gap-2 bg-[var(--gold)] text-[var(--ink)] px-4 py-2 rounded-full font-mono-mini tracking-wider uppercase text-[10px] hover:bg-[var(--gold-bright)] transition-colors">
                    Our Portfolio <IArrow />
                  </button>
                </div>
              </div>
              <div className="absolute inset-0 border border-[var(--gold)]/60 -m-3 z-[-1]" />
              <MP.div className="absolute -top-4 -right-8 w-14 h-14 rounded-full bg-[var(--gold)]/10 pointer-events-none" animate={{ y: [0, -8, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} />
              <MP.div className="absolute -bottom-6 -left-10 w-16 h-16 rounded-full bg-[var(--gold)]/15 pointer-events-none" animate={{ y: [0, 10, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }} />
              <MP.div className="absolute -top-10 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[var(--gold)] pointer-events-none" animate={{ y: [0, -10, 0], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} />
              <MP.div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[var(--gold)] pointer-events-none" animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }} />
            </Reveal>
          </div>

          <div className="space-y-14">
            {services.filter(s => s.pos === 'right').map((s, i) => (
              <AboutServiceItem key={`r-${i}`} s={s} direction="right" delay={i * 0.1} />
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-24 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {stats.map((s, i) => (
            <AboutStatCell key={i} stat={s} delay={i * 0.08} />
          ))}
        </div>

        {/* CTA */}
        <Reveal delay={0.3} className="mt-16">
          <div className="bg-[var(--char)] border border-[var(--hairline)] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1 text-center md:text-left">
              <h3 className="font-display text-2xl md:text-3xl text-ivory mb-2">Ready to build something iconic?</h3>
              <p className="text-[var(--ivory-dim)]">One brief, one conversation, one signature on the package.</p>
            </div>
            <Magnetic><HoverButton>Begin a Conversation <IArrow /></HoverButton></Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function AboutServiceItem({ s, direction, delay }) {
  const { Icon, Sec } = s;
  return (
    <MP.div
      className="flex flex-col group"
      initial={{ x: direction === 'left' ? -20 : 20, opacity: 0, filter: 'blur(4px)' }}
      whileInView={{ x: 0, opacity: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="text-gold bg-[var(--gold)]/10 p-3 rounded-lg relative transition-colors duration-300 group-hover:bg-[var(--gold)]/25 border border-[var(--hairline)]">
          <Icon />
          <span className="absolute -top-1 -right-1 text-[var(--gold)] opacity-80"><Sec /></span>
        </div>
        <h3 className="font-display text-xl text-ivory group-hover:text-gold transition-colors">{s.title}</h3>
      </div>
      <p className="text-sm text-[var(--ivory-dim)] leading-relaxed pl-14">{s.body}</p>
      <div className="mt-3 pl-14 flex items-center text-gold text-xs font-mono-mini opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="flex items-center gap-1">Learn more <IArrow /></span>
      </div>
    </MP.div>
  );
}

function AboutStatCell({ stat, delay }) {
  const { Icon, value, label, suffix } = stat;
  return (
    <MP.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay }}
    >
      <GlowCard className="bg-[var(--char)]/70 backdrop-blur-sm p-6 flex flex-col items-center text-center group hover:bg-[var(--char2)] transition-colors border border-[var(--hairline)]">
        <div className="w-12 h-12 rounded-full bg-[var(--gold)]/10 flex items-center justify-center mb-4 text-gold group-hover:bg-[var(--gold)]/25 transition-colors border border-[var(--hairline)]">
          <Icon />
        </div>
        <div className="font-display text-[42px] md:text-[48px] text-gold leading-none flex items-baseline">
          <Counter to={value} suffix={suffix} />
        </div>
        <p className="text-[var(--ivory-dim)] text-xs mt-2 font-mono-mini tracking-wider uppercase">{label}</p>
        <div className="w-8 h-px bg-[var(--gold)] mt-3 transition-all duration-500 group-hover:w-16" />
      </GlowCard>
    </MP.div>
  );
}

/* ============================================================ */
/* ABOUT PAGE                                                    */
/* ============================================================ */
function AboutPage() {
  const values = [
    { n: '01', t: 'Personal Touch', body: 'Senior designers on every project. No account layer, no hand-offs — the person who drew the scheme is the person who watches it get built.' },
    { n: '02', t: 'Innovative Designs', body: 'We read deeply, travel often, and refuse the obvious reference. Every scheme begins with a narrative — not a mood board.' },
    { n: '03', t: 'Creative Ideas', body: 'A working design is a resolved idea. We spend the drawing board time most studios save — and give it back on site.' },
  ];
  const partners = [
    { name: 'Joinery',                 img: IMG.svc5 },
    { name: 'Upholstery',              img: IMG.blog5 },
    { name: 'Marble & Stone',          img: IMG.blog4 },
    { name: 'Gypsum',                  img: IMG.studioPortrait },
    { name: 'Electro-Mechanical',      img: IMG.svc2 },
    { name: 'Glass & Metal',           img: 'https://images.unsplash.com/photo-1460574283810-2aab119d8511?w=1200&q=80' },
    { name: 'Painting',                img: IMG.blog2 },
    { name: 'AutoCAD & Visualisation', img: IMG.atelier },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center px-6 md:px-12 pt-16 overflow-hidden">
        <Photo src={IMG.atelier} className="absolute inset-0" overlay={0}>
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(10,10,10,0.82) 0%, rgba(10,10,10,0.92) 100%)' }} />
        </Photo>
        <div className="max-w-[1440px] mx-auto w-full grid md:grid-cols-12 gap-10 relative">
          <div className="md:col-span-7">
            <Eyebrow num="About · 2013 → Present" label="Get To Know Us" />
            <h1 className="font-display text-[56px] md:text-[128px] leading-[0.96] mt-8 text-ivory">
              <SplitLines text={['Creative solutions']} />
              <SplitLines text={['by our architects.']} delay={0.12}>
                <em className="font-display-it text-gold">by our architects.</em>
              </SplitLines>
            </h1>
            <DrawLine className="mt-10 w-40" />
          </div>
          <div className="md:col-span-5 md:pt-16 flex items-end">
            <p className="text-[var(--ivory-dim)] text-lg leading-relaxed max-w-md">
              Infinity Interior provides considered, craft-led solutions to every interior fit-out brief across the United Arab Emirates, and has done, quietly, since 2013.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="relative py-28 px-6 md:px-12">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid md:grid-cols-3 gap-px bg-[var(--hairline)] border border-[var(--hairline)]">
            <Stagger step={0.12} y={30}>
              {values.map((v) => (
                <GlowCard key={v.n} className="group bg-[var(--ink)] p-10 md:p-14 overflow-hidden transition-colors duration-700 hover:bg-[var(--char2)]">
                  <div className="font-mono-mini text-gold mb-10">{v.n} · Principle</div>
                  <h3 className="font-display text-[40px] md:text-[48px] leading-tight text-ivory">{v.t}</h3>
                  <p className="mt-8 text-[var(--ivory-dim)] leading-relaxed max-w-sm">{v.body}</p>
                  <div className="mt-10 h-px w-12 bg-[var(--gold)] transition-all duration-700 group-hover:w-32" />
                </GlowCard>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      {/* CEO Block */}
      <section className="relative py-32 px-6 md:px-12 bg-[var(--char)]">
        <div className="max-w-[1440px] mx-auto grid md:grid-cols-12 gap-14 relative">
          <div className="md:col-span-5">
            <Reveal y={30} duration={1.1}>
              <div className="relative aspect-[4/5] bg-[var(--char2)] overflow-hidden">
                <img src="assets/owner-ovais-hashmi.png" alt="Ovais Hashmi, CEO" className="absolute inset-0 w-full h-full object-cover" style={{ filter: 'grayscale(0.25) contrast(1.05) brightness(0.92)' }} />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 50%, rgba(10,10,10,0.6) 100%)' }} />
                <div className="absolute bottom-6 left-6 font-mono-mini text-gold">Al Qusais · 2025</div>
              </div>
            </Reveal>
          </div>
          <div className="md:col-span-7 md:pl-6 flex flex-col justify-center">
            <Reveal><Eyebrow num="Leadership" label="A word from the CEO" /></Reveal>
            <Reveal delay={0.1}>
              <blockquote className="mt-10">
                <div className="text-gold text-6xl font-display-it leading-none">"</div>
                <p className="font-display text-[32px] md:text-[48px] leading-[1.15] text-ivory mt-4">
                  We do not pitch a trend. We listen, we draw, and we build what belongs to the client, <em className="font-display-it text-gold">and to the city we build in.</em>
                </p>
              </blockquote>
            </Reveal>
            <Reveal delay={0.25} className="mt-14">
              <div className="font-mono-mini text-gold">The Founder</div>
              <div className="mt-3 font-display text-[40px] md:text-[56px] leading-[1.02] text-ivory">
                Ovais Hashmi<span className="font-display-it text-gold">.</span>
              </div>
              <DrawLine className="mt-5 w-24" />
              <div className="mt-5 flex flex-wrap items-center gap-3 font-mono-mini text-[var(--ivory-dim)]">
                <span>Founder</span>
                <span className="text-gold opacity-60">/</span>
                <span>Chief Executive</span>
                <span className="text-gold opacity-60">/</span>
                <span>Since 2013</span>
              </div>
            </Reveal>
            <Reveal delay={0.4}>
              <p className="mt-10 text-[var(--ivory-dim)] leading-relaxed max-w-xl">
                A builder before he was a businessman. Ovais leads the studio the way he leads a site, by walking every corner, asking better questions, and refusing to sign off on work he would not live with.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Our Practice (adapted 21st.dev about-us-section) */}
      <AboutWhatWeDo />

      {/* Partner Network */}
      <section className="relative py-32 px-6 md:px-12 bg-[var(--char)]">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <Eyebrow num="Network" label="Meet Our Expertise" />
            <h2 className="font-display text-[44px] md:text-[72px] leading-[1.02] mt-6 text-ivory">A network, not a supply chain.</h2>
            <p className="mt-8 text-[var(--ivory-dim)] text-lg leading-relaxed">
              Long-standing tie-ups with joinery, upholstery, stone, gypsum, electro-mechanical, glass and metal, and painting partners — underpinned by an in-house AutoCAD and visualisation department. One studio. Complete control over programme and quality.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 border-t border-l border-[var(--hairline)]">
            <Stagger step={0.06} y={18} blur={2} duration={0.7}>
              {partners.map((p, i) => (
                <GlowCard key={i} className="aspect-square border-b border-r border-[var(--hairline)] overflow-hidden group cursor-none">
                  <img
                    src={p.img}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover opacity-55 group-hover:opacity-95 transition-all duration-700 ease-out"
                    style={{ filter: 'grayscale(0.7) contrast(1.08) brightness(0.55)' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-[rgba(10,10,10,0.75)] via-[rgba(10,10,10,0.55)] to-[rgba(10,10,10,0.8)] group-hover:from-[rgba(10,10,10,0.55)] group-hover:to-[rgba(10,10,10,0.7)] transition-colors duration-500" />
                  <div className="relative p-8 h-full flex flex-col justify-between">
                    <div className="font-mono-mini text-gold">0{i+1}</div>
                    <div>
                      <div className="font-display text-xl md:text-2xl text-ivory">{p.name}</div>
                      <div className="h-px w-8 bg-[var(--gold)] mt-4 transition-all duration-500 group-hover:w-24" />
                    </div>
                  </div>
                </GlowCard>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      <Testimonials />
    </>
  );
}

/* ============================================================ */
/* SERVICES PAGE                                                 */
/* ============================================================ */
function ServicesPage() {
  return (
    <>
      <section className="relative min-h-[60vh] flex items-center px-6 md:px-12 pt-16 overflow-hidden">
        <Photo src={IMG.svc6} className="absolute inset-0" overlay={0}>
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(10,10,10,0.8) 0%, rgba(10,10,10,0.94) 100%)' }} />
        </Photo>
        <div className="max-w-[1440px] mx-auto w-full grid md:grid-cols-12 gap-10 relative">
          <div className="md:col-span-8">
            <Eyebrow num="Services · 06 disciplines" label="What We Offer" />
            <h1 className="font-display text-[56px] md:text-[128px] leading-[0.96] mt-8 text-ivory">
              <SplitLines text={['The practice,']} />
              <SplitLines text={['in full.']} delay={0.12}>
                <em className="font-display-it text-gold">in full.</em>
              </SplitLines>
            </h1>
          </div>
          <div className="md:col-span-4 md:pt-16 flex items-end">
            <p className="text-[var(--ivory-dim)] text-lg leading-relaxed">
              Six overlapping disciplines, one delivery team. Every service below is led in-house, resourced internally, and accountable to a single project director.
            </p>
          </div>
        </div>
      </section>

      {/* Service blocks alternating */}
      {SERVICES.map((s, i) => (
        <section key={s.n} className="relative py-24 md:py-32 px-6 md:px-12 border-t border-[var(--hairline)]">
          <div className="max-w-[1440px] mx-auto grid md:grid-cols-12 gap-12 items-center">
            <div className={`md:col-span-6 ${i % 2 === 1 ? 'md:order-2' : ''}`}>
              <ImageRise delay={0.05}>
                <Photo src={[IMG.svc1, IMG.svc2, IMG.svc3, IMG.svc4, IMG.svc5, IMG.svc6][i]} className="aspect-[5/6]" overlay={0.2}>
                  <div className="absolute bottom-4 left-4 font-mono-mini text-gold">{s.n} · {s.t}</div>
                </Photo>
              </ImageRise>
            </div>
            <div className={`md:col-span-6 ${i % 2 === 1 ? 'md:order-1 md:pr-10' : 'md:pl-10'}`}>
              <Reveal><div className="font-mono-mini text-gold">{s.n} / 06 · Discipline</div></Reveal>
              <Reveal delay={0.1}>
                <h2 className="font-display text-[44px] md:text-[72px] leading-[1.04] mt-6 text-ivory">
                  {s.t}
                  <br/><em className="font-display-it text-gold text-[28px] md:text-[40px]">{s.sub}</em>
                </h2>
              </Reveal>
              <Reveal delay={0.22}>
                <p className="mt-8 text-[var(--ivory-dim)] text-lg leading-relaxed">{s.body}</p>
              </Reveal>
              <Reveal delay={0.3}>
                <p className="mt-6 text-[var(--ivory-dim)] leading-relaxed">
                  From first sketch to final snag. Our project directors assemble a bespoke team for every scheme: architects, MEP engineers, joiners, metalworkers, resourced through in-house departments and a network of long-standing manufacturing partners.
                </p>
              </Reveal>
              <Reveal delay={0.4} className="mt-10 pt-10 border-t border-[var(--hairline)]">
                <div className="font-mono-mini text-[var(--ivory-faint)]">Scope includes</div>
                <div className="font-display text-xl text-ivory mt-3">{s.meta}</div>
              </Reveal>
              <Reveal delay={0.5} className="mt-10">
                <Magnetic><HoverButton variant="ghost">Discuss a Brief →</HoverButton></Magnetic>
              </Reveal>
            </div>
          </div>
        </section>
      ))}

      <FinalCTA />
    </>
  );
}

/* ============================================================ */
/* PROJECTS PAGE                                                 */
/* ============================================================ */
const PROJECTS = [
  { id: 1, name: 'Monochrome Jeweller', cat: 'retail', loc: 'Mall of the Emirates', year: 2024, size: 'tall' },
  { id: 2, name: 'All-Day Dining', cat: 'hospitality', loc: 'Jumeirah Beach Residence', year: 2024, size: 'wide' },
  { id: 3, name: 'Executive Floor', cat: 'commercial', loc: 'Sheikh Zayed Road', year: 2023, size: 'tall' },
  { id: 4, name: 'Duplex Apartment', cat: 'residential', loc: 'Downtown Dubai', year: 2024, size: 'square' },
  { id: 5, name: 'Character Cafe', cat: 'theme', loc: 'Global Village', year: 2023, size: 'wide' },
  { id: 6, name: 'Exhibition Pavilion', cat: 'special', loc: 'World Trade Centre', year: 2024, size: 'tall' },
  { id: 7, name: 'Flagship Boutique', cat: 'retail', loc: 'The Dubai Mall', year: 2024, size: 'square' },
  { id: 8, name: 'Hotel Suite Refurbishment', cat: 'hospitality', loc: 'Palm Jumeirah', year: 2025, size: 'tall' },
  { id: 9, name: 'Co-working Collective', cat: 'commercial', loc: 'Business Bay', year: 2023, size: 'wide' },
  { id: 10, name: 'Private Villa', cat: 'residential', loc: 'Emirates Hills', year: 2024, size: 'tall' },
  { id: 11, name: 'Themed Attraction', cat: 'theme', loc: 'Dubai Parks', year: 2022, size: 'square' },
  { id: 12, name: 'Bespoke Pavilion', cat: 'special', loc: 'Expo District', year: 2023, size: 'wide' },
];

const CAT_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'retail', label: 'Retail' },
  { id: 'hospitality', label: 'Hospitality' },
  { id: 'commercial', label: 'Commercial' },
  { id: 'residential', label: 'Residential' },
  { id: 'theme', label: 'Theme Parks' },
  { id: 'special', label: 'Special' },
];

function ProjectsPage() {
  const [filter, setFilter] = useState('all');
  const filtered = filter === 'all' ? PROJECTS : PROJECTS.filter(p => p.cat === filter);

  return (
    <>
      <section className="relative min-h-[60vh] flex items-center px-6 md:px-12 pt-16 overflow-hidden">
        <Photo src={IMG.proj3} className="absolute inset-0" overlay={0}>
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(10,10,10,0.78) 0%, rgba(10,10,10,0.94) 100%)' }} />
        </Photo>
        <div className="max-w-[1440px] mx-auto w-full grid md:grid-cols-12 gap-10 relative">
          <div className="md:col-span-8">
            <Eyebrow num="Projects · 340+ delivered" label="Explore Our Work" />
            <h1 className="font-display text-[56px] md:text-[128px] leading-[0.96] mt-8 text-ivory">
              <SplitLines text={['Thirteen years,']} />
              <SplitLines text={['drawn out.']} delay={0.12}>
                <em className="font-display-it text-gold">drawn out.</em>
              </SplitLines>
            </h1>
          </div>
        </div>
      </section>

      {/* Sticky filter */}
      <section className="sticky top-[73px] z-30 bg-[rgba(10,10,10,0.85)] backdrop-blur-xl border-y border-[var(--hairline)]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-5 flex gap-3 overflow-x-auto">
          {CAT_FILTERS.map((f) => (
            <button key={f.id} onClick={() => setFilter(f.id)}
              className={`sector-pill ${filter === f.id ? 'on' : ''} flex-shrink-0`}>
              {f.label}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-[1440px] mx-auto">
          <div className="mb-10 flex items-center justify-between">
            <div className="font-mono-mini text-[var(--ivory-faint)]">{filtered.length} projects · {filter}</div>
            <div className="font-mono-mini text-gold hidden md:block">Hover to reveal →</div>
          </div>
          <APP mode="popLayout">
            <MP.div layout className="grid grid-cols-12 gap-4 md:gap-6 auto-rows-[160px] md:auto-rows-[220px]">
              {filtered.map((p, i) => {
                const span = p.size === 'wide' ? 'col-span-12 md:col-span-8 row-span-2' :
                             p.size === 'tall' ? 'col-span-6 md:col-span-4 row-span-3' :
                             'col-span-6 md:col-span-4 row-span-2';
                return (
                  <MP.article
                    key={p.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, ease: [0.77, 0, 0.18, 1] }}
                    className={`proj ${span} relative`}
                  >
                    <img src={IMG[`proj${(i%12)+1}`] || IMG.proj1} alt={p.name} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,10,10,0.7)] to-transparent" />
                    <div className="proj-meta">
                      <div className="font-mono-mini text-gold">{p.cat.toUpperCase()} · {p.year}</div>
                      <h3 className="font-display text-2xl md:text-3xl text-ivory mt-2">{p.name}</h3>
                      <div className="font-mono-mini text-[var(--ivory-dim)] mt-2">{p.loc}</div>
                    </div>
                  </MP.article>
                );
              })}
            </MP.div>
          </APP>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}

Object.assign(window, { AboutPage, ServicesPage, ProjectsPage, PROJECTS, CAT_FILTERS });
