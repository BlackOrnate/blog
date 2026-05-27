"""
Comprehensive markdown content cleanup:
1. Remove garbled single-char lines before NEW $$ markers
2. Inside ORIGINAL $$ blocks: strip single-char lines + unicode renders,
   and fix \\_ -> _ and \\* -> * in retained formula lines
3. Add language identifiers to unlabeled ``` code blocks
"""

import re
from pathlib import Path

CONTENT_DIR = Path(__file__).parent.parent / "src" / "content"

# ── helpers ──────────────────────────────────────────────────────────────────

ZERO_WIDTH = '​‌‍­﻿'
UNICODE_MATH = set('∑∏∫∂∇±×÷≤≥≠≈∞∈∉⊂⊃⊆⊇→←⇒⇔↔∀∃∧∨¬∩∪⊕⊗⋯')


def is_single_char_garbage(line: str) -> bool:
    s = line.strip()
    return len(s) == 1


def is_unicode_render(line: str) -> bool:
    """A unicode-rendered math duplicate: has zero-width chars OR mostly math symbols."""
    s = line.strip()
    if not s or len(s) <= 1:
        return False
    if any(c in ZERO_WIDTH for c in s):
        return True
    # Mostly unicode math symbols mixed with ASCII (not natural prose)
    uni = sum(1 for c in s if c in UNICODE_MATH)
    return uni >= 2 and uni / len(s) >= 0.15


def fix_math_escapes(line: str) -> str:
    return line.replace(r'\_', '_').replace(r'\*', '*')


# ── language detection ────────────────────────────────────────────────────────

PY_TOKENS = [
    'import ', 'from ', 'def ', 'class ', 'print(', 'return ',
    'elif ', 'else:', 'self.', 'lambda ', 'yield ', 'async ', 'await ',
    'True', 'False', 'None',
    'plt.', 'np.', 'pd.', 'sklearn', 'mglearn', 'matplotlib',
    'numpy', 'pandas', 'torch', 'tensorflow', 'urllib', 'requests',
    'BeautifulSoup', 'soup.', 'response.', 'asyncio',
]

JAVA_TOKENS = [
    'public class', 'private ', 'protected ', 'static void',
    'System.out', 'System.in', 'import java.', 'import java',
    'new ArrayList', 'new HashMap', 'new LinkedList', 'new Scanner',
    'throws ', '@Override', 'extends ', 'implements ', 'interface ',
    'public static', 'ArrayList', 'LinkedList', 'HashMap',
    'Scanner(', 'String[] args', 'void main',
]

C_TOKENS = [
    '#include', '#define', 'int main', 'void main',
    'printf(', 'scanf(', 'malloc(', 'free(',
    'typedef ', 'struct {', 'ElemType', 'SqList', 'LinkList', 'LNode',
    '->next', '->data', 'NULL',
]

BASH_TOKENS = ['#!/bin/', '$ pip', '$ python', 'sudo ', 'apt-get', 'export ']


def detect_language(code: str) -> str:
    lines = [l.strip() for l in code.splitlines() if l.strip()]
    if not lines:
        return ''
    joined = '\n'.join(lines)

    if any(t in joined for t in JAVA_TOKENS):
        return 'java'
    if any(t in joined for t in C_TOKENS):
        return 'c'
    if any(t in joined for t in BASH_TOKENS):
        return 'bash'
    if any(t in joined for t in PY_TOKENS):
        return 'python'
    return ''


# ── per-file processing ───────────────────────────────────────────────────────

def process_file(path: Path) -> bool:
    original = path.read_text(encoding='utf-8')
    lines = original.splitlines(keepends=True)
    out = []
    in_fenced_code = False
    code_lang = None
    code_lines = []
    in_math = False
    i = 0
    changed = False

    while i < len(lines):
        raw = lines[i]
        stripped = raw.strip()

        # ── fenced code block handling ────────────────────────────────────────
        if stripped.startswith('```'):
            fence_lang = stripped[3:].strip()

            if not in_fenced_code:
                # Opening fence
                in_fenced_code = True
                code_lang = fence_lang
                code_lines = []
                if fence_lang == '':
                    # Collect block content so we can detect language
                    fence_indent = raw[: len(raw) - len(raw.lstrip())]
                    i += 1
                    while i < len(lines):
                        inner = lines[i]
                        if inner.strip().startswith('```') and not inner.strip()[3:].strip():
                            # Closing fence
                            lang = detect_language('\n'.join(code_lines))
                            if lang:
                                out.append(fence_indent + '```' + lang + '\n')
                                changed = True
                            else:
                                out.append(fence_indent + '```\n')
                            for cl in code_lines:
                                out.append(cl)
                            out.append(inner)
                            in_fenced_code = False
                            i += 1
                            break
                        code_lines.append(inner)
                        i += 1
                    continue
                else:
                    out.append(raw)
                    i += 1
                    continue
            else:
                # Closing fence
                in_fenced_code = False
                out.append(raw)
                i += 1
                continue

        if in_fenced_code:
            out.append(raw)
            i += 1
            continue

        # ── math block handling ───────────────────────────────────────────────
        if stripped == '$$':
            if not in_math:
                # Opening $$ — remove preceding garbled single-char lines AND blank lines
                # that sit between garbled chars and this $$ marker.
                removed = 0
                while out:
                    last_len = len(out[-1].strip())
                    if last_len == 1:
                        out.pop()
                        removed += 1
                    elif last_len == 0:
                        # Blank line: keep removing only if single-char content sits before it
                        j = len(out) - 2
                        while j >= 0 and out[j].strip() == '':
                            j -= 1
                        if j >= 0 and len(out[j].strip()) == 1:
                            out.pop()
                            removed += 1
                        else:
                            break
                    else:
                        break
                if removed:
                    changed = True
                in_math = True
                out.append(raw)
                i += 1
                continue
            else:
                # Closing $$
                in_math = False
                out.append(raw)
                i += 1
                continue

        if in_math:
            # Inside a $$ block: strip garbage, fix escapes in formula lines
            if is_single_char_garbage(stripped):
                changed = True
                i += 1
                continue
            if is_unicode_render(stripped):
                changed = True
                i += 1
                continue
            if not stripped:
                # blank line inside math block – skip
                i += 1
                continue
            # Keep formula lines, fix escape sequences
            fixed = fix_math_escapes(raw)
            if fixed != raw:
                changed = True
            out.append(fixed)
            i += 1
            continue

        # ── normal line ───────────────────────────────────────────────────────
        out.append(raw)
        i += 1

    result = ''.join(out)
    if result != original:
        path.write_text(result, encoding='utf-8')
        return True
    return False


def main():
    md_files = sorted(CONTENT_DIR.rglob('*.md'))
    fixed = 0
    for f in md_files:
        if process_file(f):
            print(f'  fixed: {f.relative_to(CONTENT_DIR)}')
            fixed += 1
    print(f'\nDone — {fixed}/{len(md_files)} files updated.')


if __name__ == '__main__':
    main()
