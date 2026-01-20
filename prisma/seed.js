const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.pattern.upsert({
    where: { slug: "async-await" },
    update: {},
    create: { slug: "async-await", name: "Callback Hell → Async/Await", description: "Convert nested callbacks into Promises/async-await" },
  });
  await prisma.pattern.upsert({
    where: { slug: "observer" },
    update: {},
    create: { slug: "observer", name: "Prop Drilling → Observer/Context", description: "Replace prop drilling with Observer or React Context" },
  });
  await prisma.pattern.upsert({
    where: { slug: "server-component" },
    update: {},
    create: { slug: "server-component", name: "CSR → Server Component", description: "Move data fetch to server components with minimal client boundary" },
  });

  const asyncPattern = await prisma.pattern.findUnique({ where: { slug: "async-await" } });
  const observerPattern = await prisma.pattern.findUnique({ where: { slug: "observer" } });
  const serverPattern = await prisma.pattern.findUnique({ where: { slug: "server-component" } });

  const ch1 = await prisma.challenge.upsert({
    where: { slug: "callback-hell-level-1" },
    update: {},
    create: {
      slug: "callback-hell-level-1",
      title: "Level 1: Callback Hell to Async/Await",
      description: "Refactor nested callbacks to async/await",
      patternId: asyncPattern.id,
      difficulty: "easy",
    },
  });

  const ch1b = await prisma.challenge.upsert({
    where: { slug: "callback-hell-level-1-advanced" },
    update: {},
    create: {
      slug: "callback-hell-level-1-advanced",
      title: "Level 1+: Callback Hell with Error Handling",
      description: "Convert nested callbacks with error handling to async/await",
      patternId: asyncPattern.id,
      difficulty: "medium",
    },
  });

  const ch1c = await prisma.challenge.upsert({
    where: { slug: "callback-hell-level-2" },
    update: {},
    create: {
      slug: "callback-hell-level-2",
      title: "Level 2: Complex Async Operations",
      description: "Refactor complex callback chains with parallel operations to async/await",
      patternId: asyncPattern.id,
      difficulty: "hard",
    },
  });

  const ch1d = await prisma.challenge.upsert({
    where: { slug: "callback-hell-level-3" },
    update: {},
    create: {
      slug: "callback-hell-level-3",
      title: "Level 3: Advanced Async Patterns",
      description: "Convert callback-based streaming and retry logic to async/await with generators",
      patternId: asyncPattern.id,
      difficulty: "expert",
    },
  });

  const ch2 = await prisma.challenge.upsert({
    where: { slug: "observer-level-2" },
    update: {},
    create: {
      slug: "observer-level-2",
      title: "Level 1: Prop Drilling to Observer",
      description: "Replace prop drilling with an Observer or Context",
      patternId: observerPattern.id,
      difficulty: "easy",
    },
  });

  const ch2b = await prisma.challenge.upsert({
    where: { slug: "observer-level-2-advanced" },
    update: {},
    create: {
      slug: "observer-level-2-advanced",
      title: "Level 2: Deep Component Tree with Context",
      description: "Refactor deeply nested prop drilling using React Context API",
      patternId: observerPattern.id,
      difficulty: "medium",
    },
  });

  const ch2c = await prisma.challenge.upsert({
    where: { slug: "observer-level-3" },
    update: {},
    create: {
      slug: "observer-level-3",
      title: "Level 3: Observer Pattern Implementation",
      description: "Implement a custom Observer pattern for complex state management",
      patternId: observerPattern.id,
      difficulty: "hard",
    },
  });

  const ch2d = await prisma.challenge.upsert({
    where: { slug: "observer-level-4" },
    update: {},
    create: {
      slug: "observer-level-4",
      title: "Level 4: Advanced State Management with Observers",
      description: "Build a robust observer system with middleware and subscriptions",
      patternId: observerPattern.id,
      difficulty: "expert",
    },
  });

  const ch3 = await prisma.challenge.upsert({
    where: { slug: "server-component-level-3" },
    update: {},
    create: {
      slug: "server-component-level-3",
      title: "Level 1: Basics CSR to Server Component",
      description: "Refactor client-side rendered block to server component",
      patternId: serverPattern.id,
      difficulty: "easy",
    },
  });

  const ch3b = await prisma.challenge.upsert({
    where: { slug: "server-component-level-2" },
    update: {},
    create: {
      slug: "server-component-level-2",
      title: "Level 2: Server Component with Data Fetching",
      description: "Move complex data fetching logic to server components with streaming",
      patternId: serverPattern.id,
      difficulty: "medium",
    },
  });

  const ch3c = await prisma.challenge.upsert({
    where: { slug: "server-component-level-3-advanced" },
    update: {},
    create: {
      slug: "server-component-level-3-advanced",
      title: "Level 3: Dynamic Server Components with Suspense",
      description: "Implement server components with Suspense boundaries and dynamic rendering",
      patternId: serverPattern.id,
      difficulty: "hard",
    },
  });

  const ch3d = await prisma.challenge.upsert({
    where: { slug: "server-component-level-4" },
    update: {},
    create: {
      slug: "server-component-level-4",
      title: "Level 4: Advanced Server Components Architecture",
      description: "Build complex server component layouts with nested rendering and caching strategies",
      patternId: serverPattern.id,
      difficulty: "expert",
    },
  });

  // Language variants for ch1b (Callback Hell - Advanced)
  await prisma.languageVariant.upsert({
    where: { challengeId_language: { challengeId: ch1b.id, language: "javascript" } },
    update: {},
    create: {
      challengeId: ch1b.id,
      language: "javascript",
      starterFiles: {
        "/src/index.js": `function fetchUser(id, cb) {
  setTimeout(() => 
    Math.random() > 0.8 
      ? cb(new Error('User not found')) 
      : cb(null, { id, name: 'User' + id }), 
    50
  );
}

function fetchPosts(userId, cb) {
  setTimeout(() => 
    Math.random() > 0.8 
      ? cb(new Error('Posts error')) 
      : cb(null, [
          { id: 1, title: 'Post 1' },
          { id: 2, title: 'Post 2' }
        ]), 
    50
  );
}

function fetchComments(postId, cb) {
  setTimeout(() => 
    Math.random() > 0.8 
      ? cb(new Error('Comments error')) 
      : cb(null, [
          { id: 1, text: 'Great!' },
          { id: 2, text: 'Nice!' }
        ]), 
    50
  );
}

function main(userId, cb) {
  fetchUser(userId, (err, user) => {
    if (err) return cb(err);
    fetchPosts(user.id, (err, posts) => {
      if (err) return cb(err);
      if (!posts.length) {
        return cb(null, { user, posts: [], comments: [] });
      }
      fetchComments(posts[0].id, (err, comments) => {
        if (err) return cb(err);
        cb(null, { user, posts, comments });
      });
    });
  });
}

module.exports = { main };`,
      },
      harnessFiles: {
        "/src/testRunner.js": `export class Assert {
  constructor() {
    this.assertions = [];
  }
  equal(actual, expected, message) {
    const passed = actual === expected;
    this.assertions.push({
      name: message || \`Expected \${JSON.stringify(expected)}, got \${JSON.stringify(actual)}\`,
      passed,
      expected,
      actual,
      error: passed ? undefined : \`Assertion failed: \${actual} !== \${expected}\`
    });
    if (!passed) throw new Error(\`Assertion failed: \${actual} !== \${expected}\`);
  }
  deepEqual(actual, expected, message) {
    const passed = JSON.stringify(actual) === JSON.stringify(expected);
    this.assertions.push({
      name: message || \`Expected \${JSON.stringify(expected)}, got \${JSON.stringify(actual)}\`,
      passed,
      expected,
      actual,
      error: passed ? undefined : 'Assertion failed: deep equal'
    });
    if (!passed) throw new Error('Assertion failed: deep equal');
  }
  ok(value, message) {
    const passed = !!value;
    this.assertions.push({
      name: message || \`Expected truthy value, got \${JSON.stringify(value)}\`,
      passed,
      expected: true,
      actual: value,
      error: passed ? undefined : 'Expected truthy value'
    });
    if (!passed) throw new Error('Expected truthy value');
  }
  getAssertions() {
    return this.assertions;
  }
}
export class TestSuite {
  constructor() {
    this.testCases = [];
  }
  async test(name, fn) {
    const assert = new Assert();
    let passed = true;
    let error;
    try {
      await fn(assert);
    } catch (e) {
      passed = false;
      error = e?.message || String(e);
    }
    this.testCases.push({
      name,
      passed,
      assertions: assert.getAssertions(),
      error
    });
  }
  getResults() {
    const testCases = this.testCases;
    const totalTests = testCases.length;
    const passedTests = testCases.filter(t => t.passed).length;
    const failedTests = totalTests - passedTests;
    const totalAssertions = testCases.reduce((sum, t) => sum + t.assertions.length, 0);
    const passedAssertions = testCases.reduce((sum, t) => sum + t.assertions.filter(a => a.passed).length, 0);
    const failedAssertions = totalAssertions - passedAssertions;
    return {
      passed: failedTests === 0 && failedAssertions === 0,
      totalTests,
      passedTests,
      failedTests,
      testCases,
      totalAssertions,
      passedAssertions,
      failedAssertions
    };
  }
}`,
        "/src/tests.js": `const { TestSuite } = require('./testRunner.js');
const { main } = require('./index');

module.exports.run = async () => {
  const suite = new TestSuite();

  await suite.test('Should handle successful callback', async (assert) => {
    const result = await new Promise((resolve, reject) => {
      main((err, res) => err ? reject(err) : resolve(res));
    });
    assert.ok(result !== null, 'Result should not be null');
    assert.ok(result === 2, 'Result should be 2 (1 + 1)');
  });

  await suite.test('Should handle sequential async operations', async (assert) => {
    const result = await new Promise((resolve, reject) => {
      main((err, res) => err ? reject(err) : resolve(res));
    });
    assert.equal(typeof result, 'number', 'Result should be a number');
  });

  return suite;
};`,
      },
      hints: { text: "Convert to async/await with proper error handling try-catch" },
      runtime: "node",
    },
  });
  await prisma.languageVariant.upsert({
    where: { challengeId_language: { challengeId: ch1b.id, language: "typescript" } },
    update: {},
    create: {
      challengeId: ch1b.id,
      language: "typescript",
      starterFiles: {
        "/src/index.ts": `export function fetchUser(
  id: number,
  cb: (err: any, user?: any) => void
) {
  setTimeout(() => 
    Math.random() > 0.8 
      ? cb(new Error('User not found')) 
      : cb(null, { id, name: 'User' + id }), 
    50
  );
}

export function fetchPosts(
  userId: number,
  cb: (err: any, posts?: any) => void
) {
  setTimeout(() => 
    Math.random() > 0.8 
      ? cb(new Error('Posts error')) 
      : cb(null, [
          { id: 1, title: 'Post 1' },
          { id: 2, title: 'Post 2' }
        ]), 
    50
  );
}

export function fetchComments(
  postId: number,
  cb: (err: any, comments?: any) => void
) {
  setTimeout(() => 
    Math.random() > 0.8 
      ? cb(new Error('Comments error')) 
      : cb(null, [
          { id: 1, text: 'Great!' },
          { id: 2, text: 'Nice!' }
        ]), 
    50
  );
}

export function main(
  userId: number,
  cb: (err: any, result?: any) => void
) {
  fetchUser(userId, (err, user) => {
    if (err) return cb(err);
    fetchPosts(user.id, (err, posts) => {
      if (err) return cb(err);
      if (!posts.length) {
        return cb(null, { user, posts: [], comments: [] });
      }
      fetchComments(posts[0].id, (err, comments) => {
        if (err) return cb(err);
        cb(null, { user, posts, comments });
      });
    });
  });
}`,
      },
      harnessFiles: {
        "/src/testRunner.ts": `export interface TestAssertion {
  name: string;
  passed: boolean;
  expected?: any;
  actual?: any;
  error?: string;
}

export interface TestCase {
  name: string;
  passed: boolean;
  assertions: TestAssertion[];
  error?: string;
}

export interface TestResult {
  passed: boolean;
  totalTests: number;
  passedTests: number;
  failedTests: number;
  testCases: TestCase[];
  totalAssertions: number;
  passedAssertions: number;
  failedAssertions: number;
}

export class Assert {
  private assertions: TestAssertion[] = [];

  equal(actual: any, expected: any, message?: string) {
    const passed = actual === expected;
    this.assertions.push({
      name: message || \`Expected \${JSON.stringify(expected)}, got \${JSON.stringify(actual)}\`,
      passed,
      expected,
      actual,
      error: passed ? undefined : \`Assertion failed: \${actual} !== \${expected}\`
    });
    if (!passed) throw new Error(\`Assertion failed: \${actual} !== \${expected}\`);
  }

  deepEqual(actual: any, expected: any, message?: string) {
    const passed = JSON.stringify(actual) === JSON.stringify(expected);
    this.assertions.push({
      name: message || \`Expected \${JSON.stringify(expected)}, got \${JSON.stringify(actual)}\`,
      passed,
      expected,
      actual,
      error: passed ? undefined : 'Assertion failed: deep equal'
    });
    if (!passed) throw new Error('Assertion failed: deep equal');
  }

  ok(value: any, message?: string) {
    const passed = !!value;
    this.assertions.push({
      name: message || \`Expected truthy value, got \${JSON.stringify(value)}\`,
      passed,
      expected: true,
      actual: value,
      error: passed ? undefined : 'Expected truthy value'
    });
    if (!passed) throw new Error('Expected truthy value');
  }

  getAssertions(): TestAssertion[] {
    return this.assertions;
  }
}

export class TestSuite {
  private testCases: TestCase[] = [];

  async test(name: string, fn: (assert: Assert) => Promise<void> | void) {
    const assert = new Assert();
    let passed = true;
    let error: string | undefined;

    try {
      await fn(assert);
    } catch (e) {
      passed = false;
      error = (e as any)?.message || String(e);
    }

    this.testCases.push({
      name,
      passed,
      assertions: assert.getAssertions(),
      error
    });
  }

  getResults(): TestResult {
    const testCases = this.testCases;
    const totalTests = testCases.length;
    const passedTests = testCases.filter(t => t.passed).length;
    const failedTests = totalTests - passedTests;

    const totalAssertions = testCases.reduce((sum, t) => sum + t.assertions.length, 0);
    const passedAssertions = testCases.reduce(
      (sum, t) => sum + t.assertions.filter(a => a.passed).length,
      0
    );
    const failedAssertions = totalAssertions - passedAssertions;

    return {
      passed: failedTests === 0 && failedAssertions === 0,
      totalTests,
      passedTests,
      failedTests,
      testCases,
      totalAssertions,
      passedAssertions,
      failedAssertions
    };
  }
}`,
        "/src/tests.ts": `import { TestSuite, Assert } from './testRunner';
import { main } from './index';

export async function run(): Promise<TestSuite> {
  const suite = new TestSuite();

  await suite.test('Should handle successful callback', async (assert: Assert) => {
    const result = await new Promise<any>((resolve, reject) => {
      main((err, res) => err ? reject(err) : resolve(res));
    });
    assert.ok(result !== null, 'Result should not be null');
    assert.equal(typeof result, 'object', 'Result should be an object');
  });

  await suite.test('Should have user, posts, and comments', async (assert: Assert) => {
    const result = await new Promise<any>((resolve, reject) => {
      main((err, res) => err ? reject(err) : resolve(res));
    });
    assert.ok(result.user, 'Should have user property');
    assert.ok(Array.isArray(result.posts), 'Posts should be an array');
    assert.ok(Array.isArray(result.comments), 'Comments should be an array');
  });

  await suite.test('Should handle errors gracefully', async (assert: Assert) => {
    let errorCaught = false;
    try {
      await new Promise<any>((resolve, reject) => {
        main((err, res) => {
          if (err) errorCaught = true;
          err ? reject(err) : resolve(res);
        });
      });
    } catch (e) {
      errorCaught = true;
    }
    assert.ok(typeof errorCaught === 'boolean', 'Should handle errors');
  });

  return suite;
}`,
      },
      hints: { text: "Use async/await with proper error handling" },
      runtime: "node",
    },
  });

  // Language variants for ch1c (Callback Hell - Level 2)
  await prisma.languageVariant.upsert({
    where: { challengeId_language: { challengeId: ch1c.id, language: "javascript" } },
    update: {},
    create: {
      challengeId: ch1c.id,
      language: "javascript",
      starterFiles: {
        "/src/index.js": `function fetchData(url, cb) {
  setTimeout(() => cb(null, { data: Math.random() }), 100);
}

function main(urls, cb) {
  let results = [];
  let completed = 0;
  
  urls.forEach((url, i) => {
    fetchData(url, (err, data) => {
      if (err) return cb(err);
      results[i] = data;
      completed++;
      if (completed === urls.length) {
        cb(null, results);
      }
    });
  });
}

module.exports = { main };`,
      },
      harnessFiles: {
        "/src/testRunner.js": `export class Assert {
  constructor() {
    this.assertions = [];
  }
  equal(actual, expected, message) {
    const passed = actual === expected;
    this.assertions.push({
      name: message || \`Expected \${JSON.stringify(expected)}, got \${JSON.stringify(actual)}\`,
      passed,
      expected,
      actual,
      error: passed ? undefined : \`Assertion failed\`
    });
    if (!passed) throw new Error(\`Assertion failed\`);
  }
  ok(value, message) {
    const passed = !!value;
    this.assertions.push({
      name: message || \`Expected truthy value\`,
      passed,
      expected: true,
      actual: value,
      error: passed ? undefined : 'Expected truthy value'
    });
    if (!passed) throw new Error('Expected truthy value');
  }
  getAssertions() {
    return this.assertions;
  }
}
export class TestSuite {
  constructor() {
    this.testCases = [];
  }
  async test(name, fn) {
    const assert = new Assert();
    let passed = true;
    let error;
    try {
      await fn(assert);
    } catch (e) {
      passed = false;
      error = e?.message || String(e);
    }
    this.testCases.push({
      name,
      passed,
      assertions: assert.getAssertions(),
      error
    });
  }
  getResults() {
    const testCases = this.testCases;
    const totalTests = testCases.length;
    const passedTests = testCases.filter(t => t.passed).length;
    const failedTests = totalTests - passedTests;
    const totalAssertions = testCases.reduce((sum, t) => sum + t.assertions.length, 0);
    const passedAssertions = testCases.reduce((sum, t) => sum + t.assertions.filter(a => a.passed).length, 0);
    const failedAssertions = totalAssertions - passedAssertions;
    return {
      passed: failedTests === 0 && failedAssertions === 0,
      totalTests,
      passedTests,
      failedTests,
      testCases,
      totalAssertions,
      passedAssertions,
      failedAssertions
    };
  }
}`,
        "/src/tests.js": `const { TestSuite } = require('./testRunner.js');
const { main } = require('./index');

module.exports.run = async () => {
  const suite = new TestSuite();

  await suite.test('Should fetch data from multiple URLs in parallel', async (assert) => {
    const result = await new Promise((resolve, reject) => {
      main(['/api/1', '/api/2', '/api/3'], (err, res) => err ? reject(err) : resolve(res));
    });
    assert.ok(Array.isArray(result), 'Result should be an array');
  });

  await suite.test('Should return array with 3 items', async (assert) => {
    const result = await new Promise((resolve, reject) => {
      main(['/api/1', '/api/2', '/api/3'], (err, res) => err ? reject(err) : resolve(res));
    });
    assert.equal(result.length, 3, 'Result array should have 3 items');
  });

  await suite.test('Should handle all URLs in parallel without blocking', async (assert) => {
    const result = await new Promise((resolve, reject) => {
      main(['/api/1', '/api/2', '/api/3'], (err, res) => err ? reject(err) : resolve(res));
    });
    result.forEach((item, i) => {
      assert.ok(item && item.data !== undefined, \`Item \${i} should have data\`);
    });
  });

  return suite;
};`,
      },
      hints: { text: "Use Promise.all() or Promise.allSettled() with async/await for parallel operations" },
      runtime: "node",
    },
  });
  await prisma.languageVariant.upsert({
    where: { challengeId_language: { challengeId: ch1c.id, language: "typescript" } },
    update: {},
    create: {
      challengeId: ch1c.id,
      language: "typescript",
      starterFiles: {
        "/src/index.ts": `export function fetchData(
  url: string,
  cb: (err: any, data?: any) => void
) {
  setTimeout(() => cb(null, { data: Math.random() }), 100);
}

export function main(
  urls: string[],
  cb: (err: any, results?: any[]) => void
) {
  let results: any[] = [];
  let completed = 0;
  
  urls.forEach((url, i) => {
    fetchData(url, (err, data) => {
      if (err) return cb(err);
      results[i] = data;
      completed++;
      if (completed === urls.length) {
        cb(null, results);
      }
    });
  });
}`,
      },
      harnessFiles: {
        "/src/testRunner.ts": `export interface TestAssertion {
  name: string;
  passed: boolean;
  expected?: any;
  actual?: any;
  error?: string;
}

export interface TestCase {
  name: string;
  passed: boolean;
  assertions: TestAssertion[];
  error?: string;
}

export interface TestResult {
  passed: boolean;
  totalTests: number;
  passedTests: number;
  failedTests: number;
  testCases: TestCase[];
  totalAssertions: number;
  passedAssertions: number;
  failedAssertions: number;
}

export class Assert {
  private assertions: TestAssertion[] = [];

  equal(actual: any, expected: any, message?: string) {
    const passed = actual === expected;
    this.assertions.push({
      name: message || \`Expected \${JSON.stringify(expected)}\`,
      passed,
      expected,
      actual,
      error: passed ? undefined : \`Assertion failed\`
    });
    if (!passed) throw new Error(\`Assertion failed\`);
  }

  ok(value: any, message?: string) {
    const passed = !!value;
    this.assertions.push({
      name: message || \`Expected truthy value\`,
      passed,
      expected: true,
      actual: value,
      error: passed ? undefined : 'Expected truthy value'
    });
    if (!passed) throw new Error('Expected truthy value');
  }

  getAssertions(): TestAssertion[] {
    return this.assertions;
  }
}

export class TestSuite {
  private testCases: TestCase[] = [];

  async test(name: string, fn: (assert: Assert) => Promise<void> | void) {
    const assert = new Assert();
    let passed = true;
    let error: string | undefined;

    try {
      await fn(assert);
    } catch (e) {
      passed = false;
      error = (e as any)?.message || String(e);
    }

    this.testCases.push({
      name,
      passed,
      assertions: assert.getAssertions(),
      error
    });
  }

  getResults(): TestResult {
    const testCases = this.testCases;
    const totalTests = testCases.length;
    const passedTests = testCases.filter(t => t.passed).length;
    const failedTests = totalTests - passedTests;

    const totalAssertions = testCases.reduce((sum, t) => sum + t.assertions.length, 0);
    const passedAssertions = testCases.reduce(
      (sum, t) => sum + t.assertions.filter(a => a.passed).length,
      0
    );
    const failedAssertions = totalAssertions - passedAssertions;

    return {
      passed: failedTests === 0 && failedAssertions === 0,
      totalTests,
      passedTests,
      failedTests,
      testCases,
      totalAssertions,
      passedAssertions,
      failedAssertions
    };
  }
}`,
        "/src/tests.ts": `import { TestSuite, Assert } from './testRunner';
import { main } from './index';

export async function run(): Promise<TestSuite> {
  const suite = new TestSuite();

  await suite.test('Should fetch data from multiple URLs in parallel', async (assert: Assert) => {
    const result = await new Promise<any[]>((resolve, reject) => {
      main(['/api/1', '/api/2', '/api/3'], (err, res) => err ? reject(err) : resolve(res!));
    });
    assert.ok(Array.isArray(result), 'Result should be an array');
  });

  await suite.test('Should return array with 3 items', async (assert: Assert) => {
    const result = await new Promise<any[]>((resolve, reject) => {
      main(['/api/1', '/api/2', '/api/3'], (err, res) => err ? reject(err) : resolve(res!));
    });
    assert.equal(result.length, 3, 'Result array should have 3 items');
  });

  await suite.test('Should handle all URLs in parallel without blocking', async (assert: Assert) => {
    const result = await new Promise<any[]>((resolve, reject) => {
      main(['/api/1', '/api/2', '/api/3'], (err, res) => err ? reject(err) : resolve(res!));
    });
    result.forEach((item, i) => {
      assert.ok(item && item.data !== undefined, \`Item \${i} should have data\`);
    });
  });

  return suite;
}`,
      },
      hints: { text: "Refactor to use Promise.all() with map and async/await" },
      runtime: "node",
    },
  });

  // Language variants for ch1d (Callback Hell - Level 3)
  await prisma.languageVariant.upsert({
    where: { challengeId_language: { challengeId: ch1d.id, language: "javascript" } },
    update: {},
    create: {
      challengeId: ch1d.id,
      language: "javascript",
      starterFiles: {
        "/src/index.js": `function retryFetch(url, maxRetries, cb) {
  let attempts = 0;
  
  function attempt() {
    setTimeout(() => {
      attempts++;
      if (Math.random() > 0.3) {
        cb(null, { data: url });
      } else if (attempts < maxRetries) {
        attempt();
      } else {
        cb(new Error('Max retries exceeded'));
      }
    }, 100);
  }
  
  attempt();
}

function main(urls, cb) {
  let results = [];
  let processed = 0;
  
  urls.forEach((url, i) => {
    retryFetch(url, 3, (err, data) => {
      if (err) return cb(err);
      results[i] = data;
      processed++;
      if (processed === urls.length) {
        cb(null, results);
      }
    });
  });
}

module.exports = { main };`,
      },
      harnessFiles: {
        "/src/testRunner.js": `export class Assert {
  constructor() {
    this.assertions = [];
  }
  equal(actual, expected, message) {
    const passed = actual === expected;
    this.assertions.push({
      name: message || \`Expected \${JSON.stringify(expected)}, got \${JSON.stringify(actual)}\`,
      passed,
      expected,
      actual,
      error: passed ? undefined : \`Assertion failed\`
    });
    if (!passed) throw new Error(\`Assertion failed\`);
  }
  ok(value, message) {
    const passed = !!value;
    this.assertions.push({
      name: message || \`Expected truthy value\`,
      passed,
      expected: true,
      actual: value,
      error: passed ? undefined : 'Expected truthy value'
    });
    if (!passed) throw new Error('Expected truthy value');
  }
  getAssertions() {
    return this.assertions;
  }
}
export class TestSuite {
  constructor() {
    this.testCases = [];
  }
  async test(name, fn) {
    const assert = new Assert();
    let passed = true;
    let error;
    try {
      await fn(assert);
    } catch (e) {
      passed = false;
      error = e?.message || String(e);
    }
    this.testCases.push({
      name,
      passed,
      assertions: assert.getAssertions(),
      error
    });
  }
  getResults() {
    const testCases = this.testCases;
    const totalTests = testCases.length;
    const passedTests = testCases.filter(t => t.passed).length;
    const failedTests = totalTests - passedTests;
    const totalAssertions = testCases.reduce((sum, t) => sum + t.assertions.length, 0);
    const passedAssertions = testCases.reduce((sum, t) => sum + t.assertions.filter(a => a.passed).length, 0);
    const failedAssertions = totalAssertions - passedAssertions;
    return {
      passed: failedTests === 0 && failedAssertions === 0,
      totalTests,
      passedTests,
      failedTests,
      testCases,
      totalAssertions,
      passedAssertions,
      failedAssertions
    };
  }
}`,
        "/src/tests.js": `const { TestSuite } = require('./testRunner.js');
const { main } = require('./index');

module.exports.run = async () => {
  const suite = new TestSuite();

  await suite.test('Should handle multiple URLs with retry logic', async (assert) => {
    const result = await new Promise((resolve, reject) => {
      main(['/api/1', '/api/2'], (err, res) => err ? reject(err) : resolve(res));
    });
    assert.ok(Array.isArray(result), 'Result should be an array');
  });

  await suite.test('Should complete all retries successfully', async (assert) => {
    const result = await new Promise((resolve, reject) => {
      main(['/api/1', '/api/2'], (err, res) => err ? reject(err) : resolve(res));
    });
    assert.equal(result.length, 2, 'Should have 2 results');
  });

  await suite.test('Should maintain URL data in results', async (assert) => {
    const result = await new Promise((resolve, reject) => {
      main(['/api/1', '/api/2'], (err, res) => err ? reject(err) : resolve(res));
    });
    result.forEach((item, i) => {
      assert.ok(item && item.data, \`Item \${i} should contain data\`);
    });
  });

  return suite;
};`,
      },
      hints: { text: "Convert to async/await with retry logic using generators or Promise recursion" },
      runtime: "node",
    },
  });
  await prisma.languageVariant.upsert({
    where: { challengeId_language: { challengeId: ch1d.id, language: "typescript" } },
    update: {},
    create: {
      challengeId: ch1d.id,
      language: "typescript",
      starterFiles: {
        "/src/index.ts": `export function retryFetch(
  url: string,
  maxRetries: number,
  cb: (err: any, data?: any) => void
) {
  let attempts = 0;
  
  function attempt() {
    setTimeout(() => {
      attempts++;
      if (Math.random() > 0.3) {
        cb(null, { data: url });
      } else if (attempts < maxRetries) {
        attempt();
      } else {
        cb(new Error('Max retries exceeded'));
      }
    }, 100);
  }
  
  attempt();
}

export function main(
  urls: string[],
  cb: (err: any, results?: any[]) => void
) {
  let results: any[] = [];
  let processed = 0;
  
  urls.forEach((url, i) => {
    retryFetch(url, 3, (err, data) => {
      if (err) return cb(err);
      results[i] = data;
      processed++;
      if (processed === urls.length) {
        cb(null, results);
      }
    });
  });
}`,
      },
      harnessFiles: {
        "/src/testRunner.ts": `export interface TestAssertion {
  name: string;
  passed: boolean;
  expected?: any;
  actual?: any;
  error?: string;
}

export interface TestCase {
  name: string;
  passed: boolean;
  assertions: TestAssertion[];
  error?: string;
}

export interface TestResult {
  passed: boolean;
  totalTests: number;
  passedTests: number;
  failedTests: number;
  testCases: TestCase[];
  totalAssertions: number;
  passedAssertions: number;
  failedAssertions: number;
}

export class Assert {
  private assertions: TestAssertion[] = [];

  equal(actual: any, expected: any, message?: string) {
    const passed = actual === expected;
    this.assertions.push({
      name: message || \`Expected \${JSON.stringify(expected)}\`,
      passed,
      expected,
      actual,
      error: passed ? undefined : \`Assertion failed\`
    });
    if (!passed) throw new Error(\`Assertion failed\`);
  }

  ok(value: any, message?: string) {
    const passed = !!value;
    this.assertions.push({
      name: message || \`Expected truthy value\`,
      passed,
      expected: true,
      actual: value,
      error: passed ? undefined : 'Expected truthy value'
    });
    if (!passed) throw new Error('Expected truthy value');
  }

  getAssertions(): TestAssertion[] {
    return this.assertions;
  }
}

export class TestSuite {
  private testCases: TestCase[] = [];

  async test(name: string, fn: (assert: Assert) => Promise<void> | void) {
    const assert = new Assert();
    let passed = true;
    let error: string | undefined;

    try {
      await fn(assert);
    } catch (e) {
      passed = false;
      error = (e as any)?.message || String(e);
    }

    this.testCases.push({
      name,
      passed,
      assertions: assert.getAssertions(),
      error
    });
  }

  getResults(): TestResult {
    const testCases = this.testCases;
    const totalTests = testCases.length;
    const passedTests = testCases.filter(t => t.passed).length;
    const failedTests = totalTests - passedTests;

    const totalAssertions = testCases.reduce((sum, t) => sum + t.assertions.length, 0);
    const passedAssertions = testCases.reduce(
      (sum, t) => sum + t.assertions.filter(a => a.passed).length,
      0
    );
    const failedAssertions = totalAssertions - passedAssertions;

    return {
      passed: failedTests === 0 && failedAssertions === 0,
      totalTests,
      passedTests,
      failedTests,
      testCases,
      totalAssertions,
      passedAssertions,
      failedAssertions
    };
  }
}`,
        "/src/tests.ts": `import { TestSuite, Assert } from './testRunner';
import { main } from './index';

export async function run(): Promise<TestSuite> {
  const suite = new TestSuite();

  await suite.test('Should handle multiple URLs with retry logic', async (assert: Assert) => {
    const result = await new Promise<any[]>((resolve, reject) => {
      main(['/api/1', '/api/2'], (err, res) => err ? reject(err) : resolve(res!));
    });
    assert.ok(Array.isArray(result), 'Result should be an array');
  });

  await suite.test('Should complete all retries successfully', async (assert: Assert) => {
    const result = await new Promise<any[]>((resolve, reject) => {
      main(['/api/1', '/api/2'], (err, res) => err ? reject(err) : resolve(res!));
    });
    assert.equal(result.length, 2, 'Should have 2 results');
  });

  await suite.test('Should maintain URL data in results', async (assert: Assert) => {
    const result = await new Promise<any[]>((resolve, reject) => {
      main(['/api/1', '/api/2'], (err, res) => err ? reject(err) : resolve(res!));
    });
    result.forEach((item, i) => {
      assert.ok(item && item.data, \`Item \${i} should contain data\`);
    });
  });

  return suite;
}`,
      },
      hints: { text: "Implement async retry logic with exponential backoff" },
      runtime: "node",
    },
  });

  // Language variants for ch2b (Observer - Level 2 Advanced)
  await prisma.languageVariant.upsert({
    where: { challengeId_language: { challengeId: ch2b.id, language: "javascript" } },
    update: {},
    create: {
      challengeId: ch2b.id,
      language: "javascript",
      starterFiles: {
        "/src/App.jsx": `import React, { useState } from 'react';

function Level1({ theme, setTheme }) {
  return <Level2 theme={theme} setTheme={setTheme} />;
}

function Level2({ theme, setTheme }) {
  return <Level3 theme={theme} setTheme={setTheme} />;
}

function Level3({ theme, setTheme }) {
  return <Level4 theme={theme} setTheme={setTheme} />;
}

function Level4({ theme, setTheme }) {
  return (
    <button 
      style={{ background: theme }} 
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      Toggle {theme}
    </button>
  );
}

export default function App() {
  const [theme, setTheme] = useState('light');
  return <Level1 theme={theme} setTheme={setTheme} />;
}`,
      },
      harnessFiles: {
        "/src/tests.js": `export const hint = 'Use React Context API to avoid prop drilling through multiple levels';`,
      },
      hints: { text: "Create a ThemeContext and use useContext hook to eliminate prop drilling" },
      runtime: "react",
    },
  });
  await prisma.languageVariant.upsert({
    where: { challengeId_language: { challengeId: ch2b.id, language: "typescript" } },
    update: {},
    create: {
      challengeId: ch2b.id,
      language: "typescript",
      starterFiles: {
        "/src/App.tsx": `import React, { useState } from 'react';

function Level1({ theme, setTheme }: { theme: string; setTheme: (t: string) => void }) {
  return <Level2 theme={theme} setTheme={setTheme} />;
}

function Level2({ theme, setTheme }: { theme: string; setTheme: (t: string) => void }) {
  return <Level3 theme={theme} setTheme={setTheme} />;
}

function Level3({ theme, setTheme }: { theme: string; setTheme: (t: string) => void }) {
  return <Level4 theme={theme} setTheme={setTheme} />;
}

function Level4({ theme, setTheme }: { theme: string; setTheme: (t: string) => void }) {
  return (
    <button 
      style={{ background: theme }} 
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      Toggle {theme}
    </button>
  );
}

export default function App() {
  const [theme, setTheme] = useState('light');
  return <Level1 theme={theme} setTheme={setTheme} />;
}`,
      },
      harnessFiles: {
        "/src/tests.ts": `export const hint = 'Use React Context API to avoid prop drilling';`,
      },
      hints: { text: "Create a typed Context for theme management" },
      runtime: "react",
    },
  });

  // Language variants for ch2c (Observer - Level 3)
  await prisma.languageVariant.upsert({
    where: { challengeId_language: { challengeId: ch2c.id, language: "javascript" } },
    update: {},
    create: {
      challengeId: ch2c.id,
      language: "javascript",
      starterFiles: {
        "/src/Observer.js": `// Implement a custom Observer pattern
class Observer {
  constructor() {
    this.subscribers = [];
  }

  subscribe(callback) {
    this.subscribers.push(callback);
  }

  notify(data) {
    this.subscribers.forEach(cb => cb(data));
  }
}

module.exports = { Observer };`,
      },
      harnessFiles: {
        "/src/tests.js": `const { Observer } = require('./Observer');

module.exports.run = async () => {
  const obs = new Observer();
  let result = [];
  obs.subscribe(data => result.push(data));
  obs.notify('test1');
  obs.notify('test2');
  return result;
};`,
      },
      hints: { text: "Implement subscribe and unsubscribe methods with proper cleanup" },
      runtime: "node",
    },
  });
  await prisma.languageVariant.upsert({
    where: { challengeId_language: { challengeId: ch2c.id, language: "typescript" } },
    update: {},
    create: {
      challengeId: ch2c.id,
      language: "typescript",
      starterFiles: {
        "/src/Observer.ts": `// Implement a typed Observer pattern
export class Observer<T> {
  private subscribers: Array<(data: T) => void> = [];

  subscribe(callback: (data: T) => void): () => void {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(cb => cb !== callback);
    };
  }

  notify(data: T) {
    this.subscribers.forEach(cb => cb(data));
  }
}`,
      },
      harnessFiles: {
        "/src/tests.ts": `import { Observer } from './Observer';

export async function run() {
  const obs = new Observer<string>();
  const result: string[] = [];
  const unsubscribe = obs.subscribe(data => result.push(data));
  obs.notify('test1');
  obs.notify('test2');
  unsubscribe();
  return result;
}`,
      },
      hints: { text: "Add unsubscribe functionality and type safety" },
      runtime: "node",
    },
  });

  // Language variants for ch2d (Observer - Level 4)
  await prisma.languageVariant.upsert({
    where: { challengeId_language: { challengeId: ch2d.id, language: "javascript" } },
    update: {},
    create: {
      challengeId: ch2d.id,
      language: "javascript",
      starterFiles: {
        "/src/EventEmitter.js": `// Implement a robust EventEmitter with middleware support
class EventEmitter {
  constructor() {
    this.events = {};
    this.middlewares = [];
  }

  on(event, handler) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(handler);
    return () => {
      this.events[event] = this.events[event].filter(h => h !== handler);
    };
  }

  emit(event, data) {
    // TODO: Apply middlewares before emitting
    if (this.events[event]) {
      this.events[event].forEach(handler => handler(data));
    }
  }

  use(middleware) {
    this.middlewares.push(middleware);
  }
}

module.exports = { EventEmitter };`,
      },
      harnessFiles: {
        "/src/tests.js": `const { EventEmitter } = require('./EventEmitter');

module.exports.run = async () => {
  const em = new EventEmitter();
  const results = [];
  em.use(data => ({ ...data, middleware: true }));
  em.on('test', d => results.push(d));
  em.emit('test', { value: 1 });
  return results;
};`,
      },
      hints: { text: "Implement middleware chain execution and event filtering" },
      runtime: "node",
    },
  });
  await prisma.languageVariant.upsert({
    where: { challengeId_language: { challengeId: ch2d.id, language: "typescript" } },
    update: {},
    create: {
      challengeId: ch2d.id,
      language: "typescript",
      starterFiles: {
        "/src/EventEmitter.ts": `// Implement a robust, typed EventEmitter with middleware support
type Handler<T> = (data: T) => void;
type Middleware<T> = (data: T) => T;

export class EventEmitter<T> {
  private events: Map<string, Handler<T>[]> = new Map();
  private middlewares: Middleware<T>[] = [];

  on(event: string, handler: Handler<T>): () => void {
    if (!this.events.has(event)) this.events.set(event, []);
    this.events.get(event)!.push(handler);
    return () => {
      const handlers = this.events.get(event)!;
      this.events.set(event, handlers.filter(h => h !== handler));
    };
  }

  emit(event: string, data: T) {
    // TODO: Apply middlewares and emit
    const processed = this.middlewares.reduce((d, mw) => mw(d), data);
    const handlers = this.events.get(event) || [];
    handlers.forEach(handler => handler(processed));
  }

  use(middleware: Middleware<T>): void {
    this.middlewares.push(middleware);
  }
}`,
      },
      harnessFiles: {
        "/src/tests.ts": `import { EventEmitter } from './EventEmitter';

export async function run() {
  interface Event { value: number; middleware?: boolean }
  const em = new EventEmitter<Event>();
  const results: Event[] = [];
  em.use(data => ({ ...data, middleware: true }));
  em.on('test', d => results.push(d));
  em.emit('test', { value: 1 });
  return results;
}`,
      },
      hints: { text: "Create a type-safe event emitter with middleware pipeline" },
      runtime: "node",
    },
  });

  // Language variants for ch3b (Server Component - Level 2)
  await prisma.languageVariant.upsert({
    where: { challengeId_language: { challengeId: ch3b.id, language: "javascript" } },
    update: {},
    create: {
      challengeId: ch3b.id,
      language: "javascript",
      starterFiles: {
        "/src/page.jsx": `"use client";

import { useEffect, useState } from 'react';

export default function Page() {
  const [data, setData] = useState(null);
  const [users, setUsers] = useState(null);

  useEffect(() => {
    fetch('/api/data')
      .then(r => r.json())
      .then(d => setData(d.v));

    fetch('/api/users')
      .then(r => r.json())
      .then(u => setUsers(u));
  }, []);

  return (
    <div>
      <p>{data ?? 'loading data'}</p>
      <p>{users ?? 'loading users'}</p>
    </div>
  );
}`,
      },
      harnessFiles: {
        "/src/tests.js": `export const hint = 'Move data fetches to server component with streaming';`,
      },
      hints: { text: "Convert client data fetching to server component with proper streaming" },
      runtime: "nextjs",
    },
  });
  await prisma.languageVariant.upsert({
    where: { challengeId_language: { challengeId: ch3b.id, language: "typescript" } },
    update: {},
    create: {
      challengeId: ch3b.id,
      language: "typescript",
      starterFiles: {
        "/src/page.tsx": `"use client";

import { useEffect, useState } from 'react';

export default function Page() {
  const [data, setData] = useState<number | null>(null);
  const [users, setUsers] = useState<any[] | null>(null);

  useEffect(() => {
    fetch('/api/data')
      .then(r => r.json())
      .then(d => setData(d.v));

    fetch('/api/users')
      .then(r => r.json())
      .then(u => setUsers(u));
  }, []);

  return (
    <div>
      <p>{data ?? 'loading data'}</p>
      <p>{users ?? 'loading users'}</p>
    </div>
  );
}`,
      },
      harnessFiles: {
        "/src/tests.ts": `export const hint = 'Move to server component with streaming';`,
      },
      hints: { text: "Implement server component with parallel data fetching" },
      runtime: "nextjs",
    },
  });

  // Language variants for ch3c (Server Component - Level 3 Advanced)
  await prisma.languageVariant.upsert({
    where: { challengeId_language: { challengeId: ch3c.id, language: "javascript" } },
    update: {},
    create: {
      challengeId: ch3c.id,
      language: "javascript",
      starterFiles: {
        "/src/page.jsx": `"use client";

import { useEffect, useState } from 'react';

export default function Page() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('/api/data?slow=true')
      .then(r => r.json())
      .then(d => {
        setData(d);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  return <div>{data?.content}</div>;
}`,
      },
      harnessFiles: {
        "/src/tests.js": `export const hint = 'Use Suspense with server components for better UX';`,
      },
      hints: { text: "Refactor to use Suspense boundaries with server components" },
      runtime: "nextjs",
    },
  });
  await prisma.languageVariant.upsert({
    where: { challengeId_language: { challengeId: ch3c.id, language: "typescript" } },
    update: {},
    create: {
      challengeId: ch3c.id,
      language: "typescript",
      starterFiles: {
        "/src/page.tsx": `"use client";

import { useEffect, useState } from 'react';

export default function Page() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('/api/data?slow=true')
      .then(r => r.json())
      .then(d => {
        setData(d);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  return <div>{data?.content}</div>;
}`,
      },
      harnessFiles: {
        "/src/tests.ts": `export const hint = 'Use Suspense boundaries for streaming';`,
      },
      hints: { text: "Implement Suspense for dynamic rendering of server components" },
      runtime: "nextjs",
    },
  });

  // Language variants for ch3d (Server Component - Level 4)
  await prisma.languageVariant.upsert({
    where: { challengeId_language: { challengeId: ch3d.id, language: "javascript" } },
    update: {},
    create: {
      challengeId: ch3d.id,
      language: "javascript",
      starterFiles: {
        "/src/page.jsx": `"use client";

import { useEffect, useState } from 'react';

export default function Page({ params }) {
  const [sections, setSections] = useState([]);
  const [cached, setCached] = useState({});

  useEffect(() => {
    Promise.all([
      fetch('/api/header').then(r => r.json()),
      fetch('/api/sidebar').then(r => r.json()),
      fetch('/api/content').then(r => r.json())
    ]).then(([h, s, c]) => {
      setSections([h, s, c]);
    });
  }, []);

  return (
    <div>
      <div>{sections[0]}</div>
      <aside>{sections[1]}</aside>
      <main>{sections[2]}</main>
    </div>
  );
}`,
      },
      harnessFiles: {
        "/src/tests.js": `export const hint = 'Implement server component architecture with caching and streaming';`,
      },
      hints: { text: "Build complex server component layout with caching strategies" },
      runtime: "nextjs",
    },
  });
  await prisma.languageVariant.upsert({
    where: { challengeId_language: { challengeId: ch3d.id, language: "typescript" } },
    update: {},
    create: {
      challengeId: ch3d.id,
      language: "typescript",
      starterFiles: {
        "/src/page.tsx": `"use client";

import { useEffect, useState } from 'react';

interface Section {
  id: string;
  content: string;
}

export default function Page({ params }: { params: { slug: string } }) {
  const [sections, setSections] = useState<Section[]>([]);
  const [cached, setCached] = useState<Map<string, Section>>(new Map());

  useEffect(() => {
    Promise.all([
      fetch('/api/header').then(r => r.json()),
      fetch('/api/sidebar').then(r => r.json()),
      fetch('/api/content').then(r => r.json())
    ]).then(([h, s, c]) => {
      setSections([h, s, c]);
    });
  }, []);

  return (
    <div>
      <div>{sections[0]?.content}</div>
      <aside>{sections[1]?.content}</aside>
      <main>{sections[2]?.content}</main>
    </div>
  );
}`,
      },
      harnessFiles: {
        "/src/tests.ts": `export const hint = 'Advanced server component patterns with TypeScript';`,
      },
      hints: { text: "Implement advanced caching and rendering strategies" },
      runtime: "nextjs",
    },
  });

  // Language variants for ch1 (original Callback Hell - Level 1)
  
  // Python Variant
  await prisma.languageVariant.upsert({
    where: { challengeId_language: { challengeId: ch1.id, language: "python" } },
    update: {
      starterFiles: {
        "/src/solution.py": `import asyncio
import random

async def fetch_data():
    await asyncio.sleep(0.05)
    return 1

async def process_data(a):
    await asyncio.sleep(0.05)
    return a + 1

async def main():
    a = await fetch_data()
    b = await process_data(a)
    return b
`
      },
      harnessFiles: {
        "/src/test_runner.py": `import json
import inspect
import asyncio

class Assert:
    def __init__(self):
        self.assertions = []
    
    def equal(self, actual, expected, message=None):
        passed = actual == expected
        self.assertions.append({
            "name": message or f"Expected {expected}, got {actual}",
            "passed": passed,
            "expected": expected,
            "actual": actual,
            "error": None if passed else f"Assertion failed: {actual} != {expected}"
        })
        if not passed: raise Exception(f"Assertion failed: {actual} != {expected}")

    def ok(self, value, message=None):
        passed = bool(value)
        self.assertions.append({
            "name": message or f"Expected truthy, got {value}",
            "passed": passed,
            "expected": True,
            "actual": value,
            "error": None if passed else "Expected truthy value"
        })
        if not passed: raise Exception("Expected truthy value")

class TestSuite:
    def __init__(self):
        self.test_cases = []

    async def test(self, name, func):
        assrt = Assert()
        passed = True
        error = None
        try:
            if inspect.iscoroutinefunction(func):
                await func(assrt)
            else:
                func(assrt)
        except Exception as e:
            passed = False
            error = str(e)
        
        self.test_cases.append({
            "name": name,
            "passed": passed,
            "assertions": assrt.assertions,
            "error": error
        })

    def get_results(self):
        total = len(self.test_cases)
        passed_tests = len([t for t in self.test_cases if t["passed"]])
        failed_tests = total - passed_tests
        
        total_asserts = sum(len(t["assertions"]) for t in self.test_cases)
        passed_asserts = sum(len([a for a in t["assertions"] if a["passed"]]) for t in self.test_cases)
        failed_asserts = total_asserts - passed_asserts

        return {
            "passed": failed_tests == 0 and failed_asserts == 0,
            "totalTests": total,
            "passedTests": passed_tests,
            "failedTests": failed_tests,
            "testCases": self.test_cases,
            "totalAssertions": total_asserts,
            "passedAssertions": passed_asserts,
            "failedAssertions": failed_asserts
        }
`,
        "/src/tests.py": `import asyncio
from src.test_runner import TestSuite
from src.solution import main, fetch_data, process_data

async def run():
    suite = TestSuite()

    async def test_execution(assert_obj):
        result = await main()
        assert_obj.equal(result, 2, "Main should return 2")

    await suite.test("Should execute full flow", test_execution)
    
    async def test_parts(assert_obj):
        a = await fetch_data()
        assert_obj.equal(a, 1, "fetch_data should return 1")
        b = await process_data(a)
        assert_obj.equal(b, 2, "process_data should increment")

    await suite.test("Should execute parts", test_parts)

    return suite.get_results()
`,
        "/src/run.py": `import asyncio
import json
import sys
from src.tests import run

if __name__ == "__main__":
    if sys.platform == 'win32':
        asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())
    results = asyncio.run(run())
    print("__TEST_RESULT__ " + json.dumps(results))
`
      },
    },
    create: {
      challengeId: ch1.id,
      language: "python",
      starterFiles: {
        "/src/solution.py": `import asyncio
import random

async def fetch_data():
    await asyncio.sleep(0.05)
    return 1

async def process_data(a):
    await asyncio.sleep(0.05)
    return a + 1

async def main():
    a = await fetch_data()
    b = await process_data(a)
    return b
`
      },
      harnessFiles: {
        "/src/test_runner.py": `import json
import inspect
import asyncio

class Assert:
    def __init__(self):
        self.assertions = []
    
    def equal(self, actual, expected, message=None):
        passed = actual == expected
        self.assertions.append({
            "name": message or f"Expected {expected}, got {actual}",
            "passed": passed,
            "expected": expected,
            "actual": actual,
            "error": None if passed else f"Assertion failed: {actual} != {expected}"
        })
        if not passed: raise Exception(f"Assertion failed: {actual} != {expected}")

    def ok(self, value, message=None):
        passed = bool(value)
        self.assertions.append({
            "name": message or f"Expected truthy, got {value}",
            "passed": passed,
            "expected": True,
            "actual": value,
            "error": None if passed else "Expected truthy value"
        })
        if not passed: raise Exception("Expected truthy value")

class TestSuite:
    def __init__(self):
        self.test_cases = []

    async def test(self, name, func):
        assrt = Assert()
        passed = True
        error = None
        try:
            if inspect.iscoroutinefunction(func):
                await func(assrt)
            else:
                func(assrt)
        except Exception as e:
            passed = False
            error = str(e)
        
        self.test_cases.append({
            "name": name,
            "passed": passed,
            "assertions": assrt.assertions,
            "error": error
        })

    def get_results(self):
        total = len(self.test_cases)
        passed_tests = len([t for t in self.test_cases if t["passed"]])
        failed_tests = total - passed_tests
        
        total_asserts = sum(len(t["assertions"]) for t in self.test_cases)
        passed_asserts = sum(len([a for a in t["assertions"] if a["passed"]]) for t in self.test_cases)
        failed_asserts = total_asserts - passed_asserts

        return {
            "passed": failed_tests == 0 and failed_asserts == 0,
            "totalTests": total,
            "passedTests": passed_tests,
            "failedTests": failed_tests,
            "testCases": self.test_cases,
            "totalAssertions": total_asserts,
            "passedAssertions": passed_asserts,
            "failedAssertions": failed_asserts
        }
`,
        "/src/tests.py": `import asyncio
from src.test_runner import TestSuite
from src.solution import main, fetch_data, process_data

async def run():
    suite = TestSuite()

    async def test_execution(assert_obj):
        result = await main()
        assert_obj.equal(result, 2, "Main should return 2")

    await suite.test("Should execute full flow", test_execution)
    
    async def test_parts(assert_obj):
        a = await fetch_data()
        assert_obj.equal(a, 1, "fetch_data should return 1")
        b = await process_data(a)
        assert_obj.equal(b, 2, "process_data should increment")

    await suite.test("Should execute parts", test_parts)

    return suite.get_results()
`,
        "/src/run.py": `import asyncio
import json
import sys
from src.tests import run

if __name__ == "__main__":
    if sys.platform == 'win32':
        asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())
    results = asyncio.run(run())
    print("__TEST_RESULT__ " + json.dumps(results))
`
      },
      hints: { text: "Use async/await syntax in Python" },
      runtime: "python",
    },
  });

  // Java Variant
  await prisma.languageVariant.upsert({
    where: { challengeId_language: { challengeId: ch1.id, language: "java" } },
    update: {
      starterFiles: {
        "/src/Solution.java": `package src;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

public class Solution {
    public static CompletableFuture<Integer> fetchData() {
        return CompletableFuture.supplyAsync(() -> {
            try { Thread.sleep(50); } catch (InterruptedException e) {}
            return 1;
        });
    }

    public static CompletableFuture<Integer> processData(Integer a) {
        return CompletableFuture.supplyAsync(() -> {
            try { Thread.sleep(50); } catch (InterruptedException e) {}
            return a + 1;
        });
    }

    public static CompletableFuture<Integer> main() {
        return fetchData().thenCompose(Solution::processData);
    }
}
`
      },
      harnessFiles: {
        "/src/TestRunner.java": `package src;

import java.util.ArrayList;
import java.util.List;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Consumer;
import java.util.stream.Collectors;

public class TestRunner {
    static class Assert {
        List<Map<String, Object>> assertions = new ArrayList<>();

        public void equal(Object actual, Object expected, String message) {
            boolean passed = actual.equals(expected);
            Map<String, Object> res = new HashMap<>();
            res.put("name", message != null ? message : "Expected " + expected + ", got " + actual);
            res.put("passed", passed);
            res.put("expected", expected);
            res.put("actual", actual);
            res.put("error", passed ? null : "Assertion failed: " + actual + " != " + expected);
            assertions.add(res);
            if (!passed) throw new RuntimeException((String)res.get("error"));
        }
    }
    
    static class TestCase {
        String name;
        boolean passed;
        String error;
        List<Map<String, Object>> assertions;
    }

    private List<TestCase> testCases = new ArrayList<>();

    public void test(String name, ExceptionalConsumer<Assert> testFunc) {
        TestCase tc = new TestCase();
        tc.name = name;
        Assert assrt = new Assert();
        try {
            testFunc.accept(assrt);
            tc.passed = true;
        } catch (Exception e) {
            tc.passed = false;
            tc.error = e.getMessage();
        }
        tc.assertions = assrt.assertions;
        testCases.add(tc);
    }

    @FunctionalInterface
    public interface ExceptionalConsumer<T> {
        void accept(T t) throws Exception;
    }

    public Map<String, Object> getResults() {
        int total = testCases.size();
        long passedTests = testCases.stream().filter(t -> t.passed).count();
        long failedTests = total - passedTests;
        
        long totalAsserts = testCases.stream().mapToLong(t -> t.assertions.size()).sum();
        long passedAsserts = testCases.stream().flatMap(t -> t.assertions.stream()).filter(a -> (boolean)a.get("passed")).count();
        long failedAsserts = totalAsserts - passedAsserts;

        List<Map<String, Object>> serializedTestCases = testCases.stream().map(t -> {
            Map<String, Object> map = new HashMap<>();
            map.put("name", t.name);
            map.put("passed", t.passed);
            map.put("error", t.error);
            map.put("assertions", t.assertions);
            return map;
        }).collect(Collectors.toList());

        Map<String, Object> results = new HashMap<>();
        results.put("passed", failedTests == 0 && failedAsserts == 0);
        results.put("totalTests", total);
        results.put("passedTests", passedTests);
        results.put("failedTests", failedTests);
        results.put("testCases", serializedTestCases);
        results.put("totalAssertions", totalAsserts);
        results.put("passedAssertions", passedAsserts);
        results.put("failedAssertions", failedAsserts);
        return results;
    }
}
`,
        "/src/Runner.java": `package src;
import src.TestRunner;
import src.Solution;
import java.util.concurrent.CompletableFuture;

public class Runner {
    // A Simple JSON serializer helper since we might not have libs
    // Actually, we'll just manually print JSON string for simplicity or use a tiny helper
    // For this env, let's just manually build the JSON string recursively or use a stripped down logic.
    // However, to be robust, let's standardise on passing JSON string back.
    
    public static void main(String[] args) {
        try {
            TestRunner suite = new TestRunner();
            
            suite.test("Should execute full flow", (assrt) -> {
                Integer res = Solution.main().get();
                assrt.equal(res, 2, "Main should return 2");
            });

            suite.test("Should execute parts", (assrt) -> {
                Integer a = Solution.fetchData().get();
                assrt.equal(a, 1, "fetchData should return 1");
                Integer b = Solution.processData(a).get();
                assrt.equal(b, 2, "processData should increment");
            });

            printJSON(suite.getResults());

        } catch (Exception e) {
            e.printStackTrace();
            System.exit(1);
        }
    }

    private static void printJSON(java.util.Map<String, Object> map) {
       // Super basic JSON serialization
       System.out.print("__TEST_RESULT__ {");
       boolean first = true;
       for (String key : map.keySet()) {
           if (!first) System.out.print(",");
           first = false;
           System.out.print("\\"" + key + "\\":");
           Object val = map.get(key);
           printValue(val);
       }
       System.out.println("}");
    }

    private static void printValue(Object val) {
        if (val instanceof String) {
            System.out.print("\\"" + val + "\\"");
        } else if (val instanceof Integer || val instanceof Long || val instanceof Boolean) {
            System.out.print(val);
        } else if (val instanceof java.util.List) {
            System.out.print("[");
            boolean first = true;
            for (Object o : (java.util.List)val) {
                if (!first) System.out.print(",");
                first = false;
                printValue(o);
            }
            System.out.print("]");
        } else if (val instanceof java.util.Map) {
            System.out.print("{");
             boolean first = true;
            for (Object k : ((java.util.Map)val).keySet()) {
                if (!first) System.out.print(",");
                first = false;
                System.out.print("\\"" + k + "\\":");
                printValue(((java.util.Map)val).get(k));
            }
            System.out.print("}");
        } else if (val == null) {
            System.out.print("null");
        } else {
             System.out.print("\\"" + val.toString() + "\\"");
        }
    }
}
`
      },
    },
    create: {
      challengeId: ch1.id,
      language: "java",
      starterFiles: {
        "/src/Solution.java": `package src;
import java.util.concurrent.CompletableFuture;

public class Solution {
    public CompletableFuture<Integer> fetchData() {
        return CompletableFuture.supplyAsync(() -> {
            try { Thread.sleep(50); } catch (InterruptedException e) {}
            return 1;
        });
    }

    public CompletableFuture<Integer> processData(Integer a) {
        return CompletableFuture.supplyAsync(() -> {
            try { Thread.sleep(50); } catch (InterruptedException e) {}
            return a + 1;
        });
    }

    public CompletableFuture<Integer> main() {
        return fetchData()
            .thenCompose(this::processData);
    }
}
`
      },
      harnessFiles: {
        "/src/TestRunner.java": `package src;
import java.util.*;
import java.util.stream.Collectors;

public class TestRunner {
    static class Assertion {
        String name;
        boolean passed;
        Object expected;
        Object actual;
        String error;

        Assertion(String name, boolean passed, Object expected, Object actual, String error) {
            this.name = name;
            this.passed = passed;
            this.expected = expected;
            this.actual = actual;
            this.error = error;
        }
    }

    static class TestCase {
        String name;
        boolean passed;
        List<Assertion> assertions = new ArrayList<>();
        String error;
    }

    public static class Assert {
        List<Assertion> assertions = new ArrayList<>();

        public void equal(Object actual, Object expected, String message) {
            boolean passed = Objects.equals(actual, expected);
            assertions.add(new Assertion(
                message != null ? message : "Expected " + expected + ", got " + actual,
                passed, expected, actual,
                passed ? null : "Assertion failed"
            ));
            if (!passed) throw new RuntimeException("Assertion failed");
        }
    }

    public static class Suite {
        List<TestCase> testCases = new ArrayList<>();

        public void test(String name, TestInterface fn) {
            TestCase tc = new TestCase();
            tc.name = name;
            Assert assertObj = new Assert();
            try {
                fn.run(assertObj);
                tc.passed = true;
            } catch (Exception e) {
                tc.passed = false;
                tc.error = e.getMessage();
            }
            tc.assertions = assertObj.assertions;
            testCases.add(tc);
        }

        public Map<String, Object> getResults() {
            Map<String, Object> res = new HashMap<>();
            long passedTests = testCases.stream().filter(t -> t.passed).count();
            long totalTests = testCases.size();
            long passedAsserts = testCases.stream().flatMap(t -> t.assertions.stream()).filter(a -> a.passed).count();
            long totalAsserts = testCases.stream().mapToLong(t -> t.assertions.size()).sum();

            res.put("passed", passedTests == totalTests && passedTests > 0);
            res.put("totalTests", totalTests);
            res.put("passedTests", passedTests);
            res.put("failedTests", totalTests - passedTests);
            res.put("testCases", testCases); // Needs full serialization logic preferably
            res.put("totalAssertions", totalAsserts);
            res.put("passedAssertions", passedAsserts);
            res.put("failedAssertions", totalAsserts - passedAsserts);
            return res;
        }
    }

    @FunctionalInterface
    public interface TestInterface {
        void run(Assert a) throws Exception;
    }
}
`,
        "/src/Runner.java": `package src;
import java.util.*;

public class Runner {
    public static void main(String[] args) {
        try {
            TestRunner.Suite suite = new TestRunner.Suite();
            Solution sol = new Solution();

            suite.test("Should return 2", (assertObj) -> {
                Integer result = sol.main().get();
                assertObj.equal(result, 2, "Result should be 2");
            });

            suite.test("Fetch data verification", (assertObj) -> {
                Integer result = sol.fetchData().get();
                assertObj.equal(result, 1, "fetchData should return 1");
            });

            // Manual JSON serialization for output (simple version)
            Map<String, Object> results = suite.getResults();
            StringBuilder json = new StringBuilder();
            json.append("{");
            json.append("\"passed\":").append(results.get("passed")).append(",");
            json.append("\"totalTests\":").append(results.get("totalTests")).append(",");
            json.append("\"passedTests\":").append(results.get("passedTests")).append(",");
            json.append("\"failedTests\":").append(results.get("failedTests")).append(",");
            
            // Serialize test cases simplified
            json.append("\"testCases\":[");
            List<TestRunner.TestCase> cases = (List<TestRunner.TestCase>)results.get("testCases");
            for(int i=0; i<cases.size(); i++) {
                TestRunner.TestCase tc = cases.get(i);
                if(i > 0) json.append(",");
                json.append("{");
                json.append("\"name\":\"").append(tc.name).append("\",");
                json.append("\"passed\":").append(tc.passed).append(",");
                json.append("\"assertions\":[]"); // Skip detailed asserts for brevity in starter
                json.append("}");
            }
            json.append("],");

            json.append("\"totalAssertions\":").append(results.get("totalAssertions")).append(",");
            json.append("\"passedAssertions\":").append(results.get("passedAssertions")).append(",");
            json.append("\"failedAssertions\":").append(results.get("failedAssertions"));
            json.append("}");

            System.out.println("__TEST_RESULT__ " + json.toString());

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
`
      },
      hints: { text: "Use CompletableFuture<T> for async operations" },
      runtime: "java",
    },
  });

  await prisma.languageVariant.upsert({
    where: { challengeId_language: { challengeId: ch1.id, language: "javascript" } },
    update: {
      challengeId: ch1.id,
      language: "javascript",
      starterFiles: {
        "/src/index.js": `function fetchData(cb) {
  setTimeout(() => cb(null, 1), 50);
}

function processData(a, cb) {
  setTimeout(() => cb(null, a + 1), 50);
}

function main(cb) {
  fetchData((err, a) => {
    if (err) return cb(err);
    processData(a, (err, b) => {
      if (err) return cb(err);
      cb(null, b);
    });
  });
}

module.exports = { main };`,
      },
      harnessFiles: {
        "/src/testRunner.js": `class Assert {
  constructor() {
    this.assertions = [];
  }
  equal(actual, expected, message) {
    const passed = actual === expected;
    this.assertions.push({
      name: message || \`Expected \${JSON.stringify(expected)}, got \${JSON.stringify(actual)}\`,
      passed,
      expected,
      actual,
      error: passed ? undefined : \`Assertion failed: \${actual} !== \${expected}\`
    });
    if (!passed) throw new Error(\`Assertion failed: \${actual} !== \${expected}\`);
  }
  ok(value, message) {
    const passed = !!value;
    this.assertions.push({
      name: message || \`Expected truthy value, got \${JSON.stringify(value)}\`,
      passed,
      expected: true,
      actual: value,
      error: passed ? undefined : 'Expected truthy value'
    });
    if (!passed) throw new Error('Expected truthy value');
  }
  getAssertions() {
    return this.assertions;
  }
}
class TestSuite {
  constructor() {
    this.testCases = [];
  }
  async test(name, fn) {
    const assert = new Assert();
    let passed = true;
    let error;
    try {
      await fn(assert);
    } catch (e) {
      passed = false;
      error = e?.message || String(e);
    }
    this.testCases.push({
      name,
      passed,
      assertions: assert.getAssertions(),
      error
    });
  }
  getResults() {
    const testCases = this.testCases;
    const totalTests = testCases.length;
    const passedTests = testCases.filter(t => t.passed).length;
    const failedTests = totalTests - passedTests;
    const totalAssertions = testCases.reduce((sum, t) => sum + t.assertions.length, 0);
    const passedAssertions = testCases.reduce((sum, t) => sum + t.assertions.filter(a => a.passed).length, 0);
    const failedAssertions = totalAssertions - passedAssertions;
    return {
      passed: failedTests === 0 && failedAssertions === 0,
      totalTests,
      passedTests,
      failedTests,
      testCases,
      totalAssertions,
      passedAssertions,
      failedAssertions
    };
  }
}
module.exports = { Assert, TestSuite };`,
        "/src/tests.js": `const { TestSuite } = require('./testRunner.js');
const { main } = require('./index');

module.exports.run = async () => {
  const suite = new TestSuite();

  await suite.test('Should execute fetchData and processData', async (assert) => {
    const result = await new Promise((resolve, reject) => {
      main((err, res) => err ? reject(err) : resolve(res));
    });
    assert.ok(result !== null, 'Result should not be null');
  });

  await suite.test('Should return 2 (1 + 1)', async (assert) => {
    const result = await new Promise((resolve, reject) => {
      main((err, res) => err ? reject(err) : resolve(res));
    });
    assert.equal(result, 2, 'Result should be 2');
  });

  await suite.test('Should handle sequential callbacks', async (assert) => {
    const result = await new Promise((resolve, reject) => {
      main((err, res) => err ? reject(err) : resolve(res));
    });
    assert.equal(typeof result, 'number', 'Result should be a number');
  });

  return suite;
};`,
      },
      hints: { text: "Wrap callbacks with Promise and use async/await" },
      runtime: "node",
    },
    create: {
      challengeId: ch1.id,
      language: "javascript",
      starterFiles: {
        "/src/index.js": `function fetchData(cb) {
  setTimeout(() => cb(null, 1), 50);
}

function processData(a, cb) {
  setTimeout(() => cb(null, a + 1), 50);
}

function main(cb) {
  fetchData((err, a) => {
    if (err) return cb(err);
    processData(a, (err, b) => {
      if (err) return cb(err);
      cb(null, b);
    });
  });
}

module.exports = { main };`,
      },
      harnessFiles: {
        "/src/testRunner.js": `class Assert {
  constructor() {
    this.assertions = [];
  }
  equal(actual, expected, message) {
    const passed = actual === expected;
    this.assertions.push({
      name: message || \`Expected \${JSON.stringify(expected)}, got \${JSON.stringify(actual)}\`,
      passed,
      expected,
      actual,
      error: passed ? undefined : \`Assertion failed: \${actual} !== \${expected}\`
    });
    if (!passed) throw new Error(\`Assertion failed: \${actual} !== \${expected}\`);
  }
  ok(value, message) {
    const passed = !!value;
    this.assertions.push({
      name: message || \`Expected truthy value, got \${JSON.stringify(value)}\`,
      passed,
      expected: true,
      actual: value,
      error: passed ? undefined : 'Expected truthy value'
    });
    if (!passed) throw new Error('Expected truthy value');
  }
  getAssertions() {
    return this.assertions;
  }
}
class TestSuite {
  constructor() {
    this.testCases = [];
  }
  async test(name, fn) {
    const assert = new Assert();
    let passed = true;
    let error;
    try {
      await fn(assert);
    } catch (e) {
      passed = false;
      error = e?.message || String(e);
    }
    this.testCases.push({
      name,
      passed,
      assertions: assert.getAssertions(),
      error
    });
  }
  getResults() {
    const testCases = this.testCases;
    const totalTests = testCases.length;
    const passedTests = testCases.filter(t => t.passed).length;
    const failedTests = totalTests - passedTests;
    const totalAssertions = testCases.reduce((sum, t) => sum + t.assertions.length, 0);
    const passedAssertions = testCases.reduce((sum, t) => sum + t.assertions.filter(a => a.passed).length, 0);
    const failedAssertions = totalAssertions - passedAssertions;
    return {
      passed: failedTests === 0 && failedAssertions === 0,
      totalTests,
      passedTests,
      failedTests,
      testCases,
      totalAssertions,
      passedAssertions,
      failedAssertions
    };
  }
}
module.exports = { Assert, TestSuite };`,
        "/src/tests.js": `const { TestSuite } = require('./testRunner.js');
const { main } = require('./index');

module.exports.run = async () => {
  const suite = new TestSuite();

  await suite.test('Should execute fetchData and processData', async (assert) => {
    const result = await new Promise((resolve, reject) => {
      main((err, res) => err ? reject(err) : resolve(res));
    });
    assert.ok(result !== null, 'Result should not be null');
  });

  await suite.test('Should return 2 (1 + 1)', async (assert) => {
    const result = await new Promise((resolve, reject) => {
      main((err, res) => err ? reject(err) : resolve(res));
    });
    assert.equal(result, 2, 'Result should be 2');
  });

  await suite.test('Should handle sequential callbacks', async (assert) => {
    const result = await new Promise((resolve, reject) => {
      main((err, res) => err ? reject(err) : resolve(res));
    });
    assert.equal(typeof result, 'number', 'Result should be a number');
  });

  return suite;
};`,
      },
      hints: { text: "Wrap callbacks with Promise and use async/await" },
      runtime: "node",
    },
  });
  await prisma.languageVariant.upsert({
    where: { challengeId_language: { challengeId: ch1.id, language: "typescript" } },
    update: {},
    create: {
      challengeId: ch1.id,
      language: "typescript",
      starterFiles: {
        "/src/index.ts": `export function fetchData(cb: (err: any, a?: number) => void) {
  setTimeout(() => cb(null, 1), 50);
}

export function processData(a: number, cb: (err: any, b?: number) => void) {
  setTimeout(() => cb(null, a + 1), 50);
}

export function main(cb: (err: any, result?: number) => void) {
  fetchData((err, a) => {
    if (err) return cb(err);
    processData(a!, (err, b) => {
      if (err) return cb(err);
      cb(null, b);
    });
  });
}`,
      },
      harnessFiles: {
        "/src/testRunner.ts": `export interface TestAssertion {
  name: string;
  passed: boolean;
  expected?: any;
  actual?: any;
  error?: string;
}

export interface TestCase {
  name: string;
  passed: boolean;
  assertions: TestAssertion[];
  error?: string;
}

export interface TestResult {
  passed: boolean;
  totalTests: number;
  passedTests: number;
  failedTests: number;
  testCases: TestCase[];
  totalAssertions: number;
  passedAssertions: number;
  failedAssertions: number;
}

export class Assert {
  private assertions: TestAssertion[] = [];

  equal(actual: any, expected: any, message?: string) {
    const passed = actual === expected;
    this.assertions.push({
      name: message || \`Expected \${JSON.stringify(expected)}, got \${JSON.stringify(actual)}\`,
      passed,
      expected,
      actual,
      error: passed ? undefined : \`Assertion failed: \${actual} !== \${expected}\`
    });
    if (!passed) throw new Error(\`Assertion failed: \${actual} !== \${expected}\`);
  }

  ok(value: any, message?: string) {
    const passed = !!value;
    this.assertions.push({
      name: message || \`Expected truthy value, got \${JSON.stringify(value)}\`,
      passed,
      expected: true,
      actual: value,
      error: passed ? undefined : 'Expected truthy value'
    });
    if (!passed) throw new Error('Expected truthy value');
  }

  getAssertions(): TestAssertion[] {
    return this.assertions;
  }
}

export class TestSuite {
  private testCases: TestCase[] = [];

  async test(name: string, fn: (assert: Assert) => Promise<void> | void) {
    const assert = new Assert();
    let passed = true;
    let error: string | undefined;

    try {
      await fn(assert);
    } catch (e) {
      passed = false;
      error = (e as any)?.message || String(e);
    }

    this.testCases.push({
      name,
      passed,
      assertions: assert.getAssertions(),
      error
    });
  }

  getResults(): TestResult {
    const testCases = this.testCases;
    const totalTests = testCases.length;
    const passedTests = testCases.filter(t => t.passed).length;
    const failedTests = totalTests - passedTests;

    const totalAssertions = testCases.reduce((sum, t) => sum + t.assertions.length, 0);
    const passedAssertions = testCases.reduce(
      (sum, t) => sum + t.assertions.filter(a => a.passed).length,
      0
    );
    const failedAssertions = totalAssertions - passedAssertions;

    return {
      passed: failedTests === 0 && failedAssertions === 0,
      totalTests,
      passedTests,
      failedTests,
      testCases,
      totalAssertions,
      passedAssertions,
      failedAssertions
    };
  }
}`,
        "/src/tests.ts": `import { TestSuite, Assert } from './testRunner';
import { main } from './index';

export async function run(): Promise<TestSuite> {
  const suite = new TestSuite();

  await suite.test('Should execute fetchData and processData', async (assert: Assert) => {
    const result = await new Promise<number>((resolve, reject) => {
      main((err, res) => err ? reject(err) : resolve(res!));
    });
    assert.ok(result !== null, 'Result should not be null');
  });

  await suite.test('Should return 2 (1 + 1)', async (assert: Assert) => {
    const result = await new Promise<number>((resolve, reject) => {
      main((err, res) => err ? reject(err) : resolve(res!));
    });
    assert.equal(result, 2, 'Result should be 2');
  });

  await suite.test('Should handle sequential callbacks', async (assert: Assert) => {
    const result = await new Promise<number>((resolve, reject) => {
      main((err, res) => err ? reject(err) : resolve(res!));
    });
    assert.equal(typeof result, 'number', 'Result should be a number');
  });

  return suite;
}`,
      },
      hints: { text: "Introduce Promise wrappers and convert to async functions" },
      runtime: "node",
    },
  });

  await prisma.languageVariant.upsert({
    where: { challengeId_language: { challengeId: ch2.id, language: "javascript" } },
    update: {},
    create: {
      challengeId: ch2.id,
      language: "javascript",
      starterFiles: {
        "/src/App.jsx": `import React, { useState } from 'react';

function Child({ value, setValue }) {
  return (
    <button onClick={() => setValue(value + 1)}>
      {value}
    </button>
  );
}

export default function App() {
  const [value, setValue] = useState(0);
  return <Child value={value} setValue={setValue} />;
}`,
      },
      harnessFiles: {
        "/src/tests.js": `export const hint = 'Refactor to Context or Observer';`,
      },
      hints: { text: "Create an observer or React Context to avoid drilling" },
      runtime: "react",
    },
  });
  await prisma.languageVariant.upsert({
    where: { challengeId_language: { challengeId: ch2.id, language: "typescript" } },
    update: {},
    create: {
      challengeId: ch2.id,
      language: "typescript",
      starterFiles: {
        "/src/App.tsx": `import React, { useState } from 'react';

function Child({ value, setValue }: { value: number; setValue: (v: number) => void }) {
  return (
    <button onClick={() => setValue(value + 1)}>
      {value}
    </button>
  );
}

export default function App() {
  const [value, setValue] = useState(0);
  return <Child value={value} setValue={setValue} />;
}`,
      },
      harnessFiles: {
        "/src/tests.ts": `export const hint = 'Refactor to Context or Observer';`,
      },
      hints: { text: "Create an observer or React Context to avoid drilling" },
      runtime: "react",
    },
  });
  await prisma.languageVariant.upsert({
    where: { challengeId_language: { challengeId: ch2.id, language: "java" } },
    update: {},
    create: {
      challengeId: ch2.id,
      language: "java",
      starterFiles: {
        "/src/Main.java": `// Java variant coming soon`,
      },
      harnessFiles: {
        "/src/Tests.java": `// Java tests placeholder`,
      },
      hints: { text: "Java support will be added via a backend runner" },
      runtime: "java",
    },
  });
  await prisma.languageVariant.upsert({
    where: { challengeId_language: { challengeId: ch3.id, language: "javascript" } },
    update: {},
    create: {
      challengeId: ch3.id,
      language: "javascript",
      starterFiles: {
        "/src/page.jsx": `"use client";

import { useEffect, useState } from 'react';

export default function Page() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/data')
      .then(r => r.json())
      .then(d => setData(d.v));
  }, []);

  return <div>{data ?? 'loading'}</div>;
}`,
      },
      harnessFiles: {
        "/src/tests.js": `export const hint = 'Move data fetch to a server component';`,
      },
      hints: { text: "Server component should fetch and render; client boundary minimal" },
      runtime: "nextjs",
    },
  });
  await prisma.languageVariant.upsert({
    where: { challengeId_language: { challengeId: ch3.id, language: "typescript" } },
    update: {},
    create: {
      challengeId: ch3.id,
      language: "typescript",
      starterFiles: {
        "/src/page.tsx": `"use client";

import { useEffect, useState } from 'react';

export default function Page() {
  const [data, setData] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/data')
      .then(r => r.json())
      .then(d => setData(d.v));
  }, []);

  return <div>{data ?? 'loading'}</div>;
}`,
      },
      harnessFiles: {
        "/src/tests.ts": `export const hint = 'Move data fetch to a server component';`,
      },
      hints: { text: "Server component should fetch and render; client boundary minimal" },
      runtime: "nextjs",
    },
  });
  await prisma.languageVariant.upsert({
    where: { challengeId_language: { challengeId: ch3.id, language: "java" } },
    update: {},
    create: {
      challengeId: ch3.id,
      language: "java",
      starterFiles: {
        "/src/Page.java": `// Java variant coming soon`,
      },
      harnessFiles: { 
        "/src/Tests.java": `// Java tests placeholder`,
      },
      hints: { text: "Java support will be added via a backend runner" },
      runtime: "java",
    },
  });

  console.log("Seeded patterns, challenges, and language variants.");
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(async () => { await prisma.$disconnect(); });
