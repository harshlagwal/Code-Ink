// High-Performance Zero-Config Multi-Language Online Compiler Service
// Provides real GCC 13, G++ 13, OpenJDK 21, and Python 3.12 execution directly in browser.
// 100% Free, zero external API keys needed, zero user signup, CORS supported out of the box.
import { sanitizeCode, sanitizeStdin, compilerRateLimiter } from '../utils/security';

export interface OnlineCompilerResult {
  success: boolean;
  output: string;
  hasError: boolean;
  durationMs: number;
  engine: string;
  isOfflineFallback?: boolean;
}

interface CompilerConfig {
  compiler: string;
  engineName: string;
  defaultFilename: string;
}

const COMPILER_MAP: Record<string, CompilerConfig> = {
  c: {
    compiler: 'gcc-13.2.0-c',
    engineName: 'GCC 13.2',
    defaultFilename: 'main.c'
  },
  cpp: {
    compiler: 'gcc-13.2.0',
    engineName: 'G++ 13.2 (C++20)',
    defaultFilename: 'main.cpp'
  },
  'c++': {
    compiler: 'gcc-13.2.0',
    engineName: 'G++ 13.2 (C++20)',
    defaultFilename: 'main.cpp'
  },
  java: {
    compiler: 'openjdk-jdk-21+35',
    engineName: 'OpenJDK 21 HotSpot',
    defaultFilename: 'prog.java'
  },
  python: {
    compiler: 'cpython-3.12.7',
    engineName: 'Python 3.12',
    defaultFilename: 'main.py'
  },
  py: {
    compiler: 'cpython-3.12.7',
    engineName: 'Python 3.12',
    defaultFilename: 'main.py'
  }
};

/**
 * Checks whether the given language can be compiled with the real online runner
 */
export function isLanguageSupportedOnline(language: string): boolean {
  const norm = language.toLowerCase().trim();
  return Boolean(COMPILER_MAP[norm]);
}

/**
 * Preprocesses code for single-file compilation environments.
 * — C: Auto-injects headers and wraps snippets without main() inside int main(void) { ... }
 *      so that file-scope statement errors (e.g. printf outside main) never happen.
 * — C++: Auto-injects standard STL headers, separates function definitions from statements,
 *        and provides an execution harness for snippets.
 * — Java: Strips 'public class' (to avoid filename conflicts) and wraps bare snippets
 *         into a canonical 'class Prog { public static void main(String[] args) { ... } }'.
 * — Python: Clean execution directly at top-level.
 */
function preprocessCode(code: string, lang: string): string {
  const norm = lang.toLowerCase().trim();

  // 1. C Preprocessing
  if (norm === 'c') {
    let processed = code.trim();
    const hasMain = /\bmain\s*\(/.test(processed);

    if (hasMain) {
      if (!processed.includes('#include')) {
        processed = `#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <math.h>\n#include <stdbool.h>\n#include <stdint.h>\n\n${processed}`;
      }
      return processed;
    }

    // Code does NOT have main(). Separate preprocessor directives from executable statements.
    const lines = processed.split('\n');
    const directives: string[] = [];
    const bodyLines: string[] = [];

    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith('#include') || trimmed.startsWith('#define') || trimmed.startsWith('#pragma')) {
        directives.push(line);
      } else {
        bodyLines.push(line);
      }
    }

    if (!directives.some(d => d.includes('<stdio.h>'))) {
      directives.unshift('#include <stdio.h>');
      directives.push('#include <stdlib.h>');
      directives.push('#include <string.h>');
      directives.push('#include <math.h>');
      directives.push('#include <stdbool.h>');
      directives.push('#include <stdint.h>');
    }

    const body = bodyLines.join('\n');
    return `${directives.join('\n')}\n\nint main(void) {\n${body}\n    return 0;\n}`;
  }

  // 2. C++ Preprocessing
  if (norm === 'cpp' || norm === 'c++') {
    let processed = code.trim();
    const hasMain = /\bmain\s*\(/.test(processed);

    if (hasMain) {
      if (!processed.includes('#include')) {
        processed = `#include <bits/stdc++.h>\nusing namespace std;\n\n${processed}`;
      }
      return processed;
    }

    // Snippet without main(): separate directives, top-level functions, and statements
    const lines = processed.split('\n');
    const directives: string[] = [];
    const bodyLines: string[] = [];

    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith('#include') || trimmed.startsWith('#define') || trimmed.startsWith('using namespace') || trimmed.startsWith('#pragma')) {
        directives.push(line);
      } else {
        bodyLines.push(line);
      }
    }

    if (!directives.some(d => d.includes('<iostream>') || d.includes('<bits/stdc++.h>'))) {
      directives.unshift('#include <bits/stdc++.h>');
      directives.push('using namespace std;');
    }

    const body = bodyLines.join('\n');

    // In C++, functions cannot be nested inside main().
    // If the body is a function or class definition (e.g. DSA solution), keep at top level and add driver main()
    const hasFunctionDef = /^[ \t]*(?:(?:inline|static|constexpr|const|void|int|long|double|float|bool|string|auto|vector<[^>]+>)\s+)+[A-Za-z0-9_]+\s*\([^)]*\)\s*\{/m.test(body);
    const hasClassDef = /\bclass\s+[A-Za-z0-9_]+|\bstruct\s+[A-Za-z0-9_]+/.test(body);

    if (hasFunctionDef || hasClassDef) {
      return `${directives.join('\n')}\n\n${body}\n\nint main() {\n    cout << "[Compiled & verified cleanly. Add test driver in main() to run.]" << endl;\n    return 0;\n}`;
    }

    // Bare statements: wrap inside main()
    return `${directives.join('\n')}\n\nint main() {\n${body}\n    return 0;\n}`;
  }

  // 3. Java Preprocessing
  if (norm === 'java') {
    let processed = code.replace(/\bpublic\s+class\s+/g, 'class ');
    const hasClass = /\bclass\s+[A-Za-z0-9_]+/.test(processed);
    const hasMain = /\bpublic\s+static\s+void\s+main\s*\(/.test(processed);

    if (hasClass && hasMain) {
      return processed;
    }

    if (!hasClass) {
      return `import java.util.*;\nimport java.io.*;\n\nclass Prog {\n    public static void main(String[] args) {\n${processed}\n    }\n}`;
    }

    // Has class but missing main method
    return processed;
  }

  // 4. Python & other languages
  return code;
}



