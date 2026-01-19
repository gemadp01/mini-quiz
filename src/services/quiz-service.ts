import { instance } from "@/libs/axios/instance";

const quizServices = {
  getSubtests: (token: string) =>
    instance.get("/quiz/subtests", {
      headers: { Authorization: `Bearer ${token}` },
    }),
};

export default quizServices;
