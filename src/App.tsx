import { useState, useEffect, useCallback, useMemo } from 'react';
import { NOTEBOOK_SUBJECTS, findTopicById } from './data/notebookData';
import { Subject, TopicContent, PaperStyle, HighlightColor, HighlightTool, UserHighlight, StickyNote } from './types/notebook';
import { Navbar } from './components/Navbar';
import { NotebookCover } from './components/NotebookCover';
import { NotebookBackCover } from './components/NotebookBackCover';
import { NotebookIndex } from './components/NotebookIndex';
import { PhysicalNotebookSpread } from './components/PhysicalNotebookSpread';
import { SearchModal } from './components/SearchModal';
import { BookmarksView } from './components/BookmarksView';
import { ProgressView } from './components/ProgressView';
import { NotebookLibrary } from './components/NotebookLibrary';
import { HighlighterToolbar } from './components/HighlighterToolbar';
import { QuestionPaperModal } from './components/QuestionPaperModal';
import { RevisionFlashcardsModal } from './components/RevisionFlashcardsModal';
import { AIStudyDeskView } from './components/AIStudyDeskView';
import { EngineeringDraftingDesk } from './components/EngineeringDraftingDesk';
import { RevisionSessionModal } from './components/RevisionSessionModal';
import { ToolsVaultView } from './components/tools/ToolsVaultView';
import { MobileDeviceNoticeModal } from './components/MobileDeviceNoticeModal';
import { MobileDiaryReader } from './components/mobile/MobileDiaryReader';
import { LandingPage } from './components/landing/LandingPage';
import { LegalView, LegalTab } from './components/legal/LegalView';
import { useViewportMode } from './hooks/useViewportMode';
import { C_FINAL_ASSESSMENT } from './data/cAssessment';
import { notebookAudio } from './utils/audioEffects';
import { PanelLeftClose, PanelLeftOpen, Award, Brain, Bot, AlertCircle, PenTool, Compass } from 'lucide-react';

type ViewMode = 'landing' | 'home' | 'notebook' | 'library' | 'bookmarks' | 'progress' | 'ai-desk' | 'whiteboard' | 'tools' | 'privacy' | 'terms';

const parseInitialView = (): ViewMode => {
  try {
    const path = window.location.pathname.toLowerCase().replace(/\/$/, '');
    const params = new URLSearchParams(window.location.search);
    const viewParam = params.get('view')?.toLowerCase();

    if (path === '/privacy' || viewParam === 'privacy') return 'privacy';
    if (path === '/terms' || viewParam === 'terms') return 'terms';
    if (path === '/tools' || viewParam === 'tools') return 'tools';
    if (path === '/notebook' || viewParam === 'notebook') return 'notebook';
    if (path === '/library' || viewParam === 'library') return 'library';
    if (path === '/progress' || viewParam === 'progress') return 'progress';
    if (path === '/bookmarks' || viewParam === 'bookmarks') return 'bookmarks';
    if (path === '/whiteboard' || viewParam === 'whiteboard') return 'whiteboard';
    if (path === '/ai-desk' || viewParam === 'ai-desk') return 'ai-desk';
  } catch {
    // fallback to landing
  }
  return 'landing';
};

