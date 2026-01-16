"use client";

import { Fragment, useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

type Phase = "typing" | "pausing" | "fading";

type Snippet = {
  language: string;
  code: string;
};

function getDefaultSnippets(locale?: string): Snippet[] {
  const isEnglish = (locale ?? "").toLowerCase().startsWith("en");
  const greeting = isEnglish ? "Hello" : "Hola";

  return [
    {
      language: "TypeScript",
      code: `// TypeScript\n\nexport type User = {\n  id: string;\n  name: string;\n  role: "admin" | "user";\n};\n\nexport function greet(user: User) {\n  return "${greeting}, " + user.name + "!";\n}`,
    },
    {
      language: "PHP",
      code: `<?php\n\nfinal class UserService\n{\n    public function greet(string $name): string\n    {\n        return "${greeting}, {$name}!";\n    }\n}\n\n$svc = new UserService();\necho $svc->greet("Harold");`,
    },
    {
      language: "Python",
      code: `# Python\n\nfrom dataclasses import dataclass\n\n@dataclass\nclass User:\n    id: str\n    name: str\n\ndef greet(user: User) -> str:\n    return f"${greeting}, {user.name}!"\n\nprint(greet(User("1", "Harold")))`,
    },
    {
      language: "SQL",
      code: `-- SQL\n\nSELECT\n  company,\n  role,\n  started_at,\n  ended_at\nFROM experience\nWHERE active = TRUE\nORDER BY started_at DESC;`,
    },
  ];
}

type TokenKind =
  | "plain"
  | "comment"
  | "string"
  | "keyword"
  | "number"
  | "type"
  | "punct";

const TOKEN_CLASS: Record<TokenKind, string> = {
  plain: "text-foreground/80",
  comment: "text-muted-foreground/80",
  string: "text-chart-2",
  keyword: "text-chart-1",
  number: "text-chart-4",
  type: "text-chart-3",
  punct: "text-foreground/70",
};

const KEYWORDS: Record<string, Set<string>> = {
  typescript: new Set([
    "export",
    "type",
    "interface",
    "function",
    "return",
    "const",
    "let",
    "var",
    "class",
    "extends",
    "implements",
    "new",
    "import",
    "from",
    "as",
    "async",
    "await",
    "try",
    "catch",
    "finally",
    "if",
    "else",
    "for",
    "while",
    "switch",
    "case",
    "break",
    "default",
    "throw",
  ]),
  php: new Set([
    "<?php",
    "final",
    "class",
    "public",
    "private",
    "protected",
    "function",
    "return",
    "new",
    "echo",
    "string",
    "int",
    "float",
    "bool",
    "array",
    "null",
  ]),
  python: new Set([
    "from",
    "import",
    "as",
    "class",
    "def",
    "return",
    "print",
    "True",
    "False",
    "None",
  ]),
  sql: new Set([
    "SELECT",
    "FROM",
    "WHERE",
    "ORDER",
    "BY",
    "GROUP",
    "LIMIT",
    "OFFSET",
    "JOIN",
    "LEFT",
    "RIGHT",
    "INNER",
    "OUTER",
    "ON",
    "AND",
    "OR",
    "TRUE",
    "FALSE",
    "NULL",
    "AS",
  ]),
};

const TYPES = new Set([
  "User",
  "UserService",
  "string",
  "int",
  "float",
  "bool",
  "dataclass",
]);

function normalizeLang(language: string | undefined) {
  const value = (language ?? "").toLowerCase();
  if (value.includes("type")) return "typescript";
  if (value.includes("php")) return "php";
  if (value.includes("python")) return "python";
  if (value.includes("sql")) return "sql";
  return "typescript";
}

function renderHighlighted(text: string, language: string): React.ReactNode {
  const lang = normalizeLang(language);
  const keywordSet = KEYWORDS[lang] ?? KEYWORDS.typescript;

  const parts: Array<{ kind: TokenKind; value: string }> = [];

  const push = (kind: TokenKind, value: string) => {
    if (!value) return;
    const last = parts[parts.length - 1];
    if (last && last.kind === kind) {
      last.value += value;
      return;
    }
    parts.push({ kind, value });
  };

  const isIdentStart = (ch: string) => /[A-Za-z_$]/.test(ch);
  const isIdent = (ch: string) => /[A-Za-z0-9_$]/.test(ch);

  let i = 0;
  while (i < text.length) {
    const ch = text[i] ?? "";
    const next = text[i + 1] ?? "";

    // Line comments
    const startsLineComment =
      (lang === "typescript" && ch === "/" && next === "/") ||
      ((lang === "python" || lang === "php") && ch === "#") ||
      (lang === "sql" && ch === "-" && next === "-") ||
      (lang === "php" && ch === "/" && next === "/");
    if (startsLineComment) {
      let j = i;
      while (j < text.length && text[j] !== "\n") j++;
      push("comment", text.slice(i, j));
      i = j;
      continue;
    }

    // Block comments /* ... */
    if (ch === "/" && next === "*") {
      const end = text.indexOf("*/", i + 2);
      const j = end === -1 ? text.length : end + 2;
      push("comment", text.slice(i, j));
      i = j;
      continue;
    }

    // Strings
    if (ch === '"' || ch === "'" || ch === "`") {
      const quote = ch;
      let j = i + 1;
      while (j < text.length) {
        const cj = text[j] ?? "";
        if (cj === "\\") {
          j += 2;
          continue;
        }
        if (cj === quote) {
          j++;
          break;
        }
        j++;
      }
      push("string", text.slice(i, j));
      i = j;
      continue;
    }

    // Whitespace
    if (/\s/.test(ch)) {
      let j = i + 1;
      while (j < text.length && /\s/.test(text[j] ?? "")) j++;
      push("plain", text.slice(i, j));
      i = j;
      continue;
    }

    // Numbers
    if (/[0-9]/.test(ch)) {
      let j = i + 1;
      while (j < text.length && /[0-9._]/.test(text[j] ?? "")) j++;
      push("number", text.slice(i, j));
      i = j;
      continue;
    }

    // Identifiers / keywords
    if (isIdentStart(ch)) {
      let j = i + 1;
      while (j < text.length && isIdent(text[j] ?? "")) j++;
      const word = text.slice(i, j);

      const isSql = lang === "sql";
      const normalized = isSql ? word.toUpperCase() : word;

      if (keywordSet.has(normalized)) {
        push("keyword", word);
      } else if (TYPES.has(word)) {
        push("type", word);
      } else {
        push("plain", word);
      }
      i = j;
      continue;
    }

    // Punctuation / everything else
    push("punct", ch);
    i++;
  }

  return (
    <Fragment>
      {parts.map((p, idx) => (
        <span key={idx} className={TOKEN_CLASS[p.kind]}>
          {p.value}
        </span>
      ))}
    </Fragment>
  );
}

export default function CodeTyperBackground({
  className,
  snippets,
  locale,
}: {
  className?: string;
  snippets?: Snippet[];
  locale?: string;
}) {
  const resolvedSnippets = useMemo(
    () =>
      snippets && snippets.length > 0 ? snippets : getDefaultSnippets(locale),
    [locale, snippets]
  );

  const [snippetIndex, setSnippetIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mql) return;

    const onChange = () => setReduceMotion(mql.matches);
    onChange();

    if (typeof mql.addEventListener === "function") {
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    }

    // Safari fallback
    // eslint-disable-next-line deprecation/deprecation
    mql.addListener(onChange);
    // eslint-disable-next-line deprecation/deprecation
    return () => mql.removeListener(onChange);
  }, []);

  useEffect(() => {
    setSnippetIndex(0);
    setCharIndex(0);
    setPhase("typing");
  }, [resolvedSnippets]);

  const current = resolvedSnippets[snippetIndex] ?? resolvedSnippets[0];
  const fullText = current?.code ?? "";

  useEffect(() => {
    if (!fullText) return;
    if (!reduceMotion) return;
    setCharIndex(fullText.length);
    setPhase("pausing");
  }, [fullText, reduceMotion]);

  useEffect(() => {
    if (!fullText) return;
    if (reduceMotion) return;

    const typeDelayMs = 28;
    const pauseDelayMs = 900;
    const fadeDurationMs = 700;

    const timer = window.setTimeout(
      () => {
        if (phase === "typing") {
          const nextCharIndex = Math.min(charIndex + 1, fullText.length);
          setCharIndex(nextCharIndex);

          if (nextCharIndex >= fullText.length) {
            setPhase("pausing");
          }
          return;
        }

        if (phase === "pausing") {
          if (resolvedSnippets.length <= 1) {
            setCharIndex(0);
            setPhase("typing");
            return;
          }

          setPhase("fading");
          return;
        }

        // fading (no typing while opacity changes)
        setSnippetIndex((idx) => (idx + 1) % resolvedSnippets.length);
        setCharIndex(0);
        setPhase("typing");
      },
      phase === "pausing"
        ? pauseDelayMs
        : phase === "fading"
        ? fadeDurationMs
        : typeDelayMs
    );

    return () => window.clearTimeout(timer);
  }, [
    charIndex,
    fullText,
    snippetIndex,
    phase,
    reduceMotion,
    resolvedSnippets.length,
  ]);

  const visible = fullText.slice(0, charIndex);

  const basePre = cn(
    "pointer-events-none select-none font-mono whitespace-pre-wrap wrap-break-word",
    "text-xs sm:text-sm leading-relaxed",
    "text-foreground"
  );

  return (
    <pre
      aria-hidden="true"
      className={cn(
        basePre,
        phase === "fading"
          ? "transition-opacity duration-700 opacity-0"
          : "opacity-60 dark:opacity-40",
        className
      )}
    >
      <code>
        {renderHighlighted(visible, current?.language)}
        {!reduceMotion && phase !== "fading" && (
          <span className="inline-block animate-pulse">▍</span>
        )}
      </code>
    </pre>
  );
}
