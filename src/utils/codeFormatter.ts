// Multi-Language Code Formatter & Beautifier
// Automatically fixes indentation, brackets, and structural alignment for student code.

export function formatCode(code: string, rawLanguage: string): string {
  if (!code || !code.trim()) return code;

  const lang = rawLanguage.toLowerCase().trim();

  if (lang.includes('python') || lang === 'py') {
    return formatPythonCode(code);
  }

  // Default C-Style Formatter (C, C++, Java, JavaScript, TypeScript, DSA)
  return formatCStyleCode(code);
}

function formatCStyleCode(code: string): string {
  const lines = code.split('\n');
  let indentLevel = 0;
  const indentStep = '  '; // 2 spaces
  const formattedLines: string[] = [];

  for (const rawLine of lines) {
    let line = rawLine.trim();

    // Preserve single blank lines between logical sections
    if (!line) {
      if (formattedLines.length > 0 && formattedLines[formattedLines.length - 1] !== '') {
        formattedLines.push('');
      }
      continue;
    }

    // Check if line starts with closing brace(s) e.g. '}', '} else {', '};'
    const leadingCloseMatch = line.match(/^(\}+)/);
    const leadingCloseCount = leadingCloseMatch ? leadingCloseMatch[1].length : 0;

    // Apply indentation for this line (dedenting by any leading closing braces)
    const currentLineIndent = Math.max(0, indentLevel - leadingCloseCount);

    // Standardize spacing around commas (e.g. "a,b" -> "a, b")
    line = line.replace(/,([^\s\n\r"'])/g, ', $1');

    // Standardize spacing after common control keywords
    line = line.replace(/\b(if|for|while|switch)\s*\(/g, '$1 (');

    // Standardize spacing around binary operators where appropriate
    line = line.replace(/\s*==\s*/g, ' == ');
    line = line.replace(/\s*!=\s*/g, ' != ');
    line = line.replace(/\s*<=\s*/g, ' <= ');
    line = line.replace(/\s*>=\s*/g, ' >= ');

    formattedLines.push(indentStep.repeat(currentLineIndent) + line);

    // Calculate indent level for subsequent lines by counting unquoted { and }
    let openCount = 0;
    let closeCount = 0;
    let inString = false;
    let stringChar = '';

    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if ((ch === '"' || ch === "'") && (i === 0 || line[i - 1] !== '\\')) {
        if (!inString) {
          inString = true;
          stringChar = ch;
        } else if (stringChar === ch) {
          inString = false;
        }
      } else if (!inString) {
        if (ch === '{') openCount++;
        else if (ch === '}') closeCount++;
      }
    }

    indentLevel = Math.max(0, indentLevel + openCount - closeCount);
  }

  return formattedLines.join('\n');
}

function formatPythonCode(code: string): string {
  const lines = code.split('\n');
  let indentLevel = 0;
  const indentStep = '    '; // 4 spaces for PEP 8
  const formattedLines: string[] = [];

  for (const rawLine of lines) {
    let line = rawLine.trim();

    if (!line) {
      if (formattedLines.length > 0 && formattedLines[formattedLines.length - 1] !== '') {
        formattedLines.push('');
      }
      continue;
    }

    // Dedent for block branch keywords
    if (/^(elif\b|else:|except\b|finally:)/.test(line)) {
      indentLevel = Math.max(0, indentLevel - 1);
    }

    // Spacing after commas
    line = line.replace(/,([^\s\n\r"'])/g, ', $1');

    formattedLines.push(indentStep.repeat(indentLevel) + line);

    // Increase indent after block header colon ':'
    if (line.endsWith(':')) {
      indentLevel++;
    }
  }

  return formattedLines.join('\n');
}
