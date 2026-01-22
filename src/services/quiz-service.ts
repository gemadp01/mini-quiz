import { instance } from "@/libs/axios/instance";
import endpoint from "@/services/endpoint-constant";
import { ISubmitQuizData } from "@/types/Quiz";

const quizServices = {
  startQuiz: (subtestId: string, token: string) =>
    instance.get(`${endpoint.QUIZ}/start/${subtestId}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  getActiveQuiz: (token: string) =>
    instance.get(`${endpoint.QUIZ}/active`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  submitQuiz: (data: ISubmitQuizData, token: string) =>
    instance.post(`${endpoint.QUIZ}/submit`, data, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  getHistory: (limit = 10, offset = 0, token: string) =>
    instance.get(`${endpoint.QUIZ}/history?limit=${limit}&offset=${offset}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  getResult: (sessionId: string, token: string) =>
    instance.get(`${endpoint.QUIZ}/result/${sessionId}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
};

export default quizServices;
