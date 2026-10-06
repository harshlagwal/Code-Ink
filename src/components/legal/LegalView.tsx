import { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  FileText, 
  Lock, 
  Database, 
  Sparkles, 
  Scale, 
  ExternalLink, 
  ArrowLeft, 
  Printer, 
  CheckCircle2, 
  AlertTriangle, 
  Mail, 
  EyeOff, 
  Server, 
  Terminal,
  BookOpen,
  Code2,
  Clock,
  Compass,
  Copy,
  Check
} from 'lucide-react';

// Secure Bot-Obfuscated Contact Email Component
// Prevents email harvesting bots and crawlers from scraping the raw Gmail address
function SecureContactEmail({ variant = 'inline' }: { variant?: 'inline' | 'card' | 'sidebar' }) {
  const [copied, setCopied] = useState(false);

  // Runtime assembled from disjoint parts to avoid plaintext regex crawler detection
  const getEmail = () => {
    const handle = 'harshlagwal2005';
    const host = 'gmail.com';
    return `${handle}@${host}`;
  };

  const handleSend = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = `mailto:${getEmail()}`;
  };

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(getEmail());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (variant === 'sidebar') {
    return (
      <div className="flex items-center gap-1.5 flex-wrap">
        <button
          type="button"
          onClick={handleSend}
          className="inline-flex items-center gap-1 text-accent font-semibold hover:underline cursor-pointer group text-[11px]"
          title="Send email via mail client (Protected from spam bots)"
        >
          <Mail className="w-3 h-3 text-accent shrink-0" />
          <span className="font-mono">{getEmail()}</span>
        </button>
        <button
          type="button"
          onClick={handleCopy}
          className="p-1 rounded hover:bg-page text-muted hover:text-ink transition-colors cursor-pointer"
          title={copied ? "Copied!" : "Copy email address"}
          aria-label="Copy email address"
        >
          {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
        </button>
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <div className="flex items-center gap-2 flex-wrap pt-0.5">
        <span className="text-muted">Direct Email:</span>
        <button
          type="button"
          onClick={handleSend}
          className="inline-flex items-center gap-1.5 font-mono text-accent hover:underline cursor-pointer font-semibold"
          title="Send email to Harsh Lagwal"
        >
          <Mail className="w-3.5 h-3.5" />
          <span>{getEmail()}</span>
        </button>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono border border-line bg-raised hover:bg-page text-muted hover:text-ink transition-all cursor-pointer shadow-2xs"
          title="Copy email to clipboard"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-emerald-600" />
              <span className="text-emerald-600 font-semibold">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span>Copy</span>
            </>
          )}
        </button>
        <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
          Bot-Protected
        </span>
      </div>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5">
      <button
        type="button"
        onClick={handleSend}
        className="text-accent underline font-mono cursor-pointer hover:opacity-80"
        title="Send email to Harsh Lagwal"
      >
        {getEmail()}
      </button>
      <button
        type="button"
        onClick={handleCopy}
        className="p-1 rounded hover:bg-page text-muted hover:text-ink transition-colors cursor-pointer"
        title={copied ? "Copied!" : "Copy email address"}
      >
        {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
      </button>
    </span>
  );
}

export type LegalTab = 'privacy' | 'terms';

interface LegalViewProps {
  initialTab?: LegalTab;
  onGoBack: () => void;
  onGoToNotebook: () => void;
}

