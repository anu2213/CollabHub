import { Reveal } from '../components/Reveal';
import { useState, useRef, useEffect } from 'react';
import { Btn, Avatar } from '../components/UI';
import { USERS, MESSAGES } from '../data/mockData';
import styles from './Chat.module.css';

export default function Chat() {
  const [active, setActive] = useState(USERS[1]);
  const [messages, setMessages] = useState(MESSAGES);
  const [input, setInput] = useState('');
  const [invite, setInvite] = useState({ show: true, status: 'pending' });
  const endRef = useRef(null);
  const me = USERS[0];

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    const newMsg = {
      id: Date.now(),
      userId: me.id,
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      mine: true,
    };
    setMessages(p => [...p, newMsg]);
    setInput('');
    setTimeout(() => {
      setMessages(p => [...p, {
        id: Date.now() + 1,
        userId: active.id,
        text: "Sounds good! Let's schedule a quick call this week. 🚀",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        mine: false,
      }]);
    }, 1000);
  };

  const contacts = USERS.slice(1, 6);

  return (
    <div className={styles.page}>
      {/* Invite banner */}
      {invite.show && invite.status === 'pending' && (
        <div className={styles.inviteBanner}>
          <Avatar user={USERS[2]} size={32} />
          <span className={styles.inviteText}>
            <strong>{USERS[2].name}</strong> invited you to join <strong>Campus Connect</strong>
          </span>
          <div className={styles.inviteBtns}>
            <Btn onClick={() => setInvite({ show: true, status: 'accepted' })} size="sm">✓ Accept</Btn>
            <Btn onClick={() => setInvite({ show: false, status: 'declined' })} variant="danger" size="sm">Decline</Btn>
          </div>
        </div>
      )}
      {invite.show && invite.status === 'accepted' && (
        <div className={styles.inviteAccepted}>
          ✓ You joined <strong>Campus Connect</strong>. Check your dashboard.
        </div>
      )}

      <div className={styles.layout}>
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarHeader}>Messages</div>
          {contacts.map(u => (
            <button key={u.id} onClick={() => setActive(u)}
              className={`${styles.contact} ${active.id === u.id ? styles.contactActive : ''}`}>
              <Avatar user={u} size={36} />
              <div className={styles.contactInfo}>
                <div className={styles.contactName}>{u.name}</div>
                <div className={styles.contactRole}>{u.role}</div>
              </div>
              <span className={styles.onlineDot} />
            </button>
          ))}
        </aside>

        {/* Chat window */}
        <div className={styles.chatWin}>
          {/* Header */}
          <div className={styles.chatHeader}>
            <Avatar user={active} size={36} />
            <div>
              <div className={styles.chatName}>{active.name}</div>
              <div className={styles.chatStatus}>● Online — {active.role}</div>
            </div>
          </div>

          {/* Messages */}
          <div className={styles.messages}>
            {messages.map(m => {
              const sender = USERS.find(u => u.id === m.userId);
              return (
                <div key={m.id} className={`${styles.msg} ${m.mine ? styles.msgMine : styles.msgTheirs}`}>
                  {!m.mine && sender && <Avatar user={sender} size={28} />}
                  <div className={`${styles.bubble} ${m.mine ? styles.bubbleMine : styles.bubbleTheirs}`}>
                    {m.text}
                    <span className={styles.msgTime}>{m.time}</span>
                  </div>
                </div>
              );
            })}
            <div ref={endRef} />
          </div>

          {/* Input */}
          <div className={styles.inputRow}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder={`Message ${active.name.split(' ')[0]}...`}
              className={styles.msgInput}
            />
            <Btn onClick={send} disabled={!input.trim()}>Send →</Btn>
          </div>
        </div>
      </div>
    </div>
  );
}
