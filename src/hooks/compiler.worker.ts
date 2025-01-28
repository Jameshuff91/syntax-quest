// src/hooks/compiler.worker.ts

import { WorkerMessage, WorkerResponse } from './compiler.types';

self.onmessage = (event: MessageEvent<WorkerMessage>) => {
  const { code } = event.data;
  
  // Set timeout for code execution (5 seconds)
  const timeout = 5000;
  let timeoutId: NodeJS.Timeout;

  const timeoutPromise = new Promise((_, reject) => {
    timeoutId = setTimeout(() => {
      reject(new Error(`Execution timed out after ${timeout}ms`));
    }, timeout);
  });

  const executionPromise = new Promise((resolve, reject) => {
    try {
      // Create a function from the code string
      const func = new Function(code);
      func();
      resolve("Code executed successfully.");
    } catch (error) {
      reject(error);
    }
  });

  Promise.race([executionPromise, timeoutPromise])
    .then((output) => {
      clearTimeout(timeoutId);
      self.postMessage({ success: true, output } as WorkerResponse);
    })
    .catch((error) => {
      clearTimeout(timeoutId);
      self.postMessage({ success: false, output: error.message } as WorkerResponse);
    });
};

export {};
