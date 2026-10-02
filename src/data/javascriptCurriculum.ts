import { Chapter } from '../types/notebook';
import { JAVASCRIPT_CHAPTERS_PART1 } from './javascriptCurriculumPart1';
import { JAVASCRIPT_CHAPTERS_PART2 } from './javascriptCurriculumPart2';
import { JAVASCRIPT_CHAPTERS_PART3 } from './javascriptCurriculumPart3';

export const JAVASCRIPT_CHAPTERS: Chapter[] = [
  ...JAVASCRIPT_CHAPTERS_PART1,
  ...JAVASCRIPT_CHAPTERS_PART2,
  ...JAVASCRIPT_CHAPTERS_PART3
];
