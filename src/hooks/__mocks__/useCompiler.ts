// src/hooks/__mocks__/useCompiler.ts

import { useState, useCallback } from 'react';
import { WorkerResponse, TestCase } from '../compiler.types';

export const useCompiler = (isTestingRealm: boolean = false) => {
  const [result, setResult] = useState<WorkerResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const compile = useCallback((code: string, tests?: TestCase[], timeout?: number) => {
    setIsLoading(true);
    
    // Mock successful compilation for tests
    setTimeout(() => {
      setResult({
        success: true,
        output: 'All tests passed!',
        testResults: {
          passed: tests?.length || 1,
          failed: 0,
          total: tests?.length || 1
        }
      });
      setIsLoading(false);
    }, 100);
  }, []);

  return { result, compile, isLoading };
};