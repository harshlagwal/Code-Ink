// Dry Run & Variable Memory Tracer for Student Learning
// Analyzes code to extract variables, data types, stack memory addresses, and byte sizes.

export interface DryRunVariable {
  line: number;
  name: string;
  type: string;
  value: string;
  address: string;
  bytes: number;
}

export function parseDryRunVariables(code: string, language: string): DryRunVariable[] {
  if (!code) return [];
  const lang = language.toLowerCase().trim();
  const variables: DryRunVariable[] = [];
  const lines = code.split('\n');

  // Simulated base stack frame address for local variables
  let baseAddress = 0x7ffe00;
  const seenNames = new Set<string>();

  for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
    const rawLine = lines[lineIndex].trim();
    if (!rawLine || rawLine.startsWith('//') || rawLine.startsWith('#') || rawLine.startsWith('/*')) continue;

    // 1. C, C++, Java, and DSA strong typed variables:
    // e.g. int a = 10; or float sum = a + b; or char ch = 'A';
    const cMatch = rawLine.match(
      /\b(int|float|double|char|long|short|bool|boolean|String|auto)\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*(?:=\s*([^;]+))?;/
    );

    if (cMatch) {
      const type = cMatch[1];
      const name = cMatch[2];
      const rawVal = cMatch[3] ? cMatch[3].trim() : 'uninitialized';

      let byteSize = 4;
      if (type === 'char') byteSize = 1;
      else if (type === 'double' || type === 'long') byteSize = 8;
      else if (type === 'short') byteSize = 2;
      else if (type === 'bool' || type === 'boolean') byteSize = 1;

      baseAddress += byteSize;
      seenNames.add(name);

      variables.push({
        line: lineIndex + 1,
        name,
        type,
        value: rawVal,
        address: '0x' + baseAddress.toString(16).toUpperCase(),
        bytes: byteSize
      });
      continue;
    }

    // 2. Python, JS dynamic variable declarations:
    // e.g. x = 10 or const total = 50
    if (lang.includes('python') || lang.includes('py') || lang.includes('js') || lang.includes('javascript')) {
      const pyMatch = rawLine.match(/^(?:let|const|var)?\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*([^;\n]+)/);
      if (
        pyMatch &&
        !rawLine.startsWith('for ') &&
        !rawLine.startsWith('if ') &&
        !rawLine.startsWith('while ') &&
        !rawLine.startsWith('return ') &&
        !rawLine.startsWith('def ') &&
        !rawLine.startsWith('class ')
      ) {
        const name = pyMatch[1];
        const rawVal = pyMatch[2].trim();

        if (!seenNames.has(name)) {
          seenNames.add(name);
          baseAddress += 4;
          const isNum = !isNaN(Number(rawVal));
          const isStr = (rawVal.startsWith('"') && rawVal.endsWith('"')) || (rawVal.startsWith("'") && rawVal.endsWith("'"));

          variables.push({
            line: lineIndex + 1,
            name,
            type: isNum ? 'int' : isStr ? 'str' : 'expr',
            value: rawVal,
            address: '0x' + baseAddress.toString(16).toUpperCase(),
            bytes: isStr ? rawVal.length : 4
          });
        }
      }
    }
  }

  return variables;
}
