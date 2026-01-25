export interface IQuizQuestion {
  question_number: number;
  question_text: string;
  options: string[];
}

export interface IQuizSession {
  session_id: string;
  subtest_name: string;
  questions: IQuizQuestion[];
  expires_at: string;
}

export interface IStartQuizResponse {
  success: boolean;
  data: IQuizSession;
}

export interface IActiveQuizResponse {
  success: boolean;
  data: IQuizSession | null;
}

export interface IQuizAnswers {
  [questionNumber: string]: string;
}

export type ISubmitQuizData = IQuizAnswers;

// export interface ISubmitQuizData {
//   answers: IQuizAnswers;
// } // { answers : { "1": "A", "2": "C" } }

export interface IQuizResult {
  session_id: string;
  subtest_name: string;
  score: number;
  total_questions: number;
  correct_answers: number;
  submitted_at: string;
  answers: IQuizAnswers;
}

export interface ISubmitQuizResponse {
  success: boolean;
  data: IQuizResult;
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
    items: IQuizHistoryItem[];
    total: number;
  };
}

export interface IQuizResultResponse {
  success: boolean;
  data: IQuizResult;
}
