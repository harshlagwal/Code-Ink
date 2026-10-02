import { SubjectQuestionPapers } from '../../types/notebook';
import { C_QUESTION_PAPERS } from './cQuestionPapers';
import { CPP_QUESTION_PAPERS } from './cppQuestionPapers';
import { PYTHON_QUESTION_PAPERS } from './pythonQuestionPapers';
import { JAVASCRIPT_QUESTION_PAPERS } from './javascriptQuestionPapers';
import { JAVA_QUESTION_PAPERS } from './javaQuestionPapers';
import { DSA_QUESTION_PAPERS } from './dsaQuestionPapers';

export const ALL_QUESTION_PAPERS: Record<string, SubjectQuestionPapers> = {
  c: C_QUESTION_PAPERS,
  cpp: CPP_QUESTION_PAPERS,
  python: PYTHON_QUESTION_PAPERS,
  javascript: JAVASCRIPT_QUESTION_PAPERS,
  js: JAVASCRIPT_QUESTION_PAPERS,
  java: JAVA_QUESTION_PAPERS,
  dsa: DSA_QUESTION_PAPERS
};

export function getSubjectQuestionPapers(subjectId: string): SubjectQuestionPapers {
  return ALL_QUESTION_PAPERS[subjectId] || C_QUESTION_PAPERS;
}

export {
  C_QUESTION_PAPERS,
  CPP_QUESTION_PAPERS,
  PYTHON_QUESTION_PAPERS,
  JAVASCRIPT_QUESTION_PAPERS,
  JAVA_QUESTION_PAPERS,
  DSA_QUESTION_PAPERS
};
