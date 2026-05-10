import { useState, useEffect, useRef } from 'react';
import { Btn, Tag } from '../components/UI';
import { Reveal, Lines, Stagger, TiltCard } from '../components/Reveal';
import { useTypewriter, useMagnet } from '../components/hooks';
import { PROJECTS, USERS } from '../data/mockData';
import styles from './Home.module.css';

/* ── animated counter ──────────────────────── */
function Counter({ target, suffix = '' }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let v = 0; const step = target / 55;
    const t = setInterval(() => {
      v += step;
      if (v >= target) { setN(target); clearInterval(t); }
      else setN(Math.floor(v));
    }, 18);
    return () => clearInterval(t);
  }, [target]);
  return <>{n.toLocaleString()}{suffix}</>;
}

/* ── magnetic button ────────────────────────── */
function MagBtn({ children, onClick, variant, size }) {
  const ref = useMagnet(0.4);
  return (
    <div ref={ref} style={{ display: 'inline-block' }}>
      <Btn onClick={onClick} variant={variant} size={size}>{children}</Btn>
    </div>
  );
}

/* ── floating particle canvas ───────────────── */
function Particles() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext('2d');
    let W = c.width = c.offsetWidth, H = c.height = c.offsetHeight;
    const pts = Array.from({ length: 60 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 1.2 + 0.3,
      vx: (Math.random() - .5) * .2, vy: (Math.random() - .5) * .2,
      o: Math.random() * .35 + .07,
    }));
    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      pts.forEach((d, i) => {
        d.x += d.vx; d.y += d.vy;
        if (d.x < 0) d.x = W; if (d.x > W) d.x = 0;
        if (d.y < 0) d.y = H; if (d.y > H) d.y = 0;
        ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,107,43,${d.o})`; ctx.fill();
        for (let j = i + 1; j < pts.length; j++) {
          const b = pts[j], dx = d.x - b.x, dy = d.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 110) {
            ctx.beginPath(); ctx.moveTo(d.x, d.y); ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(255,107,43,${.055 * (1 - dist / 110)})`;
            ctx.lineWidth = .5; ctx.stroke();
          }
        }
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    const resize = () => { W = c.width = c.offsetWidth; };
    window.addEventListener('resize', resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={ref} className={styles.particles} />;
}

/* ── data ───────────────────────────────────── */
const STATS = [
  { value: 1240, suffix: '+', label: 'Students Registered' },
  { value: 380,  suffix: '+', label: 'Projects Posted' },
  { value: 95,   suffix: '+', label: 'Hackathons Won' },
  { raw: '4.9★',              label: 'Student Rating' },
];
const FEATURES = [
  { icon: '⚙', title: 'AI Teammate Matching',  desc: 'Enter your skills and let AI find your perfect complement.', color: 'var(--orange)' },
  { icon: '◈', title: 'Project Idea Generator', desc: 'Type a domain like "Healthcare + AI" and get a full concept.',color: 'var(--violet)' },
  { icon: '△', title: 'Skill Gap Analyzer',     desc: 'AI tells you exactly what to learn for your next project.',  color: 'var(--cyan)'   },
  { icon: '○', title: 'Hackathon Team Builder', desc: 'Auto-assemble a balanced team for any hackathon.',           color: 'var(--pink)'   },
];

