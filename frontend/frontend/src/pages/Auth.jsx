import { Reveal, Lines } from '../components/Reveal';
import { useState } from 'react';
import { Btn, Input } from '../components/UI';
import styles from './Auth.module.css';

export default function Auth({ setPage }) {
  const [tab, setTab]       = useState('login');
  const [name, setName]     = useState('');
  const [email, setEmail]   = useState('');
  const [pass, setPass]     = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone]     = useState(false);

  const handle = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1100));
    setLoading(false);
    setDone(true);
    setTimeout(() => setPage('dashboard'), 700);
  };

  return (
    <div className={styles.page}>
      <div className={styles.left}>
        <div className={styles.leftContent}>
          <div className={styles.brand}>
            <span className={styles.brandMark}>C</span>
            <span className={styles.brandName}>CollabHub</span>
          </div>
          <h1 className={styles.tagline}>
            Students who<br />
            <span className={styles.taglineAccent}>build together,</span><br />
            win together.
          </h1>
          <ul className={styles.perks}>
            {['AI-powered teammate matching', 'Post and discover student projects', 'Hackathon team builder', 'Real-time chat & collaboration'].map(p => (
              <li key={p} className={styles.perk}>
                <span className={styles.perkCheck}>—</span>
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.form}>
          {/* Tabs */}
          <div className={styles.tabs}>
            {['login', 'signup'].map(t => (
              <button key={t} onClick={() => setTab(t)} className={`${styles.tab} ${tab === t ? styles.tabActive : ''}`}>
                {t === 'login' ? 'Sign In' : 'Create Account'}
              </button>
            ))}
          </div>

          <h2 className={styles.formTitle}>
            {tab === 'login' ? 'Welcome back' : 'Join CollabHub'}
          </h2>
          <p className={styles.formSub}>
            {tab === 'login' ? 'Sign in to your student account.' : 'Create your free account in seconds.'}
          </p>

          {/* Social */}
          <div className={styles.socialBtns}>
            <button className={styles.socialBtn}>
              <span>🐙</span> Continue with GitHub
            </button>
            <button className={styles.socialBtn}>
              <span>🔵</span> Continue with Google
            </button>
          </div>

          <div className={styles.divider}><span>or continue with email</span></div>

          <div className={styles.fields}>
            {tab === 'signup' && (
              <Input label="Full Name" value={name} onChange={setName} placeholder="Anushka Sharma" />
            )}
            <Input label="Email" type="email" value={email} onChange={setEmail} placeholder="you@college.edu" />
            <Input label="Password" type="password" value={pass} onChange={setPass} placeholder="••••••••" />
            {tab === 'login' && (
              <button className={styles.forgot}>Forgot password?</button>
            )}
          </div>

          <Btn
            onClick={handle}
            disabled={loading || done || !email || !pass}
            size="lg"
            style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}
          >
            {done ? '✓ Redirecting...' : loading ? 'Verifying...' : tab === 'login' ? 'Sign In →' : 'Create Account →'}
          </Btn>

          <p className={styles.switchText}>
            {tab === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button className={styles.switchBtn} onClick={() => setTab(tab === 'login' ? 'signup' : 'login')}>
              {tab === 'login' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
