// src/hooks/useCompiler.ts

import { useState, useEffect, useCallback } from 'react';

interface CompileResult {
  success: boolean;
  output: string;
}

export const useCompiler = () => {
  const [result, setResult] = useState<CompileResult | null>(null);
  const [worker, setWorker] = useState<Worker | null>(null);

  useEffect(() => {
    const worker = new Worker(new URL('./compiler.worker.ts', import.meta.url));
    setWorker(worker);

    worker.onmessage = (event) => {
      setResult(event.data);
    };

    return () => {
      worker.terminate();
    };
  }, []);

  const compile = useCallback((code: string) => {
    if (worker) {
      worker.postMessage({ code });
    }
  }, [worker]);

  return { result, compile };
};
