// src/hooks/useCompiler.ts

import { useState, useEffect, useCallback } from 'react';
import { WorkerMessage, WorkerResponse } from './compiler.types';

export const useCompiler = () => {
  const [result, setResult] = useState<WorkerResponse | null>(null);
  const [worker, setWorker] = useState<Worker | null>(null);

  useEffect(() => {
    const worker = new Worker(new URL('./compiler.worker.ts', import.meta.url));
    setWorker(worker);

    worker.onmessage = (event: MessageEvent<WorkerResponse>) => {
      setResult(event.data);
    };

    return () => {
      worker.terminate();
    };
  }, []);

  const compile = useCallback((code: string) => {
    if (worker) {
      worker.postMessage({ code } as WorkerMessage);
    }
  }, [worker]);

  return { result, compile };
};
