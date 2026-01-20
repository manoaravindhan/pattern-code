import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Navigation */}
        <nav className="py-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-mono text-sm font-bold">{"<>"}</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              PatternCode
            </span>
          </div>
          <Link 
            href="/patterns" 
            className="px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            Browse Patterns
          </Link>
        </nav>

        {/* Hero Content */}
        <div className="py-20 sm:py-32 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
              Learn design patterns through practice
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            <span className="block text-zinc-900 dark:text-white">Master Code</span>
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Refactoring
            </span>
          </h1>

          <p className="text-xl sm:text-2xl text-zinc-600 dark:text-zinc-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            Transform messy code into elegant patterns. Practice refactoring with real-world challenges and level up your software design skills.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/patterns"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Start Learning
            </Link>
            <a
              href="#features"
              className="px-8 py-4 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white font-semibold rounded-xl border border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 transition-all shadow-sm hover:shadow-md"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 py-12 border-y border-zinc-200 dark:border-zinc-800">
          <div className="text-center">
            <div className="text-4xl font-bold text-zinc-900 dark:text-white mb-2">23+</div>
            <div className="text-sm text-zinc-600 dark:text-zinc-400">Design Patterns</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-zinc-900 dark:text-white mb-2">100+</div>
            <div className="text-sm text-zinc-600 dark:text-zinc-400">Practice Challenges</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-zinc-900 dark:text-white mb-2">Multi</div>
            <div className="text-sm text-zinc-600 dark:text-zinc-400">Language Support</div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white mb-4">
            Why PatternCode?
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            The most effective way to learn design patterns is through hands-on practice
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all hover:shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">
              Real-World Challenges
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Work with realistic code scenarios that mirror actual refactoring situations you'll encounter in production.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-purple-300 dark:hover:border-purple-700 transition-all hover:shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">
              Instant Feedback
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Get immediate validation on your solutions with automated testing and pattern recognition.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-pink-300 dark:hover:border-pink-700 transition-all hover:shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">
              Structured Learning
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Progress through carefully curated patterns from beginner to advanced levels.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-green-300 dark:hover:border-green-700 transition-all hover:shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">
              Interactive Editor
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Code directly in the browser with syntax highlighting and intelligent autocomplete.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-orange-300 dark:hover:border-orange-700 transition-all hover:shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">
              Progressive Difficulty
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Start simple and advance at your own pace with challenges tailored to your skill level.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all hover:shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">
              Multiple Languages
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Learn patterns in your preferred language with support for JavaScript, TypeScript, Python, and more.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24">
        <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-12 text-center shadow-2xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Level Up Your Code?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join developers worldwide who are mastering design patterns through hands-on practice.
          </p>
          <Link
            href="/patterns"
            className="inline-block px-8 py-4 bg-white text-purple-600 font-semibold rounded-xl hover:bg-zinc-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Browse All Patterns
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 py-12">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-mono text-xs font-bold">{"<>"}</span>
              </div>
              <span className="font-semibold text-zinc-900 dark:text-white">PatternCode</span>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              © 2026 PatternCode. Master design patterns through practice.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
