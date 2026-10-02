import { Chapter } from '../types/notebook';
import { JAVA_CHAPTERS_PART1 } from './javaCurriculumPart1';
import { JAVA_CHAPTERS_PART2 } from './javaCurriculumPart2';
import { JAVA_CHAPTERS_PART3 } from './javaCurriculumPart3';

export const JAVA_CHAPTERS: Chapter[] = [
  ...JAVA_CHAPTERS_PART1,
  ...JAVA_CHAPTERS_PART2,
  ...JAVA_CHAPTERS_PART3
];
