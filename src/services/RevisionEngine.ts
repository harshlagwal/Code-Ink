// CODEINK V2 — Unified Revision Engine
// Builds intelligent, focused revision sessions from:
// 1. Weak topics & mistake records
// 2. Due / review flashcards
// 3. Bookmarked concepts
// 4. Practice MCQs, debugging questions, and complexity checks.

import { RevisionItem, Subject, TopicContent } from '../types/notebook';
import { NOTEBOOK_SUBJECTS, getAllTopicsOrdered } from '../data/notebookData';
import { mistakeEngine } from './MistakeEngine';

export interface RevisionSessionConfig {
  subjectId?: string; // If undefined, across all subjects
  sessionSize?: number; // default 12
  includeMistakes?: boolean;
  bookmarkedTopicIds?: string[];
}

export interface RevisionResultSummary {
  totalQuestions: number;
  correctCount: number;
  incorrectCount: number;
  scorePercentage: number;
  topicsNeedingRevision: Array<{ topicId: string; title: string; subject: string }>;
  mistakesAddedCount: number;
  flashcardsDueCount: number;
}

class RevisionEngine {
  public generateSession(config?: RevisionSessionConfig): RevisionItem[] {
    const targetSize = config?.sessionSize || 12;
    const items: RevisionItem[] = [];
    const usedKeys = new Set<string>();

    const allTopics = getAllTopicsOrdered();
    const activeMistakes = mistakeEngine.getAll().filter((m) => !m.resolved);

    // Filter by subject if specified
    const targetMistakes = config?.subjectId
      ? activeMistakes.filter((m) => m.subjectId === config.subjectId)
      : activeMistakes;

    // 1. First priority: Real mistakes from Mistake Notebook
    for (const m of targetMistakes) {
      if (items.length >= Math.ceil(targetSize * 0.4)) break;
      const key = `mst-${m.id}`;
      if (!usedKeys.has(key)) {
        usedKeys.add(key);
        items.push({
          id: key,
          topicId: m.topicId,
          subjectId: m.subjectId,
          subjectName: m.subject,
          chapterTitle: m.chapter,
          topicTitle: m.topic,
          difficulty: m.difficulty,
          type: 'mcq',
          question: m.question,
          codeSnippet: m.codeSnippet,
          options: m.options || [m.correctAnswer, m.userAnswer],
          correctIndex: m.options ? m.options.indexOf(m.correctAnswer) : 0,
          correctAnswer: m.correctAnswer,
          explanation: m.explanation,
          source: 'mistake'
        });
      }
    }

    // 2. Second priority: Bookmarked concepts
    if (config?.bookmarkedTopicIds && config.bookmarkedTopicIds.length > 0) {
      for (const bmId of config.bookmarkedTopicIds) {
        if (items.length >= Math.ceil(targetSize * 0.7)) break;
        const topic = allTopics.find((t) => t.id === bmId);
        if (topic && (!config.subjectId || topic.subjectId === config.subjectId)) {
          const subject = NOTEBOOK_SUBJECTS.find((s) => s.id === topic.subjectId) || NOTEBOOK_SUBJECTS[0];
          const chapter = subject.chapters.find((c) => c.id === topic.chapterId);
          const key = `bm-${topic.id}`;
          if (!usedKeys.has(key)) {
            usedKeys.add(key);
            // Check if topic has practice questions
            if (topic.practiceQuestions && topic.practiceQuestions.length > 0) {
              const q = topic.practiceQuestions[0];
              items.push({
                id: `rev-${topic.id}-pq0`,
                topicId: topic.id,
                subjectId: subject.id,
                subjectName: subject.name,
                chapterTitle: chapter?.title || 'Chapter',
                topicTitle: topic.title,
                difficulty: topic.difficulty,
                type: q.type === 'debugging' ? 'debugging' : q.type === 'output' ? 'output' : 'mcq',
                question: q.question,
                codeSnippet: q.codeSnippet,
                options: q.options,
                correctIndex: q.correctIndex,
                explanation: q.explanation,
                source: 'bookmark'
              });
            } else if (topic.practice) {
              items.push({
                id: `rev-${topic.id}-prac`,
                topicId: topic.id,
                subjectId: subject.id,
                subjectName: subject.name,
                chapterTitle: chapter?.title || 'Chapter',
                topicTitle: topic.title,
                difficulty: topic.difficulty,
                type: 'mcq',
                question: topic.practice.question,
                options: topic.practice.options,
                correctIndex: topic.practice.correctIndex,
                explanation: topic.practice.explanation,
                source: 'bookmark'
              });
            }
          }
        }
      }
    }

    // 3. Third priority: High-yield curriculum questions across topics
    const eligibleTopics = allTopics.filter((t) => !config?.subjectId || t.subjectId === config.subjectId);
    // Shuffle topics deterministically or randomly
    const shuffled = [...eligibleTopics].sort(() => 0.5 - Math.random());

    for (const topic of shuffled) {
      if (items.length >= targetSize) break;
      const key = `curric-${topic.id}`;
      if (usedKeys.has(key)) continue;

      const subject = NOTEBOOK_SUBJECTS.find((s) => s.id === topic.subjectId) || NOTEBOOK_SUBJECTS[0];
      const chapter = subject.chapters.find((c) => c.id === topic.chapterId);

      if (topic.practiceQuestions && topic.practiceQuestions.length > 0) {
        const q = topic.practiceQuestions[Math.floor(Math.random() * topic.practiceQuestions.length)];
        usedKeys.add(key);
        items.push({
          id: `rev-${topic.id}-${q.id}`,
          topicId: topic.id,
          subjectId: subject.id,
          subjectName: subject.name,
          chapterTitle: chapter?.title || 'Chapter',
          topicTitle: topic.title,
          difficulty: topic.difficulty,
          type: q.type === 'debugging' ? 'debugging' : q.type === 'output' ? 'output' : 'mcq',
          question: q.question,
          codeSnippet: q.codeSnippet,
          options: q.options,
          correctIndex: q.correctIndex,
          explanation: q.explanation,
          source: 'practice'
        });
      } else if (topic.practice) {
        usedKeys.add(key);
        items.push({
          id: `rev-${topic.id}-prc`,
          topicId: topic.id,
          subjectId: subject.id,
          subjectName: subject.name,
          chapterTitle: chapter?.title || 'Chapter',
          topicTitle: topic.title,
          difficulty: topic.difficulty,
          type: 'mcq',
          question: topic.practice.question,
          options: topic.practice.options,
          correctIndex: topic.practice.correctIndex,
          explanation: topic.practice.explanation,
          source: 'practice'
        });
      } else if (topic.definition) {
        // Conceptual Flashcard item
        usedKeys.add(key);
        items.push({
          id: `rev-${topic.id}-fc`,
          topicId: topic.id,
          subjectId: subject.id,
          subjectName: subject.name,
          chapterTitle: chapter?.title || 'Chapter',
          topicTitle: topic.title,
          difficulty: topic.difficulty,
          type: 'concept',
          question: `Core Principle Check: What is the fundamental mechanism of ${topic.title}?`,
          codeSnippet: topic.example?.code.split('\n').slice(0, 3).join('\n'),
          options: [
            topic.whyItMatters || topic.explanation[0] || 'Core architectural rule',
            'Arbitrary runtime decoration without hardware consequence',
            'Deprecated legacy syntax replaced in modern specifications',
            'Optional compiler suggestion that does not affect machine execution'
          ],
          correctIndex: 0,
          explanation: topic.definition + ' ' + (topic.important || ''),
          source: 'weak_topic'
        });
      }
    }

    return items;
  }
}

export const revisionEngine = new RevisionEngine();
