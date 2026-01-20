"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import { SandpackProvider, SandpackLayout, SandpackConsole, useSandpack } from "@codesandbox/sandpack-react";
import { TestResultsPanel } from "./TestResultsPanel";
import type { TestResult } from "@/lib/testRunner";

type Props = { slug: string; lang: string };

export function ChallengeEditor({ slug, lang }: Props) {
  const [variant, setVariant] = useState<any>(null);
  const [code, setCode] = useState<string>("");
  const [originalCode, setOriginalCode] = useState<string>("");
  const [showOriginal, setShowOriginal] = useState<boolean>(false);
  const [result, setResult] = useState<TestResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const editorRef = useRef<any>(null);
  const [runNonce, setRunNonce] = useState(0);
  const loadingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setResult(null);
    const load = async () => {
      try {
        const res = await fetch(`/api/challenges/${slug}/lang/${lang}`);
        if (!res.ok) {
          console.error(`API error: ${res.status}`, await res.text());
          return;
        }
        const data = await res.json();
        setVariant(data);
        const firstFile = Object.keys(data?.starterFiles ?? {})[0];
        const starterCode = (data?.starterFiles ?? {})[firstFile] ?? "";
        setCode(starterCode);
        setOriginalCode(starterCode);
      } catch (e) {
        console.error("Failed to load variant:", e);
      }
    };
    load();
  }, [slug, lang]);

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
  };

  const formatCode = () => {
    if (editorRef.current) {
      editorRef.current.getAction('editor.action.formatDocument')?.run();
    }
  };

  const filesMap = useMemo(() => {
    if (!variant) return {};
    const files: Record<string, string> = { ...variant.starterFiles, ...variant.harnessFiles };
    const firstFile = Object.keys(variant.starterFiles ?? {})[0];
    if (firstFile) files[firstFile] = code;

    if (lang.toLowerCase().includes("ts")) {
      files["/index.ts"] = `import { TestSuite } from './src/testRunner';
import { run } from './src/tests';

(async () => {
  try {
    const suite = await run();
    const results = suite instanceof TestSuite ? suite.getResults() : { passed: true, result: suite };
    console.log('__TEST_RESULT__', JSON.stringify(results));
  } catch (e) {
    console.log('__TEST_ERROR__', JSON.stringify({ 
      message: (e?.message ?? String(e)),
      stack: (e?.stack ?? '')
    }));
  }
})();\n// nonce ${runNonce}`;
    } else {
      files["/index.js"] = `const { TestSuite } = require('./src/testRunner.js');
const tests = require('./src/tests.js');

(async () => {
  try {
    const suite = await tests.run();
    const results = suite instanceof TestSuite ? suite.getResults() : { passed: true, result: suite };
    console.log('__TEST_RESULT__', JSON.stringify(results));
  } catch (e) {
    console.log('__TEST_ERROR__', JSON.stringify({ 
      message: (e?.message ?? String(e)),
      stack: (e?.stack ?? '')
    }));
  }
})();\n// nonce ${runNonce}`;
    }
    return files;
  }, [variant, code, lang, runNonce]);

  const template = variant && variant.runtime === "react" ? (variant.language && variant.language.includes("ts") ? "react-ts" : "react") : "node";

  function ResultListener() {
    const { listen } = useSandpack();
    useEffect(() => {
      const unsubscribe = listen((msg: any) => {
        if (msg.type === "console" && Array.isArray(msg.logs)) {
          for (const log of msg.logs) {
            const args = Array.isArray(log?.data) ? log.data : [];
            
            if (args[0] === "__TEST_RESULT__" && typeof args[1] === "string") {
              try {
                const parsed = JSON.parse(args[1]);
                setResult(parsed as TestResult);
                setLoading(false);
                if (loadingTimeoutRef.current) {
                  clearTimeout(loadingTimeoutRef.current);
                  loadingTimeoutRef.current = null;
                }
              } catch (e) {
                console.error("Failed to parse test result:", e);
                setLoading(false);
                if (loadingTimeoutRef.current) {
                  clearTimeout(loadingTimeoutRef.current);
                  loadingTimeoutRef.current = null;
                }
              }
            }
            
            if (args[0] === "__TEST_ERROR__" && typeof args[1] === "string") {
              try {
                const parsed = JSON.parse(args[1]);
                setResult({
                  passed: false,
                  totalTests: 0,
                  passedTests: 0,
                  failedTests: 1,
                  testCases: [{
                    name: "Test Execution Error",
                    passed: false,
                    assertions: [],
                    error: parsed.message
                  }],
                  totalAssertions: 0,
                  passedAssertions: 0,
                  failedAssertions: 0
                });
                setLoading(false);
                if (loadingTimeoutRef.current) {
                  clearTimeout(loadingTimeoutRef.current);
                  loadingTimeoutRef.current = null;
                }
              } catch (e) {
                console.error("Failed to parse error:", e);
                setLoading(false);
                if (loadingTimeoutRef.current) {
                  clearTimeout(loadingTimeoutRef.current);
                  loadingTimeoutRef.current = null;
                }
              }
            }
          }
        }
      });
      return unsubscribe;
    }, [listen]);
    return null;
  }

  const isServerSide = lang === "python" || lang === "java";

  return (
    <div className="space-y-4">
      {variant && (
        isServerSide ? (
           <ServerSideRunner 
             slug={slug}
             lang={lang}
             variant={variant}
             code={code}
             originalCode={originalCode}
             showOriginal={showOriginal}
             setShowOriginal={setShowOriginal}
             setCode={setCode}
             formatCode={formatCode}
             handleEditorDidMount={handleEditorDidMount}
             loading={loading}
             result={result}
             setLoading={setLoading}
             setResult={setResult}
             loadingTimeoutRef={loadingTimeoutRef}
           />
        ) : (
        <SandpackProvider template={template as any} files={filesMap} options={{ recompileMode: "delayed", autorun: false }}>
          <ResultListener />
          <ChallengeEditorContent 
            variant={variant}
            code={code}
            originalCode={originalCode}
            showOriginal={showOriginal}
            setShowOriginal={setShowOriginal}
            setCode={setCode}
            formatCode={formatCode}
            handleEditorDidMount={handleEditorDidMount}
            loading={loading}
            result={result}
            setLoading={setLoading}
            setResult={setResult}
            runNonce={runNonce}
            setRunNonce={setRunNonce}
            loadingTimeoutRef={loadingTimeoutRef}
            lang={lang}
          />
        </SandpackProvider>
        )
      )}
    </div>
  );
}

