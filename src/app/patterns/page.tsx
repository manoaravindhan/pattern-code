import Link from "next/link";
import { prisma } from "@/lib/db";

export default async function PatternsPage() {
  const patterns = await prisma.pattern.findMany({ 
    select: { 
      slug: true, 
      name: true, 
      description: true, 
      _count: { select: { challenges: true } },
      challenges: {
        select: {
          id: true,
          slug: true,
          title: true,
          difficulty: true
        },
        take: 3
      }
    },
    orderBy: { name: 'asc' }
  });
  
  const allChallenges = await prisma.challenge.findMany({ 
    select: { 
      slug: true, 
      title: true, 
      pattern: { select: { name: true, slug: true } }, 
      difficulty: true 
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
      {/* Header */}
      <div className="border-b border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-6">
          <div className="flex items-center justify-between mb-4">
            <Link href="/" className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>
          </div>
          <div>
            <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-2">
              Design Patterns
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Master proven software design patterns through hands-on challenges
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">{patterns.length}</div>
            <div className="text-sm text-zinc-600 dark:text-zinc-400">Patterns</div>
          </div>
          <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">{allChallenges.length}</div>
            <div className="text-sm text-zinc-600 dark:text-zinc-400">Challenges</div>
          </div>
          <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">
              {allChallenges.filter(c => c.difficulty === 'easy').length}
            </div>
            <div className="text-sm text-zinc-600 dark:text-zinc-400">Easy</div>
          </div>
          <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800">
            <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-1">
              {allChallenges.filter(c => c.difficulty === 'hard').length}
            </div>
            <div className="text-sm text-zinc-600 dark:text-zinc-400">Hard</div>
          </div>
        </div>

        {/* Patterns List */}
        <div className="space-y-6">
          {patterns.map((pattern) => (
            <div 
              key={pattern.slug}
              className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden hover:border-zinc-300 dark:hover:border-zinc-700 transition-all hover:shadow-lg"
            >
              <div className="p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
                        {pattern.name}
                      </h2>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                        {pattern._count.challenges} {pattern._count.challenges === 1 ? 'challenge' : 'challenges'}
                      </span>
                    </div>
                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {pattern.description || "Learn this essential design pattern through practical examples"}
                    </p>
                  </div>
                </div>

                {/* Challenge Preview */}
                {pattern.challenges.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-zinc-200 dark:border-zinc-800">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wide">
                        Available Challenges
                      </h3>
                      <Link 
                        href={`/patterns?filter=${pattern.slug}`}
                        className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                      >
                        View all →
                      </Link>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {pattern.challenges.map((challenge) => (
                        <Link
                          key={challenge.slug}
                          href={`/challenge/${challenge.slug}`}
                          className="group p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 transition-all"
                        >
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <h4 className="font-medium text-zinc-900 dark:text-white text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                              {challenge.title}
                            </h4>
                            <svg className="w-4 h-4 text-zinc-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                          {challenge.difficulty && (
                            <DifficultyBadge difficulty={challenge.difficulty} />
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* All Challenges Section */}
        <div className="mt-16">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">
              All Challenges
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              Browse all available coding challenges across different patterns
            </p>
          </div>
          
          <div className="grid gap-3">
            {allChallenges.map((challenge) => (
              <Link
                key={challenge.slug}
                href={`/challenge/${challenge.slug}`}
                className="group bg-white dark:bg-zinc-900 rounded-xl p-5 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all hover:shadow-md"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                        {challenge.title}
                      </h3>
                      {challenge.difficulty && (
                        <DifficultyBadge difficulty={challenge.difficulty} />
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                      <span className="px-2 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-xs font-medium">
                        {challenge.pattern?.name}
                      </span>
                    </div>
                  </div>
                  <svg className="w-5 h-5 text-zinc-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
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
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border ${colorClass}`}>
      {difficulty}
    </span>
  );
}
