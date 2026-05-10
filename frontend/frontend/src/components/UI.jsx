import { useState } from 'react';
import styles from './UI.module.css';

/* ── BUTTON ── */
export const Btn = ({ children, onClick, variant = 'primary', size = 'md', disabled, className = '', style: s = {} }) => {
  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`${styles.btn} ${styles[`btn_${variant}`]} ${styles[`btn_${size}`]} ${className}`}
      style={s}
    >
      {children}
    </button>
  );
};

/* ── SKILL TAG ── */
export const Tag = ({ children, color = 'orange' }) => (
  <span className={`${styles.tag} ${styles[`tag_${color}`]}`}>{children}</span>
);

/* ── INPUT ── */
export const Input = ({ label, value, onChange, placeholder, type = 'text', style: s = {} }) => (
  <div className={styles.inputWrap} style={s}>
    {label && <label className={styles.label}>{label}</label>}
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className={styles.input}
    />
  </div>
);

/* ── TEXTAREA ── */
export const Textarea = ({ label, value, onChange, placeholder, rows = 4 }) => (
  <div className={styles.inputWrap}>
    {label && <label className={styles.label}>{label}</label>}
    <textarea
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className={styles.textarea}
    />
  </div>
);

/* ── SELECT ── */
export const Select = ({ label, value, onChange, options }) => (
  <div className={styles.inputWrap}>
    {label && <label className={styles.label}>{label}</label>}
    <select value={value} onChange={e => onChange(e.target.value)} className={styles.select}>
      {options.map(o => <option key={o}>{o}</option>)}
    </select>
  </div>
);

/* ── AVATAR ── */
export const Avatar = ({ user, size = 40 }) => (
  <div className={styles.avatar} style={{ width: size, height: size, borderColor: user.color, color: user.color, fontSize: size * 0.3 }}>
    {user.avatar}
  </div>
);

/* ── LOADER ── */
export const Loader = () => (
  <div className={styles.loader}>
    {[0, 1, 2].map(i => (
      <span key={i} className={styles.loaderDot} style={{ animationDelay: `${i * 0.18}s` }} />
    ))}
    <span className={styles.loaderText}>AI is working...</span>
  </div>
);

/* ── SECTION HEADER ── */
export const SectionHeader = ({ label, title, subtitle }) => (
  <div className={styles.sectionHeader}>
    {label && <span className={styles.sectionLabel}>{label}</span>}
    <h2 className={styles.sectionTitle}>{title}</h2>
    {subtitle && <p className={styles.sectionSub}>{subtitle}</p>}
  </div>
);

/* ── AI RESULT BOX ── */
export const AIResult = ({ content }) => (
  <div className={styles.aiResult}>
    <div className={styles.aiResultHeader}>
      <span className={styles.aiDot} />
      AI RESPONSE
    </div>
    <pre className={styles.aiResultText}>{content}</pre>
  </div>
);