function ServerSideRunner(props: Omit<EditorContentProps, 'runNonce' | 'setRunNonce'> & { slug: string }) {
  const [logs, setLogs] = useState<string[]>([]);

  const handleRunTests = async () => {
    props.setResult(null);
    props.setLoading(true);
    setLogs([]);

    try {
        const res = await fetch('/api/execute', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                code: props.code,
                slug: props.slug,
                language: props.lang
            })
        });
        
        const data = await res.json();
        
        if (data.result) {
            props.setResult(data.result);
        } else if (data.error) {
             props.setResult({
                passed: false,
                totalTests: 0,
                passedTests: 0,
                failedTests: 1,
                testCases: [{
                    name: "Compilation/Execution Error",
                    passed: false,
                    assertions: [],
                    error: data.details || data.stderr || "Unknown error"
                }],
                totalAssertions: 0,
                passedAssertions: 0,
                failedAssertions: 0
            });
        }

        if (data.logs) {
            setLogs(data.logs);
        } else if (data.stdout) {
             setLogs(data.stdout.split('\n'));
        }

    } catch (e: any) {
        console.error("Execution failed:", e);
        props.setResult({
            passed: false,
            totalTests: 0,
            passedTests: 0,
            failedTests: 1,
            testCases: [{
                name: "System Error",
                passed: false,
                assertions: [],
                error: e.message
            }],
            totalAssertions: 0,
            passedAssertions: 0,
            failedAssertions: 0
        });
    } finally {
        props.setLoading(false);
    }
  };

  const getLanguage = (lang: string) => {
      if (lang === 'python') return 'python';
      if (lang === 'java') return 'java';
      return 'javascript';
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Code Editor */}
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                {props.showOriginal ? "Original Code" : "Your Solution"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {/* Common buttons */}
              <button
                onClick={props.formatCode}
                className="px-2 py-1 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded transition-all"
                title="Format Code"
              >
                  Format
              </button>
               <button
                onClick={() => props.setShowOriginal(!props.showOriginal)}
                className={`px-2 py-1 text-xs font-medium rounded transition-all ${
                  props.showOriginal 
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' 
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                }`}
              >
                Toggle Original
              </button>
            </div>
          </div>
          <Editor
            height="65vh"
            defaultLanguage={getLanguage(props.lang)}
            value={props.showOriginal ? props.originalCode : props.code}
            onChange={(v) => !props.showOriginal && props.setCode(v ?? "")}
            onMount={props.handleEditorDidMount}
            options={{ 
              fontSize: 14, 
              minimap: { enabled: false },
              padding: { top: 16, bottom: 16 },
              scrollBeyondLastLine: false,
              lineNumbers: 'on',
              renderLineHighlight: 'all',
              theme: 'vs-dark',
              readOnly: props.showOriginal,
              formatOnPaste: true,
              formatOnType: false,
              automaticLayout: true
            }}
            theme="vs-dark"
          />
        </div>

        {/* Console Output */}
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Console Output
              </span>
            </div>
          </div>
          <div className="h-[65vh] overflow-auto bg-[#1e1e1e] p-4 font-mono text-sm text-white">
            {logs.map((log, i) => (
                <div key={i} className="whitespace-pre-wrap border-b border-zinc-800 pb-1 mb-1 last:border-0">{log}</div>
            ))}
            {logs.length === 0 && <div className="text-zinc-500 italic">No output</div>}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 border border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-3">
            <button
              className="group px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold flex items-center gap-2 disabled:opacity-50"
              onClick={handleRunTests}
              disabled={props.loading}
            >
              {props.loading ? "Running..." : "Run Tests"}
            </button>
             <button
              className="px-4 py-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
              onClick={() => {
                props.setCode(props.originalCode);
                props.setResult(null);
                setLogs([]);
              }}
            >
              Reset
            </button>
          </div>
      </div>
      
       {props.result && (
        <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800">
             <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
            {props.result.passed ? (
               <span className="text-green-600">All Tests Passed!</span>
            ) : (
                <span className="text-red-600">Some Tests Failed</span>
            )}
            </h3>
          <TestResultsPanel result={props.result} />
        </div>
      )}
    </>
  );
}


