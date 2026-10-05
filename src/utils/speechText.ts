import type { TopicContent } from '../types/notebook';

/**
 * Strip code fences, markdown tags, and raw symbol soup so the speech reader
 * speaks fluent, natural human language.
 */
export function sanitizeForSpeech(input: string): string {
  return input
    .replace(/```[\s\S]*?```/g, ' code example omitted. ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#*_>`~|]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Build a natural, structured narration of a topic.
 * Follows educational flow: Title -> Definition -> Explanation -> Why it matters -> Key Takeaways -> Common Mistakes.
 */
export function topicToSpeech(t: TopicContent): string {
  const parts: string[] = [];
  if (t.title) parts.push(`${t.title}.`);
  if (t.definition) parts.push(t.definition);
  if (t.explanation?.length) parts.push(t.explanation.join(' '));
  if (t.whyItMatters) parts.push(`Why it matters. ${t.whyItMatters}`);
  if (t.important) parts.push(`Important note. ${t.important}`);
  if (t.tip) parts.push(`Pro tip. ${t.tip}`);
  if (t.interviewNote) parts.push(`Interview perspective. ${t.interviewNote}`);
  if (t.commonMistakes?.length) {
    parts.push(`Common traps and mistakes to avoid. ${t.commonMistakes.join(' ')}`);
  }
  return sanitizeForSpeech(parts.filter(Boolean).join(' '));
}
