/* ============ ABOUT + SERVICES + PROJECTS PAGES ============ */
const { motion: MP, AnimatePresence: APP } = window.FramerMotion;

/* ============================================================ */
/* ABOUT PAGE                                                    */
/* ============================================================ */
function AboutPage() {
  const values = [
    { n: '01', t: 'Personal Touch', body: 'Senior designers on every project. No account layer, no hand-offs — the person who drew the scheme is the person who watches it get built.' },
    { n: '02', t: 'Innovative Designs', body: 'We read deeply, travel often, and refuse the obvious reference. Every scheme begins with a narrative — not a mood board.' },
    { n: '03', t: 'Creative Ideas', body: 'A working design is a resolved idea. We spend the drawing board time most studios save — and give it back on site.' },
  ];
  const partners = ['Joinery','Upholstery','Marble & Stone','Gypsum','Electro-Mechanical','Glass & Metal','Painting','AutoCAD & Visualisation'];

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center px-6 md:px-12 pt-16 overflow-hidden">
        <div className="watermark" />
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
              Infinity Interior provides considered, craft-led solutions to every interior fit-out brief across the United Arab Emirates — and has done, quietly, since 2013.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="relative py-28 px-6 md:px-12">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid md:grid-cols-3 gap-px bg-[var(--hairline)] border border-[var(--hairline)]">
            {values.map((v) => (
              <div key={v.n} className="group bg-[var(--ink)] p-10 md:p-14 relative overflow-hidden transition-colors duration-700 hover:bg-[var(--char2)]">
                <div className="font-mono-mini text-gold mb-10">{v.n} · Principle</div>
                <h3 className="font-display text-[40px] md:text-[48px] leading-tight text-ivory">{v.t}</h3>
                <p className="mt-8 text-[var(--ivory-dim)] leading-relaxed max-w-sm">{v.body}</p>
                <div className="mt-10 h-px w-12 bg-[var(--gold)] transition-all duration-700 group-hover:w-32" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CEO Block */}
      <section className="relative py-32 px-6 md:px-12 bg-[var(--char)]">
        <div className="watermark" />
        <div className="max-w-[1440px] mx-auto grid md:grid-cols-12 gap-14 relative">
          <div className="md:col-span-5">
            <MaskReveal>
              <div className="relative aspect-[4/5] bg-[var(--char2)] overflow-hidden">
                <img src="assets/owner-ovais-hashmi.png" alt="Ovais Hashmi, CEO" className="w-full h-full object-cover" style={{ filter: 'grayscale(0.25) contrast(1.05) brightness(0.92)' }} />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 50%, rgba(10,10,10,0.6) 100%)' }} />
                <div className="absolute bottom-6 left-6 font-mono-mini text-gold">Al Qusais · 2025</div>
              </div>
            </MaskReveal>
          </div>
          <div className="md:col-span-7 md:pl-6 flex flex-col justify-center">
            <Eyebrow num="Leadership" label="A word from the CEO" />
            <blockquote className="mt-10">
              <div className="text-gold text-6xl font-display-it leading-none">"</div>
              <p className="font-display text-[32px] md:text-[48px] leading-[1.15] text-ivory mt-4">
                We do not pitch a trend. We listen, we draw, and we build what belongs to the client — <em className="font-display-it text-gold">and to the city we build in.</em>
              </p>
            </blockquote>
            <div className="mt-12 grid grid-cols-3 gap-6 max-w-lg">
              <div>
                <div className="font-mono-mini text-[var(--ivory-faint)]">Name</div>
                <div className="font-display text-lg text-ivory mt-2">Ovais Hashmi</div>
              </div>
              <div>
                <div className="font-mono-mini text-[var(--ivory-faint)]">Title</div>
                <div className="font-display text-lg text-gold mt-2">Chief Executive</div>
              </div>
              <div>
                <div className="font-mono-mini text-[var(--ivory-faint)]">Tenure</div>
                <div className="font-display text-lg text-ivory mt-2">Founder · 2013</div>
              </div>
            </div>
            <p className="mt-10 text-[var(--ivory-dim)] leading-relaxed max-w-xl">
              A builder before he was a businessman. Ovais leads the studio the way he leads a site — by walking every corner, asking better questions, and refusing to sign off on work he would not live with.
            </p>
          </div>
        </div>
      </section>

      {/* Offering */}
      <section className="relative py-32 px-6 md:px-12">
        <div className="max-w-[1440px] mx-auto grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <Eyebrow num="Offering" label="What We Offer" />
            <h2 className="font-display text-[44px] md:text-[80px] leading-[1.02] mt-6 text-ivory">
              One contract.<br/><em className="font-display-it text-gold">Every trade.</em>
            </h2>
          </div>
          <div className="md:col-span-7 md:pl-8">
            <p className="text-[var(--ivory-dim)] text-xl leading-relaxed">
              We specialise in turnkey interior fit-out — every trade, every discipline, one senior team. We collaborate with architects, interior designers and nominated suppliers to deliver high-end fit-out and refurbishment across every sector.
            </p>
            <div className="mt-12 space-y-2">
              <ExpertiseBar label="Interior Design" pct={95} />
              <ExpertiseBar label="Architecture" pct={85} />
              <ExpertiseBar label="Lighting Work" pct={78} />
            </div>
          </div>
        </div>
      </section>

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
            {partners.map((p, i) => (
              <div key={i} className="aspect-square border-b border-r border-[var(--hairline)] p-8 flex flex-col justify-between group hover:bg-[var(--char2)] transition-colors">
                <div className="font-mono-mini text-gold">0{i+1}</div>
                <div>
                  <div className="font-display text-xl md:text-2xl text-ivory">{p}</div>
                  <div className="h-px w-8 bg-[var(--gold)] mt-4 transition-all duration-500 group-hover:w-full" />
                </div>
              </div>
            ))}
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
      <section className="relative min-h-[60vh] flex items-center px-6 md:px-12 pt-16">
        <div className="watermark" />
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
              <MaskReveal delay={i * 0.05}>
                <Photo src={[IMG.svc1, IMG.svc2, IMG.svc3, IMG.svc4, IMG.svc5, IMG.svc6][i]} className="aspect-[5/6]" overlay={0.2}>
                  <div className="absolute bottom-4 left-4 font-mono-mini text-gold">{s.n} · {s.t}</div>
                </Photo>
              </MaskReveal>
            </div>
            <div className={`md:col-span-6 ${i % 2 === 1 ? 'md:order-1 md:pr-10' : 'md:pl-10'}`}>
              <div className="font-mono-mini text-gold">{s.n} / 06 · Discipline</div>
              <h2 className="font-display text-[44px] md:text-[72px] leading-[1.04] mt-6 text-ivory">
                {s.t}
                <br/><em className="font-display-it text-gold text-[28px] md:text-[40px]">{s.sub}</em>
              </h2>
              <p className="mt-8 text-[var(--ivory-dim)] text-lg leading-relaxed">{s.body}</p>
              <p className="mt-6 text-[var(--ivory-dim)] leading-relaxed">
                From first sketch to final snag. Our project directors assemble a bespoke team for every scheme — architects, MEP engineers, joiners, metalworkers — resourced through in-house departments and a network of long-standing manufacturing partners.
              </p>
              <div className="mt-10 pt-10 border-t border-[var(--hairline)]">
                <div className="font-mono-mini text-[var(--ivory-faint)]">Scope includes —</div>
                <div className="font-display text-xl text-ivory mt-3">{s.meta}</div>
              </div>
              <div className="mt-10">
                <Magnetic><button className="btn-ghost">Discuss a Brief →</button></Magnetic>
              </div>
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
      <section className="relative min-h-[60vh] flex items-center px-6 md:px-12 pt-16">
        <div className="watermark" />
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