type EditorContentProps = {
  variant: any;
  code: string;
  originalCode: string;
  showOriginal: boolean;
  setShowOriginal: (show: boolean) => void;
  setCode: (code: string) => void;
  formatCode: () => void;
  handleEditorDidMount: (editor: any, monaco: any) => void;
  loading: boolean;
  result: TestResult | null;
  setLoading: (loading: boolean) => void;
  setResult: (result: TestResult | null) => void;
  runNonce: number;
  setRunNonce: (n: number | ((prev: number) => number)) => void;
  loadingTimeoutRef: React.MutableRefObject<NodeJS.Timeout | null>;
  lang: string;
};

function ChallengeEditorContent({
  variant,
  code,
  originalCode,
  showOriginal,
  setShowOriginal,
  setCode,
  formatCode,
  handleEditorDidMount,
  loading,
  result,
  setLoading,
  setResult,
  runNonce,
  setRunNonce,
  loadingTimeoutRef,
  lang
}: EditorContentProps) {
  const { sandpack } = useSandpack();

  const handleRunTests = () => {
    setResult(null);
    setLoading(true);
    setRunNonce(n => n + 1);

    // Clear any existing timeout
    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current);
    }

    // Set a timeout to stop loading after 10 seconds
    loadingTimeoutRef.current = setTimeout(() => {
      setLoading(false);
      setResult({
        passed: false,
        totalTests: 0,
        passedTests: 0,
        failedTests: 1,
        testCases: [{
          name: "Test Timeout",
          passed: false,
          assertions: [],
          error: "Tests took too long to complete. This might indicate an infinite loop or async operation that never resolves."
        }],
        totalAssertions: 0,
        passedAssertions: 0,
        failedAssertions: 0
      });
    }, 10000);

    // Force sandpack to re-run
    try {
      setTimeout(() => {
        sandpack.runSandpack();
      }, 100);
    } catch (e) {
      console.error("Failed to run sandpack:", e);
      setLoading(false);
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
        loadingTimeoutRef.current = null;
      }
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Code Editor */}
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                {showOriginal ? "Original Code" : "Your Solution"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={formatCode}
                className="px-2 py-1 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded transition-all"
                title="Format Code (Shift+Alt+F)"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </button>
              <button
                onClick={() => setShowOriginal(!showOriginal)}
                className={`px-2 py-1 text-xs font-medium rounded transition-all ${
                  showOriginal 
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' 
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                }`}
                title="Toggle Original Code"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
              <div className="flex gap-1">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
            </div>
          </div>
          <Editor
            height="65vh"
            defaultLanguage={variant && variant.language && variant.language.includes("ts") ? "typescript" : "javascript"}
            value={showOriginal ? originalCode : code}
            onChange={(v) => !showOriginal && setCode(v ?? "")}
            onMount={handleEditorDidMount}
            options={{ 
              fontSize: 14, 
              minimap: { enabled: false },
              padding: { top: 16, bottom: 16 },
              scrollBeyondLastLine: false,
              lineNumbers: 'on',
              renderLineHighlight: 'all',
              theme: 'vs-dark',
              readOnly: showOriginal,
              formatOnPaste: true,
              formatOnType: false,
              automaticLayout: true
            }}
            theme="vs-dark"
          />
        </div>

        {/* Console Output */}
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Console Output
              </span>
            </div>
          </div>
          <div className="h-[65vh] overflow-auto">
            <SandpackLayout>
              <SandpackConsole />
            </SandpackLayout>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 border border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <button
              className="group px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-blue-600 disabled:hover:to-purple-600 disabled:transform-none"
              onClick={handleRunTests}
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Running Tests...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Run Tests
                </>
              )}
            </button>
            <button
              className="px-4 py-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-medium hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all flex items-center gap-2"
              onClick={() => {
                setCode(originalCode);
                setResult(null);
                setShowOriginal(false);
                setLoading(false);
                if (loadingTimeoutRef.current) {
                  clearTimeout(loadingTimeoutRef.current);
                  loadingTimeoutRef.current = null;
                }
              }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Reset
            </button>
            <button
              className="px-4 py-3 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 font-medium hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-all flex items-center gap-2"
              onClick={formatCode}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
              Format
            </button>
          </div>
        </div>
      </div>

      {/* Test Results Panel */}
      {result && (
        <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
            {result.passed ? (
              <>
                <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                All Tests Passed!
              </>
            ) : (
              <>
                <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                Some Tests Failed
              </>
            )}
          </h3>
          <TestResultsPanel result={result} />
        </div>
      )}
    </>
  );
}