/**
 * Executes C, C++, Java, or Python code using the public compiler engine
 * with an automatic 10-second timeout.
 */
export async function executeOnlineCode(
  rawCode: string,
  rawLanguage: string,
  stdin: string = ''
): Promise<OnlineCompilerResult> {
  const startTime = performance.now();
  const lang = rawLanguage.toLowerCase().trim();
  const config = COMPILER_MAP[lang];

  if (!config) {
    throw new Error(`Language '${rawLanguage}' is not mapped to an online compiler.`);
  }

  // Security: rate-limit to prevent Wandbox API abuse
  if (!compilerRateLimiter.allow()) {
    const wait = Math.ceil(compilerRateLimiter.remainingMs() / 1000);
    throw new Error(`Please wait ${wait}s before running code again.`);
  }

  // Security: enforce max payload sizes to prevent API abuse
  const { code: safeCode, truncated } = sanitizeCode(rawCode);
  if (truncated) {
    console.warn('[CodeInk Security] Code payload truncated to 50,000 characters.');
  }
  const safeStdin = sanitizeStdin(stdin);

  const processedCode = preprocessCode(safeCode, lang);

  // Set 10s timeout to protect user experience if network is slow
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch('https://wandbox.org/api/compile.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      signal: controller.signal,
      body: JSON.stringify({
        compiler: config.compiler,
        code: processedCode,
        stdin: safeStdin || '',
        save: false
      })
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Compiler service returned HTTP ${response.status}`);
    }

    const data = await response.json();
    const duration = Math.max(0.5, Number((performance.now() - startTime).toFixed(1)));

    const isSuccess = data.status === '0';
    let outputText = '';

    if (isSuccess) {
      outputText = data.program_output || '';
      // If program printed nothing to stdout, provide helpful feedback
      if (!outputText.trim()) {
        outputText = '(Program executed cleanly with 0 stdout output)';
      }
      // If there were non-fatal compiler warnings, append them
      if (data.compiler_error && data.compiler_error.trim()) {
        outputText = `[Compiler Warnings]\n${data.compiler_error.trim()}\n\n[Program Output]\n${outputText}`;
      }
    } else {
      // Compilation error or runtime exception
      const errorMsg = (data.compiler_error || data.program_error || data.compiler_message || data.program_message || 'Execution failed').trim();
      outputText = errorMsg;
    }

    return {
      success: isSuccess,
      output: outputText,
      hasError: !isSuccess,
      durationMs: duration,
      engine: isSuccess ? `${config.engineName} (Exit 0)` : `${config.engineName} (Exit ${data.status || 1})`,
      isOfflineFallback: false
    };
  } catch (err: unknown) {
    clearTimeout(timeoutId);
    // Rethrow to let the UI caller fall back to local offline simulation
    throw err;
  }
}
