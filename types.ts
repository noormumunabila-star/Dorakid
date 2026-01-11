
export enum Category {
  SCIENCE = 'Science & Stars',
  NATURE = 'Wild Nature',
  HEALTH = 'Body & Health',
  LOGIC = 'Puzzles & Logic',
  HISTORY = 'Amazing History',
  MATHEMATICS = 'Simple Mathematics'
}

export type AgeRange = '5-7' | '8-10' | '11-12';

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  funFact: string;
}

export interface QuizState {
  questions: QuizQuestion[];
  currentQuestionIndex: number;
  score: number;
  isFinished: boolean;
  isLoading: boolean;
}

export interface UserProfile {
  name: string;
  phoneNumber: string;
  ageRange: AgeRange;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  score: number;
  total: number;
  category: string;
  date: string;
  isUser?: boolean;
}
