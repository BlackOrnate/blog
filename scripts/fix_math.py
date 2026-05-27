"""
Fix math formulas in markdown files.

The CSDN scraper captured LaTeX expressions as plain text without $ delimiters,
and also captured the Unicode-rendered duplicate on the next line.

This script:
1. Finds lines containing LaTeX commands outside of code blocks
2. Wraps them in $$ ... $$ (display math)
3. Removes the following line if it is the Unicode-rendered duplicate
4. Fixes escaped underscores \_  -> _ inside math lines (KaTeX needs bare _)
"""

import re
from pathlib import Path

CONTENT_DIR = Path(__file__).parent.parent / "src" / "content"

# LaTeX command patterns that indicate a math expression
LATEX_RE = re.compile(
    r'\\(?:frac|sum|hat|overline|cdots|begin|end|alpha|beta|gamma|delta|epsilon|'
    r'theta|lambda|mu|sigma|pi|phi|psi|omega|Omega|Gamma|Delta|Sigma|Phi|Psi|'
    r'sqrt|int|oint|prod|lim|inf|sup|max|min|log|exp|sin|cos|tan|'
    r'partial|nabla|times|cdot|div|pm|mp|leq|geq|neq|approx|equiv|'
    r'rightarrow|leftarrow|Rightarrow|Leftarrow|leftrightarrow|'
    r'forall|exists|in|notin|subset|supset|cup|cap|vee|wedge|neg|'
    r'infty|mathbb|mathbf|mathrm|text|quad|qquad|left|right|'
    r'bmatrix|pmatrix|vmatrix|cases|array)'
)

# Lines that look like Unicode-rendered math (zero-width chars, math Unicode symbols, etc.)
UNICODE_MATH_CHARS = set('∑∏∫∂∇±×÷≤≥≠≈∞∈∉⊂⊃⊆⊇→←⇒⇔↔∀∃∧∨¬∩∪⊕⊗·…⋯')

# Zero-width space and other invisible chars used in rendered math
INVISIBLE = '​‌‍­﻿'


def looks_like_unicode_math(line: str) -> bool:
    s = line.strip()
    if not s:
        return False
    # Must contain at least one known unicode math symbol or invisible char
    has_math_char = any(c in UNICODE_MATH_CHARS for c in s) or any(c in INVISIBLE for c in s)
    if not has_math_char:
        return False
    # Should NOT contain common prose patterns
    if len(s) > 200:
        return False
    return True


def fix_math_line(line: str) -> str:
    # Fix escaped underscores and asterisks inside LaTeX (they're needed for markdown
    # but break KaTeX parsing)
    line = line.replace(r'\_', '_')
    line = line.replace(r'\*', '*')
    return line


def process_file(path: Path) -> bool:
    text = path.read_text(encoding='utf-8')
    lines = text.splitlines(keepends=True)

    new_lines = []
    in_code = False
    i = 0
    changed = False

    while i < len(lines):
        raw = lines[i]
        line = raw.rstrip('\n').rstrip('\r')

        # Track fenced code blocks
        stripped = line.strip()
        if stripped.startswith('```') or stripped.startswith('~~~'):
            in_code = not in_code
            new_lines.append(raw)
            i += 1
            continue

        if in_code:
            new_lines.append(raw)
            i += 1
            continue

        # Skip lines already wrapped in math delimiters
        if stripped.startswith('$'):
            new_lines.append(raw)
            i += 1
            continue

        # Check if this line is a LaTeX expression
        if LATEX_RE.search(line):
            indent = len(line) - len(line.lstrip())
            pad = ' ' * indent
            fixed = fix_math_line(stripped)

            # Emit display math block
            new_lines.append(pad + '$$\n')
            new_lines.append(pad + fixed + '\n')
            new_lines.append(pad + '$$\n')
            changed = True

            # Skip the next line if it looks like the Unicode-rendered duplicate
            if i + 1 < len(lines):
                next_stripped = lines[i + 1].strip()
                if looks_like_unicode_math(next_stripped):
                    i += 2
                    continue
            i += 1
            continue

        new_lines.append(raw)
        i += 1

    if changed:
        path.write_text(''.join(new_lines), encoding='utf-8')
        return True
    return False


def main():
    md_files = list(CONTENT_DIR.rglob('*.md'))
    fixed = 0
    for f in sorted(md_files):
        if process_file(f):
            print(f'  fixed: {f.relative_to(CONTENT_DIR)}')
            fixed += 1
    print(f'\nDone — {fixed}/{len(md_files)} files updated.')


if __name__ == '__main__':
    main()
