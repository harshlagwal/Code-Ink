import { Chapter } from '../types/notebook';
import { DBMS_CHAPTERS_PART1 } from './dbmsCurriculumPart1';
import { DBMS_CHAPTERS_PART2 } from './dbmsCurriculumPart2';

export const DBMS_CHAPTERS: Chapter[] = [
  ...DBMS_CHAPTERS_PART1,
  ...DBMS_CHAPTERS_PART2
];
