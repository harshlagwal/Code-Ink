import { NOTEBOOK_SUBJECTS } from './notebookData';
import { DEV_TOOLS } from './toolsData';

export const landingStats = {
  subjects: NOTEBOOK_SUBJECTS.length,
  topics: NOTEBOOK_SUBJECTS.reduce(
    (acc, s) => acc + s.chapters.reduce((sum, c) => sum + c.topics.length, 0),
    0
  ),
  tools: DEV_TOOLS.length,
  papers: NOTEBOOK_SUBJECTS.length * 3, // 6 subjects * 3 official exam paper sets (A, B, C)
};

export const subjectCards = NOTEBOOK_SUBJECTS.map((s) => ({
  id: s.id,
  name: s.name,
  shortCode: s.shortCode,
  tagline: s.tagline,
  topics: s.chapters.reduce((sum, c) => sum + c.topics.length, 0),
  chapters: s.chapters.length,
}));
