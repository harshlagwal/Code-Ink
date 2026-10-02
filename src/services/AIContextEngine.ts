// CODEINK V2 — AI Context Engine
// Prepares clean, safe, sanitized AI study prompts with current notebook context.
// Strictly offline prompt synthesis — never sends private keys, passwords, or full notebooks.

import { Subject, TopicContent } from '../types/notebook';

export type AIStudyAction =
  | 'explain_simply'
  | 'give_example'
  | 'debug_code'
  | 'quiz_me'
  | 'explain_diagram'
  | 'compare_languages'
  | 'interview_question';

export interface AIContextOptions {
  subject: Subject;
  chapterTitle: string;
  topic: TopicContent;
  action: AIStudyAction;
  customQuery?: string;
  codeSnippet?: string;
  practiceQuestion?: string;
}

class AIContextEngine {
  public generatePrompt(opts: AIContextOptions): string {
    const { subject, chapterTitle, topic, action, customQuery, codeSnippet, practiceQuestion } = opts;

    let actionInstruction = '';
    switch (action) {
      case 'explain_simply':
        actionInstruction =
          'Explain this concept in plain, simple English with an intuitive real-world analogy. Avoid unnecessary jargon, and show what is happening in computer memory.';
        break;
      case 'give_example':
        actionInstruction =
          'Provide a practical, real-world engineering code example that demonstrates where and why this is used in production systems.';
        break;
      case 'debug_code':
        actionInstruction =
          'Analyze the provided code example for edge cases, potential memory leaks, buffer overflows, undefined behavior, or logic bugs. Explain how to fix each issue.';
        break;
      case 'quiz_me':
        actionInstruction =
          'Create 3 challenging technical interview questions (including 1 output prediction question) on this topic with clear step-by-step explanations.';
        break;
      case 'explain_diagram':
        actionInstruction =
          'Describe the exact mental model and step-by-step memory diagram (stack, heap, CPU registers, pointer arrows) representing this concept in ASCII or clean text format.';
        break;
      case 'compare_languages':
        actionInstruction =
          `Compare how this concept is implemented in ${subject.name} versus other major languages (e.g. C, C++, Python, JavaScript, Java, Go, Rust), highlighting memory management, safety, and runtime speed tradeoffs.`;
        break;
      case 'interview_question':
        actionInstruction =
          'Act as a Senior FAANG/Systems Staff Engineer interviewing me. Ask an in-depth systems design / coding question about this concept and outline the expected optimal solution.';
        break;
      default:
        actionInstruction = 'Provide a thorough engineering explanation of this topic.';
    }

    if (customQuery && customQuery.trim()) {
      actionInstruction = `${actionInstruction}\n\nStudent's Specific Question:\n"${customQuery.trim()}"`;
    }

    // Assemble safe, sanitized notebook context block
    const sanitizedDefinition = topic.definition.trim();
    const sanitizedExplanation = (topic.explanation || []).join('\n').trim();
    const activeCode = codeSnippet || topic.example?.code || '';

    return `You are an expert Computer Science professor and Systems Engineer tutoring a student using the CODEINK Engineering Notebook.

SUBJECT: ${subject.name} (${subject.shortCode})
CHAPTER: ${chapterTitle}
TOPIC: ${topic.title}
DIFFICULTY: ${topic.difficulty.toUpperCase()}

NOTEBOOK CONTEXT:
Definition: ${sanitizedDefinition}

Engineering Notes:
${sanitizedExplanation}
${topic.whyItMatters ? `\nWhy It Matters: ${topic.whyItMatters}` : ''}
${topic.important ? `\nCritical Takeaway: ${topic.important}` : ''}
${activeCode ? `\nCode Snippet:\n\`\`\`${topic.example?.language || subject.id}\n${activeCode}\n\`\`\`` : ''}
${practiceQuestion ? `\nAssociated Practice Question:\n${practiceQuestion}` : ''}

TASK FOR AI:
${actionInstruction}

Please provide clear, structured, and technically accurate guidance.`;
  }

  public getChatGPTUrl(prompt: string): string {
    return `https://chatgpt.com/?q=${encodeURIComponent(prompt)}`;
  }

  public getGeminiUrl(): string {
    return `https://gemini.google.com/app`;
  }

  public getGrokUrl(prompt: string): string {
    return `https://x.com/i/grok?text=${encodeURIComponent(prompt)}`;
  }
}

export const aiContextEngine = new AIContextEngine();
