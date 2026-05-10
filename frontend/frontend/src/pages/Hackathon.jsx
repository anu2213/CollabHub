import { Reveal, Lines, Stagger } from '../components/Reveal';
import { useState } from 'react';
import { Btn, Input, Loader, AIResult, SectionHeader, Avatar, Tag } from '../components/UI';
import { USERS } from '../data/mockData';
import styles from './Hackathon.module.css';

const callClaude = async (system, user) => {
  const r = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      system,
      messages: [{ role: 'user', content: user }],
    }),
  });
  const d = await r.json();
  return d.content?.[0]?.text || 'No response.';
};

const TOOLS = [
  { id: 'builder', label: 'Team Builder', desc: 'Auto-assemble a balanced hackathon team' },
  { id: 'match',   label: 'AI Match',     desc: 'Find teammates with complementary skills' },
  { id: 'gap',     label: 'Skill Gap',    desc: 'Discover what to learn next' },
  { id: 'idea',    label: 'Idea Generator', desc: 'Turn a domain into a full project concept' },
];

export default function Hackathon() {
  const [tool, setTool] = useState('builder');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [highlighted, setHighlighted] = useState([]);

  const [hackName, setHackName] = useState('');
  const [mySkills, setMySkills] = useState('');
  const [target, setTarget]     = useState('');
  const [domain, setDomain]     = useState('');

  const studentList = USERS.map(u => `${u.name} (${u.role}): ${u.skills.join(', ')}`).join('\n');

  const run = async () => {
    setLoading(true);
    setResult('');
    setHighlighted([]);

    let sys, msg;
    if (tool === 'builder') {
      sys = 'You are a hackathon team builder. Be strategic, specific, concise. Plain text only.';
      msg = `Hackathon: "${hackName}"\nStudents:\n${studentList}\n\nBuild the best 4-person team. Give the team a creative name, list each person's role on this specific project, and explain in 1-2 sentences why they're the right fit.`;
    } else if (tool === 'match') {
      sys = 'You are an AI skill matcher. Be concise and practical. Plain text only.';
      msg = `My skills: ${mySkills}\nStudents:\n${studentList}\n\nRecommend top 2-3 teammates who complement my skills. For each, say their name, why they complement me, and what we could build together.`;
    } else if (tool === 'gap') {
      sys = 'You are a student skills coach. Be honest, encouraging, practical. Plain text only.';
      msg = `Current skills: ${mySkills}\nTarget: ${target}\n\n1) Skills I have that are relevant\n2) Missing skills (prioritized)\n3) 4-week learning roadmap\n4) Best free resource for each missing skill`;
    } else {
      sys = 'You are a creative hackathon project advisor. Be specific and original. Plain text only.';
      msg = `Domain: "${domain}"\n\nGenerate a project idea:\n1) Project name + one-line tagline\n2) Problem it solves (2 sentences)\n3) Key features (3-4 bullet points)\n4) Required skills\n5) Tech stack\n6) What makes it stand out`;
    }

    try {
      const res = await callClaude(sys, msg);
      setResult(res);
      const hits = USERS.filter(u => res.toLowerCase().includes(u.name.toLowerCase())).map(u => u.id);
      setHighlighted(hits);
    } catch {
      setResult('Could not connect to AI. Check your API key or try again.');
    }
    setLoading(false);
  };

  const canRun = () => {
    if (tool === 'builder') return !!hackName.trim();
    if (tool === 'match')   return !!mySkills.trim();
    if (tool === 'gap')     return !!(mySkills.trim() && target.trim());
    if (tool === 'idea')    return !!domain.trim();
    return false;
  };

  const hackSuggestions = ['Smart India Hackathon', 'Flipkart Grid', 'HackMIT', 'Health Hack 2025'];
  const domainSuggestions = ['Healthcare + AI', 'EdTech + Blockchain', 'Climate + IoT', 'Fintech + ML'];

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <SectionHeader label="Powered by AI" title="Hackathon Tools" subtitle="Let AI handle the heavy lifting — from idea to team formation." />

        {/* Tool selector */}
        <div className={styles.toolNav}>
          {TOOLS.map(t => (
            <button key={t.id} onClick={() => { setTool(t.id); setResult(''); setHighlighted([]); }}
              className={`${styles.toolBtn} ${tool === t.id ? styles.toolBtnActive : ''}`}>
              <span className={styles.toolLabel}>{t.label}</span>
              <span className={styles.toolDesc}>{t.desc}</span>
            </button>
          ))}
        </div>

        <div className={styles.workspace}>
          {/* Input panel */}
          <div className={styles.panel}>
            <div className={styles.panelTitle}>
              {TOOLS.find(t => t.id === tool)?.label}
            </div>

            {tool === 'builder' && (
              <div className={styles.fields}>
                <Input label="Hackathon Name / Theme" value={hackName} onChange={setHackName} placeholder="Smart India Hackathon 2025" />
                <div className={styles.suggestions}>
                  {hackSuggestions.map(h => <button key={h} onClick={() => setHackName(h)} className={styles.suggestion}>{h}</button>)}
                </div>
              </div>
            )}

            {tool === 'match' && (
              <Input label="Your Skills" value={mySkills} onChange={setMySkills} placeholder="React, Python, UI/UX" />
            )}

            {tool === 'gap' && (
              <div className={styles.fields}>
                <Input label="Your Current Skills" value={mySkills} onChange={setMySkills} placeholder="React, HTML, CSS, basic JavaScript" />
                <Input label="Target Project or Role" value={target} onChange={setTarget} placeholder="Full-stack MERN app with ML features" />
              </div>
            )}

            {tool === 'idea' && (
              <div className={styles.fields}>
                <Input label="Domain / Theme" value={domain} onChange={setDomain} placeholder="Healthcare + AI" />
                <div className={styles.suggestions}>
                  {domainSuggestions.map(d => <button key={d} onClick={() => setDomain(d)} className={styles.suggestion}>{d}</button>)}
                </div>
              </div>
            )}

            <Btn onClick={run} disabled={loading || !canRun()} size="lg" style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}>
              {loading ? 'Running AI...' : 'Run AI →'}
            </Btn>

            {loading && <Loader />}
          </div>

          {/* Output panel */}
          {result && (
            <div className={styles.panel}>
              <AIResult content={result} />
              {highlighted.length > 0 && (
                <div className={styles.teamResult}>
                  <div className={styles.teamResultTitle}>Suggested Team</div>
                  {USERS.filter(u => highlighted.includes(u.id)).map(u => (
                    <div key={u.id} className={styles.teamMember}>
                      <Avatar user={u} size={38} />
                      <div>
                        <div className={styles.memberName}>{u.name}</div>
                        <div className={styles.memberSkills}>
                          {u.skills.map(s => <Tag key={s} color="muted">{s}</Tag>)}
                        </div>
                      </div>
                      <span className={styles.checkMark}>✓</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
