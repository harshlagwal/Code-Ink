export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export type CategoryId = 'programming' | 'cs' | 'web';

export type HighlightColor = 'green' | 'blue' | 'yellow' | 'red';
export type HighlightTool = HighlightColor | 'eraser';

export interface UserHighlight {
  id: string;
  topicId: string;
  text: string;
  color: HighlightColor;
  pageId?: string;
  createdAt: string;
}

export interface PracticeQuestionItem {
  id: string;
  type: 'mcq' | 'output' | 'debugging' | 'true_false';
  question: string;
  codeSnippet?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface PracticeQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface CodeAnnotation {
  line: number;
  label: string;
  type?: 'blue' | 'yellow' | 'red' | 'green';
}

export interface CodeSnippet {
  language: string;
  code: string;
  output?: string;
  annotations?: CodeAnnotation[];
}

export interface DiagramData {
  type: 'memory' | 'flow' | 'pipeline' | 'tree' | 'pointer' | 'custom';
  title: string;
  subtitle?: string;
  elements: Array<{
    id: string;
    label: string;
    sublabel?: string;
    value?: string;
    address?: string;
    status?: 'active' | 'referenced' | 'warning' | 'normal';
    arrowTo?: string;
  }>;
}

export interface TopicContent {
  id: string;
  subjectId: string;
  chapterId: string;
  chapterNumber: number;
  pageNumber: number;
  title: string;
  difficulty: Difficulty;
  definition: string;
  explanation: string[];
  whyItMatters?: string;
  syntax?: string;
  example?: CodeSnippet;
  diagram?: DiagramData;
  important?: string;
  commonMistakes?: string[];
  tip?: string;
  interviewNote?: string;
  practice?: PracticeQuestion;
  practiceQuestions?: PracticeQuestionItem[];
  relatedTopics?: string[];
}

export interface Chapter {
  id: string;
  number: number;
  title: string;
  description: string;
  topics: TopicContent[];
}

export interface AssessmentQuestion {
  id: string;
  section: 'A' | 'B' | 'C';
  marks: number;
  topic: string;
  question: string;
  codeSnippet?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface FinalAssessment {
  subjectId: string;
  title: string;
  durationMinutes: number;
  totalMarks: number;
  totalQuestions: number;
  sections: {
    sectionA: {
      title: string;
      count: number;
      marksPerQuestion: number;
      totalMarks: number;
      questions: AssessmentQuestion[];
    };
    sectionB: {
      title: string;
      count: number;
      marksPerQuestion: number;
      totalMarks: number;
      questions: AssessmentQuestion[];
    };
    sectionC: {
      title: string;
      count: number;
      marksPerQuestion: number;
      totalMarks: number;
      questions: AssessmentQuestion[];
    };
  };
}

export interface QuestionPaperItem {
  id: string;
  qNum: number;
  section: 'A' | 'B' | 'C';
  marks: number;
  topic: string;
  question: string;
  codeSnippet?: string;
  markingBreakdown?: string[];
  modelSolution: string;
  notebookCheckpoints?: string[];
}

export interface QuestionPaperSection {
  title: string;
  instruction: string;
  totalQuestions: number;
  attemptCount: number;
  marksPerQuestion: number;
  totalMarks: number;
  questions: QuestionPaperItem[];
}

export interface QuestionPaperSet {
  setId: 'set-1' | 'set-2' | 'set-3';
  setName: string;
  paperCode: string;
  title: string;
  academicSession: string;
  totalMarks: 50;
  durationMinutes: 120;
  instructions: string[];
  sections: {
    sectionA: QuestionPaperSection;
    sectionB: QuestionPaperSection;
    sectionC: QuestionPaperSection;
  };
}

export interface SubjectQuestionPapers {
  subjectId: string;
  subjectName: string;
  courseCode: string;
  sets: {
    'set-1': QuestionPaperSet;
    'set-2': QuestionPaperSet;
    'set-3': QuestionPaperSet;
  };
}

export interface Subject {
  id: string;
  name: string;
  category: CategoryId;
  shortCode: string;
  shortName?: string;
  tagline: string;
  iconName: string;
  color: string;
  chapters: Chapter[];
  finalAssessment?: FinalAssessment;
  questionPapers?: SubjectQuestionPapers;
  status?: 'active' | 'coming_soon';
}

export interface UserNote {
  topicId: string;
  content: string;
  updatedAt: string;
}

export type StickyColor = 'yellow' | 'pink' | 'mint' | 'sky';

export interface StickyNote {
  id: string;
  topicId: string;
  color: StickyColor;
  title: string;
  content: string;
  createdAt: string;
  pageSide: 'left' | 'right';
}

export interface FlashcardItem {
  id: string;
  topicId: string;
  subjectId: string;
  chapterNumber: number;
  question: string;
  codeSnippet?: string;
  answer: string;
  keyPoints: string[];
  complexity?: {
    time: string;
    space: string;
  };
}

export type PaperStyle = 'ruled' | 'grid' | 'plain';

export interface MistakeRecord {
  id: string;
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
  difficulty: Difficulty;
  timestamp: string;
  retryCount: number;
  resolved: boolean;
  codeSnippet?: string;
}

export type SearchResultType =
  | 'subject'
  | 'chapter'
  | 'topic'
  | 'concept'
  | 'code'
  | 'practice'
  | 'bookmark'
  | 'note'
  | 'mistake'
  | 'flashcard';

export interface UnifiedSearchResult {
  id: string;
  topicId: string;
  subjectId: string;
  subjectName: string;
  chapterTitle: string;
  topicTitle: string;
  resultType: SearchResultType;
  title: string;
  snippet: string;
  pageNumber?: number;
}

export type RevisionQuestionType =
  | 'concept'
  | 'mcq'
  | 'output'
  | 'debugging'
  | 'complexity'
  | 'flashcard';

export interface RevisionItem {
  id: string;
  topicId: string;
  subjectId: string;
  subjectName: string;
  chapterTitle: string;
  topicTitle: string;
  difficulty: Difficulty;
  type: RevisionQuestionType;
  question: string;
  codeSnippet?: string;
  options?: string[];
  correctIndex?: number;
  correctAnswer?: string;
  explanation: string;
  source: 'mistake' | 'flashcard' | 'weak_topic' | 'bookmark' | 'practice';
}

