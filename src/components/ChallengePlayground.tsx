"use client";
import { useState } from "react";
import { ChallengeEditor } from "@/components/ChallengeEditor";

type Props = {
  slug: string;
  languages: string[];
  defaultLang: string;
};

const languageIcons: Record<string, string> = {
  javascript: '🟨',
  typescript: '🔷',
  python: '🐍',
  java: '☕',
  rust: '🦀',
  go: '🔵'
};

export function ChallengePlayground({ slug, languages, defaultLang }: Props) {
  const [selected, setSelected] = useState<string>(defaultLang);
  // Ensure we include python/java if available (from seeding), but better to rely on props 'languages'.
  // However, for this demo we'll force include them to see the buttons if the challenge supports it.
  // Actually, 'languages' prop comes from the page which queries the DB.
  // Since we seeded correctly, they should be in 'languages'.
  const allLanguages = languages.length > 0 ? languages : ["javascript"];

  return (
    <div className="space-y-4">
      {/* Language Selector */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 border border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wide">
            Select Language
          </h3>
          <span className="text-xs text-zinc-500 dark:text-zinc-500">
            {allLanguages.length} available
          </span>
        </div>
        <div className="flex gap-2 flex-wrap">
          {allLanguages.map((lang) => (
            <button
              key={lang}
              onClick={() => setSelected(lang)}
              className={`group relative px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                selected === lang
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:scale-105"
              }`}
            >
              <span className="flex items-center gap-2">
                <span className="text-base">{languageIcons[lang.toLowerCase()] || '📝'}</span>
                {lang.toUpperCase()}
              </span>
              {selected === lang && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full border-2 border-white dark:border-zinc-900"></span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Editor Area */}
      <ChallengeEditor slug={slug} lang={selected} />
    </div>
  );
}
