// CODEINK V2 — Dashboard Engine
// Calculates real, transparent engineering learning metrics without arbitrary black-box scoring.
// Computes subject-by-subject telemetry and deterministic "Needs Revision" topics.

import { NOTEBOOK_SUBJECTS, getAllTopicsOrdered } from '../data/notebookData';
import { Subject, TopicContent } from '../types/notebook';
import { mistakeEngine } from './MistakeEngine';

export interface SubjectLearningStats {
  subjectId: string;
  subjectName: string;
  shortCode: string;
  totalTopics: number;
  topicsCompleted: number;
  topicsMastered: number;
  practiceCompleted: number;
  flashcardsMastered: number;
  totalFlashcards: number;
  activeMistakes: number;
  resolvedMistakes: number;
  revisionRequiredCount: number;
  completionPercentage: number;
}

export interface NeedsRevisionItem {
  topicId: string;
  subjectId: string;
  subjectName: string;
  topicTitle: string;
  pageNumber: number;
  reason: string;
  severity: 'high' | 'medium';
  mistakeCount: number;
}

export interface GlobalDashboardMetrics {
  totalTopics: number;
  topicsCompleted: number;
  topicsMastered: number;
  overallPercentage: number;
  practiceCompleted: number;
  flashcardsReviewed: number;
  flashcardsMastered: number;
  totalMistakes: number;
  mistakesResolved: number;
  activeMistakesCount: number;
  subjectStats: SubjectLearningStats[];
  needsRevisionTopics: NeedsRevisionItem[];
}

class DashboardEngine {
  public computeMetrics(
    completedTopicIds: string[],
    bookmarkedTopicIds: string[],
    userNotes: Record<string, string>
  ): GlobalDashboardMetrics {
    const allTopics = getAllTopicsOrdered();
    const mistakes = mistakeEngine.getAll();
    const unresolvedMistakes = mistakes.filter((m) => !m.resolved);
    const resolvedMistakes = mistakes.filter((m) => m.resolved);

    let totalMastered = 0;
    let totalPracticeDone = 0;
    let totalFlashcardsMastered = 0;
    let totalFlashcardsReviewed = 0;
    const needsRevisionList: NeedsRevisionItem[] = [];

    const subjectStats: SubjectLearningStats[] = NOTEBOOK_SUBJECTS.map((subject) => {
      const subTopics = subject.chapters.flatMap((c) => c.topics);
      const subCompleted = subTopics.filter((t) => completedTopicIds.includes(t.id));
      
      // Flashcards state from localStorage
      let subFlashcardState: Record<string, string> = {};
      try {
        const raw = localStorage.getItem(`codeink_flashcards_${subject.id}`);
        if (raw) subFlashcardState = JSON.parse(raw);
      } catch {
        // ignore
      }

      const fcMastered = Object.values(subFlashcardState).filter((v) => v === 'mastered').length;
      const fcReviewed = Object.values(subFlashcardState).filter((v) => v === 'mastered' || v === 'review').length;
      totalFlashcardsMastered += fcMastered;
      totalFlashcardsReviewed += fcReviewed;

      // Subject mistakes
      const subActiveMistakes = unresolvedMistakes.filter((m) => m.subjectId === subject.id);
      const subResolvedMistakes = resolvedMistakes.filter((m) => m.subjectId === subject.id);

      // A topic is "Mastered" if it is marked completed AND has no active mistakes AND (its flashcard is mastered OR completed cleanly)
      let subMasteredCount = 0;
      let subPracticeCount = 0;
      let subRevisionCount = 0;

      subTopics.forEach((topic) => {
        const isCompleted = completedTopicIds.includes(topic.id);
        const topicMistakes = subActiveMistakes.filter((m) => m.topicId === topic.id);
        const cardStatus = subFlashcardState[`fc-${topic.id}`];

        if (isCompleted) {
          subPracticeCount += 1;
        }

        if (isCompleted && topicMistakes.length === 0 && cardStatus === 'mastered') {
          subMasteredCount += 1;
        } else if (isCompleted && topicMistakes.length === 0 && !cardStatus) {
          // completed without issue
          subMasteredCount += 1;
        }

        // Needs Revision Detection criteria:
        // 1. Unresolved mistake (High severity)
        if (topicMistakes.length > 0) {
          subRevisionCount += 1;
          needsRevisionList.push({
            topicId: topic.id,
            subjectId: subject.id,
            subjectName: subject.name,
            topicTitle: topic.title,
            pageNumber: topic.pageNumber,
            reason: `${topicMistakes.length} unresolved mistake in practice ledger`,
            severity: 'high',
            mistakeCount: topicMistakes.length
          });
        }
        // 2. Card flagged for review
        else if (cardStatus === 'review' || cardStatus === 'learning') {
          subRevisionCount += 1;
          needsRevisionList.push({
            topicId: topic.id,
            subjectId: subject.id,
            subjectName: subject.name,
            topicTitle: topic.title,
            pageNumber: topic.pageNumber,
            reason: `Leitner flashcard marked '${cardStatus}'`,
            severity: 'medium',
            mistakeCount: 0
          });
        }
        // 3. Bookmarked topic not yet completed
        else if (bookmarkedTopicIds.includes(topic.id) && !isCompleted) {
          subRevisionCount += 1;
          needsRevisionList.push({
            topicId: topic.id,
            subjectId: subject.id,
            subjectName: subject.name,
            topicTitle: topic.title,
            pageNumber: topic.pageNumber,
            reason: 'Bookmarked for deep study, reading pending',
            severity: 'medium',
            mistakeCount: 0
          });
        }
      });

      totalMastered += subMasteredCount;
      totalPracticeDone += subPracticeCount;

      const pct = subTopics.length > 0 ? Math.round((subCompleted.length / subTopics.length) * 100) : 0;

      return {
        subjectId: subject.id,
        subjectName: subject.name,
        shortCode: subject.shortCode,
        totalTopics: subTopics.length,
        topicsCompleted: subCompleted.length,
        topicsMastered: subMasteredCount,
        practiceCompleted: subPracticeCount,
        flashcardsMastered: fcMastered,
        totalFlashcards: subTopics.length,
        activeMistakes: subActiveMistakes.length,
        resolvedMistakes: subResolvedMistakes.length,
        revisionRequiredCount: subRevisionCount,
        completionPercentage: pct
      };
    });

    const totalTopics = allTopics.length;
    const overallPercentage = totalTopics > 0 ? Math.round((completedTopicIds.length / totalTopics) * 100) : 0;

    return {
      totalTopics,
      topicsCompleted: completedTopicIds.length,
      topicsMastered: totalMastered,
      overallPercentage,
      practiceCompleted: totalPracticeDone,
      flashcardsReviewed: totalFlashcardsReviewed,
      flashcardsMastered: totalFlashcardsMastered,
      totalMistakes: mistakes.length,
      mistakesResolved: resolvedMistakes.length,
      activeMistakesCount: unresolvedMistakes.length,
      subjectStats,
      needsRevisionTopics: needsRevisionList.slice(0, 15) // Top 15 prioritised
    };
  }
}

export const dashboardEngine = new DashboardEngine();
