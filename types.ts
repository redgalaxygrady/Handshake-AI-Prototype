
export enum ErrorType {
  REASONING = 'Reasoning error',
  RECALL = 'Recall error',
  BORDERLINE = 'Borderline / Ambiguous'
}

export interface Interaction {
  id: number;
  aiResponse: string;
  prompt: string;
  choices: string[];
  correctChoice?: string;
  reveal: {
    highlightText?: string;
    label?: string;
    explanation: string;
    definitions?: {
      reasoning: string;
      recall: string;
    };
  };
}
