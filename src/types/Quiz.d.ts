export interface IQuizQuestion {
  question_number: number;
  question_text: string;
  options: string[];
}

export interface IQuizSession {
  session_id: string;
  subtest_name: string;
  questions: QuizQuestion[];
  expires_at: string;
}

export interface IStartQuizResponse {
  success: boolean;
  data: QuizSession;
}

export interface IActiveQuizResponse {
  success: boolean;
  data: QuizSession | null;
}

export interface IQuizAnswers {
  [questionNumber: string]: string;
}

export interface ISubmitQuizData {
  answers: QuizAnswers;
}

export interface IQuizResult {
  session_id: string;
  subtest_name: string;
  score: number;
  total_questions: number;
  correct_answers: number;
  submitted_at: string;
  answers: QuizAnswers;
}

export interface ISubmitQuizResponse {
  success: boolean;
  data: QuizResult;
}

export interface IQuizHistoryItem {
  session_id: string;
  subtest_name: string;
  score: number;
  submitted_at: string;
}

export interface IQuizHistoryResponse {
  success: boolean;
  data: {
    items: QuizHistoryItem[];
    total: number;
  };
}

export interface IQuizResultResponse {
  success: boolean;
  data: QuizResult;
}
