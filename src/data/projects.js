export const projects = [
  {
    id: "nbuc-pipeline",
    featuredOrder: 1,
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
    links: { showLive: false, showSource: false, github: "https://github.com/Nithya-shree182/Nokia-proj-internal" }
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
    links: { showLive: false, showSource: false }
  },
  {
    id: "vulnverify",
    featuredOrder: 2,
    title: "VulnVerify",
    type: "Cognizant Hackathon · Cybersecurity",
    status: "Hackathon project",
    highlight: "Team advanced to the next round following evaluation by the Cognizant review panel",
    description: "A vulnerability verification and triage pipeline that ingests OWASP ZAP and Burp Suite scanner findings, normalizes them into a common schema, independently replays reported attacks, classifies each as true positive, false positive, or inconclusive, and prioritizes verified vulnerabilities for remediation.",
    tech: ["Python", "FastAPI", "React", "OWASP ZAP", "Burp Suite", "pytest"],
    problem: "Scanner output from tools like OWASP ZAP and Burp Suite is noisy: it mixes real, exploitable issues with false positives, and teams waste remediation effort triaging findings by hand.",
    role: "Team Lead & Backend Engineer",
    pipeline: [
      "Ingest OWASP ZAP JSON and Burp Suite XML scanner findings",
      "Parse and normalize both formats into a common schema",
      "Independently replay / verify each reported attack",
      "Classify as TRUE_POSITIVE, FALSE_POSITIVE, or INCONCLUSIVE",
      "Prioritize verified vulnerabilities by risk",
      "Emit reports and surface results in the frontend"
    ],
    vulnFamilies: ["SQL Injection", "CSRF", "XSS"],
    keyFeatures: [
      "Consumes OWASP ZAP + Burp Suite scanner results (not a scanner itself)",
      "Normalizes heterogeneous findings into one schema",
      "Independent replay-based verification of reported attacks",
      "True/false/inconclusive classification",
      "Risk-based prioritization of verified vulnerabilities",
      "Reports and frontend surfacing of triaged results"
    ],
    challenges: [
      "Normalizing OWASP ZAP JSON and Burp Suite XML into a shared schema",
      "Reliably replaying reported attacks to confirm exploitability",
      "Keeping classification defensible across SQLi, CSRF, and XSS",
      "Coordinating work across an eight-member team"
    ],
    learned: [
      "Backend pipeline design with FastAPI and Pydantic",
      "Practical vulnerability verification vs. raw scanning",
      "Backend testing with pytest",
      "Leading and delegating across a multi-function team"
    ],
    team: "Team Lead for an eight-member team; delegated work across multiple project functions, co-developed the core backend implementation with one teammate, performed backend testing, and was one of two members who demonstrated the project to the Cognizant evaluation panel.",
    outcome: "The team advanced to the next round following evaluation by the Cognizant review panel.",
    links: { showLive: false, showSource: true, github: "https://github.com/Haruto69/VulnVerify" }
  },
  {
    id: "self-care",
    featuredOrder: 3,
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
    links: { showLive: true, showSource: true, live: "https://solo-leveling-peak.vercel.app/", github: "https://github.com/Haruto69/Self-care" }
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
    links: { showLive: false, showSource: true, github: "https://github.com/Haruto69/Mukund-OS" }
  },
  {
    id: "reposcope",
    title: "RepoScope",
    type: "Frontend / Developer Analytics",
    status: "Deployed",
    highlight: "Built as an internship-focused frontend project with GitHub API integration, developer comparison flows, deployed frontend, and backend AI summary support.",
    description: "A GitHub developer analytics dashboard that turns public repository and profile data into clean visual insights, comparisons, and AI-assisted summaries.",
    tech: ["React", "Vite", "Tailwind CSS", "GitHub API", "Framer Motion", "Vercel", "Render", "AI summary backend"],
    problem: "Developers need a faster way to understand GitHub activity, repository quality signals, and compare public profiles without manually opening many repositories.",
    role: "Designed and built the frontend experience, dashboard structure, project comparison flow, and deployment workflow.",
    keyFeatures: [
      "GitHub profile and repository lookup",
      "Developer analytics dashboard",
      "Repository signal summaries",
      "Developer comparison page",
      "AI-powered comparison summary",
      "Responsive deployed interface"
    ],
    challenges: [
      "Structuring GitHub API data into useful UI sections",
      "Keeping comparison output neutral and practical",
      "Handling deployed frontend/backend integration",
      "Avoiding redundant or misleading developer rankings"
    ],
    learned: [
      "Better React data flow and component structure",
      "API-driven UI design",
      "Deployment coordination between Vercel and Render",
      "Building project features that are explainable in interviews"
    ],
    links: { showLive: true, showSource: true, live: "https://reposcope-alpha.vercel.app/", github: "https://github.com/Haruto69/reposcope" }
  }
];

/**
 * Explicit, deterministic featured-project selection.
 *
 * A project is featured iff it carries a numeric `featuredOrder`. The carousel
 * order is that number, ascending — independent of this array's order. This
 * replaces the previous position-based `projects.slice(0, 3)` selection so the
 * featured set can be curated by editing `featuredOrder` on the data alone.
 */
export const featuredProjects = projects
  .filter((p) => typeof p.featuredOrder === "number")
  .slice()
  .sort((a, b) => a.featuredOrder - b.featuredOrder);

/** Everything not featured — the secondary / "More Projects" archive. */
export const moreProjects = projects.filter(
  (p) => typeof p.featuredOrder !== "number"
);
