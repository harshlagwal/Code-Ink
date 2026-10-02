import { Subject, TopicContent, Chapter } from '../types/notebook';
import { C_CHAPTERS } from './cCurriculum';
import { C_FINAL_ASSESSMENT } from './cAssessment';
import { CPP_CHAPTERS } from './cppCurriculum';
import { CPP_FINAL_ASSESSMENT } from './cppAssessment';
import { PYTHON_CHAPTERS } from './pythonCurriculum';
import { PYTHON_FINAL_ASSESSMENT } from './pythonAssessment';
import { JAVASCRIPT_CHAPTERS } from './javascriptCurriculum';
import { JAVASCRIPT_FINAL_ASSESSMENT } from './javascriptAssessment';
import { JAVA_CHAPTERS } from './javaCurriculum';
import { JAVA_FINAL_ASSESSMENT } from './javaAssessment';
import { DSA_CHAPTERS } from './dsaCurriculum';
import { DSA_FINAL_ASSESSMENT } from './dsaAssessment';
import { C_QUESTION_PAPERS } from './questionPapers/cQuestionPapers';
import { CPP_QUESTION_PAPERS } from './questionPapers/cppQuestionPapers';
import { PYTHON_QUESTION_PAPERS } from './questionPapers/pythonQuestionPapers';
import { JAVASCRIPT_QUESTION_PAPERS } from './questionPapers/javascriptQuestionPapers';
import { JAVA_QUESTION_PAPERS } from './questionPapers/javaQuestionPapers';
import { DSA_QUESTION_PAPERS } from './questionPapers/dsaQuestionPapers';

export const NOTEBOOK_SUBJECTS: Subject[] = [
  {
    id: 'c',
    name: 'C Programming',
    category: 'programming',
    shortCode: 'C',
    shortName: 'C',
    tagline: 'The foundational language of systems, kernels & hardware interactions',
    iconName: 'Code2',
    color: '#2457D6',
    status: 'active',
    chapters: C_CHAPTERS,
    finalAssessment: C_FINAL_ASSESSMENT,
    questionPapers: C_QUESTION_PAPERS
  },
  {
    id: 'cpp',
    name: 'C++',
    category: 'programming',
    shortCode: 'C++',
    shortName: 'C++',
    tagline: 'High-performance systems programming with zero-cost abstractions and modern STL',
    iconName: 'Code2',
    color: '#00599C',
    status: 'active',
    chapters: CPP_CHAPTERS,
    finalAssessment: CPP_FINAL_ASSESSMENT,
    questionPapers: CPP_QUESTION_PAPERS
  },
  {
    id: 'python',
    name: 'Python',
    category: 'programming',
    shortCode: 'PY',
    shortName: 'Python',
    tagline: 'High-level, expressive language with dynamic typing, OOP, and batteries included',
    iconName: 'Code2',
    color: '#306998',
    status: 'active',
    chapters: PYTHON_CHAPTERS,
    finalAssessment: PYTHON_FINAL_ASSESSMENT,
    questionPapers: PYTHON_QUESTION_PAPERS
  },
  {
    id: 'js',
    name: 'JavaScript',
    category: 'programming',
    shortCode: 'JS',
    shortName: 'JavaScript',
    tagline: 'The asynchronous, event-driven language of the web platform, V8 engine and full-stack ecosystems',
    iconName: 'Code2',
    color: '#F7DF1E',
    status: 'active',
    chapters: JAVASCRIPT_CHAPTERS,
    finalAssessment: JAVASCRIPT_FINAL_ASSESSMENT,
    questionPapers: JAVASCRIPT_QUESTION_PAPERS
  },
  {
    id: 'java',
    name: 'Java',
    category: 'programming',
    shortCode: 'JAVA',
    shortName: 'Java',
    tagline: 'Write once, run anywhere — Enterprise OOP, JVM bytecode, and concurrent systems',
    iconName: 'Code2',
    color: '#E76F00',
    status: 'active',
    chapters: JAVA_CHAPTERS,
    finalAssessment: JAVA_FINAL_ASSESSMENT,
    questionPapers: JAVA_QUESTION_PAPERS
  },
  {
    id: 'dsa',
    name: 'Data Structures & Algorithms',
    category: 'cs',
    shortCode: 'DSA',
    shortName: 'DSA',
    tagline: 'Computational complexity, memory pointers, trees, graphs, and dynamic programming',
    iconName: 'Layers',
    color: '#8B5CF6',
    status: 'active',
    chapters: DSA_CHAPTERS,
    finalAssessment: DSA_FINAL_ASSESSMENT,
    questionPapers: DSA_QUESTION_PAPERS
  }
];

export function findTopicById(topicId: string): { topic: TopicContent; chapter: Chapter; subject: Subject } | null {
  for (const subject of NOTEBOOK_SUBJECTS) {
    for (const chapter of subject.chapters) {
      const topic = chapter.topics.find(t => t.id === topicId);
      if (topic) {
        return { topic, chapter, subject };
      }
    }
  }
  return null;
}

export function getAllTopicsOrdered(subject?: Subject): TopicContent[] {
  const topics: TopicContent[] = [];
  const subjectsToScan = subject ? [subject] : NOTEBOOK_SUBJECTS;
  for (const sub of subjectsToScan) {
    for (const chapter of sub.chapters) {
      for (const topic of chapter.topics) {
        topics.push(topic);
      }
    }
  }
  return topics;
}

export function searchNotebookContent(query: string): Array<{
  topic: TopicContent;
  subject: Subject;
  matchType: 'title' | 'definition' | 'concept' | 'code';
  preview: string;
}> {
  const results: Array<{
    topic: TopicContent;
    subject: Subject;
    matchType: 'title' | 'definition' | 'concept' | 'code';
    preview: string;
  }> = [];

  const q = query.toLowerCase().trim();
  if (!q) return results;

  for (const subject of NOTEBOOK_SUBJECTS) {
    for (const chapter of subject.chapters) {
      for (const topic of chapter.topics) {
        if (topic.title.toLowerCase().includes(q)) {
          results.push({
            topic,
            subject,
            matchType: 'title',
            preview: topic.definition.slice(0, 100) + '...'
          });
        } else if (topic.definition.toLowerCase().includes(q)) {
          results.push({
            topic,
            subject,
            matchType: 'definition',
            preview: topic.definition.slice(0, 120) + '...'
          });
        } else if (topic.explanation.some(e => e.toLowerCase().includes(q))) {
          const matchExpl = topic.explanation.find(e => e.toLowerCase().includes(q)) || '';
          results.push({
            topic,
            subject,
            matchType: 'concept',
            preview: matchExpl.slice(0, 120) + '...'
          });
        } else if (topic.example && topic.example.code.toLowerCase().includes(q)) {
          results.push({
            topic,
            subject,
            matchType: 'code',
            preview: `Code match in ${topic.title}: ${topic.example.code.split('\n')[0]}`
          });
        }
      }
    }
  }
  return results;
}

export const searchTopics = searchNotebookContent;