export default function App() {
  const { mode: viewportMode } = useViewportMode();

  // Selected State
  const [currentView, setCurrentView] = useState<ViewMode>(parseInitialView);
  const [isOpeningAnimation, setIsOpeningAnimation] = useState(false);
  const [isBookClosed, setIsBookClosed] = useState(false);
  // Incremented each time the user enters the notebook — forces the cover animation to replay
  const [animationKey, setAnimationKey] = useState(0);
  const [isIndexOpen, setIsIndexOpen] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('codeink_index_open');
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });
  const [activeSubject, setActiveSubject] = useState<Subject>(NOTEBOOK_SUBJECTS[0]);
  const [activeTopic, setActiveTopic] = useState<TopicContent>(
    NOTEBOOK_SUBJECTS[0].chapters[0].topics[0]
  );
  const [paperStyle, setPaperStyle] = useState<PaperStyle>('ruled');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isFinalPaperOpen, setIsFinalPaperOpen] = useState(false);
  const [isFlashcardsOpen, setIsFlashcardsOpen] = useState(false);
  const [aiStudyDeskSnippet, setAiStudyDeskSnippet] = useState<string | undefined>();
  const [isRevisionSessionOpen, setIsRevisionSessionOpen] = useState(false);
  const [isMuted, setIsMuted] = useState<boolean>(() => notebookAudio.getMuted());

  // Sticky Notes State
  const [stickyNotes, setStickyNotes] = useState<StickyNote[]>(() => {
    try {
      const saved = localStorage.getItem('codeink_sticky_notes');
      return saved
        ? JSON.parse(saved)
        : [
            {
              id: 'sn-init-1',
              topicId: 'c-variables',
              pageSide: 'left',
              color: 'yellow',
              title: 'Viva Gotcha',
              content: 'Always specify unsigned if handling raw binary network masks!',
              createdAt: new Date().toISOString()
            }
          ];
    } catch {
      return [];
    }
  });

  // Highlighter Tool State (Four Pens & Dedicated Eraser)
  const [selectedTool, setSelectedTool] = useState<HighlightTool>('yellow');
  const [userHighlights, setUserHighlights] = useState<UserHighlight[]>(() => {
    try {
      const saved = localStorage.getItem('codeink_user_highlights');
      return saved
        ? JSON.parse(saved)
        : [
            {
              id: 'hl-sample-1',
              topicId: 'c-compilation',
              text: 'Zero runtime abstraction overhead on CPU silicon',
              color: 'yellow',
              createdAt: new Date().toISOString()
            }
          ];
    } catch {
      return [];
    }
  });

  // Persistence State
  const [completedTopicIds, setCompletedTopicIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('codeink_completed');
      return saved ? JSON.parse(saved) : ['c-compilation'];
    } catch {
      return ['c-compilation'];
    }
  });

  const [bookmarkedTopicIds, setBookmarkedTopicIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('codeink_bookmarks');
      return saved ? JSON.parse(saved) : ['c-variables', 'c-pointers'];
    } catch {
      return ['c-variables', 'c-pointers'];
    }
  });

  const [userNotes, setUserNotes] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('codeink_notes');
      return saved
        ? JSON.parse(saved)
        : {
            'c-variables': 'Remember: uninitialized local vars have garbage bits! Always init int x = 0;',
            'c-pointers': 'Dereference with * follows the pointer arrow. & gives memory location.'
          };
    } catch {
      return {};
    }
  });

  const [recentTopicIds, setRecentTopicIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('codeink_recent');
      return saved ? JSON.parse(saved) : ['c-variables', 'c-compilation'];
    } catch {
      return ['c-variables', 'c-compilation'];
    }
  });

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('codeink_index_open', JSON.stringify(isIndexOpen));
  }, [isIndexOpen]);

  useEffect(() => {
    localStorage.setItem('codeink_user_highlights', JSON.stringify(userHighlights));
  }, [userHighlights]);

  useEffect(() => {
    localStorage.setItem('codeink_completed', JSON.stringify(completedTopicIds));
  }, [completedTopicIds]);

  useEffect(() => {
    localStorage.setItem('codeink_bookmarks', JSON.stringify(bookmarkedTopicIds));
  }, [bookmarkedTopicIds]);

  useEffect(() => {
    localStorage.setItem('codeink_notes', JSON.stringify(userNotes));
  }, [userNotes]);

  useEffect(() => {
    localStorage.setItem('codeink_sticky_notes', JSON.stringify(stickyNotes));
  }, [stickyNotes]);

  useEffect(() => {
    localStorage.setItem('codeink_recent', JSON.stringify(recentTopicIds));
  }, [recentTopicIds]);

  const handleToggleMute = () => {
    const next = notebookAudio.toggleMute();
    setIsMuted(next);
  };

  const handleSelectTool = (tool: HighlightTool) => {
    if (tool !== 'eraser') notebookAudio.playMarker();
    setSelectedTool(tool);
  };

  const handleAddSticky = (note: Omit<StickyNote, 'id' | 'createdAt'>) => {
    const newNote: StickyNote = {
      ...note,
      id: 'sn-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      createdAt: new Date().toISOString()
    };
    setStickyNotes(prev => [newNote, ...prev]);
  };

  const handleUpdateSticky = (id: string, updates: Partial<StickyNote>) => {
    setStickyNotes(prev => prev.map(n => (n.id === id ? { ...n, ...updates } : n)));
  };

  const handleDeleteSticky = (id: string) => {
    setStickyNotes(prev => prev.filter(n => n.id !== id));
  };

  // Track recent topic
  const recordRecentTopic = useCallback((topicId: string) => {
    setRecentTopicIds(prev => {
      const filtered = prev.filter(id => id !== topicId);
      return [topicId, ...filtered].slice(0, 10);
    });
  }, []);

  // Handle notebook opening animation (~950ms realistic cover flip)
  const handleOpenNotebook = () => {
    setIsOpeningAnimation(true);
    setTimeout(() => {
      setIsOpeningAnimation(false);
      setCurrentView('notebook');
      recordRecentTopic(activeTopic.id);
    }, 950);
  };

  // User Highlight Handlers
  const handleAddHighlight = (highlight: UserHighlight) => {
    setUserHighlights(prev => [highlight, ...prev]);
  };

  const handleRemoveHighlight = (id: string) => {
    setUserHighlights(prev => prev.filter(h => h.id !== id));
  };

  const handleClearCurrentTopicHighlights = () => {
    setUserHighlights(prev => prev.filter(h => h.topicId !== activeTopic.id));
  };

  // Subject-scoped Topic Navigation (Books are self-contained per subject)
  const currentSubjectTopics = useMemo(() => {
    return activeSubject.chapters.flatMap(c => c.topics);
  }, [activeSubject]);

  const currentTopicIndex = currentSubjectTopics.findIndex(t => t.id === activeTopic.id);
  const prevTopic = currentTopicIndex > 0 ? currentSubjectTopics[currentTopicIndex - 1] : null;
  const nextTopic =
    currentTopicIndex >= 0 && currentTopicIndex < currentSubjectTopics.length - 1
      ? currentSubjectTopics[currentTopicIndex + 1]
      : null;
  const hasPrev = prevTopic !== null;
  const hasNext = nextTopic !== null;

  const handlePrev = useCallback(() => {
    if (prevTopic) {
      setIsBookClosed(false);
      setActiveTopic(prevTopic);
      recordRecentTopic(prevTopic.id);
    }
  }, [prevTopic, recordRecentTopic]);

  const handleNext = useCallback(() => {
    if (nextTopic) {
      setIsBookClosed(false);
      setActiveTopic(nextTopic);
      recordRecentTopic(nextTopic.id);
    } else {
      // Reached the end of this subject's notebook! Close book.
      setIsBookClosed(true);
    }
  }, [nextTopic, recordRecentTopic]);

  const handleSelectTopic = (topic: TopicContent, subject: Subject) => {
    setIsBookClosed(false);
    setActiveTopic(topic);
    setActiveSubject(subject);
    setCurrentView('notebook');
    recordRecentTopic(topic.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectSubject = useCallback((subject: Subject) => {
    setIsBookClosed(false);
    setActiveSubject(subject);
    if (subject.chapters[0]?.topics[0]) {
      setActiveTopic(subject.chapters[0].topics[0]);
      recordRecentTopic(subject.chapters[0].topics[0].id);
    }
  }, [recordRecentTopic]);

  const handleSelectTopicById = (topicId: string) => {
    const match = findTopicById(topicId);
    if (match) {
      setIsBookClosed(false);
      setActiveTopic(match.topic);
      setActiveSubject(match.subject);
      setCurrentView('notebook');
      recordRecentTopic(match.topic.id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Toggle bookmark for active topic
  const handleToggleBookmark = useCallback(() => {
    setBookmarkedTopicIds(prev =>
      prev.includes(activeTopic.id)
        ? prev.filter(id => id !== activeTopic.id)
        : [...prev, activeTopic.id]
    );
  }, [activeTopic.id]);

  // Toggle completed status
  const handleToggleCompleted = () => {
    setCompletedTopicIds(prev =>
      prev.includes(activeTopic.id)
        ? prev.filter(id => id !== activeTopic.id)
        : [...prev, activeTopic.id]
    );
  };

  // Save student margin notes
  const handleSaveNote = (topicId: string, note: string) => {
    setUserNotes(prev => ({
      ...prev,
      [topicId]: note
    }));
  };

  // Reset Progress ledger
  const handleResetProgress = () => {
    if (window.confirm('Reset your reading ledger and completion record? Bookmarks and notes will be preserved.')) {
      setCompletedTopicIds([]);
      setRecentTopicIds([]);
      setUserHighlights([]);
    }
  };

  // Global Keyboard Shortcuts (Ctrl+K, ←, →, B, S, M, 1-5 for pens)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Global shortcut: Ctrl+K or Cmd+K always opens Search
      if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        setIsSearchOpen(true);
        return;
      }

      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
        return;
      }

      // ArrowLeft and ArrowRight are handled with realistic 3D page-flip animation and sound inside PhysicalNotebookSpread
      if ((e.key === 'b' || e.key === 'B') && currentView === 'notebook') {
        e.preventDefault();
        handleToggleBookmark();
      } else if (e.key === 's' || e.key === 'S' || e.key === '/') {
        e.preventDefault();
        setIsSearchOpen(true);
      } else if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        setPaperStyle(prev => (prev === 'ruled' ? 'grid' : prev === 'grid' ? 'plain' : 'ruled'));
      } else if (e.key === '1' && currentView === 'notebook') {
        setSelectedTool('green');
      } else if (e.key === '2' && currentView === 'notebook') {
        setSelectedTool('blue');
      } else if (e.key === '3' && currentView === 'notebook') {
        setSelectedTool('yellow');
      } else if (e.key === '4' && currentView === 'notebook') {
        setSelectedTool('red');
      } else if ((e.key === '5' || e.key === 'e' || e.key === 'E') && currentView === 'notebook') {
        setSelectedTool('eraser');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentView, handlePrev, handleNext, handleToggleBookmark]);

  // Synchronize browser history and views
  const navigateToView = useCallback((view: ViewMode) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
    try {
      if (view === 'privacy') {
        window.history.pushState({ view }, '', '/privacy');
      } else if (view === 'terms') {
        window.history.pushState({ view }, '', '/terms');
      } else if (view === 'landing') {
        window.history.pushState({ view }, '', '/');
      } else {
        window.history.pushState({ view }, '', `/?view=${view}`);
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentView(parseInitialView());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Lookup active chapter title
  const activeChapter = activeSubject.chapters.find(c => c.id === activeTopic.chapterId);
  const activeChapterTitle = activeChapter ? activeChapter.title : 'Chapter';

  return (
    <>
      <div className={`min-h-screen bg-app text-ink flex flex-col font-sans tool-selection-${selectedTool} overflow-x-hidden ${currentView === 'landing' || currentView === 'privacy' || currentView === 'terms' ? 'pb-0' : currentView === 'whiteboard' ? 'pb-0 overflow-hidden h-screen bg-[#1A1918]' : currentView === 'ai-desk' ? 'pb-0 overflow-hidden h-screen bg-app' : (currentView === 'notebook' && viewportMode === 'diary') ? 'pb-0 h-[100dvh] overflow-hidden' : 'pb-16'} ${isFinalPaperOpen ? 'print:hidden' : ''}`}>
      {/* Top Navbar (Hidden on Landing Page, Legal Pages & during Mobile Diary View) */}
      {!(currentView === 'landing' || currentView === 'privacy' || currentView === 'terms' || (currentView === 'notebook' && viewportMode === 'diary')) && (
        <Navbar
          currentView={currentView}
          onNavigate={(view) => navigateToView(view)}
          onOpenSearch={() => setIsSearchOpen(true)}
          paperStyle={paperStyle}
          onChangePaperStyle={setPaperStyle}
          mobileMenuOpen={mobileMenuOpen}
          onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
          bookmarksCount={bookmarkedTopicIds.length}
          onOpenFinalPaper={() => setIsFinalPaperOpen(true)}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
          onOpenAIStudyDesk={() => {
            setAiStudyDeskSnippet(undefined);
            navigateToView('ai-desk');
          }}
          onOpenRevisionMode={() => setIsRevisionSessionOpen(true)}
        />
      )}

      {/* Main View Router */}
      <div className={`flex-1 w-full flex flex-col transition-all duration-300 ${
        currentView === 'landing' || currentView === 'privacy' || currentView === 'terms'
          ? 'p-0 max-w-full'
          : currentView === 'ai-desk'
          ? 'p-0 max-w-full overflow-hidden'
          : (currentView === 'notebook' && viewportMode === 'diary')
          ? 'p-0 max-w-full h-full min-h-0 overflow-hidden'
          : `mx-auto p-2.5 sm:p-4 md:p-5 lg:p-6 ${isIndexOpen ? 'max-w-7xl' : 'max-w-[1520px]'}`
      }`}>
        {currentView === 'landing' && (
          <LandingPage
            onEnter={() => {
              setIsBookClosed(false);
              setAnimationKey(k => k + 1);  // new key → NotebookCover remounts fresh
              setIsOpeningAnimation(false);  // mount in CLOSED state first
              navigateToView('home');
              recordRecentTopic(activeTopic.id);
              // Step 1: let the closed cover render for one frame (~60ms)
              // Step 2: trigger the cover flip
              // Step 3: after flip completes (950ms), advance to notebook
              setTimeout(() => {
                setIsOpeningAnimation(true);
                setTimeout(() => {
                  setIsOpeningAnimation(false);
                  navigateToView('notebook');
                }, 950);
              }, 60);
            }}
            onNavigateLegal={(tab) => navigateToView(tab)}
          />
        )}

        {(currentView === 'privacy' || currentView === 'terms') && (
          <LegalView
            initialTab={currentView === 'privacy' ? 'privacy' : 'terms'}
            onGoBack={() => navigateToView('landing')}
            onGoToNotebook={() => {
              setIsBookClosed(false);
              navigateToView('notebook');
            }}
          />
        )}

        {currentView === 'home' && (
          <NotebookCover
            key={animationKey}
            onOpen={handleOpenNotebook}
            isOpening={isOpeningAnimation}
          />
        )}

        {/* WORKSPACE: [ INDEX TOGGLE + CONTROLS ] -> [ OPTIONAL INDEX ] [ EXPANDED TWO-PAGE NOTEBOOK ] */}
        {currentView === 'notebook' && (
          isBookClosed ? (
            <NotebookBackCover
              subject={activeSubject}
              paperStyle={paperStyle}
              totalTopics={activeSubject.chapters.reduce((acc, c) => acc + c.topics.length, 0)}
              completedTopicsCount={activeSubject.chapters.reduce(
                (acc, c) => acc + c.topics.filter(t => completedTopicIds.includes(t.id)).length,
                0
              )}
              onBackToLastTopic={() => {
                setIsBookClosed(false);
                const lastChapter = activeSubject.chapters[activeSubject.chapters.length - 1];
                const lastTopic = lastChapter?.topics[lastChapter.topics.length - 1];
                if (lastTopic) {
                  setActiveTopic(lastTopic);
                  recordRecentTopic(lastTopic.id);
                }
              }}
              onReopenFirstPage={() => {
                setIsBookClosed(false);
                if (activeSubject.chapters[0]?.topics[0]) {
                  handleSelectTopic(activeSubject.chapters[0].topics[0], activeSubject);
                }
              }}
              onTakeFinalPaper={() => setIsFinalPaperOpen(true)}
              onOpenFlashcards={() => setIsFlashcardsOpen(true)}
              onExploreLibrary={() => {
                setIsBookClosed(false);
                setCurrentView('library');
              }}
            />
          ) : viewportMode === 'diary' ? (
            <MobileDiaryReader
              currentTopic={activeTopic}
              nextTopic={nextTopic || undefined}
              prevTopic={prevTopic || undefined}
              subject={activeSubject}
              chapterTitle={activeChapterTitle}
              isBookmarked={bookmarkedTopicIds.includes(activeTopic.id)}
              isCompleted={completedTopicIds.includes(activeTopic.id)}
              paperStyle={paperStyle}
              savedNote={userNotes[activeTopic.id] || ''}
              selectedTool={selectedTool}
              userHighlights={userHighlights}
              stickyNotes={stickyNotes}
              onAddSticky={handleAddSticky}
              onUpdateSticky={handleUpdateSticky}
              onDeleteSticky={handleDeleteSticky}
              onAddHighlight={handleAddHighlight}
              onRemoveHighlight={handleRemoveHighlight}
              onToggleBookmark={handleToggleBookmark}
              onToggleCompleted={handleToggleCompleted}
              onSaveNote={handleSaveNote}
              onPrev={handlePrev}
              onNext={handleNext}
              hasPrev={hasPrev}
              hasNext={hasNext}
              onCloseBook={() => setCurrentView('library')}
              onSelectTopicById={handleSelectTopicById}
              onSelectTopic={(t) => handleSelectTopic(t, activeSubject)}
              onOpenFinalPaper={() => setIsFinalPaperOpen(true)}
              onOpenFlashcards={() => setIsFlashcardsOpen(true)}
              onOpenAIStudyDesk={(snippet) => {
                setAiStudyDeskSnippet(snippet);
                setCurrentView('ai-desk');
              }}
            />
          ) : (
            <div className="flex-1 flex flex-col">
              {/* Top Workspace Sub-Toolbar: Index Toggle & Chapter Breadcrumb */}
              <div className="flex items-center justify-between gap-4 mb-3 sm:mb-4 select-none flex-wrap">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsIndexOpen(!isIndexOpen)}
                    className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-line bg-raised text-ink hover:text-accent hover:border-stone-400 hover:bg-page transition-all text-xs font-medium shadow-2xs group cursor-pointer"
                    title={isIndexOpen ? "Collapse Left Index" : "Expand Notebook & Show Left Index"}
                    aria-expanded={isIndexOpen}
                  >
                    {isIndexOpen ? (
                      <PanelLeftClose className="w-4 h-4 text-muted group-hover:text-accent transition-colors" />
                    ) : (
                      <PanelLeftOpen className="w-4 h-4 text-muted group-hover:text-accent transition-colors" />
                    )}
                    <span className="hidden sm:inline font-mono text-[11px] text-muted">
                      {isIndexOpen ? 'Collapse Index' : 'Show Index'}
                    </span>
                  </button>

                  {/* Subject & Chapter Breadcrumb */}
                  <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-muted">
                    <span className="text-accent font-semibold">{activeSubject.name}</span>
                    <span>/</span>
                    <span>Ch {String(activeTopic.chapterNumber).padStart(2, '0')}: {activeChapterTitle}</span>
                  </div>
                </div>

                {/* Status pill & Exam / Stationery Quick Triggers */}
                <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                  <button
                    type="button"
                    onClick={() => {
                      setAiStudyDeskSnippet(activeTopic.example?.code);
                      setCurrentView('ai-desk');
                    }}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-600 hover:text-white transition-all text-xs font-semibold shadow-2xs cursor-pointer"
                    title="Open AI Engineering Study Desk"
                  >
                    <Bot className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">AI Desk</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCurrentView('whiteboard')}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-blue-300 bg-blue-50 text-[#2457D6] hover:bg-[#2457D6] hover:text-white transition-all text-xs font-semibold shadow-2xs cursor-pointer"
                    title="Open Engineering Whiteboard & Scratchpad"
                  >
                    <PenTool className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Drafting Desk</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsRevisionSessionOpen(true)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-purple-300 bg-purple-50 text-purple-700 hover:bg-purple-600 hover:text-white transition-all text-xs font-semibold shadow-2xs cursor-pointer"
                    title="Start Adaptive Revision Session"
                  >
                    <Brain className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Revision Mode</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsFinalPaperOpen(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border border-[#2457D6]/40 bg-blue-50/70 text-[#2457D6] hover:bg-[#2457D6] hover:text-white transition-all text-xs font-semibold shadow-2xs cursor-pointer"
                  >
                    <Award className="w-3.5 h-3.5" />
                    <span>{activeSubject.shortCode} Question Paper (50M)</span>
                  </button>
                </div>
              </div>

              {/* Split / Expanded Workspace Area */}
              <div className="flex-1 flex gap-4 lg:gap-6 items-start justify-center transition-all duration-300">
                {/* Collapsible Left External Index with explicit viewport-constrained scrolling */}
                <div
                  className={`hidden md:block sticky top-18 transition-all duration-300 ease-in-out shrink-0 ${
                    isIndexOpen
                      ? 'w-64 lg:w-72 opacity-100 h-[calc(100vh-5.5rem)]'
                      : 'w-0 opacity-0 pointer-events-none h-0 overflow-hidden'
                  }`}
                >
                  <div className="w-64 lg:w-72 h-full">
                    <NotebookIndex
                      subjects={NOTEBOOK_SUBJECTS}
                      activeSubject={activeSubject}
                      activeTopic={activeTopic}
                      onSelectTopic={handleSelectTopic}
                      onSelectSubject={handleSelectSubject}
                      completedTopicIds={completedTopicIds}
                      bookmarkedTopicIds={bookmarkedTopicIds}
                    />
                  </div>
                </div>

                {/* Center / Expanded Large Two-Page Notebook Spread */}
                <div className="flex-1 min-w-0 transition-all duration-300 ease-in-out">
                  <PhysicalNotebookSpread
                    currentTopic={activeTopic}
                    nextTopic={nextTopic}
                    prevTopic={prevTopic}
                    subject={activeSubject}
                    chapterTitle={activeChapterTitle}
                    isBookmarked={bookmarkedTopicIds.includes(activeTopic.id)}
                    isCompleted={completedTopicIds.includes(activeTopic.id)}
                    paperStyle={paperStyle}
                    savedNote={userNotes[activeTopic.id] || ''}
                    selectedTool={selectedTool}
                    userHighlights={userHighlights}
                    stickyNotes={stickyNotes}
                    onAddSticky={handleAddSticky}
                    onUpdateSticky={handleUpdateSticky}
                    onDeleteSticky={handleDeleteSticky}
                    onAddHighlight={handleAddHighlight}
                    onRemoveHighlight={handleRemoveHighlight}
                    onToggleBookmark={handleToggleBookmark}
                    onToggleCompleted={handleToggleCompleted}
                    onSaveNote={handleSaveNote}
                    onPrev={handlePrev}
                    onNext={handleNext}
                    hasPrev={hasPrev}
                    hasNext={hasNext}
                    onCloseBook={() => setIsBookClosed(true)}
                    onSelectTopicById={handleSelectTopicById}
                    onOpenFinalPaper={() => setIsFinalPaperOpen(true)}
                    onOpenFlashcards={() => setIsFlashcardsOpen(true)}
                    onOpenAIStudyDesk={(snippet) => {
                      setAiStudyDeskSnippet(snippet);
                      setCurrentView('ai-desk');
                    }}
                  />
                </div>
              </div>
            </div>
          )
        )}

        {currentView === 'library' && (
          <NotebookLibrary
            subjects={NOTEBOOK_SUBJECTS}
            onSelectSubject={setActiveSubject}
            onSelectTopic={handleSelectTopic}
            completedTopicIds={completedTopicIds}
          />
        )}

        {currentView === 'bookmarks' && (
          <BookmarksView
            bookmarkedTopicIds={bookmarkedTopicIds}
            onSelectTopic={handleSelectTopic}
            onRemoveBookmark={(id) => setBookmarkedTopicIds(prev => prev.filter(x => x !== id))}
            onGoToNotebook={() => setCurrentView('notebook')}
          />
        )}

        {currentView === 'progress' && (
          <ProgressView
            subjects={NOTEBOOK_SUBJECTS}
            completedTopicIds={completedTopicIds}
            bookmarkedTopicIds={bookmarkedTopicIds}
            userNotes={userNotes}
            recentTopicIds={recentTopicIds}
            onSelectTopicById={handleSelectTopicById}
            onResetProgress={handleResetProgress}
            onGoToNotebook={() => setCurrentView('notebook')}
            onOpenRevisionMode={() => setIsRevisionSessionOpen(true)}
          />
        )}

        {/* Dedicated Full-Page AI Study Desk Section */}
        {currentView === 'ai-desk' && (
          <AIStudyDeskView
            subject={activeSubject}
            chapterTitle={activeChapterTitle}
            topic={activeTopic}
            allSubjects={NOTEBOOK_SUBJECTS}
            onSelectSubject={handleSelectSubject}
            onSelectTopic={handleSelectTopic}
            initialCodeSnippet={aiStudyDeskSnippet}
            onGoToNotebook={() => setCurrentView('notebook')}
          />
        )}

        {/* Dedicated Full-Page Engineering Whiteboard & Drafting Desk */}
        {currentView === 'whiteboard' && (
          <EngineeringDraftingDesk
            activeSubject={activeSubject}
            allSubjects={NOTEBOOK_SUBJECTS}
            onGoToNotebook={() => setCurrentView('notebook')}
          />
        )}

        {/* Dedicated Full-Page 100 Free Developer Tools Arsenal Section */}
        {currentView === 'tools' && (
          <ToolsVaultView
            onGoToNotebook={() => setCurrentView('notebook')}
          />
        )}
      </div>

      {/* Floating Four-Marker Pen & Eraser Toolbar (Visible in Notebook Reading Workspace on Desktop) */}
      {currentView === 'notebook' && !isBookClosed && viewportMode === 'spread' && (
        <HighlighterToolbar
          selectedTool={selectedTool}
          onSelectTool={handleSelectTool}
        />
      )}


      {/* Spaced Repetition Revision Flashcards Modal */}
      <RevisionFlashcardsModal
        subject={activeSubject}
        isOpen={isFlashcardsOpen}
        onClose={() => setIsFlashcardsOpen(false)}
      />

      {/* Adaptive Revision Session Modal */}
      <RevisionSessionModal
        isOpen={isRevisionSessionOpen}
        onClose={() => setIsRevisionSessionOpen(false)}
        activeSubject={activeSubject}
        bookmarkedTopicIds={bookmarkedTopicIds}
        onNavigateToTopic={handleSelectTopicById}
      />

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-stone-900/40 backdrop-blur-xs flex">
          <div className="w-80 max-w-[85vw] bg-[#F7F3EA] h-full p-4 shadow-2xl flex flex-col">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#D9D4C8]">
              <span className="font-bold text-[#171717] text-sm">CODEINK Navigation</span>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 text-stone-500 hover:text-stone-900 text-sm font-mono cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Quick action buttons */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              <button
                type="button"
                onClick={() => {
                  navigateToView('notebook');
                  setMobileMenuOpen(false);
                }}
                className="p-2 text-xs font-medium text-left rounded bg-white border border-[#D9D4C8] text-stone-800 hover:bg-stone-50"
              >
                📖 Open Notebook
              </button>
              <button
                type="button"
                onClick={() => {
                  navigateToView('library');
                  setMobileMenuOpen(false);
                }}
                className="p-2 text-xs font-medium text-left rounded bg-white border border-[#D9D4C8] text-stone-800 hover:bg-stone-50"
              >
                📚 All Subjects
              </button>
              <button
                type="button"
                onClick={() => {
                  navigateToView('tools');
                  setMobileMenuOpen(false);
                }}
                className="p-2 text-xs font-medium text-left rounded bg-blue-50 border border-blue-200 text-[#2457D6] hover:bg-blue-100 font-semibold"
              >
                🧭 Free Tools (100)
              </button>
              <button
                type="button"
                onClick={() => {
                  navigateToView('bookmarks');
                  setMobileMenuOpen(false);
                }}
                className="p-2 text-xs font-medium text-left rounded bg-white border border-[#D9D4C8] text-stone-800 hover:bg-stone-50"
              >
                🔖 Bookmarks ({bookmarkedTopicIds.length})
              </button>
              <button
                type="button"
                onClick={() => {
                  navigateToView('progress');
                  setMobileMenuOpen(false);
                }}
                className="p-2 text-xs font-medium text-left rounded bg-white border border-[#D9D4C8] text-stone-800 hover:bg-stone-50"
              >
                📊 Progress
              </button>
              <button
                type="button"
                onClick={() => {
                  navigateToView('privacy');
                  setMobileMenuOpen(false);
                }}
                className="p-2 text-xs font-medium text-left rounded bg-white border border-[#D9D4C8] text-stone-800 hover:bg-stone-50 flex items-center gap-1.5"
              >
                <span>🛡️ Legal & Privacy</span>
              </button>
            </div>

            {/* Learning Systems drawer triggers */}
            <div className="grid grid-cols-3 gap-2 mb-3">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setCurrentView('ai-desk');
                }}
                className="p-2 text-xs font-medium text-left rounded bg-indigo-50 border border-indigo-200 text-indigo-800 hover:bg-indigo-100 flex items-center gap-1.5"
              >
                <Bot className="w-3.5 h-3.5" />
                <span>AI Desk</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setCurrentView('whiteboard');
                }}
                className="p-2 text-xs font-medium text-left rounded bg-blue-50 border border-blue-200 text-[#2457D6] hover:bg-blue-100 flex items-center gap-1.5"
              >
                <PenTool className="w-3.5 h-3.5" />
                <span>Drafting</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsRevisionSessionOpen(true);
                }}
                className="p-2 text-xs font-medium text-left rounded bg-purple-50 border border-purple-200 text-purple-800 hover:bg-purple-100 flex items-center gap-1.5"
              >
                <Brain className="w-3.5 h-3.5" />
                <span>Revision</span>
              </button>
            </div>

            {/* Final Exam quick jump in mobile drawer */}
            <div className="mb-3">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsFinalPaperOpen(true);
                }}
                className="w-full py-2 px-3 rounded-lg bg-blue-50 border border-blue-200 text-[#2457D6] text-xs font-bold flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  <span>Question Paper (50M · 3 Sets)</span>
                </div>
                <span>→</span>
              </button>
            </div>

            {/* Index tree in mobile drawer */}
            <div className="flex-1 overflow-y-auto">
              <NotebookIndex
                subjects={NOTEBOOK_SUBJECTS}
                activeSubject={activeSubject}
                activeTopic={activeTopic}
                onSelectTopic={handleSelectTopic}
                onSelectSubject={handleSelectSubject}
                completedTopicIds={completedTopicIds}
                bookmarkedTopicIds={bookmarkedTopicIds}
                isMobileDrawer={true}
                onCloseMobileDrawer={() => setMobileMenuOpen(false)}
              />
            </div>
          </div>
          <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
        </div>
      )}

      {/* Global Instant Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectTopic={handleSelectTopic}
        bookmarkedTopicIds={bookmarkedTopicIds}
        userNotes={userNotes}
      />
    </div>

    {/* Official 50-Mark Examination Question Paper (3 Sets per Subject) */}
    <QuestionPaperModal
      isOpen={isFinalPaperOpen}
      onClose={() => setIsFinalPaperOpen(false)}
      activeSubject={activeSubject}
      allSubjects={NOTEBOOK_SUBJECTS}
      onSelectSubject={handleSelectSubject}
    />

    {/* Mobile Screen Recommendation Notice Modal */}
    <MobileDeviceNoticeModal />
  </>
  );
}
