import { Chapter } from '../types/notebook';
import { OS_CHAPTERS_PART1 } from './osCurriculumPart1';
import { OS_CHAPTERS_PART2 } from './osCurriculumPart2';
import { OS_CHAPTERS_PART3 } from './osCurriculumPart3';

export const OS_CHAPTERS: Chapter[] = [
  ...OS_CHAPTERS_PART1,
  ...OS_CHAPTERS_PART2,
  ...OS_CHAPTERS_PART3
];
