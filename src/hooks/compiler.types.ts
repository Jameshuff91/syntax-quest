// src/hooks/compiler.types.ts

export interface WorkerMessage {
  code: string;
}

export interface WorkerResponse {
  success: boolean;
  output: string;
}
