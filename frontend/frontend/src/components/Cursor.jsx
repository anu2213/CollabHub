import { useEffect, useRef } from 'react';
import styles from './Cursor.module.css';

export default function Cursor() {
  const ringRef = useRef(null);
  const dotRef  = useRef(null);
  const mouse   = useRef({ x: -200, y: -200 });
  const smooth  = useRef({ x: -200, y: -200 });
  const raf     = useRef(null);

  useEffect(() => {
    /* ── track raw mouse position ── */
    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      /* dot snaps instantly */
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + 'px';
        dotRef.current.style.top  = e.clientY + 'px';
      }
    };

    /* ── rAF loop: ring lags behind ── */
    const lerp = (a, b, t) => a + (b - a) * t;
    const tick = () => {
      smooth.current.x = lerp(smooth.current.x, mouse.current.x, 0.11);
      smooth.current.y = lerp(smooth.current.y, mouse.current.y, 0.11);
      if (ringRef.current) {
        ringRef.current.style.left = smooth.current.x + 'px';
        ringRef.current.style.top  = smooth.current.y + 'px';
      }
      raf.current = requestAnimationFrame(tick);
    };

    /* ── hover state via event delegation ── */
    const onOver = (e) => {
      const t = e.target.closest('a, button, input, textarea, select, [data-hover]');
      if (t) {
        ringRef.current?.classList.add(styles.big);
        dotRef.current?.classList.add(styles.dotBig);
      }
    };
    const onOut = (e) => {
      const t = e.target.closest('a, button, input, textarea, select, [data-hover]');
      if (t) {
        ringRef.current?.classList.remove(styles.big);
        dotRef.current?.classList.remove(styles.dotBig);
      }
    };
    const onDown = () => ringRef.current?.classList.add(styles.pressed);
    const onUp   = () => ringRef.current?.classList.remove(styles.pressed);

    document.addEventListener('mousemove',  onMove);
    document.addEventListener('mouseover',  onOver);
    document.addEventListener('mouseout',   onOut);
    document.addEventListener('mousedown',  onDown);
    document.addEventListener('mouseup',    onUp);
    raf.current = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener('mousemove',  onMove);
      document.removeEventListener('mouseover',  onOver);
      document.removeEventListener('mouseout',   onOut);
      document.removeEventListener('mousedown',  onDown);
      document.removeEventListener('mouseup',    onUp);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className={styles.ring} />
      <div ref={dotRef}  className={styles.dot}  />
    </>
  );
}
