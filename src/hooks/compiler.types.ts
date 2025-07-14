// src/hooks/compiler.types.ts

export interface TestCase {
  input: any;
  expected: any;
  description: string;
}

export interface WorkerMessage {
  code: string;
  tests?: TestCase[];
  timeout?: number;
}

export interface WorkerResponse {
  success: boolean;
  output: string;
  testResults?: {
    passed: number;
    failed: number;
    total: number;
    failureMessage?: string;
  };
}
