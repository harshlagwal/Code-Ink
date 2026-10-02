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

  // UI state
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
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
          return <strong key={i} className="font-bold text-stone-900">{seg.slice(2, -2)}</strong>;
        }
        if (seg.startsWith('`') && seg.endsWith('`')) {
          return (
            <code key={i} className="px-1.5 py-0.5 rounded bg-stone-100 text-[#2457D6] font-mono text-[11px] border border-stone-200">
              {seg.slice(1, -1)}
            </code>
          );
        }
        return seg;
      });

      if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        return (
          <div key={idx} className="flex items-start gap-2.5 pl-2 my-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2457D6] mt-2 shrink-0" />
            <div className="flex-1">{formatted}</div>
          </div>
        );
      }

      if (line.trim().startsWith('### ')) {
        return <h4 key={idx} className="font-bold text-sm text-stone-900 mt-3 mb-1">{line.slice(4)}</h4>;
      }
      if (line.trim().startsWith('## ')) {
        return <h3 key={idx} className="font-bold text-base text-stone-900 mt-4 mb-1">{line.slice(3)}</h3>;
      }

      return <p key={idx} className="my-1 text-stone-800 leading-relaxed">{formatted}</p>;
    });
  };

  const starterCards = [
    {
      icon: Lightbulb,
      title: 'Conceptual Breakdown',
      desc: `Explain ${topic.title} in plain English with an intuitive physical analogy.`,
      color: 'text-amber-500 bg-amber-50'
    },
    {
      icon: Code2,
      title: 'Production Example',
      desc: `Write a robust, fully documented program illustrating ${topic.title}.`,
      color: 'text-blue-500 bg-blue-50'
    },
    {
      icon: Bug,
      title: 'Pitfalls & Edge Cases',
      desc: `What memory or syntax traps do engineering students often encounter here?`,
      color: 'text-rose-500 bg-rose-50'
    },
    {
      icon: Cpu,
      title: 'Hardware & Architecture',
      desc: `How does the CPU/OS execute ${topic.title} under the hood?`,
      color: 'text-purple-500 bg-purple-50'
    }
  ];

  return (
    <div className="flex h-[calc(100vh-4.25rem)] w-full overflow-hidden bg-white text-stone-900 font-sans border-t border-stone-200">
      
      {/* ================= LEFT SIDEBAR (CHATGPT / GEMINI STYLE) ================= */}
      <aside
        className={`bg-[#F9FAFB] border-r border-stone-200 flex flex-col shrink-0 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'w-64 lg:w-72' : 'w-0 -translate-x-full overflow-hidden'
        }`}
      >
        <div className="p-3.5 border-b border-stone-200 flex items-center justify-between gap-2">
          {/* New Chat Button */}
          <button
            type="button"
            onClick={handleNewChat}
            className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-white hover:bg-stone-50 border border-stone-200 shadow-2xs text-xs font-semibold text-stone-800 transition-all cursor-pointer hover:border-stone-300"
          >
            <Plus className="w-4 h-4 text-[#2457D6]" />
            <span>New Chat</span>
          </button>

          {/* Toggle sidebar */}
          <button
            type="button"
            onClick={() => setIsSidebarOpen(false)}
            className="p-2 rounded-lg text-stone-500 hover:text-stone-800 hover:bg-stone-200/60 transition-colors cursor-pointer"
            title="Collapse Sidebar"
          >
            <PanelLeftClose className="w-4 h-4" />
          </button>
        </div>

        {/* Current Active Notebook Context Widget */}
        <div className="p-3 border-b border-stone-200/80 bg-white">
          <div className="text-[10px] font-mono uppercase font-bold tracking-wider text-stone-400 mb-1.5 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-[#2457D6]" />
            <span>Active Notebook Topic</span>
          </div>

          <div className="p-2.5 rounded-lg bg-blue-50/60 border border-blue-100/80">
            <div className="font-semibold text-xs text-[#2457D6] truncate">
              {subject.name}
            </div>
            <div className="text-xs font-medium text-stone-800 truncate mt-0.5">
              {topic.title}
            </div>
            <div className="text-[10px] text-stone-500 truncate mt-0.5">
              Chapter {String(topic.chapterNumber).padStart(2, '0')}: {chapterTitle}
            </div>
          </div>
        </div>

        {/* Chat History List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          <div className="flex items-center justify-between px-2 py-1 mb-1">
            <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-stone-400">
              Recent Chats {sessions.length > 0 && `(${sessions.length})`}
            </span>
            {sessions.length > 0 && (
              <button
                type="button"
                onClick={handleClearAllSessions}
                className="text-[10px] font-mono text-stone-400 hover:text-rose-600 transition-colors flex items-center gap-1 cursor-pointer hover:bg-rose-50 px-1.5 py-0.5 rounded"
                title="Delete all chat history"
              >
                <Trash2 className="w-3 h-3" />
                <span>Clear All</span>
              </button>
            )}
          </div>

          {sessions.length === 0 ? (
            <div className="text-center py-8 px-4 text-xs text-stone-400">
              <MessageSquare className="w-6 h-6 mx-auto mb-2 text-stone-300" />
              <span>No past chats yet. Ask a question to start!</span>
            </div>
          ) : (
            sessions.map(sess => (
              <div
                key={sess.id}
                onClick={() => handleLoadSession(sess)}
                className={`group relative w-full text-left p-2.5 rounded-xl text-xs transition-all flex items-start gap-2.5 cursor-pointer ${
                  activeSessionId === sess.id
                    ? 'bg-blue-50 text-[#2457D6] font-semibold border border-blue-200/60 shadow-2xs'
                    : 'text-stone-700 hover:bg-stone-200/60'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5 shrink-0 mt-0.5 text-stone-400 group-hover:text-stone-600" />
                <div className="min-w-0 flex-1 pr-6">
                  <div className="truncate">{sess.title}</div>
                  <div className="text-[10px] text-stone-400 font-mono truncate">
                    {sess.subjectCode} · {sess.topicTitle}
                  </div>
                </div>

                {/* Delete button on item hover */}
                <button
                  type="button"
                  onClick={(e) => handleDeleteSession(e, sess.id)}
                  className="opacity-0 group-hover:opacity-100 p-1 rounded-md text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-all absolute right-2 top-2.5 cursor-pointer"
                  title="Delete this chat"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Sidebar Footer Controls */}
        <div className="p-3 border-t border-stone-200 bg-white space-y-2">
          {/* API Key Status / Setup */}
          <button
            type="button"
            onClick={() => setShowKeyModal(true)}
            className="w-full flex items-center justify-between p-2 rounded-lg border border-stone-200 hover:border-stone-300 text-xs transition-colors cursor-pointer bg-stone-50/70"
          >
            <div className="flex items-center gap-2 truncate">
              <Key className="w-3.5 h-3.5 text-stone-600 shrink-0" />
              <div className="text-left truncate">
                <div className="font-semibold text-stone-800 text-[11px] truncate">
                  {provider === 'gemini' ? 'Google Gemini' : 'OpenRouter'}
                </div>
                <div className="text-[10px] text-stone-500 font-mono truncate">
                  {isKeyConfigured ? '● Key Connected' : '○ Missing API Key'}
                </div>
              </div>
            </div>
            <Settings className="w-3.5 h-3.5 text-stone-400 shrink-0" />
          </button>

          {/* Return to Notebook Spread */}
          <button
            type="button"
            onClick={onGoToNotebook}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Notebook</span>
          </button>
        </div>
      </aside>

      {/* ================= MAIN CHAT WORKSPACE (GEMINI CANVAS) ================= */}
      <main className="flex-1 flex flex-col h-full bg-white relative overflow-hidden">
        
        {/* Top Floating App Bar */}
        <header className="h-14 border-b border-stone-200/80 px-4 sm:px-6 flex items-center justify-between gap-3 shrink-0 bg-white/95 backdrop-blur-xs z-10">
          <div className="flex items-center gap-3">
            {!isSidebarOpen && (
              <button
                type="button"
                onClick={() => setIsSidebarOpen(true)}
                className="p-1.5 rounded-lg text-stone-500 hover:text-stone-800 hover:bg-stone-100 transition-colors cursor-pointer"
                title="Open Sidebar"
              >
                <PanelLeftOpen className="w-5 h-5" />
              </button>
            )}

            {/* Brand Logo & Name */}
            <div className="flex items-center gap-2 pr-3 border-r border-stone-200">
              <img
                src="/codeink-logo.webp"
                alt="Code Ink"
                className="w-7 h-7 rounded-lg object-contain shadow-2xs border border-stone-200 bg-white p-0.5"
              />
              <span className="font-extrabold text-sm tracking-tight text-stone-900 hidden md:inline">
                CODE<span className="text-[#2457D6]">INK</span> AI
              </span>
            </div>

            {/* Model Badge */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-stone-200 bg-stone-50 text-xs font-semibold text-stone-800 shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#2457D6]" />
                <span>{provider === 'gemini' ? 'Gemini 1.5 Flash' : openRouterModel.split('/')[1] || 'OpenRouter'}</span>
              </div>

              <span className="hidden sm:inline-block text-stone-300">•</span>

              <span className="hidden sm:inline-block text-xs font-mono text-stone-500">
                {subject.shortCode} · {topic.title}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick Key Trigger */}
            <button
              type="button"
              onClick={() => setShowKeyModal(true)}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                isKeyConfigured
                  ? 'border-stone-200 text-stone-700 hover:bg-stone-100'
                  : 'border-amber-300 bg-amber-50 text-amber-800 hover:bg-amber-100 animate-pulse'
              }`}
            >
              <Key className="w-3.5 h-3.5 text-stone-500" />
              <span className="hidden sm:inline">API Key</span>
            </button>

            {/* Back to Notebook Button */}
            <button
              type="button"
              onClick={onGoToNotebook}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border border-[#2457D6]/30 bg-blue-50/70 text-[#2457D6] hover:bg-[#2457D6] hover:text-white transition-all text-xs font-semibold cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Book</span>
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
                    className="w-12 h-12 rounded-xl object-contain shadow-xs border border-stone-200 bg-white p-1"
                  />
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-[#2457D6] text-xs font-mono font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>CodeInk AI Companion</span>
                  </div>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-stone-900 mb-2">
                  <span className="bg-gradient-to-r from-[#2457D6] via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Hello, Engineer
                  </span>
                </h1>
                <h2 className="text-xl sm:text-2xl font-medium text-stone-600">
                  What would you like to explore in <strong className="text-stone-900">{topic.title}</strong>?
                </h2>
              </div>

              {!isKeyConfigured && (
                <div className="mb-6 p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-900 text-xs flex items-center justify-between gap-4 shadow-xs">
                  <div className="flex items-center gap-2.5">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
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
                      className="p-4 rounded-2xl border border-stone-200 bg-white hover:border-[#2457D6]/60 hover:shadow-md transition-all text-left flex flex-col justify-between group cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-xs text-stone-800 group-hover:text-[#2457D6] transition-colors">
                          {card.title}
                        </span>
                        <div className={`p-1.5 rounded-lg ${card.color}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                      </div>
                      <p className="text-xs text-stone-500 leading-relaxed group-hover:text-stone-700">
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
                  <div className="w-8 h-8 rounded-full bg-white border border-stone-200 p-0.5 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs overflow-hidden">
                    <img src="/codeink-logo.webp" alt="Code Ink AI" className="w-full h-full object-contain" />
                  </div>
                )}

                <div
                  className={`rounded-2xl p-4 sm:p-5 text-xs sm:text-sm select-text ${
                    isUser
                      ? 'bg-[#2457D6] text-white shadow-xs max-w-xl rounded-tr-xs'
                      : 'bg-[#F9FAFB] border border-stone-200 shadow-2xs text-stone-800 max-w-2xl rounded-tl-xs flex-1'
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
                  <div className="w-8 h-8 rounded-full bg-stone-800 flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5 shadow-xs">
                    U
                  </div>
                )}
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isLoading && (
            <div className="max-w-3xl mx-auto flex gap-3.5 justify-start animate-in fade-in">
              <div className="w-8 h-8 rounded-full bg-white border border-stone-200 p-0.5 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs overflow-hidden">
                <img src="/codeink-logo.webp" alt="Code Ink AI" className="w-full h-full object-contain" />
              </div>
              <div className="bg-[#F9FAFB] border border-stone-200 rounded-2xl rounded-tl-xs px-5 py-4 shadow-2xs flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#2457D6] animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-[#2457D6] animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 rounded-full bg-[#2457D6] animate-bounce [animation-delay:0.4s]" />
                <span className="text-xs text-stone-500 font-mono ml-2">Thinking & crafting response...</span>
              </div>
            </div>
          )}

          {errorMsg && (
            <div className="max-w-3xl mx-auto p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <strong>Error:</strong> {errorMsg}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* ============ FLOATING CHATGPT / GEMINI STYLE BOTTOM INPUT ============ */}
        <div className="p-4 sm:pb-6 bg-gradient-to-t from-white via-white to-transparent shrink-0">
          <div className="max-w-3xl mx-auto">
            {/* Input Capsule Box */}
            <div className="relative flex items-center bg-[#F9FAFB] border border-stone-300 rounded-2xl p-2 shadow-sm focus-within:shadow-md focus-within:border-[#2457D6] focus-within:bg-white transition-all">
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
                placeholder={isKeyConfigured ? `Ask anything about ${topic.title}... (Enter to send)` : "Connect your API Key above to begin asking..."}
                disabled={isLoading}
                className="flex-1 bg-transparent border-none outline-hidden resize-none px-3 py-2 text-xs sm:text-sm text-stone-800 placeholder-stone-400 font-sans max-h-36 min-h-[44px]"
              />

              <button
                type="button"
                onClick={() => handleSendMessage()}
                disabled={isLoading || !inputQuery.trim()}
                className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold transition-all shrink-0 cursor-pointer ${
                  inputQuery.trim() && !isLoading
                    ? 'bg-[#2457D6] text-white hover:bg-blue-700 shadow-xs scale-100 active:scale-95'
                    : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                }`}
                title="Send Message (Enter)"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center justify-between text-[11px] text-stone-400 font-mono px-2 pt-2">
              <span>CodeInk AI may make mistakes. Verify critical code and memory logic.</span>
              <span className="hidden sm:inline">Shift + Enter for newline</span>
            </div>
          </div>
        </div>

      </main>

      {/* ================= CLEAN API KEY SETTINGS MODAL DIALOG ================= */}
      {showKeyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-lg rounded-2xl border border-stone-200 shadow-2xl p-6 space-y-5 animate-in zoom-in-95 duration-150 text-stone-900">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-blue-50 text-[#2457D6]">
                  <Key className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-stone-900">
                    Connect AI Provider
                  </h3>
                  <p className="text-xs text-stone-500">
                    100% Client-Side Encryption · Stored Locally in Browser
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowKeyModal(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
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
                    ? 'bg-blue-50/50 border-[#2457D6] ring-2 ring-[#2457D6]/20'
                    : 'bg-stone-50 border-stone-200 hover:bg-stone-100'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs text-stone-900 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                    Google Gemini
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded font-mono">
                    Free Tier
                  </span>
                </div>
                <p className="text-[11px] text-stone-500">
                  Gemini 1.5 Flash (Ultra fast & tailored for coding)
                </p>
              </button>

              <button
                type="button"
                onClick={() => setProvider('openrouter')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  provider === 'openrouter'
                    ? 'bg-blue-50/50 border-[#2457D6] ring-2 ring-[#2457D6]/20'
                    : 'bg-stone-50 border-stone-200 hover:bg-stone-100'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs text-stone-900 flex items-center gap-1.5">
                    <Bot className="w-3.5 h-3.5 text-indigo-600" />
                    OpenRouter
                  </span>
                  <span className="text-[10px] font-bold text-purple-700 bg-purple-100 px-1.5 py-0.2 rounded font-mono">
                    Multi-Model
                  </span>
                </div>
                <p className="text-[11px] text-stone-500">
                  Llama 3.3, DeepSeek V3, Claude 3.5 Sonnet
                </p>
              </button>
            </div>

            {/* Inputs */}
            {provider === 'gemini' ? (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <label className="font-semibold text-stone-700">Google Gemini API Key:</label>
                  <a
                    href="https://aistudio.google.com/app/apikey"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-[#2457D6] hover:underline"
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
                    className="w-full pl-3 pr-10 py-2 rounded-xl border border-stone-300 font-mono text-xs focus:outline-hidden focus:border-[#2457D6] focus:ring-2 focus:ring-[#2457D6]/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <label className="font-semibold text-stone-700">OpenRouter API Key:</label>
                    <a
                      href="https://openrouter.ai/keys"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] text-[#2457D6] hover:underline"
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
                      className="w-full pl-3 pr-10 py-2 rounded-xl border border-stone-300 font-mono text-xs focus:outline-hidden focus:border-[#2457D6] focus:ring-2 focus:ring-[#2457D6]/20"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-700">Select Model:</label>
                  <select
                    value={openRouterModel}
                    onChange={(e) => setOpenRouterModel(e.target.value)}
                    className="w-full p-2 rounded-xl border border-stone-300 text-xs font-mono bg-stone-50 focus:outline-hidden focus:border-[#2457D6]"
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
            <div className="flex items-center justify-between pt-2 border-t border-stone-100">
              <div className="text-xs text-emerald-700 font-semibold font-mono">
                {keySavedMessage}
              </div>
              <div className="flex items-center gap-2">
                {isKeyConfigured && (
                  <button
                    type="button"
                    onClick={handleClearKey}
                    className="px-3 py-1.5 rounded-lg border border-rose-200 text-rose-700 hover:bg-rose-50 text-xs font-medium cursor-pointer"
                  >
                    Remove Key
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleSaveKey}
                  className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold shadow-xs cursor-pointer"
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
