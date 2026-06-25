# Mukund OS — CyberDeck Portfolio

![Mukund OS](public/favicon.svg)

## Overview
**Mukund OS** is an interactive, CyberDeck-themed frontend portfolio operating system built to showcase projects, technical skills, and internship readiness in a highly immersive, futuristic interface. 

Inspired by dark fantasy UI aesthetics (like *Solo Leveling*) and premium sci-fi interfaces, the project serves as a personalized web operating system. It features an interactive command palette, boot sequences, lazy-loaded modular routes, and a strictly enforced accessibility and responsive design.

*Note: This is a pure frontend React Single Page Application (SPA), emphasizing UI/UX and React engineering.*

## Features
- **Immersive Boot Sequence**: Simulates an OS bootloader, customizable via system settings.
- **Command Palette**: Fully keyboard-accessible global launcher (Cmd/Ctrl + K) for rapid navigation.
- **Shadow Purple Engine**: A centralized CSS-variable theme engine.
- **Dynamic Routing**: Built on `react-router-dom` with `React.lazy()` for massive bundle optimization.
- **Production Polish**: 100% accessible via `aria` labels, screen-reader support, and strict `focus-visible` UI rings. Respects `prefers-reduced-motion`.

## Tech Stack
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS + Custom CSS Variables
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router DOM (v6)

## Routes
- `/` - **Dashboard**: System overview and telemetry.
- `/projects` - **Archives**: Detailed project case studies.
- `/skills` - **Modules**: Technical capabilities matrix.
- `/about` - **User Dossier**: Background and story.
- `/resume` - **Service Record**: Education and profile snapshot.
- `/contact` - **Comms**: Secure communication channels.
- `/settings` - **Sys Config**: Local OS preferences (theme, motion, density).

## Getting Started

### Local Setup
Ensure you have Node.js installed.

```bash
# Clone the repository
git clone <your-repo-link>
cd mukund-os

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build & Preview
```bash
# Compile and optimize build chunks
npm run build

# Preview production build locally
npm run preview
```

## Deployment
This application is ready for Vercel deployment. 
A `vercel.json` file is included in the root to handle React Router's SPA dynamic routing fallbacks.

## Project Status
**Version**: `v1.0.0`
**Status**: Release Candidate — Frontend Portfolio polished for production deployment.
