/**
 * AUTO-GENERATED FROM public/Mukund_V_Resume.pdf
 * DO NOT EDIT MANUALLY.
 *
 * Regenerate with `npm run generate:resume`; `predev` / `prebuild` do it
 * for you. To change what the site shows, replace the PDF — not this file.
 *
 * source:    public/Mukund_V_Resume.pdf
 * sha256:    348b9f3101c189e46eb910b85e507de792b36b73a41ed63139015bb98c0840dd
 * generator: scripts/generate-resume-data.mjs v1
 *
 * No generation timestamp is recorded, on purpose: the output is a pure
 * function of the PDF above, so an unchanged PDF regenerates byte-identical
 * output and never produces a spurious git diff.
 */

export const RESUME_SOURCE = {
  "file": "public/Mukund_V_Resume.pdf",
  "sha256": "348b9f3101c189e46eb910b85e507de792b36b73a41ed63139015bb98c0840dd",
  "generator": 1
};

export const RESUME_URL = "/Mukund_V_Resume.pdf";

export const resumeIdentity = {
  "name": "Mukund V",
  "headline": "Undergraduate | Computer Science and Engineering (Cyber Security)",
  "contacts": [
    {
      "label": "+91 84310 41791",
      "href": "tel:+918431041791",
      "kind": "phone"
    },
    {
      "label": "eng22mukund@gmail.com",
      "href": "mailto:eng22mukund@gmail.com",
      "kind": "email"
    },
    {
      "label": "mukund-v-b1b742175",
      "href": "https://www.linkedin.com/in/mukund-v-b1b742175/",
      "kind": "linkedin",
      "external": true
    },
    {
      "label": "Haruto69",
      "href": "https://github.com/Haruto69",
      "kind": "github",
      "external": true
    }
  ]
};

export const resumeSummary = "Computer Science and Engineering undergraduate specializing in Cyber Security, with project experience in machine learning, full-stack web development, IoT systems, and AI-assisted DevSecOps. Built applications using Flask, React, Raspberry Pi, Docker, and Kubernetes, including an award-winning product-security solution developed with Nokia mentors.";

export const resumeSkills = [
  {
    "label": "Programming",
    "items": "C, Java"
  },
  {
    "label": "Frameworks & Libraries",
    "items": "Flask, React.js"
  },
  {
    "label": "Tools & Platforms",
    "items": "Docker, Kubernetes, Git, Raspberry Pi, Ngrok, Netlify"
  },
  {
    "label": "AI & Security",
    "items": "Generative AI APIs, Trivy, Kubescape, kube-score, SBOM, DevSecOps"
  }
];

export const resumeProjects = [
  {
    "title": "Phishing and Scam Detector",
    "dates": "Nov ’24 – Feb ’25",
    "stack": "Flask, scikit-learn, C",
    "href": "https://github.com/Siri-026/Phishing_detection_system",
    "bullets": [
      "Naive Bayes scam-message classification with a Trie-based C library for keyword-feature extraction.",
      "Flask-based message interface combining CountVectorizer features and Trie keyword frequencies for improved detection accuracy."
    ]
  },
  {
    "title": "Smart Campus Simulation",
    "dates": "Feb ’25 – May ’26",
    "stack": "Raspberry Pi, Python, Flask, Sensors, Ngrok",
    "href": "https://github.com/Haruto69/Smart-appliance",
    "bullets": [
      "Web-based real-time control of Raspberry Pi-connected lights and fans through GPIO and a Flask interface.",
      "Login-protected device access over both the local network and remote connections enabled through Ngrok."
    ]
  },
  {
    "title": "Smart Attendance System",
    "dates": "Jun ’25",
    "stack": "OpenCV, Django, SQLite, LBPH Face Recognition",
    "href": "https://github.com/Haruto69/Smart-attendance",
    "bullets": [
      "Student registration captures webcam face samples and trains an LBPH recognizer using OpenCV and Haar-cascade detection.",
      "Real-time recognition records one attendance entry per student per day in SQLite, with login-protected record viewing through Django."
    ]
  },
  {
    "title": "IEEE RNSIT Computer Society Website",
    "dates": "Sep ’25",
    "stack": "React.js, Netlify, Full-Stack Development",
    "href": "https://github.com/Haruto69/IEEE-CS-Website",
    "bullets": [
      "React-based society website featuring dedicated sections for upcoming events, past events, and organizational information.",
      "Online team directory for faculty and student members, with public deployment and accessibility through Netlify."
    ]
  },
  {
    "title": "NBUC - Enhancing Product Security",
    "dates": "Apr ’25 – Oct ’25",
    "stack": "Python, Docker, Kubernetes, Generative AI, DevSecOps",
    "href": "https://github.com/Nithya-shree182/Nokia-proj-internal",
    "bullets": [
      "Automated Docker-image and Kubernetes-manifest scanning with remediated Dockerfile and YAML generation using Trivy, Kubescape, and kube-score.",
      "LLM-assisted analysis of SBOM and scan outputs, supported by Flask modules for image security, pod security, reporting, and an interactive chatbot."
    ]
  }
];

export const resumeExperience = [
  {
    "role": "Nokia - Nokia Bangalore University Collaboration (NBUC), Student Developer",
    "dates": "Apr ’25 – Oct ’25",
    "subtitle": "",
    "href": null,
    "bullets": [
      "Collaborated with Nokia mentors and a four-member CSE-Cybersecurity team to design an industry-oriented product-security solution for containerized workloads.",
      "Translated security requirements into a DevSecOps workflow combining automated scanning, remediation, and reporting for Docker and Kubernetes environments.",
      "Presented the solution at Nokia Open Day 2025 and contributed to a research paper associated with the project’s Best Implemented Industry Project award."
    ]
  }
];

export const resumeEducation = [
  {
    "institution": "RNS Institute of Technology, Bengaluru",
    "dates": "Sep ’23 – Aug ’27",
    "degree": "B.E. in Computer Science and Engineering (Cyber Security)",
    "note": "CGPA: 8.80/10",
    "bullets": []
  }
];

export const resumeAchievements = [
  "Won Best Implemented Industry Project at Nokia Open Day 2025 for the AI-assisted product-security solution developed under the Nokia Bangalore University Collaboration programme."
];
