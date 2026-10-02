// CODEINK V3 — AI Study Desk Modal
// Real Interactive ChatGPT / Gemini Style Interface
// Direct client-side calls to Google Gemini & OpenRouter with locally stored API keys.

import { useState, useRef, useEffect } from 'react';
import { Subject, TopicContent } from '../types/notebook';
import {
  aiClient,
  AIProvider,
  AIMessage,
  OPENROUTER_MODEL_OPTIONS
} from '../services/aiClient';
import {
  X,
  Bot,
  Send,
  Key,
  Settings,
  Trash2,
  Copy,
  Check,
  Sparkles,
  ExternalLink,
  Eye,
  EyeOff,
  AlertCircle,
  HelpCircle,
  Code2,
  Bug,
  RotateCcw
} from 'lucide-react';
import { notebookAudio } from '../utils/audioEffects';

interface AIStudyDeskModalProps {
  isOpen: boolean;
  onClose: () => void;
  subject: Subject;
  chapterTitle: string;
  topic: TopicContent;
  initialCodeSnippet?: string;
  initialPracticeQuestion?: string;
}

export function AIStudyDeskModal({
  isOpen,
  onClose,
  subject,
  chapterTitle,
  topic,
  initialCodeSnippet,
  initialPracticeQuestion
}: AIStudyDeskModalProps) {
  const [provider, setProvider] = useState<AIProvider>(aiClient.getProvider());
  const [geminiKey, setGeminiKey] = useState<string>(aiClient.getApiKey('gemini'));
  const [openRouterKey, setOpenRouterKey] = useState<string>(aiClient.getApiKey('openrouter'));
  const [openRouterModel, setOpenRouterModel] = useState<string>(aiClient.getOpenRouterModel());
  
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [keySavedStatus, setKeySavedStatus] = useState<string | null>(null);

  const [inputQuery, setInputQuery] = useState('');
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Sync state on open
  useEffect(() => {
    if (!isOpen) return;
    const currentProv = aiClient.getProvider();
    setProvider(currentProv);
    const gKey = aiClient.getApiKey('gemini');
    const oKey = aiClient.getApiKey('openrouter');
    setGeminiKey(gKey);
    setOpenRouterKey(oKey);
    setOpenRouterModel(aiClient.getOpenRouterModel());

    // If no key is configured for the active provider, prompt settings automatically
    const activeKey = currentProv === 'gemini' ? gKey : oKey;
    if (!activeKey) {
      setShowSettings(true);
    }
  }, [isOpen]);

  // Auto scroll chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Handle ESC key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

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
    setKeySavedStatus('API Key saved locally in browser!');
    setTimeout(() => {
      setKeySavedStatus(null);
      if (currentApiKey.trim().length > 5) {
        setShowSettings(false);
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
    setKeySavedStatus('API Key removed.');
    setTimeout(() => setKeySavedStatus(null), 1500);
  };

  const handleSelectProvider = (newProv: AIProvider) => {
    setProvider(newProv);
    aiClient.setProvider(newProv);
    setErrorMsg(null);
  };

  const handleClearChat = () => {
    setMessages([]);
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
${initialPracticeQuestion ? `- Active Practice Problem:\n${initialPracticeQuestion}` : ''}

Guidelines for your responses:
1. Provide accurate, clear, pedagogical explanations suitable for university engineering students.
2. Structure your answers with clear headings, bullet points, and high-quality code examples with comments.
3. Keep code idiomatic and adhere to standard best practices (e.g. boundary checks, clean memory management).
4. When correcting or debugging code, pinpoint the exact issue first, explain the underlying mechanism, and then show the corrected code.
5. You can answer in English or Hinglish based on what the student asks.`;
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputQuery).trim();
    if (!query || isLoading) return;

    if (!isKeyConfigured) {
      setShowSettings(true);
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

      setMessages(prev => [...prev, assistantMessage]);
      notebookAudio.playSuccess();
    } catch (err: any) {
      console.error('AI Study Desk Error:', err);
      setErrorMsg(err.message || 'Failed to generate response. Please check your API key and connection.');
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
    // Split by code blocks ```lang ... ```
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
        <div key={blockId} className="my-3 rounded-lg overflow-hidden border border-stone-800 bg-[#151921] text-stone-100 font-mono text-xs shadow-md">
          <div className="flex items-center justify-between px-3 py-1.5 bg-[#1E232F] border-b border-stone-800 text-[11px] text-stone-400">
            <span className="font-semibold uppercase tracking-wider">{lang}</span>
            <button
              type="button"
              onClick={() => handleCopyCode(code, blockId)}
              className="inline-flex items-center gap-1 text-stone-300 hover:text-white transition-colors cursor-pointer"
              title="Copy Code"
            >
              {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{isCopied ? 'Copied!' : 'Copy Code'}</span>
            </button>
          </div>
          <pre className="p-3.5 overflow-x-auto text-xs leading-relaxed text-[#E5E9F0]">
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

  // Helper for bold and inline code in plain text paragraphs
  const renderFormattedText = (raw: string) => {
    const lines = raw.split('\n');
    return lines.map((line, idx) => {
      // Bold **text**
      const formatted = line.split(/(\*\*.*?\*\*|`.*?`)/g).map((seg, i) => {
        if (seg.startsWith('**') && seg.endsWith('**')) {
          return <strong key={i} className="font-bold text-stone-900">{seg.slice(2, -2)}</strong>;
        }
        if (seg.startsWith('`') && seg.endsWith('`')) {
          return <code key={i} className="px-1.5 py-0.5 rounded bg-stone-200/70 text-[#2457D6] font-mono text-[11px] border border-stone-300/60">{seg.slice(1, -1)}</code>;
        }
        return seg;
      });

      if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        return (
          <div key={idx} className="flex items-start gap-2 pl-2 my-1">
            <span className="text-[#2457D6] font-bold mt-0.5">•</span>
            <div className="flex-1">{formatted}</div>
          </div>
        );
      }

      return <p key={idx} className="my-1">{formatted}</p>;
    });
  };

  const quickPrompts = [
    { label: 'Explain Simply', text: `Explain "${topic.title}" in very simple terms with a real-world intuition.` },
    { label: 'Code Example', text: `Give a clear, practical code example of "${topic.title}" with line-by-line comments.` },
    { label: 'Common Bugs', text: `What are common bugs, runtime traps, or compiler errors students make with "${topic.title}"?` },
    { label: 'Test My Knowledge', text: `Ask me 2 conceptual engineering interview questions about "${topic.title}" and see how I answer.` }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-stone-950/70 backdrop-blur-xs select-none animate-in fade-in duration-150">
      <div className="w-full max-w-4xl bg-[#FAF8F5] rounded-2xl border border-[#D9D4C8] shadow-2xl overflow-hidden flex flex-col h-[92vh] max-h-[850px] text-stone-900">
        
        {/* ================= HEADER BAR ================= */}
        <div className="px-4 sm:px-6 py-3.5 bg-white border-b border-[#D9D4C8] flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-white border border-[#D9D4C8] flex items-center justify-center shadow-xs shrink-0 overflow-hidden p-0.5">
              <img src="/codeink-logo.webp" alt="Code Ink AI" className="w-full h-full object-contain" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base font-bold text-stone-900 font-sans tracking-tight">
                  AI Study Desk
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-blue-50 text-[#2457D6] border border-blue-200 text-[10px] font-mono font-bold">
                  {subject.shortCode} · {topic.title}
                </span>
              </div>
              <p className="text-[11px] text-stone-500 font-mono truncate">
                Direct Client-Side AI Mentor · Zero Server Storage
              </p>
            </div>
          </div>

          {/* Top Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Active Provider Pill / Settings Trigger */}
            <button
              type="button"
              onClick={() => setShowSettings(!showSettings)}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                isKeyConfigured
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                  : 'bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100 animate-pulse'
              }`}
              title="Configure API Keys (Gemini or OpenRouter)"
            >
              <Key className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {provider === 'gemini' ? 'Google Gemini' : 'OpenRouter'}
              </span>
              <span className="text-[10px] px-1 py-0.2 rounded bg-white/70 font-mono">
                {isKeyConfigured ? 'Connected' : 'Setup Key'}
              </span>
              <Settings className="w-3.5 h-3.5 ml-0.5 text-stone-500" />
            </button>

            {/* Clear Chat */}
            {messages.length > 0 && (
              <button
                type="button"
                onClick={handleClearChat}
                className="p-1.5 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
                title="Clear Chat History"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}

            {/* Close Modal */}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
              title="Close (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ================= SECURE SETTINGS & API KEY CARD (COLLAPSIBLE) ================= */}
        {showSettings && (
          <div className="bg-[#F3EFE6] border-b border-[#D9D4C8] p-4 sm:p-5 text-xs animate-in slide-in-from-top-3 duration-200 shrink-0">
            <div className="max-w-2xl mx-auto space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-stone-900 text-sm flex items-center gap-1.5">
                    <Key className="w-4 h-4 text-[#2457D6]" />
                    <span>Choose AI Provider & Add Your API Key</span>
                  </h3>
                  <p className="text-stone-600 text-[11px] mt-0.5">
                    Your key is kept <strong>100% locally in your browser's localStorage</strong>. It is sent directly to Google or OpenRouter over encrypted HTTPS.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowSettings(false)}
                  className="text-stone-500 hover:text-stone-800 text-xs font-semibold px-2 py-1 rounded bg-stone-200/60"
                >
                  Close
                </button>
              </div>

              {/* Provider Radio Tabs */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleSelectProvider('gemini')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    provider === 'gemini'
                      ? 'bg-white border-[#2457D6] shadow-xs ring-2 ring-[#2457D6]/20'
                      : 'bg-stone-100/70 border-stone-300 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-stone-900 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                      Google Gemini
                    </span>
                    <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                      Free Tier Available
                    </span>
                  </div>
                  <span className="text-[11px] text-stone-500 mt-1">
                    Uses Gemini 1.5 Flash (Super fast & smart for coding)
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSelectProvider('openrouter')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    provider === 'openrouter'
                      ? 'bg-white border-[#2457D6] shadow-xs ring-2 ring-[#2457D6]/20'
                      : 'bg-stone-100/70 border-stone-300 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-stone-900 flex items-center gap-1.5">
                      <Bot className="w-3.5 h-3.5 text-indigo-600" />
                      OpenRouter
                    </span>
                    <span className="text-[10px] font-mono font-bold text-purple-700 bg-purple-100 px-1.5 py-0.5 rounded">
                      Multi-Model
                    </span>
                  </div>
                  <span className="text-[11px] text-stone-500 mt-1">
                    Connect Llama 3.3, DeepSeek V3, Claude, GPT-4o
                  </span>
                </button>
              </div>

              {/* API Key Input Section */}
              <div className="bg-white p-3.5 rounded-xl border border-stone-300 space-y-3">
                {provider === 'gemini' ? (
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="font-bold text-stone-800 text-[11px] uppercase tracking-wider font-mono">
                        Google Gemini API Key:
                      </label>
                      <a
                        href="https://aistudio.google.com/app/apikey"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] text-[#2457D6] hover:underline font-medium"
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
                        placeholder="Paste your AIzaSy... key here"
                        className="w-full pl-3 pr-10 py-2 rounded-lg border border-stone-300 font-mono text-xs focus:outline-hidden focus:border-[#2457D6] focus:ring-1 focus:ring-[#2457D6]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="font-bold text-stone-800 text-[11px] uppercase tracking-wider font-mono">
                          OpenRouter API Key:
                        </label>
                        <a
                          href="https://openrouter.ai/keys"
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] text-[#2457D6] hover:underline font-medium"
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
                          placeholder="Paste your sk-or-v1-... key here"
                          className="w-full pl-3 pr-10 py-2 rounded-lg border border-stone-300 font-mono text-xs focus:outline-hidden focus:border-[#2457D6] focus:ring-1 focus:ring-[#2457D6]"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 cursor-pointer"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-stone-800 text-[11px] uppercase tracking-wider font-mono mb-1">
                        Select Model:
                      </label>
                      <select
                        value={openRouterModel}
                        onChange={(e) => setOpenRouterModel(e.target.value)}
                        className="w-full p-2 rounded-lg border border-stone-300 text-xs font-mono bg-stone-50 focus:outline-hidden focus:border-[#2457D6]"
                      >
                        {OPENROUTER_MODEL_OPTIONS.map(opt => (
                          <option key={opt.id} value={opt.id}>
                            {opt.name} ({opt.id})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                {/* Save / Clear Buttons */}
                <div className="flex items-center justify-between pt-1">
                  <div className="text-[11px] text-emerald-700 font-semibold font-mono">
                    {keySavedStatus}
                  </div>
                  <div className="flex items-center gap-2">
                    {isKeyConfigured && (
                      <button
                        type="button"
                        onClick={handleClearKey}
                        className="px-3 py-1.5 rounded-lg border border-rose-200 text-rose-700 hover:bg-rose-50 transition-colors text-xs font-medium cursor-pointer"
                      >
                        Remove Key
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={handleSaveKey}
                      className="px-4 py-1.5 rounded-lg bg-stone-900 text-white hover:bg-stone-800 transition-colors text-xs font-semibold shadow-xs cursor-pointer"
                    >
                      Save Key & Connect
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= CHAT MESSAGE THREAD ================= */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {/* Welcome Screen when thread is empty */}
          {messages.length === 0 && (
            <div className="max-w-xl mx-auto my-6 text-center space-y-4 animate-in fade-in duration-300">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg">
                <Sparkles className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-stone-900 font-sans">
                  How can I help you master {topic.title}?
                </h3>
                <p className="text-xs text-stone-600 mt-1 max-w-md mx-auto">
                  Ask any doubt, request code breakdowns, or test your understanding. I have full context of this notebook topic.
                </p>
              </div>

              {!isKeyConfigured && (
                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs text-left flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-semibold">Setup Required:</strong> Please click 
                    <button
                      type="button"
                      onClick={() => setShowSettings(true)}
                      className="underline font-bold text-[#2457D6] mx-1 hover:text-blue-800"
                    >
                      "Setup Key"
                    </button>
                    above to add your free Google Gemini or OpenRouter API key to start chatting.
                  </div>
                </div>
              )}

              {/* Quick Prompt Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left pt-2">
                {quickPrompts.map((qp, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSendMessage(qp.text)}
                    className="p-3 rounded-xl border border-stone-200 bg-white hover:border-[#2457D6] hover:shadow-xs transition-all text-xs cursor-pointer group flex flex-col justify-between"
                  >
                    <span className="font-bold text-stone-800 group-hover:text-[#2457D6] flex items-center gap-1.5">
                      <HelpCircle className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#2457D6]" />
                      {qp.label}
                    </span>
                    <span className="text-[11px] text-stone-500 line-clamp-2 mt-1">
                      {qp.text}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Render Active Messages */}
          {messages.map((msg) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-3xl ${isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
              >
                {/* Avatar */}
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-white shrink-0 mt-0.5 text-xs font-bold ${
                    isUser ? 'bg-stone-800' : 'bg-[#2457D6]'
                  }`}
                >
                  {isUser ? 'U' : <Bot className="w-4 h-4" />}
                </div>

                {/* Message Bubble */}
                <div
                  className={`rounded-2xl p-4 text-xs sm:text-sm select-text ${
                    isUser
                      ? 'bg-[#2457D6] text-white shadow-xs rounded-tr-xs'
                      : 'bg-white border border-[#D9D4C8] shadow-xs text-stone-800 rounded-tl-xs'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4 mb-1 text-[10px] opacity-70 font-mono">
                    <span className="font-semibold">{isUser ? 'You' : `${provider === 'gemini' ? 'Gemini 1.5' : 'OpenRouter'} AI Mentor`}</span>
                    <span>{msg.timestamp}</span>
                  </div>

                  {isUser ? (
                    <div className="whitespace-pre-wrap leading-relaxed">{msg.content}</div>
                  ) : (
                    <div>{renderMessageContent(msg.content, msg.id)}</div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isLoading && (
            <div className="flex gap-3 max-w-xl mr-auto animate-in fade-in">
              <div className="w-7 h-7 rounded-full bg-[#2457D6] flex items-center justify-center text-white shrink-0 mt-0.5">
                <Bot className="w-4 h-4 animate-spin" />
              </div>
              <div className="bg-white border border-[#D9D4C8] rounded-2xl rounded-tl-xs px-4 py-3 shadow-xs flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:0.4s]" />
                <span className="text-xs text-stone-500 font-mono ml-2">Synthesizing solution...</span>
              </div>
            </div>
          )}

          {/* Error Banner */}
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <strong>Error:</strong> {errorMsg}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* ================= BOTTOM INPUT COMPOSER ================= */}
        <div className="p-3 sm:p-4 bg-white border-t border-[#D9D4C8] shrink-0 space-y-2">
          {/* Quick Prompt Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            <span className="text-[10px] font-mono text-stone-400 font-bold uppercase shrink-0">Quick:</span>
            {quickPrompts.map((qp, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSendMessage(qp.text)}
                disabled={isLoading}
                className="px-2.5 py-1 rounded-full border border-stone-200 bg-stone-50 hover:bg-blue-50 hover:border-blue-200 hover:text-[#2457D6] text-stone-600 text-[11px] whitespace-nowrap transition-colors cursor-pointer shrink-0 disabled:opacity-40"
              >
                {qp.label}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="relative flex items-center bg-[#FAF8F5] border border-stone-300 rounded-xl p-1.5 focus-within:border-[#2457D6] focus-within:ring-2 focus-within:ring-[#2457D6]/20 transition-all">
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
              placeholder={isKeyConfigured ? `Ask anything about ${topic.title}... (Enter to send)` : "Add your API Key above to begin asking..."}
              disabled={isLoading}
              className="flex-1 bg-transparent border-none outline-hidden resize-none px-3 py-1.5 text-xs sm:text-sm text-stone-800 placeholder-stone-400 font-sans max-h-32 min-h-[38px]"
            />

            <button
              type="button"
              onClick={() => handleSendMessage()}
              disabled={isLoading || !inputQuery.trim()}
              className={`p-2 rounded-lg font-bold transition-all shrink-0 cursor-pointer ${
                inputQuery.trim() && !isLoading
                  ? 'bg-[#2457D6] text-white hover:bg-blue-700 shadow-xs'
                  : 'bg-stone-200 text-stone-400 cursor-not-allowed'
              }`}
              title="Send Message (Enter)"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center justify-between text-[10px] text-stone-500 font-mono px-1">
            <span>Powered by direct {provider === 'gemini' ? 'Google Gemini 1.5' : 'OpenRouter'} API</span>
            <span>Shift + Enter for new line</span>
          </div>
        </div>

      </div>
    </div>
  );
}