/* ═══════════════════════════════════════════════════════ */
export default function Home({ setPage }) {
  const [search, setSearch] = useState('');
  const typed = useTypewriter(
    ['your next hackathon.', 'the perfect project.', 'something legendary.', 'your dream startup.'],
    72, 2000
  );

  return (
    <div className={styles.page}>

      {/* ══════════════ HERO ══════════════ */}
      <section className={styles.hero}>
        <Particles />

        <div className={styles.heroInner}>

          {/* left column — every element is its own line reveal */}
          <div className={styles.heroLeft}>

            {/* badge */}
            <Reveal delay={0} duration={600} direction="up">
              <span className={styles.badge}>
                <span className={styles.badgeDot} />
                AI-Powered · Student-First · Open Source
              </span>
            </Reveal>

            {/* headline — two lines come up one by one */}
            <Lines
              items={[
                <span className={styles.heroLine}>Find the perfect team</span>,
                <span className={styles.heroLine}>
                  <span className={styles.heroFor}>for </span>
                  <span className={styles.typed}>
                    {typed}<span className={styles.caret}>|</span>
                  </span>
                </span>,
              ]}
              baseDelay={100}
              stagger={130}
              duration={720}
              distance={32}
            />

            {/* sub – one line */}
            <Reveal delay={380} duration={650} direction="up" distance={22}>
              <p className={styles.heroSub}>
                Connect with skilled students, post your project ideas,
                and let AI match you with the right teammates.
              </p>
            </Reveal>

            {/* search */}
            <Reveal delay={480} duration={600} direction="up" distance={20}>
              <div className={styles.searchRow}>
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && setPage('explore')}
                  placeholder="Search by skill, domain, or project…"
                  className={styles.searchInput}
                />
                <Btn onClick={() => setPage('explore')}>Search</Btn>
              </div>
            </Reveal>

            {/* CTAs */}
            <Reveal delay={570} duration={580} direction="up" distance={18}>
              <div className={styles.heroCtas}>
                <MagBtn onClick={() => setPage('hackathon')} size="lg">🚀 Find Hackathon Team</MagBtn>
                <MagBtn onClick={() => setPage('explore')} variant="outline" size="lg">Explore Projects</MagBtn>
              </div>
            </Reveal>
          </div>

          {/* right — live card, rows come in from left one by one */}
          <Reveal direction="right" delay={250} duration={780}>
            <div className={styles.liveCard}>
              <div className={styles.liveHead}>
                <span className={styles.liveDot} /> LIVE ACTIVITY
              </div>
              <Lines
                items={USERS.slice(0, 4).map(u => (
                  <div className={styles.liveRow}>
                    <span className={styles.livePip} style={{ background: u.color, boxShadow: `0 0 8px ${u.color}88` }} />
                    <span className={styles.liveName}>{u.name}</span>
                    <span className={styles.liveRole}>{u.role}</span>
                  </div>
                ))}
                baseDelay={420}
                stagger={85}
                direction="left"
                duration={520}
                distance={20}
              />
              <div className={styles.liveFooter}>
                <span className={styles.onlineDot} />
                4 students online now
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════ STATS ══════════════ */}
      <section className={styles.statsBar}>
        <div className={styles.container}>
          <Stagger stagger={75} direction="up" distance={20}>
            {STATS.map(s => (
              <div key={s.label} className={styles.stat}>
                <div className={styles.statVal}>
                  {s.raw ? s.raw : <Counter target={s.value} suffix={s.suffix} />}
                </div>
                <div className={styles.statLabel}>{s.label}</div>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ══════════════ FEATURES ══════════════ */}
      <section className={styles.section}>
        <div className={styles.container}>

          {/* section header — three lines, one by one */}
          <Lines
            items={[
              <span className={styles.sectionLabel}>What we offer</span>,
              <h2 className={styles.sectionTitle}>Everything you need to collaborate</h2>,
              <p className={styles.sectionSub}>Powered by AI, built for students who ship.</p>,
            ]}
            baseDelay={0}
            stagger={90}
            duration={600}
          />

          <div className={styles.featureGrid} style={{ marginTop: 40 }}>
            <Stagger stagger={95} direction="up" distance={26}>
              {FEATURES.map(f => (
                <TiltCard key={f.title} className={styles.featureCard}>
                  <div className={styles.featureGlow}
                    style={{ background: `radial-gradient(circle at 50% 115%, ${f.color}22, transparent 65%)` }} />
                  <span className={styles.featureIcon} style={{ color: f.color }}>{f.icon}</span>
                  <h3 className={styles.featureTitle}>{f.title}</h3>
                  <p className={styles.featureDesc}>{f.desc}</p>
                </TiltCard>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      {/* ══════════════ PROJECTS ══════════════ */}
      <section className={styles.sectionAlt}>
        <div className={styles.container}>

          <Reveal direction="up" delay={0}>
            <div className={styles.sectionRowHead}>
              <div>
                <span className={styles.sectionLabel}>Featured</span>
                <h2 className={styles.sectionTitle}>Active Projects</h2>
              </div>
              <MagBtn onClick={() => setPage('explore')} variant="outline">View All →</MagBtn>
            </div>
          </Reveal>

          <div className={styles.projectGrid}>
            <Stagger stagger={110} direction="up" distance={30}>
              {PROJECTS.filter(p => p.open).slice(0, 3).map(p => (
                <TiltCard key={p.id}>
                  <div className={styles.projCard}>
                    <div className={styles.projTop}>
                      <div className={styles.projTags}>
                        <Tag color={p.type === 'Hackathon' ? 'amber' : 'blue'}>{p.type}</Tag>
                        <Tag color={p.domain === 'AI' ? 'orange' : 'muted'}>{p.domain}</Tag>
                        {p.open && <Tag color="green">Open</Tag>}
                      </div>
                      <span className={styles.projMeta}>{p.members.length}/{p.teamSize}</span>
                    </div>
                    <h3 className={styles.projTitle}>{p.title}</h3>
                    <p className={styles.projDesc}>{p.desc}</p>
                    <div className={styles.projSkills}>
                      {p.skills.map(s => <Tag key={s} color="muted">{s}</Tag>)}
                    </div>
                    <div className={styles.projFooter}>
                      <span className={styles.projDate}>Due {p.deadline}</span>
                      <Btn onClick={() => setPage('explore')} variant="outline" size="sm">View →</Btn>
                    </div>
                  </div>
                </TiltCard>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      {/* ══════════════ CTA ══════════════ */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <Reveal direction="scale" duration={700}>
            <div className={styles.ctaBox}>
              <div className={styles.ctaTopLine} />
              <Lines
                items={[
                  <h2 className={styles.ctaTitle}>Ready to build something great?</h2>,
                  <p className={styles.ctaSub}>Join 1,240+ students already collaborating on CollabHub.</p>,
                ]}
                baseDelay={100}
                stagger={100}
                duration={580}
              />
              <Reveal delay={320} direction="up" distance={16}>
                <div className={styles.ctaBtns}>
                  <MagBtn onClick={() => setPage('auth')} size="lg">Create Account</MagBtn>
                  <MagBtn onClick={() => setPage('post')} variant="outline" size="lg">Post a Project</MagBtn>
                </div>
              </Reveal>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════ FOOTER ══════════════ */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerInner}>
            <div>
              <div className={styles.footerLogo}>CollabHub</div>
              <div className={styles.footerTag}>Build. Connect. Ship Together.</div>
            </div>
            <div className={styles.footerLinks}>
              {['GitHub', 'LinkedIn', 'Twitter', 'Contact', 'About'].map(l => (
                <button key={l} className={styles.footerLink}>{l}</button>
              ))}
            </div>
            <span className={styles.footerCopy}>© 2025 CollabHub — MIT License</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