export function LegalView({
  initialTab = 'privacy',
  onGoBack,
  onGoToNotebook
}: LegalViewProps) {
  const [activeTab, setActiveTab] = useState<LegalTab>(initialTab);
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const handlePrint = () => {
    window.print();
  };

  const privacySections = [
    { id: 'overview', title: '1. Overview & Core Philosophy' },
    { id: 'data-collection', title: '2. Information We Do NOT Collect' },
    { id: 'local-storage', title: '3. Browser Local Storage Data' },
    { id: 'compiler-ai', title: '4. AI Study Desk & Compiler APIs' },
    { id: 'cookies-telemetry', title: '5. Cookies & Hosting Telemetry' },
    { id: 'security', title: '6. Data Security & Encryption' },
    { id: 'children', title: '7. Student & Minor Privacy' },
    { id: 'user-control', title: '8. How to Clear or Export Your Data' },
    { id: 'contact', title: '9. Contact & Data Officer' }
  ];

  const termsSections = [
    { id: 'acceptance', title: '1. Acceptance of Terms' },
    { id: 'educational-use', title: '2. Educational Purpose & Free Access' },
    { id: 'intellectual-property', title: '3. Intellectual Property Rights' },
    { id: 'code-ownership', title: '4. User Code & Content Ownership' },
    { id: 'acceptable-use', title: '5. Acceptable Use & Compiler Rules' },
    { id: 'external-tools', title: '6. Directory of 100 Free Tools' },
    { id: 'disclaimer', title: '7. Disclaimer of Warranties' },
    { id: 'liability', title: '8. Limitation of Liability' },
    { id: 'modifications', title: '9. Revisions & Governing Law' }
  ];

  const currentSections = activeTab === 'privacy' ? privacySections : termsSections;

  return (
    <div className="min-h-screen bg-app text-ink font-sans selection:bg-accent/20 selection:text-accent pb-20">
      {/* Top Header Navigation */}
      <header className="sticky top-0 z-30 bg-app/90 backdrop-blur-md border-b border-line px-4 sm:px-6 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onGoBack}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-line bg-raised hover:bg-page hover:border-stone-400 text-xs font-semibold text-ink transition-all cursor-pointer shadow-2xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>

            <button
              type="button"
              onClick={onGoToNotebook}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-accent/30 bg-accent-soft hover:bg-accent hover:text-white text-xs font-semibold text-accent transition-all cursor-pointer shadow-2xs"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Open Notebook</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-line bg-raised hover:bg-page text-xs font-medium text-muted hover:text-ink transition-all cursor-pointer shadow-2xs"
              title="Print document or save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print / Save PDF</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12">
        {/* Document Header Hero */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-line bg-raised text-[11px] font-mono uppercase tracking-wider text-accent mb-4 shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Official Legal Documentation · CODEINK</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-ink font-sans">
            {activeTab === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
          </h1>

          <p className="mt-3 text-sm sm:text-base text-muted max-w-2xl mx-auto leading-relaxed">
            {activeTab === 'privacy' 
              ? 'Transparent, privacy-first commitment for computer science students and engineers. Learn how CodeInk protects your notes, code, and browsing privacy.'
              : 'Clear and honest rules governing your use of CodeInk, our online compilers, learning modules, and directory of 100 free developer tools.'}
          </p>

          <div className="mt-4 flex items-center justify-center gap-3 text-xs font-mono text-muted flex-wrap">
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-accent" />
              Last Updated: October 2026
            </span>
            <span>·</span>
            <span>Version 2.4</span>
            <span>·</span>
            <span className="text-success font-semibold">Strict Client-Side Privacy Standard</span>
          </div>

          {/* Interactive Tab Switcher */}
          <div className="mt-8 inline-flex p-1.5 rounded-xl bg-raised border border-line shadow-xs">
            <button
              type="button"
              onClick={() => setActiveTab('privacy')}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'privacy'
                  ? 'bg-accent text-white shadow-xs'
                  : 'text-muted hover:text-ink'
              }`}
            >
              <Lock className="w-4 h-4" />
              <span>Privacy Policy</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('terms')}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'terms'
                  ? 'bg-accent text-white shadow-xs'
                  : 'text-muted hover:text-ink'
              }`}
            >
              <Scale className="w-4 h-4" />
              <span>Terms of Service</span>
            </button>
          </div>
        </div>

        {/* 3 Value Highlight Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <div className="p-4 sm:p-5 rounded-xl border border-line bg-raised shadow-xs">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3">
              <Database className="w-4 h-4" />
            </div>
            <h2 className="text-sm font-bold text-ink">Zero Server Tracking</h2>
            <p className="text-xs text-muted mt-1 leading-relaxed">
              Your notes, bookmarks, sticky notes, and highlights are stored locally in your browser's LocalStorage. No tracking database sits behind your personal study sessions.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-xl border border-line bg-raised shadow-xs">
            <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-[#2457D6] dark:text-blue-400 flex items-center justify-center mb-3">
              <Code2 className="w-4 h-4" />
            </div>
            <h2 className="text-sm font-bold text-ink">100% User Code Ownership</h2>
            <p className="text-xs text-muted mt-1 leading-relaxed">
              Any algorithm, code snippet, or engineering solution you draft in the margin compiler or whiteboard belongs solely and perpetually to you.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-xl border border-line bg-raised shadow-xs">
            <div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-3">
              <Sparkles className="w-4 h-4" />
            </div>
            <h2 className="text-sm font-bold text-ink">Transparent Third-Party APIs</h2>
            <p className="text-xs text-muted mt-1 leading-relaxed">
              Live code compilation (Wandbox) and AI Study Desk (Google Gemini) are invoked only on your explicit request, transmitting solely the immediate snippet.
            </p>
          </div>
        </div>

        {/* Layout: Sticky Sidebar TOC + Detailed Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Table of Contents Column */}
          <aside className="lg:col-span-4 sticky top-20 hidden lg:block">
            <div className="p-5 rounded-xl border border-line bg-raised shadow-xs">
              <div className="text-[11px] font-mono uppercase tracking-wider text-accent font-bold mb-3 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                <span>Table of Contents</span>
              </div>
              <nav className="space-y-1 text-xs">
                {currentSections.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    onClick={() => setActiveSection(sec.id)}
                    className={`block py-1.5 px-2 rounded-md transition-colors ${
                      activeSection === sec.id
                        ? 'bg-accent/10 text-accent font-semibold'
                        : 'text-muted hover:text-ink hover:bg-page'
                    }`}
                  >
                    {sec.title}
                  </a>
                ))}
              </nav>

              <div className="mt-6 pt-5 border-t border-line text-[11px] text-muted space-y-2">
                <div className="font-semibold text-ink">Need legal clarification?</div>
                <p>Reach out directly to the CodeInk engineering lead via email or GitHub.</p>
                <SecureContactEmail variant="sidebar" />
              </div>
            </div>
          </aside>

          {/* Legal Article Body */}
          <article className="lg:col-span-8 bg-page rounded-2xl border border-line p-6 sm:p-10 shadow-sm leading-relaxed space-y-10">
            {activeTab === 'privacy' ? (
              /* PRIVACY POLICY CONTENT */
              <>
                <section id="overview" className="scroll-mt-24 space-y-3">
                  <div className="flex items-center gap-2 text-accent text-xs font-mono font-bold uppercase tracking-wider">
                    <span>Section 01</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-ink tracking-tight font-sans">
                    1. Overview & Core Philosophy
                  </h2>
                  <p className="text-sm text-muted">
                    Welcome to <strong>CODEINK</strong> ("CodeInk", "we", "our", or "the platform"), accessible at{' '}
                    <a href="https://code-ink-theta.vercel.app/" className="text-accent underline font-mono text-xs">
                      https://code-ink-theta.vercel.app/
                    </a>. CodeInk is an interactive digital engineering notebook designed to teach core Computer Science (C, C++, Python, Java, JavaScript, DSA) with physical notebook aesthetics, zero-config live compilers, call-stack tracing, and curated developer tools.
                  </p>
                  <p className="text-sm text-muted">
                    Our fundamental privacy principle is straightforward: <strong>We do not harvest, sell, monetize, or track your personal study habits.</strong> Unlike modern ad-driven platforms, CodeInk was architected from the ground up as a decentralized, client-first educational utility.
                  </p>
                </section>

                <section id="data-collection" className="scroll-mt-24 space-y-3 pt-6 border-t border-line">
                  <div className="flex items-center gap-2 text-accent text-xs font-mono font-bold uppercase tracking-wider">
                    <span>Section 02</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-ink tracking-tight font-sans">
                    2. Information We Do NOT Collect
                  </h2>
                  <p className="text-sm text-muted">
                    To maintain utmost privacy, CodeInk operates without compulsory account registration or invasive analytics. Specifically, we do NOT collect:
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-muted font-medium pt-1">
                    <li className="flex items-center gap-2 p-2.5 rounded-lg bg-raised border border-line">
                      <EyeOff className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>No personal names, phone numbers, or physical addresses</span>
                    </li>
                    <li className="flex items-center gap-2 p-2.5 rounded-lg bg-raised border border-line">
                      <EyeOff className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>No social media profiling or cross-site behavioral tracking</span>
                    </li>
                    <li className="flex items-center gap-2 p-2.5 rounded-lg bg-raised border border-line">
                      <EyeOff className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>No banking or financial credit card information</span>
                    </li>
                    <li className="flex items-center gap-2 p-2.5 rounded-lg bg-raised border border-line">
                      <EyeOff className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>No secret keystroke logging outside of the active sandbox</span>
                    </li>
                  </ul>
                </section>

                <section id="local-storage" className="scroll-mt-24 space-y-3 pt-6 border-t border-line">
                  <div className="flex items-center gap-2 text-accent text-xs font-mono font-bold uppercase tracking-wider">
                    <span>Section 03</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-ink tracking-tight font-sans">
                    3. Browser Local Storage Data
                  </h2>
                  <p className="text-sm text-muted">
                    CodeInk stores your progress directly in your browser's <code className="font-mono text-xs bg-raised px-1.5 py-0.5 border border-line rounded text-ink">window.localStorage</code>. This data never touches our remote servers. The keys utilized are:
                  </p>
                  <div className="space-y-2 text-xs font-mono">
                    <div className="p-3 bg-raised rounded-lg border border-line flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <span className="text-accent font-semibold">codeink_bookmarks</span>
                      <span className="text-muted font-sans text-xs">Array of topic IDs you have bookmarked for quick revision.</span>
                    </div>
                    <div className="p-3 bg-raised rounded-lg border border-line flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <span className="text-accent font-semibold">codeink_completed</span>
                      <span className="text-muted font-sans text-xs">Array of completed lesson milestones across the 6 curriculum tracks.</span>
                    </div>
                    <div className="p-3 bg-raised rounded-lg border border-line flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <span className="text-accent font-semibold">codeink_notes</span>
                      <span className="text-muted font-sans text-xs">Custom text notes you write in the notebook margin.</span>
                    </div>
                    <div className="p-3 bg-raised rounded-lg border border-line flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <span className="text-accent font-semibold">codeink_sticky_notes</span>
                      <span className="text-muted font-sans text-xs">Color-coded tactile sticky notes placed across notebook pages.</span>
                    </div>
                    <div className="p-3 bg-raised rounded-lg border border-line flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <span className="text-accent font-semibold">codeink_user_highlights</span>
                      <span className="text-muted font-sans text-xs">Yellow, green, blue, and red text highlights made with highlighter pens.</span>
                    </div>
                    <div className="p-3 bg-raised rounded-lg border border-line flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <span className="text-accent font-semibold">codeink_theme</span>
                      <span className="text-muted font-sans text-xs">Theme preference: Light (default ruled paper) or Dark (Warm Night).</span>
                    </div>
                  </div>
                </section>

                <section id="compiler-ai" className="scroll-mt-24 space-y-3 pt-6 border-t border-line">
                  <div className="flex items-center gap-2 text-accent text-xs font-mono font-bold uppercase tracking-wider">
                    <span>Section 04</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-ink tracking-tight font-sans">
                    4. AI Study Desk & Live Compiler APIs
                  </h2>
                  <p className="text-sm text-muted">
                    When you explicitly trigger interactive cloud-based operations, the following data is transmitted transiently:
                  </p>
                  <div className="space-y-3">
                    <div className="p-4 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900/50 text-xs">
                      <div className="font-bold text-indigo-950 dark:text-indigo-300 flex items-center gap-1.5 mb-1">
                        <Terminal className="w-3.5 h-3.5" />
                        <span>Online Code Compilation (Wandbox Engine)</span>
                      </div>
                      <p className="text-indigo-900/80 dark:text-indigo-300/80 leading-relaxed">
                        When you click "Run Code" inside the notebook margin or live sandbox, your code snippet is dispatched via HTTPS POST to Wandbox public compiler servers (GCC, Clang, CPython, OpenJDK, Node.js). It runs in an isolated disposable sandbox. Wandbox does not permanently link executions to individual users.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-900/50 text-xs">
                      <div className="font-bold text-purple-950 dark:text-purple-300 flex items-center gap-1.5 mb-1">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>AI Engineering Study Desk (Google Gemini API)</span>
                      </div>
                      <p className="text-purple-900/80 dark:text-purple-300/80 leading-relaxed">
                        When asking questions or asking the AI Desk to debug a segment of code, your prompt and selected snippet are sent directly to Google Gemini API endpoints. Google handles API payloads in compliance with enterprise data terms (API prompts are not used to train public models without consent).
                      </p>
                    </div>
                  </div>
                </section>

                <section id="cookies-telemetry" className="scroll-mt-24 space-y-3 pt-6 border-t border-line">
                  <div className="flex items-center gap-2 text-accent text-xs font-mono font-bold uppercase tracking-wider">
                    <span>Section 05</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-ink tracking-tight font-sans">
                    5. Cookies & Hosting Telemetry
                  </h2>
                  <p className="text-sm text-muted">
                    CodeInk itself uses <strong>zero third-party marketing cookies</strong>. 
                  </p>
                  <p className="text-sm text-muted">
                    Our platform is deployed globally via <strong>Vercel</strong>. Like all web hosting providers, Vercel servers process standard automated HTTP logs (such as request timestamps, IP addresses, user-agent strings, and visited paths) to defend against DDoS attacks and maintain 99.9% uptime reliability.
                  </p>
                </section>

                <section id="security" className="scroll-mt-24 space-y-3 pt-6 border-t border-line">
                  <div className="flex items-center gap-2 text-accent text-xs font-mono font-bold uppercase tracking-wider">
                    <span>Section 06</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-ink tracking-tight font-sans">
                    6. Data Security & Encryption
                  </h2>
                  <p className="text-sm text-muted">
                    We maintain comprehensive technical standards to protect your browsing session:
                  </p>
                  <ul className="space-y-2 text-xs text-muted">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Enforced HTTPS / TLS 1.3:</strong> All communications between your browser and our platform are encrypted with modern cipher suites.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Strict Content Security Policy (CSP):</strong> We enforce strict script, style, and frame-ancestors policies in our HTTP headers to prevent XSS and iframe clickjacking.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Referrer Leakage Prevention:</strong> Configured with <code className="font-mono bg-raised px-1 border border-line rounded">strict-origin-when-cross-origin</code> to prevent sensitive tokens from leaking in query parameters.</span>
                    </li>
                  </ul>
                </section>

                <section id="children" className="scroll-mt-24 space-y-3 pt-6 border-t border-line">
                  <div className="flex items-center gap-2 text-accent text-xs font-mono font-bold uppercase tracking-wider">
                    <span>Section 07</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-ink tracking-tight font-sans">
                    7. Student & Minor Privacy (COPPA / GDPR-K)
                  </h2>
                  <p className="text-sm text-muted">
                    CodeInk is an open educational tool suitable for high school and university students of all ages. Because we do not collect personal identifiers, emails, or biometric data, CodeInk is inherently compliant with student privacy protections under COPPA and European GDPR-K guidelines.
                  </p>
                </section>

                <section id="user-control" className="scroll-mt-24 space-y-3 pt-6 border-t border-line">
                  <div className="flex items-center gap-2 text-accent text-xs font-mono font-bold uppercase tracking-wider">
                    <span>Section 08</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-ink tracking-tight font-sans">
                    8. How to Clear or Export Your Data
                  </h2>
                  <p className="text-sm text-muted">
                    Because your notes and highlights are kept in your browser's local cache, you maintain 100% control over them at all times:
                  </p>
                  <div className="p-4 rounded-xl bg-raised border border-line text-xs text-muted space-y-2">
                    <p>
                      <strong>To wipe all CodeInk data:</strong> Simply navigate to the <em>Progress View</em> inside CodeInk and click <strong>"Reset All Data"</strong>, or open your browser's settings and clear LocalStorage for <code className="font-mono text-ink">code-ink-theta.vercel.app</code>.
                    </p>
                  </div>
                </section>

                <section id="contact" className="scroll-mt-24 space-y-3 pt-6 border-t border-line">
                  <div className="flex items-center gap-2 text-accent text-xs font-mono font-bold uppercase tracking-wider">
                    <span>Section 09</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-ink tracking-tight font-sans">
                    9. Contact & Inquiries
                  </h2>
                  <p className="text-sm text-muted">
                    If you have questions, feedback, or security vulnerability disclosures regarding this Privacy Policy, please contact our maintainer:
                  </p>
                  <div className="p-4 rounded-xl bg-accent-soft border border-accent/20 text-xs text-ink space-y-2">
                    <div className="font-bold text-accent">Harsh Lagwal (Founder & Maintainer)</div>
                    <SecureContactEmail variant="card" />
                    <div>GitHub: <a href="https://github.com/harshlagwal/Code-Ink" target="_blank" rel="noopener noreferrer" className="underline font-mono">github.com/harshlagwal/Code-Ink</a></div>
                  </div>
                </section>
              </>
            ) : (
              /* TERMS OF SERVICE CONTENT */
              <>
                <section id="acceptance" className="scroll-mt-24 space-y-3">
                  <div className="flex items-center gap-2 text-accent text-xs font-mono font-bold uppercase tracking-wider">
                    <span>Section 01</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-ink tracking-tight font-sans">
                    1. Acceptance of Terms
                  </h2>
                  <p className="text-sm text-muted">
                    By browsing, accessing, or using the <strong>CODEINK</strong> platform (the "Service"), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service ("Terms"). If you disagree with any portion of these terms, you must discontinue using CodeInk.
                  </p>
                </section>

                <section id="educational-use" className="scroll-mt-24 space-y-3 pt-6 border-t border-line">
                  <div className="flex items-center gap-2 text-accent text-xs font-mono font-bold uppercase tracking-wider">
                    <span>Section 02</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-ink tracking-tight font-sans">
                    2. Educational Purpose & Free Access
                  </h2>
                  <p className="text-sm text-muted">
                    CodeInk is provided as an open, free educational platform for students, programmers, and hobbyists. There are no paywalls, hidden subscription fees, or locked features.
                  </p>
                  <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 rounded-lg text-xs text-emerald-800 dark:text-emerald-300">
                    <strong>Free Forever Promise:</strong> All 6 volumes (C, C++, Python, Java, JavaScript, DSA), the 50-mark examination papers, and the 100-tools vault are accessible without payment.
                  </div>
                </section>

                <section id="intellectual-property" className="scroll-mt-24 space-y-3 pt-6 border-t border-line">
                  <div className="flex items-center gap-2 text-accent text-xs font-mono font-bold uppercase tracking-wider">
                    <span>Section 03</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-ink tracking-tight font-sans">
                    3. Intellectual Property Rights
                  </h2>
                  <p className="text-sm text-muted">
                    The visual physical notebook design, tactile styling, chapter curricula, diagrams, illustrations, animations, and branding elements of CodeInk are the intellectual property of Harsh Lagwal and CodeInk contributors.
                  </p>
                  <p className="text-sm text-muted">
                    You may use, study, and reference CodeInk content for personal, non-commercial educational purposes. Reproducing or cloning the entire platform codebase for commercial resale without prior authorization is strictly prohibited.
                  </p>
                </section>

                <section id="code-ownership" className="scroll-mt-24 space-y-3 pt-6 border-t border-line">
                  <div className="flex items-center gap-2 text-accent text-xs font-mono font-bold uppercase tracking-wider">
                    <span>Section 04</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-ink tracking-tight font-sans">
                    4. User Code & Content Ownership
                  </h2>
                  <p className="text-sm text-muted">
                    <strong>You retain 100% full intellectual property rights</strong> to any source code, practice solutions, notes, or engineering drafts you write inside CodeInk's margin editor, whiteboard, or study desk. CodeInk claims zero copyright or licensing rights over your personal work.
                  </p>
                </section>

                <section id="acceptable-use" className="scroll-mt-24 space-y-3 pt-6 border-t border-line">
                  <div className="flex items-center gap-2 text-accent text-xs font-mono font-bold uppercase tracking-wider">
                    <span>Section 05</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-ink tracking-tight font-sans">
                    5. Acceptable Use & Compiler Rules
                  </h2>
                  <p className="text-sm text-muted">
                    When using CodeInk's online compilers, sandbox playgrounds, and AI Study Desk, you agree NOT to:
                  </p>
                  <ul className="space-y-2 text-xs text-muted">
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <span>Submit malicious payloads, fork bombs, cryptominers, botnet agents, or ransomware to compiler execution servers.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <span>Execute denial-of-service (DoS) attempts or spam API endpoints automatedly.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <span>Attempt to reverse-engineer or breach the isolated container environments of partner sandbox servers.</span>
                    </li>
                  </ul>
                </section>

                <section id="external-tools" className="scroll-mt-24 space-y-3 pt-6 border-t border-line">
                  <div className="flex items-center gap-2 text-accent text-xs font-mono font-bold uppercase tracking-wider">
                    <span>Section 06</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-ink tracking-tight font-sans">
                    6. Directory of 100 Free Developer Tools
                  </h2>
                  <p className="text-sm text-muted">
                    CodeInk curates a directory of 100 free software engineering tools, APIs, design systems, and utilities. These third-party services are owned and operated by independent third parties. CodeInk has no control over and assumes no responsibility for the content, privacy policies, or practices of any third-party websites or services.
                  </p>
                </section>

                <section id="disclaimer" className="scroll-mt-24 space-y-3 pt-6 border-t border-line">
                  <div className="flex items-center gap-2 text-accent text-xs font-mono font-bold uppercase tracking-wider">
                    <span>Section 07</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-ink tracking-tight font-sans">
                    7. Disclaimer of Warranties
                  </h2>
                  <p className="text-sm text-muted">
                    CODEINK IS PROVIDED ON AN <strong>"AS IS"</strong> AND <strong>"AS AVAILABLE"</strong> BASIS, WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. WHILE WE TAKE PRIDE IN RIGOROUS COMPUTER SCIENCE ACCURACY, WE DO NOT GUARANTEE THAT THE PLATFORM WILL BE 100% ERROR-FREE, UNINTERRUPTED, OR FREE OF TEMPORARY SANDBOX COMPILER DELAYS.
                  </p>
                </section>

                <section id="liability" className="scroll-mt-24 space-y-3 pt-6 border-t border-line">
                  <div className="flex items-center gap-2 text-accent text-xs font-mono font-bold uppercase tracking-wider">
                    <span>Section 08</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-ink tracking-tight font-sans">
                    8. Limitation of Liability
                  </h2>
                  <p className="text-sm text-muted">
                    IN NO EVENT SHALL CODEINK, ITS MAINTAINERS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF YOUR USE OR INABILITY TO USE THE PLATFORM OR COMPILERS.
                  </p>
                </section>

                <section id="modifications" className="scroll-mt-24 space-y-3 pt-6 border-t border-line">
                  <div className="flex items-center gap-2 text-accent text-xs font-mono font-bold uppercase tracking-wider">
                    <span>Section 09</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-ink tracking-tight font-sans">
                    9. Revisions & Contact
                  </h2>
                  <p className="text-sm text-muted">
                    We reserve the right to modify or replace these Terms as new features (e.g., collaborative classrooms or added compiler languages) are introduced. Updated terms will always reflect a revised "Last Updated" date.
                  </p>
                  <div className="pt-2">
                    <p className="text-xs text-muted flex items-center gap-1.5 flex-wrap">
                      <span>Questions regarding these terms may be directed to</span>
                      <SecureContactEmail variant="inline" />
                    </p>
                  </div>
                </section>
              </>
            )}
          </article>
        </div>

        {/* Bottom CTA Box */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-raised border border-line text-center shadow-xs">
          <div className="max-w-xl mx-auto space-y-3">
            <h3 className="text-lg font-bold text-ink font-sans">Ready to dive back into learning?</h3>
            <p className="text-xs sm:text-sm text-muted">
              Continue exploring our physical notebook tracks in C, C++, Python, Java, JavaScript, and DSA.
            </p>
            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={onGoToNotebook}
                className="px-5 py-2.5 rounded-lg bg-accent text-white text-xs sm:text-sm font-semibold hover:bg-accent/90 transition-all shadow-xs cursor-pointer inline-flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                <span>Open Digital Notebook</span>
              </button>
              <button
                type="button"
                onClick={onGoBack}
                className="px-4 py-2.5 rounded-lg border border-line bg-page text-ink text-xs sm:text-sm font-medium hover:bg-raised transition-all cursor-pointer"
              >
                Return to Previous Page
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
