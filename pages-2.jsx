/* ============ ASSOCIATES + NEWS + CONTACT PAGES ============ */
const { motion: MPP, AnimatePresence: APPP } = window.FramerMotion;

/* ---------- Inline icons for the Contact ActionSearchBar (lucide-react replacements) ---------- */
const _IPC = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };
const IBag     = ({ s = 16 }) => <svg {..._IPC} width={s} height={s}><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>;
const IBed     = ({ s = 16 }) => <svg {..._IPC} width={s} height={s}><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/><circle cx="6" cy="13" r="2"/></svg>;
const IBrief   = ({ s = 16 }) => <svg {..._IPC} width={s} height={s}><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>;
const IHome2   = ({ s = 16 }) => <svg {..._IPC} width={s} height={s}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const ICompass = ({ s = 16 }) => <svg {..._IPC} width={s} height={s}><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>;
const IFlag    = ({ s = 16 }) => <svg {..._IPC} width={s} height={s}><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>;
const ISearchIcon = ({ s = 16 }) => <svg {..._IPC} width={s} height={s}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>;
const ISendIcon   = ({ s = 16 }) => <svg {..._IPC} width={s} height={s}><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>;
const ICheckIcon  = ({ s = 14 }) => <svg {..._IPC} width={s} height={s}><polyline points="20 6 9 17 4 12"/></svg>;

/* ---------- ActionSearchBar (adapted from 21st.dev action-search-bar.tsx)
     Source targeted shadcn Input + lucide icons + TSX. Port:
      - plain <input> with .field class, no shadcn dependency
      - lucide icons replaced with the inline set above
      - styling mapped to dark luxury: ink/gold/ivory
      - behaves as a combobox for the Project Type form field: focus opens
        filtered list, click selects, outside click collapses.   ---------- */
