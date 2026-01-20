"use client";

import { TestResult, TestCase, TestAssertion } from "@/lib/testRunner";

interface TestResultsProps {
  result: TestResult;
}

export function TestResultsPanel({ result }: TestResultsProps) {
  const successRate = result.totalTests > 0 
    ? Math.round((result.passedTests / result.totalTests) * 100)
    : 0;

  const assertionSuccessRate = result.totalAssertions > 0
    ? Math.round((result.passedAssertions / result.totalAssertions) * 100)
    : 0;

  return (
    <div className="space-y-4">
      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/30 rounded-lg p-3 border border-blue-200 dark:border-blue-800">
          <div className="text-xs font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wide">
            Total Tests
          </div>
          <div className="text-2xl font-bold text-blue-900 dark:text-blue-100 mt-1">
            {result.totalTests}
          </div>
        </div>

        <div className={`bg-gradient-to-br rounded-lg p-3 border ${
          result.passedTests === result.totalTests
            ? 'from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/30 border-green-200 dark:border-green-800'
            : 'from-red-50 to-red-100 dark:from-red-950/30 dark:to-red-900/30 border-red-200 dark:border-red-800'
        }`}>
          <div className="text-xs font-medium uppercase tracking-wide" style={{
            color: result.passedTests === result.totalTests ? '#16a34a' : '#dc2626'
          }}>
            Passed Tests
          </div>
          <div className="text-2xl font-bold mt-1" style={{
            color: result.passedTests === result.totalTests ? '#15803d' : '#b91c1c'
          }}>
            {result.passedTests}/{result.totalTests}
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/30 rounded-lg p-3 border border-purple-200 dark:border-purple-800">
          <div className="text-xs font-medium text-purple-600 dark:text-purple-400 uppercase tracking-wide">
            Assertions
          </div>
          <div className="text-2xl font-bold text-purple-900 dark:text-purple-100 mt-1">
            {result.passedAssertions}/{result.totalAssertions}
          </div>
        </div>

        <div className={`bg-gradient-to-br rounded-lg p-3 border ${
          result.passed
            ? 'from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/30 border-green-200 dark:border-green-800'
            : 'from-yellow-50 to-yellow-100 dark:from-yellow-950/30 dark:to-yellow-900/30 border-yellow-200 dark:border-yellow-800'
        }`}>
          <div className="text-xs font-medium uppercase tracking-wide" style={{
            color: result.passed ? '#16a34a' : '#ca8a04'
          }}>
            Status
          </div>
          <div className="text-2xl font-bold mt-1" style={{
            color: result.passed ? '#15803d' : '#a16207'
          }}>
            {result.passed ? '✓ Passed' : '✗ Failed'}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      {result.totalTests > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
              Test Success Rate
            </span>
            <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
              {successRate}%
            </span>
          </div>
          <div className="h-2 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                result.passed
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                  : 'bg-gradient-to-r from-orange-500 to-red-500'
              }`}
              style={{ width: `${successRate}%` }}
            />
          </div>
        </div>
      )}

      {/* Test Cases */}
      {result.testCases.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Test Cases
          </h4>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {result.testCases.map((testCase, idx) => (
              <TestCaseItem key={idx} testCase={testCase} index={idx} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function TestCaseItem({ testCase, index }: { testCase: TestCase; index: number }) {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <div
      className={`rounded-lg border overflow-hidden transition-all ${
        testCase.passed
          ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800'
          : 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800'
      }`}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-3 flex-1 text-left">
          {testCase.passed ? (
            <svg className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          )}
          <div className="flex-1">
            <div className={`text-sm font-medium ${
              testCase.passed
                ? 'text-green-900 dark:text-green-100'
                : 'text-red-900 dark:text-red-100'
            }`}>
              {testCase.name}
            </div>
            {testCase.assertions?.length > 0 && (
              <div className="text-xs mt-1" style={{
                color: testCase.passed ? '#15803d' : '#b91c1c'
              }}>
                {testCase.assertions.filter(a => a.passed).length}/{testCase.assertions.length} assertions passed
              </div>
            )}
          </div>
        </div>
        <svg
          className={`w-5 h-5 transition-transform ${expanded ? 'rotate-180' : ''} ${
            testCase.passed
              ? 'text-green-600 dark:text-green-400'
              : 'text-red-600 dark:text-red-400'
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </button>

      {/* Expanded Details */}
      {expanded && (
        <div className="border-t border-inherit">
          {testCase.error && (
            <div className="px-4 py-3 bg-black/5 dark:bg-white/5 border-b border-inherit">
              <div className="text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">
                Error
              </div>
              <div className="text-sm font-mono text-red-700 dark:text-red-300 break-all">
                {testCase.error}
              </div>
            </div>
          )}

          {testCase.assertions.length > 0 && (
            <div className="px-4 py-3 space-y-2">
              <div className="text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-2">
                Assertions ({testCase.assertions.length})
              </div>
              <div className="space-y-2">
                {testCase.assertions.map((assertion, assertIdx) => (
                  <AssertionItem key={assertIdx} assertion={assertion} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function AssertionItem({ assertion }: { assertion: TestAssertion }) {
  return (
    <div className="text-xs bg-black/5 dark:bg-white/5 rounded p-2 space-y-1">
      <div className="flex items-start gap-2">
        {assertion.passed ? (
          <svg className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        )}
        <div className="flex-1">
          <div className={`font-medium ${
            assertion.passed
              ? 'text-green-700 dark:text-green-300'
              : 'text-red-700 dark:text-red-300'
          }`}>
            {assertion.name}
          </div>
          {!assertion.passed && assertion.error && (
            <div className="text-red-600 dark:text-red-400 mt-0.5 font-mono">
              {assertion.error}
            </div>
          )}
          {assertion.expected !== undefined && assertion.actual !== undefined && (
            <div className="text-zinc-600 dark:text-zinc-400 mt-1 space-y-0.5">
              <div>Expected: <span className="font-mono">{JSON.stringify(assertion.expected)}</span></div>
              <div>Actual: <span className="font-mono">{JSON.stringify(assertion.actual)}</span></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import React from "react";
