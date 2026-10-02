// CODEINK V2 — Mistake Notebook Engine
// Automatically collects and tracks incorrect practice questions.
// Persists locally via PersistenceEngine.

import { MistakeRecord, Difficulty } from '../types/notebook';
import { persistenceEngine } from './PersistenceEngine';

const STORAGE_KEY = 'codeink_mistakes';

// Default initial sample mistakes so student immediately understands the system
const INITIAL_MISTAKES: MistakeRecord[] = [
  {
    id: 'mst-init-1',
    subject: 'C',
    subjectId: 'c',
    chapter: 'Pointers & Memory Architecture',
    chapterNumber: 4,
    topic: 'Pointer Arithmetic & Scaling Factor',
    topicId: 'c-pointers',
    question: 'If ptr is an int* pointing to 0x1000 on a 64-bit architecture, what is ptr + 2?',
    questionId: 'p-c-pointers',
    userAnswer: '0x1002 (Adds raw numerical offset 2)',
    correctAnswer: '0x1008 (Scaled by sizeof(int) = 4 bytes: 0x1000 + 2*4)',
    options: ['0x1002', '0x1004', '0x1008', '0x1016'],
    explanation: 'Pointer arithmetic automatically scales offsets by sizeof(type). Since sizeof(int) is 4 bytes, ptr + 2 advances by 2 * 4 = 8 bytes.',
    difficulty: 'intermediate',
    timestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
    retryCount: 1,
    resolved: false
  },
  {
    id: 'mst-init-2',
    subject: 'JavaScript',
    subjectId: 'js',
    chapter: 'JavaScript Foundations & V8 Architecture',
    chapterNumber: 1,
    topic: 'V8 Engine Pipeline & Just-In-Time Compilation',
    topicId: 'js-v8-pipeline',
    question: 'What is the exact output of typeof null in JavaScript?',
    questionId: 'js-ch01-q2',
    userAnswer: '"null"',
    correctAnswer: '"object"',
    options: ['"null"', '"undefined"', '"object"', '"symbol"'],
    explanation: 'In the original 31-bit JavaScript type tagging system, object pointers carried tag 000. Since null is represented as NULL pointer (0x00), typeof null evaluates to "object".',
    difficulty: 'beginner',
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    retryCount: 2,
    resolved: false
  }
];

class MistakeEngine {
  private mistakes: MistakeRecord[] = [];
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.mistakes = persistenceEngine.getSync<MistakeRecord[]>(STORAGE_KEY, INITIAL_MISTAKES);
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify(): void {
    this.listeners.forEach((fn) => fn());
    persistenceEngine.save(STORAGE_KEY, this.mistakes);
  }

  public getAll(): MistakeRecord[] {
    return [...this.mistakes];
  }

  public getById(id: string): MistakeRecord | undefined {
    return this.mistakes.find((m) => m.id === id);
  }

  public addMistake(entry: {
    subject: string;
    subjectId: string;
    chapter: string;
    chapterNumber?: number;
    topic: string;
    topicId: string;
    question: string;
    questionId?: string;
    userAnswer: string;
    correctAnswer: string;
    options?: string[];
    explanation: string;
    difficulty?: Difficulty;
    codeSnippet?: string;
  }): MistakeRecord {
    // Check if mistake on same question already exists
    const existing = this.mistakes.find(
      (m) =>
        (entry.questionId && m.questionId === entry.questionId) ||
        (m.topicId === entry.topicId && m.question === entry.question)
    );

    if (existing) {
      existing.retryCount += 1;
      existing.userAnswer = entry.userAnswer;
      existing.timestamp = new Date().toISOString();
      existing.resolved = false;
      this.notify();
      return existing;
    }

    const newMistake: MistakeRecord = {
      id: 'mst-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      subject: entry.subject,
      subjectId: entry.subjectId,
      chapter: entry.chapter,
      chapterNumber: entry.chapterNumber,
      topic: entry.topic,
      topicId: entry.topicId,
      question: entry.question,
      questionId: entry.questionId,
      userAnswer: entry.userAnswer,
      correctAnswer: entry.correctAnswer,
      options: entry.options,
      explanation: entry.explanation,
      difficulty: entry.difficulty || 'intermediate',
      timestamp: new Date().toISOString(),
      retryCount: 0,
      resolved: false,
      codeSnippet: entry.codeSnippet
    };

    this.mistakes.unshift(newMistake);
    this.notify();
    return newMistake;
  }

  public markResolved(id: string, resolved = true): void {
    const item = this.mistakes.find((m) => m.id === id);
    if (item) {
      item.resolved = resolved;
      this.notify();
    }
  }

  public recordRetry(id: string, wasCorrect: boolean): void {
    const item = this.mistakes.find((m) => m.id === id);
    if (item) {
      item.retryCount += 1;
      if (wasCorrect) {
        item.resolved = true;
      }
      this.notify();
    }
  }

  public removeMistake(id: string): void {
    this.mistakes = this.mistakes.filter((m) => m.id !== id);
    this.notify();
  }

  public getStats() {
    const total = this.mistakes.length;
    const resolved = this.mistakes.filter((m) => m.resolved).length;
    const unresolved = this.mistakes.filter((m) => !m.resolved);
    const stillLearning = unresolved.filter((m) => m.retryCount <= 1).length;
    const needsReview = unresolved.filter((m) => m.retryCount > 1).length;

    return {
      total,
      resolved,
      active: unresolved.length,
      stillLearning,
      needsReview
    };
  }
}

export const mistakeEngine = new MistakeEngine();
