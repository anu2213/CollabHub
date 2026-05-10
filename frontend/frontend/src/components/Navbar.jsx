import { useState } from 'react';
import { NOTIFICATIONS, USERS } from '../data/mockData';
import { Avatar, Btn } from './UI';
import { Reveal } from './Reveal';
import styles from './Navbar.module.css';

const NAV = [
  { id:'home',label:'Home' },{ id:'explore',label:'Explore' },
  { id:'teammates',label:'Teammates' },{ id:'hackathon',label:'AI Tools' },
  { id:'chat',label:'Chat' },{ id:'dashboard',label:'Dashboard' },
];

export default function Navbar({ page, setPage }) {
  const [notifOpen, setNotifOpen] = useState(false);
  const unread = NOTIFICATIONS.filter(n => !n.read).length;
  const me = USERS[0];

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <Reveal direction="left" delay={0} duration={500}>
          <button className={styles.logo} onClick={() => setPage('home')}>
            <span className={styles.logoMark}>C</span>
            <span className={styles.logoText}>CollabHub</span>
          </button>
        </Reveal>

        <div className={styles.links}>
          {NAV.map((l, i) => (
            <Reveal key={l.id} direction="up" delay={i * 40} duration={450}>
              <button
                onClick={() => setPage(l.id)}
                className={`${styles.link} ${page === l.id ? styles.linkActive : ''}`}
              >{l.label}</button>
            </Reveal>
          ))}
        </div>

        <Reveal direction="right" delay={0} duration={500}>
          <div className={styles.right}>
            <div className={styles.notifWrap}>
              <button className={styles.bellBtn} onClick={() => setNotifOpen(o => !o)}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                </svg>
                {unread > 0 && <span className={styles.badge}>{unread}</span>}
              </button>
              {notifOpen && (
                <div className={styles.notifDropdown}>
                  <div className={styles.notifTitle}>Notifications</div>
                  {NOTIFICATIONS.map((n, i) => (
                    <Reveal key={n.id} delay={i * 60} direction="up" duration={400}>
                      <div className={`${styles.notifItem} ${!n.read ? styles.notifUnread : ''}`}>
                        <span className={styles.notifIcon}>{n.type==='invite'?'📩':n.type==='message'?'💬':'✅'}</span>
                        <div>
                          <div className={styles.notifText}>{n.text}</div>
                          <div className={styles.notifTime}>{n.time}</div>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => setPage('profile')} className={styles.avatarBtn}>
              <Avatar user={me} size={32} />
            </button>
            <Btn onClick={() => setPage('post')} size="sm">+ Post Project</Btn>
          </div>
        </Reveal>
      </div>
    </nav>
  );
}
