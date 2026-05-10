import { useRef, useEffect, useState } from 'react';
import styles from './Reveal.module.css';

/* ─────────────────────────────────────────────────────────
   useInView  –  fires once when element enters viewport
───────────────────────────────────────────────────────── */
function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } },
      { threshold, rootMargin: '0px 0px -24px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, seen];
}

/* ─────────────────────────────────────────────────────────
   Reveal  –  single element, fades + slides in on scroll
   Props:
     delay     (ms)   – how long to wait after becoming visible
     duration  (ms)   – animation length
     direction – 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade'
     distance  (px)   – how far to travel (default 28)
───────────────────────────────────────────────────────── */
export function Reveal({
  children,
  delay     = 0,
  duration  = 650,
  direction = 'up',
  distance  = 28,
  className = '',
  as: Tag   = 'div',
}) {
  const [ref, seen] = useInView(0.1);

  const transforms = {
    up:    `translateY(${distance}px)`,
    down:  `translateY(-${distance}px)`,
    left:  `translateX(-${distance}px)`,
    right: `translateX(${distance}px)`,
    scale: 'scale(0.90)',
    fade:  'none',
  };

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity:    seen ? 1 : 0,
        transform:  seen ? 'none' : (transforms[direction] ?? transforms.up),
        transition: `opacity ${duration}ms cubic-bezier(.22,1,.36,1) ${delay}ms,
                     transform ${duration}ms cubic-bezier(.22,1,.36,1) ${delay}ms`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </Tag>
  );
}

/* ─────────────────────────────────────────────────────────
   Lines  –  splits text or children array, reveals each
             line one by one (the "lines coming one by one"
             effect the user asked for)
   Usage:
     <Lines stagger={80}>
       One line of text
       Another line
     </Lines>
     – or –
     <Lines items={['Line 1','Line 2','Line 3']} />
───────────────────────────────────────────────────────── */
export function Lines({
  children,
  items,
  stagger   = 80,
  baseDelay = 0,
  duration  = 600,
  direction = 'up',
  distance  = 22,
  className = '',
  lineClass = '',
}) {
  const list = items ?? (Array.isArray(children) ? children : [children]);
  return (
    <div className={className}>
      {list.map((line, i) => (
        <Reveal
          key={i}
          as="div"
          delay={baseDelay + i * stagger}
          duration={duration}
          direction={direction}
          distance={distance}
          className={lineClass}
        >
          {line}
        </Reveal>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Stagger  –  wraps any array of JSX children, each
               gets its own Reveal with incremental delay
───────────────────────────────────────────────────────── */
export function Stagger({
  children,
  stagger   = 90,
  baseDelay = 0,
  duration  = 660,
  direction = 'up',
  distance  = 28,
}) {
  const kids = Array.isArray(children) ? children : [children];
  return (
    <>
      {kids.map((child, i) => (
        <Reveal
          key={i}
          delay={baseDelay + i * stagger}
          duration={duration}
          direction={direction}
          distance={distance}
        >
          {child}
        </Reveal>
      ))}
    </>
  );
}

/* ─────────────────────────────────────────────────────────
   TiltCard  –  3-D mouse-tracking tilt with light sheen
───────────────────────────────────────────────────────── */
export function TiltCard({ children, className = '', style: s = {} }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width  - 0.5) * 14;
      const y = ((e.clientY - r.top)  / r.height - 0.5) * 14;
      el.style.transform  = `perspective(900px) rotateX(${-y}deg) rotateY(${x}deg) scale(1.025)`;
      el.style.transition = 'transform .08s ease';
      const shine = el.querySelector('[data-shine]');
      if (shine) {
        const px = ((e.clientX - r.left) / r.width)  * 100;
        const py = ((e.clientY - r.top)  / r.height) * 100;
        shine.style.background =
          `radial-gradient(circle at ${px}% ${py}%, rgba(255,255,255,.08), transparent 55%)`;
      }
    };

    const onLeave = () => {
      el.style.transform  = 'perspective(900px) rotateX(0) rotateY(0) scale(1)';
      el.style.transition = 'transform .55s cubic-bezier(.22,1,.36,1)';
    };

    el.addEventListener('mousemove',  onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove',  onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div ref={ref} className={`${styles.tiltCard} ${className}`} style={s}>
      <div data-shine className={styles.shine} />
      {children}
    </div>
  );
}
