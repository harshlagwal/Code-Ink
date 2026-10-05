// CODEINK V3 — AI Study Desk (Professional Gemini & ChatGPT Inspired Layout)
// Full-width, clean conversational canvas with left navigation sidebar and floating bottom composer.

import { useState, useRef, useEffect } from 'react';
import { Subject, TopicContent } from '../types/notebook';
import {
  aiClient,
  AIProvider,
  AIMessage,
  OPENROUTER_MODEL_OPTIONS
} from '../services/aiClient';
import {
  Bot,
  Send,
  Key,
  Settings,
  Copy,
  Check,
  Sparkles,
  ExternalLink,
  Eye,
  EyeOff,
  AlertCircle,
  HelpCircle,
  RotateCcw,
  ArrowLeft,
  BookOpen,
  Plus,
  PanelLeftClose,
  PanelLeftOpen,
  ChevronDown,
  Code2,
  Bug,
  MessageSquare,
  Compass,
  Lightbulb,
  Cpu,
  Trash2
} from 'lucide-react';
import { notebookAudio } from '../utils/audioEffects';

interface AIStudyDeskViewProps {
  subject: Subject;
  chapterTitle: string;
  topic: TopicContent;
  allSubjects: Subject[];
  onSelectSubject?: (subject: Subject) => void;
  onSelectTopic?: (topic: TopicContent, subject: Subject) => void;
  initialCodeSnippet?: string;
  onGoToNotebook: () => void;
}

interface ChatSession {
  id: string;
  title: string;
  topicTitle: string;
  subjectCode: string;
  messages: AIMessage[];
  updatedAt: string;
}

