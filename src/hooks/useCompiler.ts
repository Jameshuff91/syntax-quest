// src/hooks/useCompiler.ts

import { useState, useEffect, useCallback } from 'react';
import { WorkerMessage, WorkerResponse, TestCase } from './compiler.types';

export const useCompiler = (isTestingRealm: boolean = false) => {
  const [result, setResult] = useState<WorkerResponse | null>(null);
  const [worker, setWorker] = useState<Worker | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const workerUrl = isTestingRealm 
      ? new URL('./testing-sandbox.worker.ts', import.meta.url)
      : new URL('./secure-sandbox.worker.ts', import.meta.url);
    const worker = new Worker(workerUrl);
    setWorker(worker);

    worker.onmessage = (event: MessageEvent<WorkerResponse>) => {
      setResult(event.data);
      setIsLoading(false);
    };

    worker.onerror = (error) => {
      console.error('Worker error:', error);
      setResult({
        success: false,
        output: 'Worker error: ' + error.message
      });
      setIsLoading(false);
    };

    return () => {
      worker.terminate();
    };
  }, [isTestingRealm]);

  const compile = useCallback((code: string, tests?: TestCase[], timeout?: number) => {
    if (worker) {
      setIsLoading(true);
      setResult(null);
      worker.postMessage({ code, tests, timeout } as WorkerMessage);
    }
  }, [worker]);

  return { result, compile, isLoading };
};
