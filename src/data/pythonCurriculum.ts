import { Chapter } from '../types/notebook';
import { PYTHON_CHAPTERS_PART1 } from './pythonCurriculumPart1';
import { PYTHON_CHAPTERS_PART2 } from './pythonCurriculumPart2';
import { PYTHON_CHAPTERS_PART3 } from './pythonCurriculumPart3';

export const PYTHON_CHAPTERS: Chapter[] = [
  ...PYTHON_CHAPTERS_PART1,
  ...PYTHON_CHAPTERS_PART2,
  ...PYTHON_CHAPTERS_PART3
];
