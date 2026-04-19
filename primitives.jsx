/* ============ SHARED PRIMITIVES ============ */
const { motion, AnimatePresence } = window.FramerMotion;
const { useEffect, useRef, useState, useLayoutEffect, useMemo, createContext, useContext } = React;

/* ---------- Route context ---------- */
const RouteCtx = createContext({ route: 'home', go: () => {} });
const useRoute = () => useContext(RouteCtx);

/* ---------- IntersectionObserver hook ---------- */
function useInView(options = { threshold: 0.2 }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); io.disconnect(); }
    }, options);
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return [ref, inView];
}

/* ---------- Split lines ---------- */
function SplitLines({ text, className = "", delay = 0, as: Tag = 'span' }) {
  const [ref, inView] = useInView({ threshold: 0.3 });
  const lines = Array.isArray(text) ? text : [text];
  return (
    <Tag ref={ref} className={className}>
      {lines.map((ln, i) => (
        <span key={i} className="line-mask block">
          <span className={`line-inner ${inView ? 'in' : ''}`} style={{ transitionDelay: `${delay + i * 0.09}s` }}>
            {ln}
          </span>
        </span>
      ))}
    </Tag>
  );
}

/* ---------- Section eyebrow ---------- */
function Eyebrow({ num, label }) {
  return (
    <div className="flex items-center gap-4">
      {num && <span className="font-mono-mini text-gold">{num}</span>}
      <span className="h-px w-10 bg-[var(--gold)] opacity-60" />
      <span className="font-eyebrow text-[var(--ivory-dim)]">{label}</span>
    </div>
  );
}

/* ---------- Magnetic wrapper ---------- */
function Magnetic({ children, strength = 0.3, className = "" }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const move = (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width/2);
      const y = e.clientY - (r.top + r.height/2);
      el.style.transform = `translate(${x*strength}px, ${y*strength}px)`;
    };
    const leave = () => { el.style.transform = 'translate(0,0)'; };
    el.addEventListener('mousemove', move);
    el.addEventListener('mouseleave', leave);
    return () => { el.removeEventListener('mousemove', move); el.removeEventListener('mouseleave', leave); };
  }, [strength]);
  return <div ref={ref} className={`magnetic ${className}`}>{children}</div>;
}

/* ---------- Placeholder image ---------- */
function Placeholder({ label, variant = 1, className = "", children }) {
  return (
    <div className={`ph ph-${variant} ${className}`}>
      {label && <div className="ph-label">{label}</div>}
      {children}
    </div>
  );
}

/* ---------- Animated counter ---------- */
function Counter({ to, suffix = "", duration = 2000 }) {
  const [ref, inView] = useInView({ threshold: 0.4 });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf, start;
    const step = (t) => {
      if (!start) start = t;
      const p = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.floor(eased * to));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);
  return <span ref={ref} className="stat-num">{n}{suffix}</span>;
}

/* ---------- Expertise bar ---------- */
function ExpertiseBar({ label, pct }) {
  const [ref, inView] = useInView({ threshold: 0.4 });
  return (
    <div ref={ref} className="py-5">
      <div className="flex justify-between items-baseline mb-3">
        <span className="font-display text-[22px] md:text-[26px] text-ivory">{label}</span>
        <span className="font-mono-mini text-gold">{pct}%</span>
      </div>
      <div className="bar-track">
        <div className={`bar-fill ${inView ? 'in' : ''}`} style={{ transform: inView ? `scaleX(${pct/100})` : 'scaleX(0)' }} />
      </div>
    </div>
  );
}

/* ---------- Mask reveal wrapper ---------- */
function MaskReveal({ children, className = "", delay = 0 }) {
  const [ref, inView] = useInView({ threshold: 0.1, rootMargin: '0px 0px -10% 0px' });
  const [forceIn, setForceIn] = useState(false);
  useEffect(() => {
    const id = setTimeout(() => setForceIn(true), 1400);
    return () => clearTimeout(id);
  }, []);
  return (
    <div ref={ref} className={`mask-reveal ${(inView || forceIn) ? 'in' : ''} ${className}`} style={{ transitionDelay: `${delay}s` }}>
      {children}
    </div>
  );
}

/* ---------- Reveal: fade + slide + soft blur on enter viewport ---------- */
function Reveal({ children, className = "", delay = 0, y = 24, blur = 4, duration = 1.0, as: Tag = 'div' }) {
  const [ref, inView] = useInView({ threshold: 0.12, rootMargin: '0px 0px -48px 0px' });
  const [forceIn, setForceIn] = useState(false);
  useEffect(() => {
    const id = setTimeout(() => setForceIn(true), 1600);
    return () => clearTimeout(id);
  }, []);
  const active = inView || forceIn;
  const style = {
    opacity: active ? 1 : 0,
    transform: active ? 'translate3d(0,0,0)' : `translate3d(0,${y}px,0)`,
    filter: active ? 'blur(0px)' : `blur(${blur}px)`,
    transition: `opacity ${duration}s cubic-bezier(.2,.8,.2,1) ${delay}s, transform ${duration}s cubic-bezier(.2,.8,.2,1) ${delay}s, filter ${duration}s cubic-bezier(.2,.8,.2,1) ${delay}s`,
    willChange: 'opacity, transform, filter',
  };
  return <Tag ref={ref} className={className} style={style}>{children}</Tag>;
}

/* ---------- Stagger: clones children with sequential reveal delays ---------- */
function Stagger({ children, step = 0.08, base = 0, y = 20, blur = 3, duration = 0.9 }) {
  return React.Children.map(children, (child, i) => {
    if (!React.isValidElement(child)) return child;
    return <Reveal delay={base + i * step} y={y} blur={blur} duration={duration} as={'div'}>{child}</Reveal>;
  });
}

