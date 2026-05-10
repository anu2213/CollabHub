export const USERS = [
  { id: 1, name: "Anushka Sharma", avatar: "AS", color: "#F97316", role: "Full Stack Dev", skills: ["React", "Node.js", "MongoDB"], bio: "Building cool stuff. Open to hackathons!", github: "anushka-s", linkedin: "anushka-sharma", interests: ["Hackathons", "Web Dev"], projects: [1, 3] },
  { id: 2, name: "Rohan Verma", avatar: "RV", color: "#FACC15", role: "ML Engineer", skills: ["Python", "TensorFlow", "FastAPI"], bio: "ML nerd. Coffee-fueled coder.", github: "rohan-v", linkedin: "rohan-verma", interests: ["AI/ML", "Research"], projects: [1, 2] },
  { id: 3, name: "Priya Nair", avatar: "PN", color: "#FB923C", role: "UI/UX Designer", skills: ["Figma", "CSS", "React"], bio: "Design is how it works, not just how it looks.", github: "priya-n", linkedin: "priya-nair", interests: ["Design", "Hackathons"], projects: [2] },
  { id: 4, name: "Arjun Mehta", avatar: "AM", color: "#FBBF24", role: "Backend Dev", skills: ["Node.js", "PostgreSQL", "Docker"], bio: "APIs and databases are my jam.", github: "arjun-m", linkedin: "arjun-mehta", interests: ["Web Dev", "Open Source"], projects: [3] },
  { id: 5, name: "Sneha Kulkarni", avatar: "SK", color: "#F59E0B", role: "Mobile Dev", skills: ["React Native", "Flutter", "Firebase"], bio: "Mobile-first everything.", github: "sneha-k", linkedin: "sneha-kulkarni", interests: ["App Dev", "Hackathons"], projects: [] },
  { id: 6, name: "Dev Patel", avatar: "DP", color: "#EF4444", role: "DevOps", skills: ["AWS", "Kubernetes", "CI/CD"], bio: "Infrastructure is code.", github: "dev-p", linkedin: "dev-patel", interests: ["Cloud", "Open Source"], projects: [2, 3] },
];

export const PROJECTS = [
  { id: 1, title: "AI Resume Analyzer", desc: "Upload your resume and get AI-powered feedback, ATS score, and improvement tips.", skills: ["React", "Python", "ML"], domain: "AI", type: "Hackathon", teamSize: 4, deadline: "2025-04-15", members: [1, 2], open: true },
  { id: 2, title: "Campus Connect", desc: "A real-time platform for students to share resources, notes, and find study partners.", skills: ["React", "Node.js", "Socket.io"], domain: "Web", type: "Personal", teamSize: 3, deadline: "2025-05-01", members: [2, 3, 6], open: false },
  { id: 3, title: "EcoTrack IoT", desc: "Monitor and gamify campus energy usage using IoT sensors and a live dashboard.", skills: ["React Native", "Python", "AWS"], domain: "IoT", type: "Hackathon", teamSize: 5, deadline: "2025-03-30", members: [1, 4, 6], open: true },
  { id: 4, title: "MedAssist AI", desc: "AI chatbot for preliminary symptom analysis and appointment booking.", skills: ["Python", "FastAPI", "React"], domain: "AI", type: "Hackathon", teamSize: 4, deadline: "2025-04-20", members: [2], open: true },
  { id: 5, title: "FinLit App", desc: "Financial literacy app for college students with simulated investing.", skills: ["Flutter", "Node.js", "PostgreSQL"], domain: "App", type: "Personal", teamSize: 3, deadline: "2025-06-01", members: [5], open: true },
];

export const NOTIFICATIONS = [
  { id: 1, type: "invite", text: "Rohan Verma invited you to join AI Resume Analyzer", time: "2m ago", read: false },
  { id: 2, type: "message", text: "Priya Nair sent you a message", time: "15m ago", read: false },
  { id: 3, type: "accept", text: "Dev Patel accepted your team request", time: "1h ago", read: true },
  { id: 4, type: "join", text: "Sneha Kulkarni requested to join EcoTrack IoT", time: "3h ago", read: true },
];

export const MESSAGES = [
  { id: 1, userId: 2, text: "Hey! Want to collab on the hackathon?", time: "10:32 AM", mine: false },
  { id: 2, userId: 1, text: "Yes! What stack are you thinking?", time: "10:33 AM", mine: true },
  { id: 3, userId: 2, text: "React + FastAPI + a bit of ML magic", time: "10:34 AM", mine: false },
  { id: 4, userId: 1, text: "That sounds perfect. Let's do it!", time: "10:35 AM", mine: true },
];
