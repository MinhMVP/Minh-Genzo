
export type Grade = number;

export interface Lesson {
  id: string;
  title: string;
  category: 'grammar' | 'vocabulary' | 'practice';
  content: string;
  formula?: string;
  usage?: string[];
  examples?: string[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  title: string;
  grade: Grade;
  type: 'midterm' | 'final' | 'graduation' | 'regular';
  questions: QuizQuestion[];
}

export interface VocabularyItem {
  word: string;
  pronunciation: string;
  meaning: string;
  example: string;
  image?: string;
}

export type View = 'home' | 'lessons' | 'vocabulary' | 'quizzes' | 'ai-tutor' | 'translation' | 'grammar-detail';
