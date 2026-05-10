import { Reveal, Lines, Stagger } from '../components/Reveal';
import { useState } from 'react';
import { Btn, Tag, Input, Textarea, Select, Avatar, SectionHeader } from '../components/UI';
import { ProjectCard } from '../components/Cards';
import { USERS, PROJECTS } from '../data/mockData';
import styles from './Pages.module.css';

/* ══════════════════════════════════════════════════════
   PROFILE PAGE
══════════════════════════════════════════════════════ */
export function Profile({ setPage }) {
  const user = USERS[0];
  const [editing, setEditing] = useState(false);
  const [bio, setBio] = useState(user.bio);
  const userProjects = PROJECTS.filter(p => user.projects.includes(p.id));

  return (
    <div className={styles.pagePad}>
      <div className={styles.profileCover}>
        <div className={styles.profileCoverBg} />
      </div>

      <div className={styles.profileHeader}>
        <div className={styles.profileAvatarWrap}>
          <div className={styles.profileAvatar} style={{ borderColor: user.color, color: user.color }}>
            {user.avatar}
          </div>
        </div>
        <div className={styles.profileInfo}>
          <h1 className={styles.profileName}>{user.name}</h1>
          <div className={styles.profileRole} style={{ color: user.color }}>{user.role}</div>
          {editing
            ? <textarea value={bio} onChange={e => setBio(e.target.value)} rows={3} className={styles.editBio} />
            : <p className={styles.profileBio}>{bio}</p>
          }
        </div>
        <Btn onClick={() => setEditing(!editing)} variant="outline">
          {editing ? '✓ Save' : 'Edit Profile'}
        </Btn>
      </div>

      <div className={styles.profileBody}>
        {/* Sidebar */}
        <div className={styles.profileSide}>
          <div className={styles.sideCard}>
            <div className={styles.sideCardTitle}>Skills</div>
            <div className={styles.tagRow}>
              {user.skills.map(s => <Tag key={s} color="orange">{s}</Tag>)}
              {editing && <button className={styles.addTag}>+ Add</button>}
            </div>
          </div>
          <div className={styles.sideCard}>
            <div className={styles.sideCardTitle}>Interests</div>
            <div className={styles.tagRow}>
              {user.interests.map(i => <Tag key={i} color="amber">{i}</Tag>)}
            </div>
          </div>
          <div className={styles.sideCard}>
            <div className={styles.sideCardTitle}>Links</div>
            <div className={styles.linksList}>
              <div className={styles.linkRow}>
                <span>🐙</span>
                <span className={styles.linkVal}>github.com/{user.github}</span>
              </div>
              <div className={styles.linkRow}>
                <span>💼</span>
                <span className={styles.linkVal}>linkedin.com/in/{user.linkedin}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Projects */}
        <div className={styles.profileMain}>
          <div className={styles.sectionRowSmall}>
            <div className={styles.sectionTitleSm}>Projects</div>
            <Btn onClick={() => setPage('post')} variant="outline" size="sm">+ Post New</Btn>
          </div>
          {userProjects.length === 0
            ? <div className={styles.emptyState}>No projects yet. <button className={styles.emptyLink} onClick={() => setPage('post')}>Post one →</button></div>
            : <div className={styles.cardGrid}>{userProjects.map(p => <ProjectCard key={p.id} project={p} />)}</div>
          }
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   POST PROJECT PAGE
══════════════════════════════════════════════════════ */
export function PostProject({ setPage }) {
  const [form, setForm] = useState({ title: '', desc: '', skills: '', domain: 'AI', type: 'Hackathon', teamSize: '4', deadline: '' });
  const [done, setDone] = useState(false);
  const f = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const submit = async () => {
    setDone(true);
    await new Promise(r => setTimeout(r, 600));
    setPage('explore');
  };

  return (
    <div className={styles.pagePad}>
      <div className={styles.narrowPage}>
        <SectionHeader label="Share your idea" title="Post a Project" subtitle="Describe what you're building and find teammates who want to join." />
        <div className={styles.formCard}>
          <Input label="Project Title" value={form.title} onChange={v => f('title', v)} placeholder="AI Resume Analyzer" />
          <Textarea label="Description" value={form.desc} onChange={v => f('desc', v)} placeholder="What does it do? What problem does it solve?" rows={4} />
          <Input label="Required Skills (comma-separated)" value={form.skills} onChange={v => f('skills', v)} placeholder="React, Python, ML, Node.js" />
          <div className={styles.formRow}>
            <Select label="Domain" value={form.domain} onChange={v => f('domain', v)} options={['AI', 'Web', 'App', 'IoT', 'Blockchain', 'Other']} />
            <Select label="Type" value={form.type} onChange={v => f('type', v)} options={['Hackathon', 'Personal', 'Research', 'Startup']} />
          </div>
          <div className={styles.formRow}>
            <Input label="Team Size" value={form.teamSize} onChange={v => f('teamSize', v)} placeholder="4" />
            <Input label="Deadline" type="date" value={form.deadline} onChange={v => f('deadline', v)} />
          </div>
          <Btn onClick={submit} disabled={done || !form.title} size="lg" style={{ width: '100%', justifyContent: 'center' }}>
            {done ? '✓ Posted!' : 'Post Project →'}
          </Btn>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   EXPLORE PAGE
══════════════════════════════════════════════════════ */
export function Explore({ setPage }) {
  const [search, setSearch] = useState('');
  const [domain, setDomain] = useState('All');
  const [type, setType] = useState('All');

  const filtered = PROJECTS.filter(p =>
    (domain === 'All' || p.domain === domain) &&
    (type === 'All' || p.type === type) &&
    (p.title.toLowerCase().includes(search.toLowerCase()) ||
     p.skills.some(s => s.toLowerCase().includes(search.toLowerCase())))
  );

  return (
    <div className={styles.pagePad}>
      <SectionHeader label="Browse" title="Explore Projects" subtitle="Discover student projects looking for contributors." />

      <div className={styles.filterBar}>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by skill or project name..."
          className={styles.filterSearch}
        />
        <div className={styles.filterGroup}>
          {['All', 'AI', 'Web', 'App', 'IoT'].map(d => (
            <button key={d} onClick={() => setDomain(d)} className={`${styles.filterBtn} ${domain === d ? styles.filterBtnActive : ''}`}>{d}</button>
          ))}
        </div>
        <div className={styles.filterGroup}>
          {['All', 'Hackathon', 'Personal'].map(t => (
            <button key={t} onClick={() => setType(t)} className={`${styles.filterBtn} ${type === t ? styles.filterBtnActive : ''}`}>{t}</button>
          ))}
        </div>
      </div>

      <div className={styles.resultCount}>{filtered.length} project{filtered.length !== 1 ? 's' : ''} found</div>

      <div className={styles.cardGridWide}>
        {filtered.map(p => <ProjectCard key={p.id} project={p} onView={() => setPage('explore')} />)}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   TEAMMATES PAGE
══════════════════════════════════════════════════════ */
export function Teammates() {
  const [search, setSearch] = useState('');
  const [connecting, setConnecting] = useState(null);
  const [connected, setConnected] = useState([]);

  const filtered = USERS.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.skills.some(s => s.toLowerCase().includes(search.toLowerCase()))
  );

  const handleConnect = async (user) => {
    setConnecting(user.id);
    await new Promise(r => setTimeout(r, 800));
    setConnecting(null);
    setConnected(p => [...p, user.id]);
  };

  return (
    <div className={styles.pagePad}>
      <SectionHeader label="Find" title="Teammates" subtitle="Search by skill and connect with the right people." />

      <div className={styles.filterBar}>
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search by name or skill (e.g. Python, ML, React)..."
          className={styles.filterSearch} style={{ maxWidth: 480 }} />
      </div>

      <div className={styles.quickTags}>
        {['React', 'Python', 'ML', 'Node.js', 'Figma', 'AWS'].map(s => (
          <button key={s} onClick={() => setSearch(s)} className={styles.quickTag}>{s}</button>
        ))}
      </div>

      <div className={styles.resultCount}>{filtered.length} student{filtered.length !== 1 ? 's' : ''} found</div>

      <div className={styles.cardGridWide}>
        {filtered.map(u => (
          <div key={u.id} className={styles.userCard}>
            <div className={styles.userCardTop}>
              <Avatar user={u} size={46} />
              <div>
                <div className={styles.userName}>{u.name}</div>
                <div className={styles.userRole} style={{ color: u.color }}>{u.role}</div>
              </div>
            </div>
            <p className={styles.userBio}>{u.bio}</p>
            <div className={styles.tagRow}>
              {u.skills.map(s => <Tag key={s} color="orange">{s}</Tag>)}
            </div>
            <div className={styles.userLinks2}>
              <span>gh/{u.github}</span>
              <span>in/{u.linkedin}</span>
            </div>
            <Btn
              onClick={() => !connected.includes(u.id) && handleConnect(u)}
              disabled={connected.includes(u.id) || connecting === u.id}
              variant={connected.includes(u.id) ? 'ghost' : 'outline'}
              style={{ width: '100%', justifyContent: 'center' }}
            >
              {connected.includes(u.id) ? '✓ Connected' : connecting === u.id ? 'Sending...' : 'Connect →'}
            </Btn>
          </div>
        ))}
      </div>
    </div>
  );
}
