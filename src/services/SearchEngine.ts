// CODEINK V2 — Unified Global Search Engine
// Fast, 100% offline, privacy-first local search.
// Indexes Subjects, Chapters, Topics, Concepts, Code, Practice Questions,
// Bookmarks, Personal Notes, Mistake Notebook, and Flashcards.

import { NOTEBOOK_SUBJECTS, getAllTopicsOrdered } from '../data/notebookData';
import { UnifiedSearchResult, SearchResultType } from '../types/notebook';
import { mistakeEngine } from './MistakeEngine';

interface SearchContext {
  bookmarkedTopicIds?: string[];
  userNotes?: Record<string, string>;
}

class SearchEngine {
  // Pre-indexed static topic records for near-instant retrieval
  private topicIndex: Array<{
    topicId: string;
    subjectId: string;
    subjectName: string;
    chapterTitle: string;
    chapterNumber: number;
    topicTitle: string;
    pageNumber: number;
    definition: string;
    explanation: string;
    codeSnippet?: string;
    important?: string;
    interviewNote?: string;
    practiceQuestions: Array<{
      question: string;
      options: string[];
      explanation: string;
    }>;
  }> = [];

  constructor() {
    this.buildStaticIndex();
  }

  private buildStaticIndex() {
    const list = getAllTopicsOrdered();
    this.topicIndex = list.map((topic) => {
      const subject = NOTEBOOK_SUBJECTS.find((s) => s.id === topic.subjectId) || NOTEBOOK_SUBJECTS[0];
      const chapter = subject.chapters.find((c) => c.id === topic.chapterId);
      const practiceList: Array<{ question: string; options: string[]; explanation: string }> = [];

      if (topic.practiceQuestions) {
        topic.practiceQuestions.forEach((q) => {
          practiceList.push({
            question: q.question,
            options: q.options,
            explanation: q.explanation
          });
        });
      } else if (topic.practice) {
        practiceList.push({
          question: topic.practice.question,
          options: topic.practice.options,
          explanation: topic.practice.explanation
        });
      }

      return {
        topicId: topic.id,
        subjectId: subject.id,
        subjectName: subject.name,
        chapterTitle: chapter ? chapter.title : 'Chapter',
        chapterNumber: topic.chapterNumber,
        topicTitle: topic.title,
        pageNumber: topic.pageNumber,
        definition: topic.definition || '',
        explanation: (topic.explanation || []).join(' ') + (topic.whyItMatters ? ` ${topic.whyItMatters}` : ''),
        codeSnippet: topic.example?.code || '',
        important: topic.important || '',
        interviewNote: topic.interviewNote || '',
        practiceQuestions: practiceList
      };
    });
  }

  public search(query: string, context?: SearchContext): UnifiedSearchResult[] {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed || trimmed.length < 2) return [];

    const results: UnifiedSearchResult[] = [];
    const tokens = trimmed.split(/\s+/).filter(Boolean);

    // 1. Search Subjects
    NOTEBOOK_SUBJECTS.forEach((sub) => {
      if (
        sub.name.toLowerCase().includes(trimmed) ||
        sub.shortCode.toLowerCase().includes(trimmed) ||
        sub.tagline.toLowerCase().includes(trimmed)
      ) {
        const firstTopic = sub.chapters[0]?.topics[0];
        if (firstTopic) {
          results.push({
            id: `sub-${sub.id}`,
            topicId: firstTopic.id,
            subjectId: sub.id,
            subjectName: sub.name,
            chapterTitle: sub.chapters[0].title,
            topicTitle: firstTopic.title,
            resultType: 'subject',
            title: `Subject: ${sub.name} (${sub.shortCode})`,
            snippet: sub.tagline,
            pageNumber: firstTopic.pageNumber
          });
        }
      }
    });

