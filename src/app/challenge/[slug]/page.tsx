import { prisma } from "@/lib/db";
import { ChallengePlayground } from "@/components/ChallengePlayground";
import { notFound } from "next/navigation";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function ChallengePage({ params }: { params: Promise<{ slug?: string }> }) {
  const { slug } = await params;
  if (!slug) return notFound();

  const challenge = await prisma.challenge.findUnique({
    where: { slug },
    select: {
      title: true,
      description: true,
      difficulty: true,
      targetPatternDetails: true,
      pattern: { select: { name: true, slug: true } },
      languageVariants: { select: { language: true } },
    },
  });

  if (!challenge) return <div className="p-8">Challenge not found</div>;
  const defaultLang = challenge.languageVariants[0]?.language ?? "javascript";
  const langs = challenge.languageVariants.map((v) => v.language);

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
      {/* Header */}
      <div className="border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm sticky top-0 z-20">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <Link 
                href="/patterns" 
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-all flex-shrink-0"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Patterns
              </Link>
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-zinc-400">/</span>
                <h1 className="text-lg font-semibold text-zinc-900 dark:text-white truncate">
                  {challenge.title}
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              {challenge.difficulty && (
                <DifficultyBadge difficulty={challenge.difficulty} />
              )}
              <Link
                href={`/patterns#${challenge.pattern?.slug}`}
                className="px-3 py-1.5 text-xs font-medium rounded-lg bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-950/50 transition-all"
              >
                {challenge.pattern?.name}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Challenge Description */}
        {(challenge.description || challenge.targetPatternDetails) && (
          <div className="mb-6 grid md:grid-cols-2 gap-4">
            {challenge.description && (
              <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h2 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wide">
                    Challenge
                  </h2>
                </div>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {challenge.description}
                </p>
              </div>
            )}
            {challenge.targetPatternDetails && (
              <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <svg className="w-4 h-4 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h2 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wide">
                    Goal
                  </h2>
                </div>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {challenge.targetPatternDetails}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Playground */}
        <ChallengePlayground slug={slug} languages={langs} defaultLang={defaultLang} />
      </div>
    </div>
  );
}

function DifficultyBadge({ difficulty }: { difficulty: string }) {
  const colors = {
    easy: 'bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800',
    medium: 'bg-yellow-50 dark:bg-yellow-950/30 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800',
    hard: 'bg-orange-50 dark:bg-orange-950/30 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800'
  };
  
  const colorClass = colors[difficulty.toLowerCase() as keyof typeof colors] || colors.medium;
  
  return (
    <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium border ${colorClass}`}>
      {difficulty}
    </span>
  );
}
