<div align="center">

# 📓 CODEINK — Your Programming Notebook

**Master Computer Science one page at a time. Designed like a physical engineering notebook with digital superpowers.**

[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Security](https://img.shields.io/badge/Security-A%2B%20Hardened-emerald?style=for-the-badge&logo=security&logoColor=white)](#-security--privacy-architecture)
[![License](https://img.shields.io/badge/License-MIT-amber?style=for-the-badge)](LICENSE)

[Live Demo](https://code-ink.vercel.app/) · [Report Bug](https://github.com/harshlagwal/Code-Ink/issues) · [Request Feature](https://github.com/harshlagwal/Code-Ink/issues)

</div>

---

## 🌟 Overview

**CODEINK** reimagines computer science education. Instead of sterile, cookie-cutter documentation sites, CODEINK brings back the nostalgic, tactile pleasure of a **physical engineering notebook** — complete with ruled & grid paper textures, colored stationery highlighters, pencil sound effects, and physical 3D page turns — paired with **high-performance compilers, interactive memory tracers, and AI-powered learning**.

Whether you are mastering pointer arithmetic in **C**, STL algorithms in **C++**, memory models in **Java**, rapid prototyping in **Python**, async concurrency in **JavaScript**, or interview-grade **Data Structures & Algorithms**, CODEINK organizes knowledge with textbook depth and digital agility.

---

## ✨ Key Features

### 1. 📖 The Physical Engineering Notebook Spread
* **Two-Page Layout:** Left page dedicated to academic rigor, architecture diagrams, and concepts; right page dedicated to live code, viva traps, and practice exercises.
* **Tactile Paper Options:** Switch dynamically between **Ruled**, **Grid (Engineering Graph)**, and **Plain Paper**.
* **Highlighter & Stationery Tools:** 4 colored highlighters (Yellow, Green, Blue, Red) with realistic marker swash effects and an eraser tool to annotate notes directly on the page.
* **Realistic Sound Synthesizer:** Pure Web Audio API synthesis produces tactile paper turns, pencil scratches, and marker sounds without heavy audio assets.
* **Touch-Enabled Gestures:** Swipe left/right on mobile and tablets to turn pages smoothly.

### 2. ⚡ Zero-Config Multi-Language Online Compiler
* **Native Execution:** Real cloud-backed compilation for **GCC 13.2 (C)**, **G++ 13.2 (C++20)**, **OpenJDK 21 (Java)**, **Python 3.12**, and in-browser **JavaScript (V8)**.
* **Smart Preprocessor Engine:** Automatically handles script-style code snippets by isolating preprocessor directives (`#include`, `#define`) and wrapping statements cleanly inside entry points — zero compiler crashes on bare snippets.
* **Custom Stdin Support:** Full standard input feed support for interactive programs (`scanf`, `cin`, `input()`, `Scanner`).
* **Offline Fallback Simulation:** Deterministic offline execution engine ensures learning never stops even on disconnected or slow networks.

### 3. 🧠 Dry-Run Hardware Call-Stack & Memory Tracer
* Inspect variable state evolution, pointers, and memory addresses side-by-side with your code in real time.
* Dedicated **Dry-Run Memory Inspector** tab with variable state cards and stack simulation.

### 4. 🧰 100 Verified Free Tools for Students & Developers
* Curated directory of **100 industry-standard developer tools** across 8 essential categories:
  * ☁️ Cloud & Serverless Deployment
  * 🗄️ Database & Storage Engines
  * 🤖 AI, LLM & Machine Learning APIs
  * 🛠️ Developer Productivity & IDEs
  * 🎨 Design, Vectors & UI Frameworks
  * 🧪 API Testing & Backend Tooling
  * 🔐 Auth, Identity & Security
  * 📊 Analytics, Logging & Observability
* **Real Vector Logos:** 100 official high-resolution vector SVGs stored locally for 0-latency loading with zero third-party CDN tracking.
* **Student Pack Badges:** Highlights which tools are available free under the GitHub Student Developer Pack.
* **Search & Bookmarks:** Instant fuzzy search, category filtering, and bookmarking.

### 5. 🤖 AI Study Desk & Academic Assistant
* Powered by **Google Gemini 1.5 Flash** and **OpenRouter (Llama 3.3 70B, DeepSeek V3)**.
* Pre-configured with CS academic guardrails: explains call stack frames, debugs compiler errors, and writes unit tests while preventing jailbreaks.

### 6. 📝 50-Mark Examination Question Papers & Revision Flashcards
* Real academic-style question papers for each subject (3 randomized sets per track) simulating university examinations.
* Active-recall flashcards for rapid interview revision and viva preparation.

---

## 🛠️ Technology Stack

| Domain | Technology |
| :--- | :--- |
| **Frontend Framework** | [React 19](https://react.dev/) + [TypeScript 5.7](https://www.typescriptlang.org/) |
| **Build Tooling** | [Vite 8.3](https://vitejs.dev/) with Rolldown compiler |
| **Styling & Design System** | [TailwindCSS 4.0](https://tailwindcss.com/) + Custom Handwriting Font Stack |
| **Icons** | [Lucide React](https://lucide.dev/) + 100 Official Brand SVG Vectors |
| **Audio Engine** | Web Audio API (Native Realtime Synthesizer) |
| **Compilers** | Wandbox POSIX Distributed Engine (GCC 13, G++ 13, OpenJDK 21, Python 3.12) |
| **AI Inference** | Google Gemini API + OpenRouter API |
| **Security Headers** | Netlify `_headers` + Vercel `vercel.json` |

---

## 🔒 Security & Privacy Architecture

CODEINK implements an **A+ defense-in-depth security model**:

1. **Authoritative HTTP Security Headers:**
   * `Strict-Transport-Security (HSTS)`: Enforces HTTPS encryption.
   * `X-Frame-Options: DENY`: Prevents clickjacking and unauthorized iframe embeds.
   * `X-Content-Type-Options: nosniff`: Neutralizes MIME-confusion and script sniffing attacks.
   * `Permissions-Policy`: Restricts browser camera, microphone, and geolocation access.
2. **Hardened Client JavaScript Sandbox:**
   * User JavaScript in the playground executes with shadowed and frozen globals (`window`, `document`, `globalThis`, `localStorage`, `fetch`, `WebSocket`, `eval`, etc.) to prevent storage theft or network exfiltration.
3. **API Key Obfuscation:**
   * User-provided Gemini or OpenRouter keys are encrypted via XOR browser-fingerprint salt before storage.
4. **Anti-DoS Rate Limiting:**
   * Client-side rate-limiters prevent API abuse (2-second cooldown on compilation, 3-second on AI inference).
5. **Zero External Asset Leaks:**
   * All brand logos and typography are bundled locally or through trusted CDNs with strict CORS.

---

## 🚀 Getting Started

### Prerequisites
* [Node.js](https://nodejs.org/) (version 18 or higher recommended)
* `npm` or `pnpm`

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/harshlagwal/Code-Ink.git
   cd Code-Ink
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Build for production:**
   ```bash
   npm run build
   ```
   Generates optimized assets inside the `dist/` directory.

---

## 🌐 Deployment

### Deploying to Vercel (Recommended)
1. Push your code to GitHub.
2. Import the repository in [Vercel](https://vercel.com).
3. Vercel will automatically read `vercel.json` and configure root security headers and routes.
4. Hit **Deploy** — your site is live with global CDN caching!

### Deploying to Netlify
1. Connect your repository to [Netlify](https://www.netlify.com/).
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Netlify will automatically apply the headers defined in `public/_headers`.

---

## 🔍 SEO & Search Console Setup

CODEINK comes pre-configured with industry-standard SEO essentials:
* `robots.txt` allowing crawler indexing with auto-mapped sitemaps.
* `sitemap.xml` indexing all 6 subjects and tool directories.
* **JSON-LD Schema.org** `WebApplication` structured data for Google search rich snippets.
* OpenGraph & Twitter Cards for rich previews on WhatsApp, LinkedIn, Discord, and X.

> **Google Search Console Tip:**
> After deploying your custom domain, uncomment the verification meta tag in `index.html`:
> ```html
> <meta name="google-site-verification" content="YOUR_GOOGLE_TOKEN" />
> ```

---

## 🤝 Contributing

Contributions make the open-source community an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

<div align="center">
  <sub>Crafted with passion for students, engineers, and curious minds by <a href="https://github.com/harshlagwal">Harsh Lagwal</a>.</sub>
</div>
