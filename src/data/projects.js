export const projects = [
  {
    id: "nbuc-pipeline",
    title: "Nokia NBUC Generative AI Security Pipeline",
    type: "Industry Project",
    status: "Completed",
    highlight: "Best Implemented Industry Project at Nokia University Day 2025",
    description: "Automated vulnerability assessment and remediation pipeline using Trivy, Kubernetes security tools, Groq Llama 3.1, and a RAG-based security assistant.",
    tech: ["Python", "Flask", "Trivy", "Kubernetes security tools", "Groq Llama 3.1", "RAG", "Docker"],
    problem: "Manual vulnerability assessment and remediation is slow, repetitive, and hard to scale across containerized and Kubernetes-based environments.",
    role: "Worked on building an AI-assisted security assessment and remediation workflow with project teammates.",
    keyFeatures: [
      "Docker image CVE scanning using Trivy",
      "Kubernetes security checks",
      "LLM-assisted remediation suggestions",
      "RAG-based security assistant",
      "Project documentation and presentation"
    ],
    challenges: [
      "Combining security tool outputs into useful recommendations",
      "Making LLM responses practical instead of generic",
      "Presenting technical remediation clearly"
    ],
    learned: [
      "Practical product security workflows",
      "LLM-assisted developer tooling",
      "Security automation",
      "How to present a technical project to industry judges"
    ],
    links: { github: "#", live: "#" }
  },
  {
    id: "disharakshak",
    title: "DishaRakshak",
    type: "Major Academic Project",
    status: "In progress / prototype",
    highlight: "GPS-less navigation concept for soldiers",
    description: "GPS-less navigation system concept using foot-mounted IMU modules, ESP32 units, dead reckoning, and dashboard visualization.",
    tech: ["ESP32", "IMU sensors", "Python", "Dead reckoning", "Dashboard visualization"],
    problem: "Soldiers may need navigation support in GPS-denied or unreliable environments.",
    role: "Worked on dashboard simulation, system architecture, communication flow, and project documentation.",
    keyFeatures: [
      "Foot-mounted IMU module concept",
      "ESP32-based communication",
      "Dead reckoning path estimation",
      "Dashboard visualization",
      "Campus/path simulation"
    ],
    challenges: [
      "Sensor drift",
      "Accurate step/stance detection",
      "Communicating hardware architecture clearly",
      "Turning a complex concept into a demonstrable prototype"
    ],
    learned: [
      "Embedded systems architecture",
      "IMU-based navigation concepts",
      "Dashboard visualization",
      "Academic project planning and documentation"
    ],
    links: { github: "#", live: "#" }
  },
  {
    id: "self-care",
    title: "Self-care MERN App",
    type: "Personal full-stack project",
    status: "Deployed",
    highlight: "Built, deployed, and debugged production issues",
    description: "A deployed MERN app for goal-based self-care tasks, check-ins, and progress tracking.",
    tech: ["MongoDB", "Express", "React", "Node.js", "Vercel", "Render"],
    problem: "Users need a simple way to track self-care goals and daily task progress.",
    role: "Built and deployed the app, handled frontend/backend connection, and debugged production issues.",
    keyFeatures: [
      "Goal-based task generation",
      "Daily check-ins",
      "Progress tracking",
      "MERN stack architecture",
      "Frontend deployed on Vercel",
      "Backend deployed on Render",
      "MongoDB Atlas database",
      "Production bug fixing"
    ],
    challenges: [
      "Environment variables and deployment configuration",
      "CORS / frontend-backend connection issues",
      "Browser cache and production state issues",
      "Keeping generated tasks consistent"
    ],
    learned: [
      "MERN deployment",
      "API integration",
      "Debugging production issues",
      "Git/versioning/release workflow"
    ],
    links: { github: "#", live: "#" }
  },
  {
    id: "cyberdeck-os",
    title: "CyberDeck Portfolio OS",
    type: "Frontend portfolio project",
    status: "In Progress",
    highlight: "Interactive cyberpunk OS-style resume website",
    description: "A React + Tailwind portfolio designed as a cyberdeck operating system with fixed shell navigation, system widgets, route-based modules, and reusable UI components.",
    tech: ["React", "Vite", "Tailwind CSS", "Framer Motion", "Lucide React"],
    problem: "A normal portfolio is too generic and does not show frontend ability clearly.",
    role: "Built the UI structure, navigation system, design system, responsive layout, and content modules with AI-assisted development workflow.",
    keyFeatures: [
      "Cyberpunk OS shell",
      "Fixed top bar, dossier panel, telemetry panel, bottom dock",
      "Route-based modules",
      "Reusable design system",
      "Responsive mobile layout",
      "Dashboard command center",
      "Project archive system"
    ],
    challenges: [
      "Avoiding generic portfolio design",
      "Fixing mobile overflow",
      "Removing redundant navigation",
      "Maintaining visual consistency",
      "Keeping the app responsive and readable"
    ],
    learned: [
      "React component architecture",
      "Tailwind responsive design",
      "UI/UX iteration",
      "Design system thinking",
      "AI-assisted development workflow"
    ],
    links: { github: "#", live: "#" }
  }
];
