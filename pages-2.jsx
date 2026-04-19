/* ============ ASSOCIATES + NEWS + CONTACT PAGES ============ */
const { motion: MPP, AnimatePresence: APPP } = window.FramerMotion;

/* ============================================================ */
/* ASSOCIATES PAGE                                               */
/* ============================================================ */
const ASSOC_CLIENTS = [
  'Emaar','Majid Al Futtaim','Meraas','DAMAC','Nakheel','Jumeirah','Atlantis','Rotana',
  'IKEA','Carrefour','Apparel Group','Landmark','Al Futtaim','Chalhoub Group','Sharaf DG','GEMS',
  'Dubai Holding','ADNOC','Emirates','DP World','Etihad','Mashreq','Emirates NBD','RTA',
  'Dubai Mall','Mall of Emirates','City Centre','Ibn Battuta',
];
const ASSOC_PARTNERS = [
  'Ardh Delmon BLDG Contracting','Al Mafraq Glass & Aluminium','Al Rawah Décor Mat Factory',
  'RAK Ceramics','Jotun','Dulux','Saint-Gobain','Danube','Arabian Aluminium',
  'Emirates Glass','Jebel Ali Marble','Al Ghurair Aluminium','ASTER','Hafele',
  'Dorma','Grohe','Kohler','Geberit',
];