    // 2. Search Topics & Concepts
    for (const item of this.topicIndex) {
      const titleLower = item.topicTitle.toLowerCase();
      const defLower = item.definition.toLowerCase();
      const expLower = item.explanation.toLowerCase();
      const impLower = (item.important || '').toLowerCase();
      const noteLower = (item.interviewNote || '').toLowerCase();
      const codeLower = (item.codeSnippet || '').toLowerCase();

      // Exact or partial match in Title
      if (tokens.every((t) => titleLower.includes(t))) {
        results.push({
          id: `topic-${item.topicId}`,
          topicId: item.topicId,
          subjectId: item.subjectId,
          subjectName: item.subjectName,
          chapterTitle: item.chapterTitle,
          topicTitle: item.topicTitle,
          resultType: 'topic',
          title: item.topicTitle,
          snippet: item.definition.slice(0, 140) + '...',
          pageNumber: item.pageNumber
        });
        continue;
      }

      // Match in Concept / Definition / Theory
      if (tokens.every((t) => defLower.includes(t) || expLower.includes(t) || impLower.includes(t) || noteLower.includes(t))) {
        let snippetText = item.definition;
        if (expLower.includes(tokens[0])) {
          const idx = expLower.indexOf(tokens[0]);
          snippetText = item.explanation.slice(Math.max(0, idx - 40), idx + 100);
        }
        results.push({
          id: `concept-${item.topicId}`,
          topicId: item.topicId,
          subjectId: item.subjectId,
          subjectName: item.subjectName,
          chapterTitle: item.chapterTitle,
          topicTitle: item.topicTitle,
          resultType: 'concept',
          title: item.topicTitle,
          snippet: snippetText.slice(0, 140) + '...',
          pageNumber: item.pageNumber
        });
        continue;
      }

      // Match in Code Examples
      if (codeLower && tokens.every((t) => codeLower.includes(t))) {
        const idx = codeLower.indexOf(tokens[0]);
        const snippet = item.codeSnippet!.slice(Math.max(0, idx - 30), idx + 80);
        results.push({
          id: `code-${item.topicId}`,
          topicId: item.topicId,
          subjectId: item.subjectId,
          subjectName: item.subjectName,
          chapterTitle: item.chapterTitle,
          topicTitle: item.topicTitle,
          resultType: 'code',
          title: `Code in ${item.topicTitle}`,
          snippet: `// ... ${snippet.trim()} ...`,
          pageNumber: item.pageNumber
        });
        continue;
      }

      // Match in Practice Questions
      for (const q of item.practiceQuestions) {
        if (
          tokens.every(
            (t) =>
              q.question.toLowerCase().includes(t) ||
              q.options.some((o) => o.toLowerCase().includes(t)) ||
              q.explanation.toLowerCase().includes(t)
          )
        ) {
          results.push({
            id: `prac-${item.topicId}-${Math.random().toString(36).slice(2, 6)}`,
            topicId: item.topicId,
            subjectId: item.subjectId,
            subjectName: item.subjectName,
            chapterTitle: item.chapterTitle,
            topicTitle: item.topicTitle,
            resultType: 'practice',
            title: `Practice: ${q.question.slice(0, 60)}...`,
            snippet: q.explanation.slice(0, 130) + '...',
            pageNumber: item.pageNumber
          });
          break;
        }
      }
    }

    // 3. Search Personal Notes
    if (context?.userNotes) {
      Object.entries(context.userNotes).forEach(([topicId, note]) => {
        if (!note) return;
        const noteLower = note.toLowerCase();
        if (tokens.every((t) => noteLower.includes(t))) {
          const item = this.topicIndex.find((t) => t.topicId === topicId);
          if (item) {
            results.push({
              id: `note-${topicId}`,
              topicId: item.topicId,
              subjectId: item.subjectId,
              subjectName: item.subjectName,
              chapterTitle: item.chapterTitle,
              topicTitle: item.topicTitle,
              resultType: 'note',
              title: `Personal Note: ${item.topicTitle}`,
              snippet: `"${note.slice(0, 130)}..."`,
              pageNumber: item.pageNumber
            });
          }
        }
      });
    }

    // 4. Search Mistake Notebook
    const mistakes = mistakeEngine.getAll();
    mistakes.forEach((m) => {
      const qLower = m.question.toLowerCase();
      const expLower = m.explanation.toLowerCase();
      const userAnsLower = m.userAnswer.toLowerCase();
      if (tokens.every((t) => qLower.includes(t) || expLower.includes(t) || userAnsLower.includes(t))) {
        const item = this.topicIndex.find((t) => t.topicId === m.topicId);
        results.push({
          id: `mst-${m.id}`,
          topicId: m.topicId,
          subjectId: m.subjectId,
          subjectName: m.subject,
          chapterTitle: m.chapter,
          topicTitle: m.topic,
          resultType: 'mistake',
          title: `Mistake: ${m.question.slice(0, 60)}...`,
          snippet: `Correct: ${m.correctAnswer} · ${m.explanation.slice(0, 100)}`,
          pageNumber: item?.pageNumber
        });
      }
    });

    // 5. Search Bookmarks
    if (context?.bookmarkedTopicIds) {
      context.bookmarkedTopicIds.forEach((bId) => {
        const item = this.topicIndex.find((t) => t.topicId === bId);
        if (item && tokens.every((t) => item.topicTitle.toLowerCase().includes(t))) {
          // If not already in results as bookmark
          if (!results.some((r) => r.topicId === bId && r.resultType === 'bookmark')) {
            results.unshift({
              id: `bm-${bId}`,
              topicId: item.topicId,
              subjectId: item.subjectId,
              subjectName: item.subjectName,
              chapterTitle: item.chapterTitle,
              topicTitle: item.topicTitle,
              resultType: 'bookmark',
              title: `Bookmark: ${item.topicTitle}`,
              snippet: item.definition.slice(0, 130) + '...',
              pageNumber: item.pageNumber
            });
          }
        }
      });
    }

    // Return capped results
    return results.slice(0, 30);
  }
}

export const searchEngine = new SearchEngine();
