
export enum ErrorType {
  REASONING = 'Reasoning error',
  RECALL = 'Recall error',
  BORDERLINE = 'Borderline / Ambiguous'
}

export interface Interaction {
  id: number;
  label?: string;
  aiResponse: string;
  prompt: string;
  choices: string[];
  correctChoice?: string;
  reveal: {
    highlightText: string;
    label: string;
    decisiveSignal: string;
    explanation: string;
  };
}