function AssociatesPage() {
  return (
    <>
      <section className="relative min-h-[60vh] flex items-center px-6 md:px-12 pt-16 overflow-hidden">
        <Photo src={IMG.ceoBg} className="absolute inset-0" overlay={0}>
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(10,10,10,0.82) 0%, rgba(10,10,10,0.94) 100%)' }} />
        </Photo>
        <div className="max-w-[1440px] mx-auto w-full grid md:grid-cols-12 gap-10 relative">
          <div className="md:col-span-8">
            <Eyebrow num="200+ · partnerships" label="Our Partners & Clients" />
            <h1 className="font-display text-[56px] md:text-[128px] leading-[0.96] mt-8 text-ivory">
              <SplitLines text={['The company']} />
              <SplitLines text={['we keep.']} delay={0.12}>
                <em className="font-display-it text-gold">we keep.</em>
              </SplitLines>
            </h1>
          </div>
          <div className="md:col-span-4 md:pt-16 flex items-end">
            <p className="text-[var(--ivory-dim)] text-lg leading-relaxed">
              Every scheme is a collaboration. Below is a portion of the ledger, developers, operators, manufacturers and specialist trades who have chosen to work with us, often, and for years.
            </p>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <section className="py-12 border-y border-[var(--hairline)] overflow-hidden">
        <div className="marquee-track">
          {[...ASSOC_CLIENTS, ...ASSOC_CLIENTS].map((c, i) => (
            <span key={i} className="ticker-item">{c}<span className="dot" /></span>
          ))}
        </div>
      </section>

      {/* Client grid */}
      <section className="relative py-24 px-6 md:px-12">
        <div className="max-w-[1440px] mx-auto">
          <div className="mb-16 flex items-end justify-between">
            <div>
              <Eyebrow num="01" label="Clients on the Ledger" />
              <h2 className="font-display text-[44px] md:text-[64px] mt-6 text-ivory">Two hundred, and counting.</h2>
            </div>
            <div className="font-mono-mini text-[var(--ivory-faint)] hidden md:block">Sample of active accounts</div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-6 border-t border-l border-[var(--hairline)]">
            {ASSOC_CLIENTS.map((c, i) => (
              <div key={i} className="aspect-[3/2] border-b border-r border-[var(--hairline)] flex items-center justify-center relative group overflow-hidden">
                <div className="absolute inset-0 bg-[var(--gold)] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <span className="relative font-display text-sm md:text-lg text-[var(--ivory-dim)] group-hover:text-[var(--ink)] transition-colors duration-500 text-center px-2">{c}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner grid */}
      <section className="relative py-24 px-6 md:px-12 bg-[var(--char)]">
        <div className="max-w-[1440px] mx-auto">
          <div className="mb-16">
            <Eyebrow num="02" label="Trade & Material Partners" />
            <h2 className="font-display text-[44px] md:text-[64px] mt-6 text-ivory">Specified, sourced, signed off.</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[var(--hairline)] border border-[var(--hairline)]">
            {ASSOC_PARTNERS.map((p, i) => (
              <div key={i} className="bg-[var(--char)] aspect-[2/1] flex flex-col justify-between p-6 group hover:bg-[var(--char2)] transition-colors">
                <div className="font-mono-mini text-gold">{String(i+1).padStart(2,'0')}</div>
                <div className="font-display text-lg md:text-xl text-ivory">{p}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificate gallery */}
      <section className="relative py-32 px-6 md:px-12">
        <div className="max-w-[1440px] mx-auto">
          <div className="mb-16 grid md:grid-cols-12 gap-10">
            <div className="md:col-span-6">
              <Eyebrow num="03" label="Associate Partner Certificates" />
              <h2 className="font-display text-[44px] md:text-[64px] mt-6 text-ivory leading-tight">Documented, not claimed.</h2>
            </div>
            <div className="md:col-span-6 flex items-end">
              <p className="text-[var(--ivory-dim)] text-lg leading-relaxed max-w-md">Formal association certificates on file — hover to zoom. Available on request for procurement and pre-qualification submissions.</p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[1,2,3].map((n) => (
              <div key={n} className="cert aspect-[3/4] flex items-center justify-center p-6">
                <img src="assets/associate-partners.jpeg" alt={`Associate certificate ${n}`} className="max-w-full max-h-full object-contain" />
                <div className="absolute top-4 left-4 font-mono-mini text-gold">CERT · 0{n}</div>
              </div>
            ))}
          </div>
          <div className="mt-8 font-mono-mini text-[var(--ivory-faint)] text-center">↑ Certificate on file — shown once, three cards for layout</div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}

/* ============================================================ */
/* NEWS PAGE                                                     */
/* ============================================================ */
const ARTICLES = [
  { date: '12 March 2025', author: 'Studio', tag: 'Studio Note', title: 'Infinity, in its own words.', excerpt: 'A short introduction to the atelier — what we believe, what we refuse, and how we think about interior fit-out in Dubai in 2025. Written by the founder, edited by nobody.' },
  { date: '26 February 2025', author: 'Design Desk', tag: 'Material', title: 'Seven quiet moves toward a more sustainable home.', excerpt: 'Not a manifesto. Seven considered choices — on palette, joinery, lighting, glazing — that make a residential project measurably lighter.' },
  { date: '08 February 2025', author: 'Projects', tag: 'Process', title: 'How to furnish a house, slowly.', excerpt: 'A working method for furnishing a Dubai residence without the showroom shortcut — for owners who want the house to feel inevitable.' },
  { date: '18 January 2025', author: 'Design Desk', tag: 'Philosophy', title: 'We focus on comfort, and the gorgeous follows.', excerpt: 'A short essay on why the word "comfortable" has been ceded to hotel marketing — and what a serious interior studio does with it instead.' },
  { date: '14 January 2025', author: 'Projects', tag: 'Field Note', title: 'Solutions, not deliverables — a field note on contracting.', excerpt: 'What changes when a fit-out team treats a problem as a design question, not a scope variation. Notes from a month on a DIFC site.' },
  { date: '05 January 2025', author: 'Studio', tag: 'Method', title: 'The cost of a good idea, and other interior economics.', excerpt: 'On value engineering, its uses, its abuses, and the line between a clever specification and a compromised one.' },
];

function NewsPage() {
  return (
    <>
      <section className="relative min-h-[60vh] flex items-center px-6 md:px-12 pt-16 overflow-hidden">
        <Photo src={IMG.blog1} className="absolute inset-0" overlay={0}>
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(10,10,10,0.8) 0%, rgba(10,10,10,0.94) 100%)' }} />
        </Photo>
        <div className="max-w-[1440px] mx-auto w-full relative">
          <Eyebrow num="Journal · 2025" label="Latest News & Articles" />
          <h1 className="font-display text-[56px] md:text-[128px] leading-[0.96] mt-8 text-ivory">
            <SplitLines text={['Notes from']} />
            <SplitLines text={['the studio.']} delay={0.12}>
              <em className="font-display-it text-gold">the studio.</em>
            </SplitLines>
          </h1>
        </div>
      </section>

      {/* Featured */}
      <section className="relative py-20 px-6 md:px-12">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <MaskReveal>
              <Photo src={IMG.blog1} className="aspect-[5/4]" overlay={0.15}>
                <div className="absolute top-4 left-4 font-mono-mini text-gold bg-[rgba(10,10,10,0.6)] px-3 py-1 backdrop-blur-sm">{ARTICLES[0].tag}</div>
              </Photo>
            </MaskReveal>
            <div>
              <div className="font-mono-mini text-gold">{ARTICLES[0].tag} · {ARTICLES[0].date}</div>
              <h2 className="font-display text-[40px] md:text-[64px] leading-[1.04] mt-6 text-ivory">{ARTICLES[0].title}</h2>
              <p className="mt-8 text-[var(--ivory-dim)] text-lg leading-relaxed">{ARTICLES[0].excerpt}</p>
              <div className="mt-10 flex items-center gap-6">
                <Magnetic><button className="btn-gold">Read the Piece →</button></Magnetic>
                <span className="font-mono-mini text-[var(--ivory-faint)]">6 min read · by {ARTICLES[0].author}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="relative py-20 px-6 md:px-12 border-t border-[var(--hairline)]">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex items-end justify-between mb-16">
            <h2 className="font-display text-[40px] md:text-[56px] text-ivory">All dispatches</h2>
            <div className="font-mono-mini text-[var(--ivory-faint)]">{ARTICLES.length} articles</div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {ARTICLES.slice(1).map((a, i) => (
              <article key={i} className="group cursor-none">
                <Photo src={[IMG.blog2, IMG.blog3, IMG.blog4, IMG.blog5, IMG.blog6][i] || IMG.blog2} className="aspect-[4/5]" overlay={0.15}>
                  <div className="absolute top-4 left-4 font-mono-mini text-gold bg-[rgba(10,10,10,0.6)] px-3 py-1 backdrop-blur-sm">{a.tag}</div>
                </Photo>
                <div className="pt-6">
                  <div className="flex items-center gap-4 font-mono-mini text-[var(--ivory-faint)]">
                    <span className="text-gold">{a.tag}</span>
                    <span>·</span>
                    <span>{a.date}</span>
                  </div>
                  <h3 className="mt-4 font-display text-2xl md:text-[30px] leading-tight text-ivory group-hover:text-gold transition-colors">{a.title}</h3>
                  <p className="mt-4 text-[var(--ivory-dim)] leading-relaxed">{a.excerpt}</p>
                  <div className="mt-6 flex items-center justify-between">
                    <span className="font-mono-mini text-gold link-underline">Read Article →</span>
                    <span className="font-mono-mini text-[var(--ivory-faint)]">by {a.author}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* ============================================================ */
/* CONTACT PAGE                                                  */
/* ============================================================ */
function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', type: 'Commercial', message: '' });

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setSent(true);
  };

  return (
    <>
      <section className="relative min-h-[60vh] flex items-center px-6 md:px-12 pt-16 overflow-hidden">
        <Photo src={IMG.heroAlt} className="absolute inset-0" overlay={0}>
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(10,10,10,0.82) 0%, rgba(10,10,10,0.94) 100%)' }} />
        </Photo>
        <div className="max-w-[1440px] mx-auto w-full relative">
          <Eyebrow num="Contact · Al Qusais, Dubai" label="Let's Build Something Together" />
          <h1 className="font-display text-[56px] md:text-[128px] leading-[0.96] mt-8 text-ivory">
            <SplitLines text={['One brief,']} />
            <SplitLines text={['one conversation.']} delay={0.12}>
              <em className="font-display-it text-gold">one conversation.</em>
            </SplitLines>
          </h1>
        </div>
      </section>

      {/* Split layout */}
      <section className="relative py-20 px-6 md:px-12">
        <div className="max-w-[1440px] mx-auto grid lg:grid-cols-12 gap-14">
          {/* Form */}
          <div className="lg:col-span-7">
            <div className="font-mono-mini text-gold mb-8">01 · Tell us about your project</div>
            <APPP mode="wait">
              {!sent ? (
                <MPP.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }}
                  onSubmit={submit} className="space-y-10">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <div className="field-label">Name</div>
                      <input className="field" value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Your full name" required />
                    </div>
                    <div>
                      <div className="field-label">Email</div>
                      <input type="email" className="field" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="you@domain.com" required />
                    </div>
                    <div>
                      <div className="field-label">Phone</div>
                      <input className="field" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="+971 ..." />
                    </div>
                    <div>
                      <div className="field-label">Project Type</div>
                      <select className="field" value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
                        <option>Retail</option><option>Hospitality</option><option>Commercial</option>
                        <option>Residential</option><option>Theme Park</option><option>Special Project</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <div className="field-label">The brief</div>
                    <textarea className="field" rows="4" value={form.message} onChange={e => setForm({...form, message: e.target.value})} placeholder="A few lines about what you're building, where, and by when." />
                  </div>
                  <div className="flex items-center gap-6 pt-4">
                    <Magnetic><button type="submit" className="btn-gold">Send Brief →</button></Magnetic>
                    <span className="font-mono-mini text-[var(--ivory-faint)]">Typical reply — within one working day</span>
                  </div>
                </MPP.form>
              ) : (
                <MPP.div key="sent" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  className="py-16 border border-[var(--hairline)] text-center px-8">
                  <div className="font-mono-mini text-gold mb-6">Brief received · 01</div>
                  <h3 className="font-display text-4xl md:text-5xl text-ivory">Thank you, {form.name.split(' ')[0] || 'friend'}.</h3>
                  <p className="mt-6 text-[var(--ivory-dim)] max-w-md mx-auto leading-relaxed">A project director will be in touch shortly. In the meantime, if the brief is urgent, reach us directly on WhatsApp.</p>
                  <div className="mt-10 flex flex-wrap justify-center gap-4">
                    <a href="https://wa.me/971554447864" className="btn-gold">WhatsApp the Studio →</a>
                    <button onClick={() => { setSent(false); setForm({ name: '', email: '', phone: '', type: 'Commercial', message: '' }); }} className="btn-ghost">Send Another</button>
                  </div>
                </MPP.div>
              )}
            </APPP>
          </div>

          {/* Info */}
          <div className="lg:col-span-5 lg:pl-8 lg:border-l lg:border-[var(--hairline)]">
            <div className="font-mono-mini text-gold mb-8">02 · Direct lines</div>
            <div className="space-y-10">
              <div>
                <div className="field-label mb-3">Studio</div>
                <div className="font-display text-xl text-ivory leading-relaxed">Al Qusais Industrial Area<br/>P.O. Box 234127<br/>Dubai · United Arab Emirates</div>
              </div>

              <div>
                <div className="field-label mb-3">Speak directly</div>
                <div className="space-y-2">
                  <a href="tel:+971554447864" className="flex items-center justify-between group">
                    <span className="font-display text-xl text-ivory group-hover:text-gold transition-colors">+971 55 444 7864</span>
                    <span className="font-mono-mini text-[var(--ivory-faint)]">Direct</span>
                  </a>
                  <a href="tel:+97143361168" className="flex items-center justify-between group">
                    <span className="font-display text-xl text-ivory group-hover:text-gold transition-colors">+971 4 336 1168</span>
                    <span className="font-mono-mini text-[var(--ivory-faint)]">Office</span>
                  </a>
                  <a href="tel:+97142838570" className="flex items-center justify-between group">
                    <span className="font-display text-xl text-ivory group-hover:text-gold transition-colors">+971 4 283 8570</span>
                    <span className="font-mono-mini text-[var(--ivory-faint)]">Secondary</span>
                  </a>
                </div>
              </div>

              <div>
                <div className="field-label mb-3">Write</div>
                <a href="mailto:sales@infinity-fitout.com" className="font-display text-xl text-gold link-underline">sales@infinity-fitout.com</a>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-6">
                <a href="mailto:sales@infinity-fitout.com" className="btn-ghost justify-center">Email →</a>
                <a href="https://wa.me/971554447864" className="btn-gold justify-center">WhatsApp →</a>
              </div>

              <div className="pt-10">
                <div className="field-label mb-4">Elsewhere</div>
                <div className="flex gap-5">
                  {['Twitter','Facebook','LinkedIn','Pinterest'].map((s) => (
                    <a key={s} href="#" className="font-mono-mini text-[var(--ivory-dim)] hover:text-gold transition-colors">{s}</a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="relative py-16 px-6 md:px-12">
        <div className="max-w-[1440px] mx-auto">
          <div className="font-mono-mini text-gold mb-6">03 · Find us</div>
          <div className="relative aspect-[16/7] border border-[var(--hairline)] overflow-hidden">
            <iframe
              title="Al Qusais, Dubai"
              src="https://www.openstreetmap.org/export/embed.html?bbox=55.3750%2C25.2750%2C55.4200%2C25.3100&layer=mapnik&marker=25.2920%2C55.3960"
              className="absolute inset-0 w-full h-full"
              style={{ filter: 'grayscale(1) invert(0.92) contrast(0.9)' }}
              loading="lazy"
            />
            <div className="absolute top-6 left-6 bg-[var(--ink)] border border-[var(--gold)] px-5 py-3 pointer-events-none">
              <div className="font-mono-mini text-gold">Infinity Turnkey Interiors</div>
              <div className="font-display text-ivory mt-1">Al Qusais, Dubai</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

Object.assign(window, { AssociatesPage, NewsPage, ContactPage });
