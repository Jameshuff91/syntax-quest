// src/hooks/useCompiler.ts

import { useState } from 'react';

interface CompileResult {
  success: boolean;
  output: string;
}

export const useCompiler = () => {
  const [result, setResult] = useState<CompileResult | null>(null);

  const compile = (code: string) => {
    try {
      // Here, you can integrate a real compiler or use eval cautiously
      // For simplicity, we'll use eval in this example
      // In production, replace this with a secure method
      // eslint-disable-next-line no-eval
      const func = eval(code);
      setResult({ success: true, output: "Code executed successfully." });
    } catch (error: any) {
      setResult({ success: false, output: error.message });
    }
  };

  return { result, compile };
};