/* ---------- ImageRise: MaskReveal + slight zoom-out as it reveals ---------- */
function ImageRise({ children, className = '', delay = 0 }) {
  const [ref, inView] = useInView({ threshold: 0.1, rootMargin: '0px 0px -10% 0px' });
  const [forceIn, setForceIn] = useState(false);
  useEffect(() => {
    const id = setTimeout(() => setForceIn(true), 1600);
    return () => clearTimeout(id);
  }, []);
  const active = inView || forceIn;
  return (
    <div
      ref={ref}
      className={`image-rise ${active ? 'in' : ''} ${className}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

/* ---------- Hairline that draws in ---------- */
function DrawLine({ className = "", delay = 0, duration = 1.2 }) {
  const [ref, inView] = useInView({ threshold: 0.3 });
  return (
    <div ref={ref} className={`hairline-gold ${className}`} style={{
      transform: inView ? 'scaleX(1)' : 'scaleX(0)',
      transformOrigin: 'left',
      transition: `transform ${duration}s cubic-bezier(.77,0,.18,1) ${delay}s`
    }} />
  );
}

/* ---------- GlowCard: spotlight card adapted from 21st.dev spotlight-card.tsx
     Source used data-glow attribute + ::before/::after radial gradients that follow
     the cursor via CSS custom properties. Port keeps the visual behaviour but uses a
     single document-level pointer listener (useGlowPointer) that writes the coords
     to the html element, so every data-glow card inherits them through var(), instead
     of attaching one listener per card. ---------- */

let __glowListenerAttached = false;
function useGlowPointer() {
  useEffect(() => {
    if (__glowListenerAttached) return;
    __glowListenerAttached = true;
    const sync = (e) => {
      const root = document.documentElement;
      root.style.setProperty('--glow-x', e.clientX.toFixed(2));
      root.style.setProperty('--glow-y', e.clientY.toFixed(2));
      root.style.setProperty('--glow-xp', (e.clientX / window.innerWidth).toFixed(3));
      root.style.setProperty('--glow-yp', (e.clientY / window.innerHeight).toFixed(3));
    };
    document.addEventListener('pointermove', sync, { passive: true });
    return () => {
      document.removeEventListener('pointermove', sync);
      __glowListenerAttached = false;
    };
  }, []);
}

const GlowCard = React.forwardRef(function GlowCard(
  { children, className = '', style, as: Tag = 'div', hue = 44, spread = 50, ...rest },
  ref
) {
  const mergedStyle = Object.assign({ '--glow-base': hue, '--glow-spread': spread }, style || {});
  return (
    <Tag ref={ref} data-glow className={`glow-card ${className}`} style={mergedStyle} {...rest}>
      <span data-glow-inner aria-hidden="true" />
      {children}
    </Tag>
  );
});

/* ---------- HoverButton: cursor-trail particle button, adapted from 21st.dev hover-button.tsx
     Source was TSX + shadcn cn() + glassmorphism. Rewritten for babel-standalone:
      - No cn(); plain string concat for className merging
      - No forwardRef needed (Magnetic wraps these, uses its own ref on a span wrapper)
      - Preserves existing btn-gold / btn-ghost CSS so no visual regression
      - Particle colour switches per variant: ivory-ish on gold, gold on ghost
---------- */
function HoverButton({ children, className = '', variant = 'gold', as: Tag = 'button', ...rest }) {
  const [circles, setCircles] = useState([]);
  const lastAddedRef = useRef(0);
  const listeningRef = useRef(false);

  const onPointerEnter = () => { listeningRef.current = true; };
  const onPointerLeave = () => { listeningRef.current = false; };
  const onPointerMove = (e) => {
    if (!listeningRef.current) return;
    const now = performance.now();
    if (now - lastAddedRef.current < 90) return;
    lastAddedRef.current = now;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xp = Math.max(0, Math.min(1, rect.width ? x / rect.width : 0.5));
    const color = `linear-gradient(90deg, var(--circle-start) ${xp * 100}%, var(--circle-end) ${xp * 100}%)`;
    const id = now + Math.random();
    setCircles(prev => [...prev, { id, x, y, color, fadeState: null }]);
    setTimeout(() => setCircles(prev => prev.map(c => c.id === id ? { ...c, fadeState: 'in' } : c)), 0);
    setTimeout(() => setCircles(prev => prev.map(c => c.id === id ? { ...c, fadeState: 'out' } : c)), 900);
    setTimeout(() => setCircles(prev => prev.filter(c => c.id !== id)), 2200);
  };

  const baseCls = variant === 'ghost' ? 'btn-ghost hover-btn' : 'btn-gold hover-btn';
  return (
    <Tag
      className={`${baseCls} ${className}`}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onPointerMove={onPointerMove}
      {...rest}
    >
      {circles.map(c => (
        <span
          key={c.id}
          className={`hover-btn-circle${c.fadeState === 'in' ? ' is-in' : c.fadeState === 'out' ? ' is-out' : ''}`}
          style={{ left: `${c.x}px`, top: `${c.y}px`, background: c.color }}
          aria-hidden="true"
        />
      ))}
      <span className="hover-btn-content">{children}</span>
    </Tag>
  );
}

/* expose for other scripts */
Object.assign(window, { SplitLines, Eyebrow, Magnetic, Placeholder, Counter, ExpertiseBar, MaskReveal, Reveal, Stagger, ImageRise, GlowCard, useGlowPointer, HoverButton, DrawLine, useInView, RouteCtx, useRoute });
