
export interface QuizOption {
  id: string;
  text: string;
  points: number;
  image?: string;
}

export interface QuizQuestion {
  id: string;
  text: string;
  image?: string;
  options: QuizOption[];
}

export interface QuizResult {
  id: string;
  title: string;
  description: string;
  image?: string;
  minScore: number;
  maxScore: number;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  image: string;
  questions: QuizQuestion[];
  results: QuizResult[];
}
