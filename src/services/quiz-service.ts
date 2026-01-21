import { instance } from "@/libs/axios/instance";
import endpoint from "@/services/endpoint-constant";
import { ISubmitQuizData } from "@/types/Quiz";

const quizServices = {
  startQuiz: (subtestId: string) =>
    instance.get(`${endpoint.QUIZ}/start/${subtestId}`),

  getActiveQuiz: () => instance.get("/quiz/active"),

  submitQuiz: (data: ISubmitQuizData) =>
    instance.post(`${endpoint.QUIZ}/submit`, data),

  getHistory: (limit = 10, offset = 0) =>
    instance.get(`${endpoint.QUIZ}/history?limit=${limit}&offset=${offset}`),

  getResult: (sessionId: string) =>
    instance.get(`${endpoint.QUIZ}/result/${sessionId}`),
};

export default quizServices;