export function AIStudyDeskView({
  subject,
  chapterTitle,
  topic,
  allSubjects,
  onSelectSubject,
  onSelectTopic,
  initialCodeSnippet,
  onGoToNotebook
}: AIStudyDeskViewProps) {
  // Provider & API Keys
  const [provider, setProvider] = useState<AIProvider>(aiClient.getProvider());
  const [geminiKey, setGeminiKey] = useState<string>(aiClient.getApiKey('gemini'));
  const [openRouterKey, setOpenRouterKey] = useState<string>(aiClient.getApiKey('openrouter'));
  const [openRouterModel, setOpenRouterModel] = useState<string>(aiClient.getOpenRouterModel());

  // UI state (closed by default on mobile screens to give chat canvas full width)
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    if (typeof window === 'undefined') return true;
    return window.innerWidth >= 1024;
  });
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [keySavedMessage, setKeySavedMessage] = useState<string | null>(null);

  // Chat sessions state with deduplication on load
  const [sessions, setSessions] = useState<ChatSession[]>(() => {
    try {
      const saved = localStorage.getItem('codeink_ai_chat_sessions');
      if (!saved) return [];
      const parsed: ChatSession[] = JSON.parse(saved);
      const seenIds = new Set<string>();
      return parsed.filter(item => {
        if (!item || !item.id || seenIds.has(item.id)) return false;
        seenIds.add(item.id);
        return true;
      });
    } catch {
      return [];
    }
  });

  const [activeSessionId, setActiveSessionId] = useState<string>('current');
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Sync keys from storage on mount
  useEffect(() => {
    const currentProv = aiClient.getProvider();
    setProvider(currentProv);
    const gKey = aiClient.getApiKey('gemini');
    const oKey = aiClient.getApiKey('openrouter');
    setGeminiKey(gKey);
    setOpenRouterKey(oKey);
    setOpenRouterModel(aiClient.getOpenRouterModel());

    // Prompt key modal only if user has never configured any key
    if (!gKey && !oKey) {
      setShowKeyModal(true);
    }
  }, []);

  // Save sessions to storage whenever changed
  useEffect(() => {
    try {
      localStorage.setItem('codeink_ai_chat_sessions', JSON.stringify(sessions));
    } catch (e) {
      console.warn('Failed to save sessions', e);
    }
  }, [sessions]);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const currentApiKey = provider === 'gemini' ? geminiKey : openRouterKey;
  const isKeyConfigured = Boolean(currentApiKey && currentApiKey.trim().length > 5);

  const handleSaveKey = () => {
    if (provider === 'gemini') {
      aiClient.setApiKey('gemini', geminiKey);
    } else {
      aiClient.setApiKey('openrouter', openRouterKey);
      aiClient.setOpenRouterModel(openRouterModel);
    }
    aiClient.setProvider(provider);
    notebookAudio.playSuccess();
    setKeySavedMessage('API Key saved securely in your browser!');
    setTimeout(() => {
      setKeySavedMessage(null);
      if (currentApiKey.trim().length > 5) {
        setShowKeyModal(false);
      }
    }, 1200);
  };

  const handleClearKey = () => {
    if (provider === 'gemini') {
      aiClient.clearApiKey('gemini');
      setGeminiKey('');
    } else {
      aiClient.clearApiKey('openrouter');
      setOpenRouterKey('');
    }
    notebookAudio.playPencil();
    setKeySavedMessage('API Key removed.');
    setTimeout(() => setKeySavedMessage(null), 1500);
  };

  // New Chat: Resets active canvas without duplicating sessions
  const handleNewChat = () => {
    setActiveSessionId('current');
    setMessages([]);
    setErrorMsg(null);
    setInputQuery('');
    notebookAudio.playPencil();
    setTimeout(() => textareaRef.current?.focus(), 50);
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  // Delete a specific session
  const handleDeleteSession = (e: React.MouseEvent, sessionId: string) => {
    e.stopPropagation();
    setSessions(prev => prev.filter(s => s.id !== sessionId));
    if (activeSessionId === sessionId) {
      setActiveSessionId('current');
      setMessages([]);
      setErrorMsg(null);
      setInputQuery('');
    }
    notebookAudio.playPencil();
  };

  // Clear all sessions
  const handleClearAllSessions = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (sessions.length === 0) return;
    if (window.confirm('Are you sure you want to delete all chat history?')) {
      setSessions([]);
      setActiveSessionId('current');
      setMessages([]);
      setErrorMsg(null);
      setInputQuery('');
      try {
        localStorage.removeItem('codeink_ai_chat_sessions');
      } catch (err) {
        console.warn(err);
      }
      notebookAudio.playPencil();
    }
  };

  const handleLoadSession = (sess: ChatSession) => {
    setActiveSessionId(sess.id);
    setMessages(sess.messages);
    setErrorMsg(null);
    notebookAudio.playPencil();
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  const buildSystemPrompt = () => {
    return `You are CodeInk AI Study Desk, an elite engineering and computer science mentor embedded in the student's physical programming notebook.
Current Active Study Context:
- Subject: ${subject.name} (${subject.shortCode})
- Chapter: ${chapterTitle}
- Topic: ${topic.title}
- Definition: ${topic.definition}
${topic.syntax ? `- Syntax: ${topic.syntax}` : ''}
${initialCodeSnippet ? `- Notebook Code Snippet:\n${initialCodeSnippet}` : ''}

Guidelines:
1. Deliver world-class, rigorous yet clear explanations tailored for engineering students.
2. Format your response cleanly with markdown: bold key concepts, bullet lists, and standard code blocks (\`\`\`lang ... \`\`\`).
3. Add step-by-step comments in all code samples.
4. Pinpoint logic traps, compiler issues, and memory architecture.
5. Reply in natural English or Hinglish depending on student's prompt.`;
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputQuery).trim();
    if (!query || isLoading) return;

    if (!isKeyConfigured) {
      setShowKeyModal(true);
      setErrorMsg(`Please configure your ${provider === 'gemini' ? 'Google Gemini' : 'OpenRouter'} API Key first.`);
      return;
    }

    setErrorMsg(null);
    setInputQuery('');

    const userMessage: AIMessage = {
      id: 'msg-' + Date.now(),
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);

    // Determine session ID (create if new chat, otherwise maintain existing session)
    let currentSessionId = activeSessionId;
    if (currentSessionId === 'current') {
      currentSessionId = 'session-' + Date.now();
      setActiveSessionId(currentSessionId);
      
      const newSession: ChatSession = {
        id: currentSessionId,
        title: query.length > 38 ? query.slice(0, 38) + '...' : query,
        topicTitle: topic.title,
        subjectCode: subject.shortCode,
        messages: newMessages,
        updatedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setSessions(prev => [newSession, ...prev.filter(s => s.id !== currentSessionId).slice(0, 24)]);
    } else {
      // Update existing session
      setSessions(prev => prev.map(s => {
        if (s.id === currentSessionId) {
          return {
            ...s,
            messages: newMessages,
            updatedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
        }
        return s;
      }));
    }

    setIsLoading(true);
    notebookAudio.playPencil();

    try {
      const response = await aiClient.sendMessage({
        provider,
        apiKey: currentApiKey,
        messages: newMessages.map(m => ({ role: m.role as 'user' | 'assistant', content: m.content })),
        systemPrompt: buildSystemPrompt(),
        model: provider === 'openrouter' ? openRouterModel : undefined
      });

      const assistantMessage: AIMessage = {
        id: 'msg-' + (Date.now() + 1),
        role: 'assistant',
        content: response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      const finalMessages = [...newMessages, assistantMessage];
      setMessages(finalMessages);
      notebookAudio.playSuccess();

      // Update session in history with assistant response
      setSessions(prev => prev.map(s => {
        if (s.id === currentSessionId) {
          return {
            ...s,
            messages: finalMessages,
            updatedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
        }
        return s;
      }));
    } catch (err: any) {
      console.error('AI Study Desk Error:', err);
      setErrorMsg(err.message || 'Failed to generate response. Check your API key and connection.');
      notebookAudio.playError();
    } finally {
      setIsLoading(false);
      setTimeout(() => textareaRef.current?.focus(), 100);
    }
  };

  const handleCopyCode = (code: string, blockId: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeIndex(blockId);
    notebookAudio.playPencil();
    setTimeout(() => setCopiedCodeIndex(null), 2000);
  };

  // Render markdown with code block copy buttons
  const renderMessageContent = (content: string, msgId: string) => {
    const codeBlockRegex = /```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;
    let blockCount = 0;

    while ((match = codeBlockRegex.exec(content)) !== null) {
      const textBefore = content.substring(lastIndex, match.index);
      if (textBefore) {
        parts.push(
          <div key={`text-${lastIndex}`} className="whitespace-pre-wrap leading-relaxed space-y-2">
            {renderFormattedText(textBefore)}
          </div>
        );
      }

      const lang = match[1] || 'code';
      const code = match[2];
      const blockId = `${msgId}-block-${blockCount++}`;
      const isCopied = copiedCodeIndex === blockId;

      parts.push(
        <div key={blockId} className="my-4 rounded-xl overflow-hidden border border-stone-800 bg-[#0F141C] text-stone-100 font-mono text-xs shadow-lg">
          <div className="flex items-center justify-between px-4 py-2 bg-[#1A202C] border-b border-stone-800 text-[11px] text-stone-400">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
              <span className="font-semibold uppercase tracking-wider text-stone-300 ml-1">{lang}</span>
            </div>
            <button
              type="button"
              onClick={() => handleCopyCode(code, blockId)}
              className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded hover:bg-stone-700/60 text-stone-300 hover:text-white transition-colors cursor-pointer"
              title="Copy Code"
            >
              {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{isCopied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <pre className="p-4 overflow-x-auto text-xs leading-relaxed text-[#ECEFF4] font-mono">
            <code>{code}</code>
          </pre>
        </div>
      );

      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < content.length) {
      const remainingText = content.substring(lastIndex);
      parts.push(
        <div key={`text-${lastIndex}`} className="whitespace-pre-wrap leading-relaxed space-y-2">
          {renderFormattedText(remainingText)}
        </div>
      );
    }

    return parts;
  };

  const renderFormattedText = (raw: string) => {
    const lines = raw.split('\n');
    return lines.map((line, idx) => {
      const formatted = line.split(/(\*\*.*?\*\*|`.*?`)/g).map((seg, i) => {
        if (seg.startsWith('**') && seg.endsWith('**')) {
          return <strong key={i} className="font-bold text-ink">{seg.slice(2, -2)}</strong>;
        }
        if (seg.startsWith('`') && seg.endsWith('`')) {
          return (
            <code key={i} className="px-1.5 py-0.5 rounded bg-code text-accent font-mono text-[11px] border border-line">
              {seg.slice(1, -1)}
            </code>
          );
        }
        return seg;
      });

      if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        return (
          <div key={idx} className="flex items-start gap-2.5 pl-2 my-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
            <div className="flex-1">{formatted}</div>
          </div>
        );
      }

      if (line.trim().startsWith('### ')) {
        return <h4 key={idx} className="font-bold text-sm text-ink mt-3 mb-1">{line.slice(4)}</h4>;
      }
      if (line.trim().startsWith('## ')) {
        return <h3 key={idx} className="font-bold text-base text-ink mt-4 mb-1">{line.slice(3)}</h3>;
      }

      return <p key={idx} className="my-1 text-ink leading-relaxed">{formatted}</p>;
    });
  };

  const starterCards = [
    {
      icon: Lightbulb,
      title: 'Conceptual Breakdown',
      desc: `Explain ${topic.title} in plain English with an intuitive physical analogy.`,
      color: 'text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-500/20'
    },
    {
      icon: Code2,
      title: 'Production Example',
      desc: `Write a robust, fully documented program illustrating ${topic.title}.`,
      color: 'text-blue-700 dark:text-accent bg-blue-100 dark:bg-accent/20'
    },
    {
      icon: Bug,
      title: 'Pitfalls & Edge Cases',
      desc: `What memory or syntax traps do engineering students often encounter here?`,
      color: 'text-rose-600 dark:text-rose-400 bg-rose-100 dark:bg-rose-500/20'
    },
    {
      icon: Cpu,
      title: 'Hardware & Architecture',
      desc: `How does the CPU/OS execute ${topic.title} under the hood?`,
      color: 'text-violet-700 dark:text-purple-400 bg-violet-100 dark:bg-purple-500/20'
    }
  ];

  return (
    <div className="flex h-[calc(100vh-4.25rem)] w-full overflow-hidden bg-page text-ink font-sans border-t border-line relative">
      
      {/* Mobile Drawer Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-stone-950/40 backdrop-blur-xs z-30 lg:hidden animate-in fade-in"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* ================= LEFT SIDEBAR (CHATGPT / GEMINI STYLE) ================= */}
      <aside
        className={`bg-raised border-r border-line flex flex-col shrink-0 transition-all duration-300 ease-in-out lg:static fixed inset-y-0 left-0 z-40 h-full shadow-2xl lg:shadow-none ${
          isSidebarOpen ? 'w-72 max-w-[85vw]' : 'w-0 -translate-x-full lg:w-0 overflow-hidden pointer-events-none'
        }`}
      >
        <div className="p-3.5 border-b border-line flex items-center justify-between gap-2">
          {/* New Chat Button */}
          <button
            type="button"
            onClick={handleNewChat}
            className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-page hover:bg-raised border border-line shadow-2xs text-xs font-semibold text-ink transition-all cursor-pointer hover:border-accent"
          >
            <Plus className="w-4 h-4 text-accent" />
            <span>New Chat</span>
          </button>

          {/* Toggle sidebar */}
          <button
            type="button"
            onClick={() => setIsSidebarOpen(false)}
            className="p-2 rounded-lg text-muted hover:text-ink hover:bg-page transition-colors cursor-pointer"
            title="Collapse Sidebar"
          >
            <PanelLeftClose className="w-4 h-4" />
          </button>
        </div>

        {/* Current Active Notebook Context Widget */}
        <div className="p-3 border-b border-line bg-page">
          <div className="text-[10px] font-mono uppercase font-bold tracking-wider text-muted mb-1.5 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-accent" />
            <span>Active Notebook Topic</span>
          </div>

          <div className="p-2.5 rounded-lg bg-accent/10 border border-accent/25">
            <div className="font-semibold text-xs text-accent truncate">
              {subject.name}
            </div>
            <div className="text-xs font-medium text-ink truncate mt-0.5">
              {topic.title}
            </div>
            <div className="text-[10px] text-muted truncate mt-0.5">
              Chapter {String(topic.chapterNumber).padStart(2, '0')}: {chapterTitle}
            </div>
          </div>
        </div>

        {/* Chat History List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          <div className="flex items-center justify-between px-2 py-1 mb-1">
            <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-muted">
              Recent Chats {sessions.length > 0 && `(${sessions.length})`}
            </span>
            {sessions.length > 0 && (
              <button
                type="button"
                onClick={handleClearAllSessions}
                className="text-[10px] font-mono text-muted hover:text-rose-500 transition-colors flex items-center gap-1 cursor-pointer hover:bg-rose-500/10 px-1.5 py-0.5 rounded"
                title="Delete all chat history"
              >
                <Trash2 className="w-3 h-3" />
                <span>Clear All</span>
              </button>
            )}
          </div>

          {sessions.length === 0 ? (
            <div className="text-center py-8 px-4 text-xs text-muted">
              <MessageSquare className="w-6 h-6 mx-auto mb-2 text-muted/60" />
              <span>No past chats yet. Ask a question to start!</span>
            </div>
          ) : (
            sessions.map(sess => (
              <div
                key={sess.id}
                onClick={() => handleLoadSession(sess)}
                className={`group relative w-full text-left p-2.5 rounded-xl text-xs transition-all flex items-start gap-2.5 cursor-pointer ${
                  activeSessionId === sess.id
                    ? 'bg-accent/15 text-accent font-semibold border border-accent/30 shadow-2xs'
                    : 'text-muted hover:text-ink hover:bg-page'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5 shrink-0 mt-0.5 text-muted group-hover:text-ink" />
                <div className="min-w-0 flex-1 pr-6">
                  <div className="truncate text-ink">{sess.title}</div>
                  <div className="text-[10px] text-muted font-mono truncate">
                    {sess.subjectCode} · {sess.topicTitle}
                  </div>
                </div>

                {/* Delete button on item hover */}
                <button
                  type="button"
                  onClick={(e) => handleDeleteSession(e, sess.id)}
                  className="opacity-0 group-hover:opacity-100 p-1 rounded-md text-muted hover:text-rose-500 hover:bg-rose-500/10 transition-all absolute right-2 top-2.5 cursor-pointer"
                  title="Delete this chat"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Sidebar Footer Controls */}
        <div className="p-3 border-t border-line bg-page space-y-2">
          {/* API Key Status / Setup */}
          <button
            type="button"
            onClick={() => setShowKeyModal(true)}
            className="w-full flex items-center justify-between p-2 rounded-lg border border-line hover:border-accent text-xs transition-colors cursor-pointer bg-raised"
          >
            <div className="flex items-center gap-2 truncate">
              <Key className="w-3.5 h-3.5 text-muted shrink-0" />
              <div className="text-left truncate">
                <div className="font-semibold text-ink text-[11px] truncate">
                  {provider === 'gemini' ? 'Google Gemini' : 'OpenRouter'}
                </div>
                <div className="text-[10px] text-muted font-mono truncate">
                  {isKeyConfigured ? '● Key Connected' : '○ Missing API Key'}
                </div>
              </div>
            </div>
            <Settings className="w-3.5 h-3.5 text-muted shrink-0" />
          </button>

          {/* Return to Notebook Spread */}
          <button
            type="button"
            onClick={onGoToNotebook}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-accent hover:opacity-90 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Notebook</span>
          </button>
        </div>
      </aside>

      {/* ================= MAIN CHAT WORKSPACE (GEMINI CANVAS) ================= */}
      <main className="flex-1 flex flex-col h-full bg-page relative overflow-hidden">
        
        {/* Top Floating App Bar */}
        <header className="h-14 border-b border-line px-2.5 sm:px-6 flex items-center justify-between gap-2 shrink-0 bg-page/95 backdrop-blur-xs z-10">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            {/* Sidebar Toggle Button (Always accessible) */}
            <button
              type="button"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-1.5 rounded-lg text-muted hover:text-ink hover:bg-raised transition-colors cursor-pointer shrink-0"
              title={isSidebarOpen ? "Close Sidebar" : "Open History & Chats"}
            >
              {isSidebarOpen ? <PanelLeftClose className="w-5 h-5" /> : <PanelLeftOpen className="w-5 h-5" />}
            </button>

            {/* Brand Logo & Name */}
            <div className="hidden xs:flex items-center gap-2 pr-2 sm:pr-3 border-r border-line shrink-0">
              <img
                src="/codeink-logo.webp"
                alt="Code Ink"
                className="w-7 h-7 rounded-lg object-contain shadow-2xs border border-line bg-raised p-0.5"
              />
              <span className="font-extrabold text-sm tracking-tight text-ink hidden md:inline">
                CODE<span className="text-accent">INK</span> AI
              </span>
            </div>

            {/* Model Badge */}
            <div className="flex items-center gap-1.5 min-w-0 truncate">
              <div className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full border border-line bg-raised text-[11px] sm:text-xs font-semibold text-ink shadow-2xs shrink-0">
                <Sparkles className="w-3.5 h-3.5 text-accent" />
                <span className="truncate max-w-[85px] sm:max-w-none">{provider === 'gemini' ? 'Gemini 1.5' : openRouterModel.split('/')[1] || 'OpenRouter'}</span>
              </div>

              <span className="hidden sm:inline-block text-muted/40">•</span>

              <span className="hidden sm:inline-block text-xs font-mono text-muted truncate">
                {subject.shortCode} · {topic.title}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Quick Key Trigger */}
            <button
              type="button"
              onClick={() => setShowKeyModal(true)}
              className={`inline-flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                isKeyConfigured
                  ? 'border-line text-muted hover:text-ink hover:bg-raised'
                  : 'border-amber-500/40 bg-amber-500/15 text-amber-600 dark:text-amber-400 hover:bg-amber-500/25 animate-pulse'
              }`}
              title="API Key Configuration"
            >
              <Key className="w-3.5 h-3.5 text-muted" />
              <span className="hidden sm:inline">{isKeyConfigured ? 'API Key' : 'Setup Key'}</span>
            </button>

            {/* Back to Notebook Button */}
            <button
              type="button"
              onClick={onGoToNotebook}
              className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-lg border border-accent/30 bg-accent/15 text-accent hover:bg-accent hover:text-white transition-all text-xs font-semibold cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Back to Book</span>
              <span className="sm:hidden text-[11px]">Book</span>
            </button>
          </div>
        </header>

        {/* Message Thread Scroll Area */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
          {/* ============ EMPTY HERO (GEMINI STYLE) ============ */}
          {messages.length === 0 && (
            <div className="max-w-3xl mx-auto my-auto pt-6 sm:pt-12 pb-8 flex flex-col justify-center animate-in fade-in duration-300">
              
              {/* Gemini Title */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src="/codeink-logo.webp"
                    alt="Code Ink AI"
                    className="w-12 h-12 rounded-xl object-contain shadow-xs border border-line bg-raised p-1"
                  />
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/15 border border-accent/30 text-accent text-xs font-mono font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>CodeInk AI Companion</span>
                  </div>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-ink mb-2">
                  <span className="bg-gradient-to-r from-blue-700 via-indigo-600 to-violet-700 dark:from-accent dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                    Hello, Engineer
                  </span>
                </h1>
                <h2 className="text-xl sm:text-2xl font-medium text-muted">
                  What would you like to explore in <strong className="text-ink">{topic.title}</strong>?
                </h2>
              </div>

              {!isKeyConfigured && (
                <div className="mb-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs flex items-center justify-between gap-4 shadow-xs">
                  <div className="flex items-center gap-2.5">
                    <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>Please connect your free Google Gemini or OpenRouter API key to start chatting.</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowKeyModal(true)}
                    className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold transition-colors cursor-pointer shrink-0"
                  >
                    Setup Key
                  </button>
                </div>
              )}

              {/* 4 Interactive Starter Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {starterCards.map((card, i) => {
                  const Icon = card.icon;
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleSendMessage(card.desc)}
                      className="p-4 rounded-2xl border border-stone-200 dark:border-line bg-stone-50 dark:bg-raised hover:border-accent hover:shadow-md hover:bg-white dark:hover:bg-raised transition-all text-left flex flex-col justify-between group cursor-pointer shadow-sm"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-xs text-neutral-800 dark:text-ink group-hover:text-accent transition-colors">
                          {card.title}
                        </span>
                        <div className={`p-1.5 rounded-lg ${card.color}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                      </div>
                      <p className="text-xs text-neutral-600 dark:text-muted leading-relaxed group-hover:text-neutral-900 dark:group-hover:text-ink">
                        {card.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ============ ACTIVE CHAT CONVERSATION ============ */}
          {messages.map((msg) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={msg.id}
                className={`max-w-3xl mx-auto flex gap-3.5 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-full bg-raised border border-line p-0.5 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs overflow-hidden">
                    <img src="/codeink-logo.webp" alt="Code Ink AI" className="w-full h-full object-contain" />
                  </div>
                )}

                <div
                  className={`rounded-2xl p-4 sm:p-5 text-xs sm:text-sm select-text ${
                    isUser
                      ? 'bg-accent text-white shadow-xs max-w-xl rounded-tr-xs'
                      : 'bg-raised border border-line shadow-2xs text-ink max-w-2xl rounded-tl-xs flex-1'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4 mb-2 text-[10px] opacity-70 font-mono">
                    <span className="font-semibold uppercase tracking-wider">
                      {isUser ? 'You' : `${provider === 'gemini' ? 'Gemini 1.5' : 'OpenRouter'} AI Tutor`}
                    </span>
                    <span>{msg.timestamp}</span>
                  </div>

                  {isUser ? (
                    <div className="whitespace-pre-wrap leading-relaxed">{msg.content}</div>
                  ) : (
                    <div>{renderMessageContent(msg.content, msg.id)}</div>
                  )}
                </div>

                {isUser && (
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5 shadow-xs">
                    U
                  </div>
                )}
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isLoading && (
            <div className="max-w-3xl mx-auto flex gap-3.5 justify-start animate-in fade-in">
              <div className="w-8 h-8 rounded-full bg-raised border border-line p-0.5 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs overflow-hidden">
                <img src="/codeink-logo.webp" alt="Code Ink AI" className="w-full h-full object-contain" />
              </div>
              <div className="bg-raised border border-line rounded-2xl rounded-tl-xs px-5 py-4 shadow-2xs flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-accent animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 rounded-full bg-accent animate-bounce [animation-delay:0.4s]" />
                <span className="text-xs text-muted font-mono ml-2">Thinking & crafting response...</span>
              </div>
            </div>
          )}

          {errorMsg && (
            <div className="max-w-3xl mx-auto p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <div className="flex-1">
                <strong>Error:</strong> {errorMsg}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* ============ FLOATING CHATGPT / GEMINI STYLE BOTTOM INPUT ============ */}
        <div className="p-2.5 sm:p-4 sm:pb-6 pb-[calc(env(safe-area-inset-bottom,0.5rem)+0.5rem)] bg-gradient-to-t from-page via-page to-transparent shrink-0">
          <div className="max-w-3xl mx-auto">
            {/* Input Capsule Box */}
            <div className="relative flex items-center bg-raised border border-line rounded-2xl p-1.5 sm:p-2 shadow-sm focus-within:shadow-md focus-within:border-accent focus-within:bg-page transition-all">
              <textarea
                ref={textareaRef}
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                rows={1}
                placeholder={isKeyConfigured ? `Ask about ${topic.title}...` : "Connect your API Key above to begin asking..."}
                disabled={isLoading}
                className="flex-1 bg-transparent border-none outline-hidden resize-none px-2.5 sm:px-3 py-2 text-xs sm:text-sm text-ink placeholder-muted font-sans max-h-36 min-h-[42px]"
              />

              <button
                type="button"
                onClick={() => handleSendMessage()}
                disabled={isLoading || !inputQuery.trim()}
                className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold transition-all shrink-0 cursor-pointer ${
                  inputQuery.trim() && !isLoading
                    ? 'bg-accent text-white hover:opacity-90 shadow-xs scale-100 active:scale-95'
                    : 'bg-page text-muted/50 border border-line cursor-not-allowed'
                }`}
                title="Send Message (Enter)"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-muted font-mono px-2 pt-1.5">
              <span className="truncate">Verify critical code & memory logic.</span>
              <span className="hidden sm:inline shrink-0">Shift + Enter for newline</span>
            </div>
          </div>
        </div>

      </main>

      {/* ================= CLEAN API KEY SETTINGS MODAL DIALOG ================= */}
      {showKeyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-raised w-full max-w-lg rounded-2xl border border-line shadow-2xl p-6 space-y-5 animate-in zoom-in-95 duration-150 text-ink">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-accent/15 text-accent">
                  <Key className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-ink">
                    Connect AI Provider
                  </h3>
                  <p className="text-xs text-muted">
                    100% Client-Side Encryption · Stored Locally in Browser
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowKeyModal(false)}
                className="p-1 rounded-lg text-muted hover:text-ink transition-colors cursor-pointer"
              >
                <PanelLeftClose className="w-5 h-5" />
              </button>
            </div>

            {/* Provider Switcher */}
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setProvider('gemini')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  provider === 'gemini'
                    ? 'bg-accent/15 border-accent ring-2 ring-accent/20'
                    : 'bg-page border-line hover:bg-raised'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs text-ink flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-accent" />
                    Google Gemini
                  </span>
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/15 px-1.5 py-0.2 rounded font-mono">
                    Free Tier
                  </span>
                </div>
                <p className="text-[11px] text-muted">
                  Gemini 1.5 Flash (Ultra fast & tailored for coding)
                </p>
              </button>

              <button
                type="button"
                onClick={() => setProvider('openrouter')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  provider === 'openrouter'
                    ? 'bg-accent/15 border-accent ring-2 ring-accent/20'
                    : 'bg-page border-line hover:bg-raised'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs text-ink flex items-center gap-1.5">
                    <Bot className="w-3.5 h-3.5 text-indigo-500" />
                    OpenRouter
                  </span>
                  <span className="text-[10px] font-bold text-purple-600 dark:text-purple-400 bg-purple-500/15 px-1.5 py-0.2 rounded font-mono">
                    Multi-Model
                  </span>
                </div>
                <p className="text-[11px] text-muted">
                  Llama 3.3, DeepSeek V3, Claude 3.5 Sonnet
                </p>
              </button>
            </div>

            {/* Inputs */}
            {provider === 'gemini' ? (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <label className="font-semibold text-ink">Google Gemini API Key:</label>
                  <a
                    href="https://aistudio.google.com/app/apikey"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-accent hover:underline"
                  >
                    <span>Get Free Key (Google AI Studio)</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={geminiKey}
                    onChange={(e) => setGeminiKey(e.target.value)}
                    placeholder="AIzaSy..."
                    className="w-full pl-3 pr-10 py-2 rounded-xl bg-page border border-line text-ink font-mono text-xs focus:outline-hidden focus:border-accent focus:ring-2 focus:ring-accent/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-ink cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <label className="font-semibold text-ink">OpenRouter API Key:</label>
                    <a
                      href="https://openrouter.ai/keys"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] text-accent hover:underline"
                    >
                      <span>Get OpenRouter Key</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={openRouterKey}
                      onChange={(e) => setOpenRouterKey(e.target.value)}
                      placeholder="sk-or-v1-..."
                      className="w-full pl-3 pr-10 py-2 rounded-xl bg-page border border-line text-ink font-mono text-xs focus:outline-hidden focus:border-accent focus:ring-2 focus:ring-accent/20"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-ink cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-ink">Select Model:</label>
                  <select
                    value={openRouterModel}
                    onChange={(e) => setOpenRouterModel(e.target.value)}
                    className="w-full p-2 rounded-xl bg-page border border-line text-ink text-xs font-mono focus:outline-hidden focus:border-accent"
                  >
                    {OPENROUTER_MODEL_OPTIONS.map(opt => (
                      <option key={opt.id} value={opt.id}>
                        {opt.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Footer Buttons */}
            <div className="flex items-center justify-between pt-2 border-t border-line">
              <div className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold font-mono">
                {keySavedMessage}
              </div>
              <div className="flex items-center gap-2">
                {isKeyConfigured && (
                  <button
                    type="button"
                    onClick={handleClearKey}
                    className="px-3 py-1.5 rounded-lg border border-rose-500/30 text-rose-500 hover:bg-rose-500/10 text-xs font-medium cursor-pointer"
                  >
                    Remove Key
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleSaveKey}
                  className="px-4 py-2 rounded-xl bg-accent hover:opacity-90 text-white text-xs font-bold shadow-xs cursor-pointer"
                >
                  Save & Connect
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
