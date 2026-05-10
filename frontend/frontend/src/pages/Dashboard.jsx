import { useState } from 'react';
import { Reveal, Lines, Stagger } from '../components/Reveal';
import { Btn, Avatar, Tag, SectionHeader } from '../components/UI';
import { USERS, PROJECTS, NOTIFICATIONS } from '../data/mockData';
import styles from './Dashboard.module.css';

export default function Dashboard({ setPage }) {
  const me = USERS[0];
  const myProjects = PROJECTS.filter(p => me.projects.includes(p.id));
  const [requests, setRequests] = useState([
    { id: 1, user: USERS[4], project: 'EcoTrack IoT', status: 'pending' },
  ]);

  const handleRequest = (id, status) => {
    setRequests(r => r.map(req => req.id === id ? { ...req, status } : req));
  };

  const stats = [
    { label: 'Projects Created', value: myProjects.length,                icon: '📁', color: 'var(--orange)' },
    { label: 'Projects Joined',  value: 2,                                 icon: '🤝', color: 'var(--amber)' },
    { label: 'Connections',      value: 7,                                 icon: '👥', color: '#60a5fa' },
    { label: 'Notifications',    value: NOTIFICATIONS.filter(n=>!n.read).length, icon: '🔔', color: 'var(--red)' },
  ];

  return (
    <div className={styles.page}>
      {/* Welcome banner */}
      <div className={styles.welcome}>
        <div className={styles.welcomeLeft}>
          <Avatar user={me} size={56} />
          <div>
            <div className={styles.welcomeGreet}>Welcome back</div>
            <h1 className={styles.welcomeName}>{me.name}</h1>
            <div className={styles.welcomeRole} style={{ color: me.color }}>{me.role}</div>
          </div>
        </div>
        <div className={styles.welcomeActions}>
          <Btn onClick={() => setPage('post')}>+ New Project</Btn>
          <Btn onClick={() => setPage('profile')} variant="outline">Edit Profile</Btn>
        </div>
      </div>

      {/* Stats */}
      <div className={styles.statsGrid}>
        {stats.map(s => (
          <div key={s.label} className={styles.statCard}>
            <div className={styles.statIcon}>{s.icon}</div>
            <div className={styles.statValue} style={{ color: s.color }}>{s.value}</div>
            <div className={styles.statLabel}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Main grid */}
      <div className={styles.mainGrid}>
        {/* Projects */}
        <div>
          <div className={styles.blockHeader}>
            <div className={styles.blockTitle}>My Projects</div>
            <Btn onClick={() => setPage('post')} variant="outline" size="sm">+ Add</Btn>
          </div>
          <div className={styles.projectList}>
            {myProjects.map(p => (
              <div key={p.id} className={styles.projectRow}>
                <div className={styles.projectRowLeft}>
                  <div className={styles.projectRowTitle}>{p.title}</div>
                  <div className={styles.projectRowTags}>
                    <Tag color={p.type === 'Hackathon' ? 'amber' : 'blue'}>{p.type}</Tag>
                    <Tag color={p.open ? 'green' : 'muted'}>{p.open ? 'Open' : 'Closed'}</Tag>
                  </div>
                </div>
                <div className={styles.projectRowRight}>
                  <div className={styles.projectRowMeta}>👥 {p.members.length}/{p.teamSize}</div>
                  <div className={styles.projectRowDate}>{p.deadline}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Joined projects */}
          <div className={styles.blockHeader} style={{ marginTop: 28 }}>
            <div className={styles.blockTitle}>Joined Projects</div>
          </div>
          <div className={styles.projectList}>
            {PROJECTS.slice(1, 3).map(p => (
              <div key={p.id} className={styles.projectRow}>
                <div className={styles.projectRowLeft}>
                  <div className={styles.projectRowTitle}>{p.title}</div>
                  <div className={styles.projectRowTags}>
                    <Tag color="muted">Contributor</Tag>
                  </div>
                </div>
                <div className={styles.projectRowRight}>
                  <div className={styles.projectRowMeta}>👥 {p.members.length}/{p.teamSize}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className={styles.sidebar}>
          {/* Team requests */}
          <div className={styles.sideBlock}>
            <div className={styles.sideBlockTitle}>Team Requests</div>
            {requests.map(req => (
              <div key={req.id} className={styles.requestCard}>
                <div className={styles.requestTop}>
                  <Avatar user={req.user} size={36} />
                  <div>
                    <div className={styles.requestName}>{req.user.name}</div>
                    <div className={styles.requestProject}>{req.project}</div>
                  </div>
                </div>
                {req.status === 'pending' ? (
                  <div className={styles.requestBtns}>
                    <Btn onClick={() => handleRequest(req.id, 'accepted')} size="sm" style={{ flex: 1, justifyContent: 'center' }}>✓ Accept</Btn>
                    <Btn onClick={() => handleRequest(req.id, 'declined')} variant="danger" size="sm" style={{ flex: 1, justifyContent: 'center' }}>Decline</Btn>
                  </div>
                ) : (
                  <div className={`${styles.requestStatus} ${req.status === 'accepted' ? styles.accepted : styles.declined}`}>
                    {req.status === 'accepted' ? '✓ Accepted' : '✗ Declined'}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Notifications */}
          <div className={styles.sideBlock}>
            <div className={styles.sideBlockTitle}>Recent Activity</div>
            <div className={styles.notifList}>
              {NOTIFICATIONS.slice(0, 4).map(n => (
                <div key={n.id} className={`${styles.notifRow} ${!n.read ? styles.notifUnread : ''}`}>
                  <span className={styles.notifIcon}>
                    {n.type === 'invite' ? '📩' : n.type === 'message' ? '💬' : '✅'}
                  </span>
                  <div>
                    <div className={styles.notifText}>{n.text}</div>
                    <div className={styles.notifTime}>{n.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className={styles.sideBlock}>
            <div className={styles.sideBlockTitle}>Quick Actions</div>
            <div className={styles.quickActions}>
              {[
                { label: 'Find Teammates', page: 'teammates' },
                { label: 'Explore Projects', page: 'explore' },
                { label: 'AI Team Builder', page: 'hackathon' },
                { label: 'Open Chat', page: 'chat' },
              ].map(a => (
                <button key={a.label} onClick={() => setPage(a.page)} className={styles.quickAction}>
                  {a.label} →
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
