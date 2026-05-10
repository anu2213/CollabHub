import { Tag, Btn, Avatar } from './UI';
import styles from './Cards.module.css';
import { USERS } from '../data/mockData';

export function ProjectCard({ project, onView }) {
  const typeColor = project.type === 'Hackathon' ? 'amber' : 'blue';
  const domainColor = project.domain === 'AI' ? 'orange' : 'muted';

  return (
    <div className={styles.projectCard}>
      <div className={styles.projectTop}>
        <div className={styles.projectTags}>
          <Tag color={typeColor}>{project.type}</Tag>
          <Tag color={domainColor}>{project.domain}</Tag>
          {project.open && <Tag color="green">Open</Tag>}
        </div>
        <div className={styles.projectMeta}>
          {project.members.length}/{project.teamSize} members
        </div>
      </div>

      <h3 className={styles.projectTitle}>{project.title}</h3>
      <p className={styles.projectDesc}>{project.desc}</p>

      <div className={styles.projectSkills}>
        {project.skills.map(s => <Tag key={s} color="muted">{s}</Tag>)}
      </div>

      <div className={styles.projectFooter}>
        <span className={styles.deadline}>Due {project.deadline}</span>
        <Btn onClick={onView} variant="outline" size="sm">View →</Btn>
      </div>
    </div>
  );
}

export function UserCard({ user, onConnect, connected, connecting }) {
  return (
    <div className={styles.userCard}>
      <div className={styles.userTop}>
        <Avatar user={user} size={44} />
        <div>
          <div className={styles.userName}>{user.name}</div>
          <div className={styles.userRole} style={{ color: user.color }}>{user.role}</div>
        </div>
      </div>
      <p className={styles.userBio}>{user.bio}</p>
      <div className={styles.userSkills}>
        {user.skills.map(s => <Tag key={s} color="orange">{s}</Tag>)}
      </div>
      <div className={styles.userLinks}>
        <span className={styles.userLink}>gh/{user.github}</span>
        <span className={styles.userLink}>in/{user.linkedin}</span>
      </div>
      <Btn
        onClick={() => !connected && onConnect(user)}
        disabled={connected || connecting}
        variant={connected ? 'ghost' : 'outline'}
        style={{ width: '100%', justifyContent: 'center' }}
      >
        {connected ? '✓ Connected' : connecting ? 'Sending...' : 'Connect'}
      </Btn>
    </div>
  );
}
