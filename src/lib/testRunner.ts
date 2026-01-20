/**
 * Simple test framework for challenge execution
 * Provides assertion utilities and test case tracking
 */

export interface TestAssertion {
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
      name: message || `Expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`,
      passed,
      expected,
      actual,
      error: passed ? undefined : `Assertion failed: ${actual} !== ${expected}`
    });
    if (!passed) throw new Error(`Assertion failed: ${actual} !== ${expected}`);
  }

  deepEqual(actual: any, expected: any, message?: string) {
    const passed = JSON.stringify(actual) === JSON.stringify(expected);
    this.assertions.push({
      name: message || `Expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`,
      passed,
      expected,
      actual,
      error: passed ? undefined : `Assertion failed: deep equal`
    });
    if (!passed) throw new Error(`Assertion failed: deep equal`);
  }

  ok(value: any, message?: string) {
    const passed = !!value;
    this.assertions.push({
      name: message || `Expected truthy value, got ${JSON.stringify(value)}`,
      passed,
      expected: true,
      actual: value,
      error: passed ? undefined : 'Expected truthy value'
    });
    if (!passed) throw new Error('Expected truthy value');
  }

  throws(fn: () => any, message?: string) {
    let thrown = false;
    try {
      fn();
    } catch (e) {
      thrown = true;
    }
    this.assertions.push({
      name: message || 'Expected function to throw',
      passed: thrown,
      error: thrown ? undefined : 'Expected function to throw'
    });
    if (!thrown) throw new Error('Expected function to throw');
  }

  getAssertions(): TestAssertion[] {
    return this.assertions;
  }

  clearAssertions() {
    this.assertions = [];
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
}