function ActionSearchBar({ value, onChange, actions, placeholder = 'Select sector, or type to filter' }) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const rootRef = useRef(null);

  const normalized = query.toLowerCase().trim();
  const filtered = !normalized
    ? actions
    : actions.filter(a =>
        a.label.toLowerCase().includes(normalized) ||
        (a.description || '').toLowerCase().includes(normalized));

  useEffect(() => {
    const onMouseDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setIsOpen(false);
        setQuery('');
      }
    };
    document.addEventListener('mousedown', onMouseDown);
    return () => document.removeEventListener('mousedown', onMouseDown);
  }, []);

  useEffect(() => { setHighlight(0); }, [normalized]);

  const choose = (a) => {
    onChange && onChange(a.label);
    setQuery('');
    setIsOpen(false);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Escape') { setIsOpen(false); setQuery(''); return; }
    if (!isOpen) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); setHighlight(h => Math.min(h + 1, filtered.length - 1)); }
    if (e.key === 'ArrowUp')   { e.preventDefault(); setHighlight(h => Math.max(h - 1, 0)); }
    if (e.key === 'Enter')     { e.preventDefault(); if (filtered[highlight]) choose(filtered[highlight]); }
  };

  const selected = actions.find(a => a.label === value);

  return (
    <div ref={rootRef} className="relative">
      <div className="relative">
        <div className="flex items-center gap-2">
          {selected && !isOpen && (
            <span className="text-gold shrink-0 flex items-center">{selected.icon}</span>
          )}
          <input
            type="text"
            value={isOpen ? query : (value || '')}
            placeholder={placeholder}
            onFocus={() => { setQuery(''); setIsOpen(true); }}
            onChange={(e) => { setQuery(e.target.value); setIsOpen(true); }}
            onKeyDown={onKeyDown}
            className="field pr-9"
            autoComplete="off"
          />
        </div>
        <div className="absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--ivory-faint)]">
          <APPP mode="popLayout">
            {isOpen && query.length > 0 ? (
              <MPP.div key="send" initial={{ y: -14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 14, opacity: 0 }} transition={{ duration: 0.22 }}>
                <ISendIcon />
              </MPP.div>
            ) : value && !isOpen ? (
              <MPP.div key="check" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.6, opacity: 0 }} transition={{ duration: 0.22 }} className="text-gold">
                <ICheckIcon s={16} />
              </MPP.div>
            ) : (
              <MPP.div key="search" initial={{ y: -14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 14, opacity: 0 }} transition={{ duration: 0.22 }}>
                <ISearchIcon />
              </MPP.div>
            )}
          </APPP>
        </div>
      </div>

      <APPP>
        {isOpen && (
          <MPP.div
            className="absolute top-full left-0 right-0 z-30 mt-2 bg-[var(--char)] border border-[var(--hairline)] shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden"
            initial={{ opacity: 0, y: -8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -8, height: 0 }}
            transition={{ duration: 0.28, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <ul className="py-2">
              {filtered.map((a, i) => {
                const isActive = i === highlight;
                const isSelected = value === a.label;
                return (
                  <MPP.li
                    key={a.id}
                    className={`px-4 py-3 flex items-center justify-between cursor-pointer transition-colors ${isActive ? 'bg-[var(--char2)]' : 'hover:bg-[var(--char2)]'}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.18, delay: i * 0.03 }}
                    onMouseEnter={() => setHighlight(i)}
                    onClick={() => choose(a)}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-gold shrink-0">{a.icon}</span>
                      <span className="font-display text-base text-ivory group-hover:text-gold truncate">{a.label}</span>
                      {a.description && (
                        <span className="text-xs text-[var(--ivory-faint)] font-mono-mini tracking-wider truncate hidden sm:inline">{a.description}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      {isSelected && <span className="text-gold"><ICheckIcon /></span>}
                      {a.end && <span className="text-[10px] text-gold font-mono-mini uppercase tracking-[0.2em]">{a.end}</span>}
                    </div>
                  </MPP.li>
                );
              })}
              {filtered.length === 0 && (
                <li className="px-4 py-4 text-sm text-[var(--ivory-faint)] font-mono-mini">No sector matches. Try 'retail', 'hospitality', etc.</li>
              )}
            </ul>
            <div className="px-4 py-2 border-t border-[var(--hairline)] flex items-center justify-between text-[10px] text-[var(--ivory-faint)] font-mono-mini uppercase tracking-[0.2em]">
              <span>↑ ↓ navigate · ↵ select</span>
              <span>ESC close</span>
            </div>
          </MPP.div>
        )}
      </APPP>
    </div>
  );
}

const PROJECT_TYPES = [
  { id: 'retail',       label: 'Retail',          icon: <IBag />,     description: 'Boutiques, flagship stores',       end: 'Sector 01' },
  { id: 'hospitality',  label: 'Hospitality',     icon: <IBed />,     description: 'Hotels, F&B, lounges',             end: 'Sector 02' },
  { id: 'commercial',   label: 'Commercial',      icon: <IBrief />,   description: 'Corporate floors, offices',        end: 'Sector 03' },
  { id: 'residential',  label: 'Residential',     icon: <IHome2 />,   description: 'Private villas, apartments',       end: 'Sector 04' },
  { id: 'theme',        label: 'Theme Park',      icon: <ICompass />, description: 'Immersive attractions',            end: 'Sector 05' },
  { id: 'special',      label: 'Special Project', icon: <IFlag />,    description: 'Pavilions, exhibition, bespoke',   end: 'Sector 06' },
];

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
            <Stagger step={0.025} y={14} blur={2} duration={0.6}>
              {ASSOC_CLIENTS.map((c, i) => (
                <div key={i} className="aspect-[3/2] border-b border-r border-[var(--hairline)] flex items-center justify-center relative group overflow-hidden">
                  <div className="absolute inset-0 bg-[var(--gold)] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  <span className="relative font-display text-sm md:text-lg text-[var(--ivory-dim)] group-hover:text-[var(--ink)] transition-colors duration-500 text-center px-2">{c}</span>
                </div>
              ))}
            </Stagger>
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
            <Stagger step={0.04} y={16} blur={2} duration={0.7}>
              {ASSOC_PARTNERS.map((p, i) => (
                <div key={i} className="bg-[var(--char)] aspect-[2/1] flex flex-col justify-between p-6 group hover:bg-[var(--char2)] transition-colors">
                  <div className="font-mono-mini text-gold">{String(i+1).padStart(2,'0')}</div>
                  <div className="font-display text-lg md:text-xl text-ivory">{p}</div>
                </div>
              ))}
            </Stagger>
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
            <Stagger step={0.12}>
              {[1,2,3].map((n) => (
                <div key={n} className="cert aspect-[3/4] flex items-center justify-center p-6">
                  <img src="assets/associate-partners.jpeg" alt={`Associate certificate ${n}`} className="max-w-full max-h-full object-contain" />
                  <div className="absolute top-4 left-4 font-mono-mini text-gold">CERT · 0{n}</div>
                </div>
              ))}
            </Stagger>
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
            <ImageRise>
              <Photo src={IMG.blog1} className="aspect-[5/4]" overlay={0.15}>
                <div className="absolute top-4 left-4 font-mono-mini text-gold bg-[rgba(10,10,10,0.6)] px-3 py-1 backdrop-blur-sm">{ARTICLES[0].tag}</div>
              </Photo>
            </ImageRise>
            <div>
              <Reveal><div className="font-mono-mini text-gold">{ARTICLES[0].tag} · {ARTICLES[0].date}</div></Reveal>
              <Reveal delay={0.12}>
                <h2 className="font-display text-[40px] md:text-[64px] leading-[1.04] mt-6 text-ivory">{ARTICLES[0].title}</h2>
              </Reveal>
              <Reveal delay={0.24}>
                <p className="mt-8 text-[var(--ivory-dim)] text-lg leading-relaxed">{ARTICLES[0].excerpt}</p>
              </Reveal>
              <Reveal delay={0.36} className="mt-10 flex items-center gap-6">
                <Magnetic><HoverButton>Read the Piece →</HoverButton></Magnetic>
                <span className="font-mono-mini text-[var(--ivory-faint)]">6 min read · by {ARTICLES[0].author}</span>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="relative py-20 px-6 md:px-12 border-t border-[var(--hairline)]">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex items-end justify-between mb-16">
            <Reveal>
              <h2 className="font-display text-[40px] md:text-[56px] text-ivory">All dispatches</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="font-mono-mini text-[var(--ivory-faint)]">{ARTICLES.length} articles</div>
            </Reveal>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            <Stagger step={0.1} y={40}>
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
            </Stagger>
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
                      <ActionSearchBar
                        value={form.type}
                        onChange={(val) => setForm({ ...form, type: val })}
                        actions={PROJECT_TYPES}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="field-label">The brief</div>
                    <textarea className="field" rows="4" value={form.message} onChange={e => setForm({...form, message: e.target.value})} placeholder="A few lines about what you're building, where, and by when." />
                  </div>
                  <div className="flex items-center gap-6 pt-4">
                    <Magnetic><HoverButton type="submit">Send Brief →</HoverButton></Magnetic>
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
                    <HoverButton as="a" href="https://wa.me/971554447864">WhatsApp the Studio →</HoverButton>
                    <HoverButton variant="ghost" onClick={() => { setSent(false); setForm({ name: '', email: '', phone: '', type: 'Commercial', message: '' }); }}>Send Another</HoverButton>
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
                <HoverButton as="a" variant="ghost" href="mailto:sales@infinity-fitout.com" className="justify-center">Email →</HoverButton>
                <HoverButton as="a" href="https://wa.me/971554447864" className="justify-center">WhatsApp →</HoverButton>
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

            {/* Custom colourful pin overlaid on the grayscale map */}
            <div className="map-pin absolute pointer-events-none" style={{ left: '49.7%', top: '51%' }}>
              <span className="map-pin-ring" />
              <span className="map-pin-ring map-pin-ring-2" />
              <span className="map-pin-dot" />
            </div>

            <div className="absolute top-6 left-6 bg-[var(--ink)] border border-[var(--gold)] px-5 py-3 pointer-events-none">
              <div className="font-mono-mini text-gold">Infinity Turnkey Interiors</div>
              <div className="font-display text-ivory mt-1">Al Qusais, Dubai</div>
            </div>

            <HoverButton
              as="a"
              href="https://www.google.com/maps/dir/?api=1&destination=25.2920%2C55.3960"
              target="_blank"
              rel="noreferrer"
              className="absolute bottom-6 right-6"
            >
              Drive me there →
            </HoverButton>
          </div>
        </div>
      </section>
    </>
  );
}

Object.assign(window, { AssociatesPage, NewsPage, ContactPage });
