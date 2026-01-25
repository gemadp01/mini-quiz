import quizServices from "@/services/quiz-service";
import { ISubmitQuizData } from "@/types/Quiz";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

type StartQuizPayload = {
  subtestId: string;
  token: string;
};

export const useStartQuiz = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ subtestId, token }: StartQuizPayload) =>
      await quizServices.startQuiz(subtestId, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activeQuiz"] });
    },
    onError: (error: AxiosError<{ error?: string }>) => {
      const message = error.response?.data?.error || "Failed to start quiz";
      toast.error(message);
    },
  });
};

export const useActiveQuiz = (token: string) =>
  useQuery({
    queryKey: ["activeQuiz", token],
    queryFn: async () => await quizServices.getActiveQuiz(token),
    refetchOnWindowFocus: false,
    enabled: !!token,
  });

export const useSubmitQuiz = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      data,
      token,
    }: {
      data: ISubmitQuizData;
      token: string;
    }) => await quizServices.submitQuiz(data, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activeQuiz"] });
      queryClient.invalidateQueries({ queryKey: ["quizHistory"] });
      toast.success("Quiz submitted successfully!");
    },
    onError: (error: AxiosError<{ error?: string }>) => {
      console.log(error);
      const message = error.response?.data?.error || "Failed to submit quiz";
      toast.error(message);
    },
  });
};

export const useQuizHistory = (limit = 10, offset = 0, token: string) =>
  useQuery({
    queryKey: ["quizHistory", limit, offset],
    queryFn: async () => await quizServices.getHistory(limit, offset, token),
  });

export const useQuizResult = (sessionId: string, token: string) =>
  useQuery({
    queryKey: ["quizResult", sessionId],
    queryFn: async () => await quizServices.getResult(sessionId, token),
    enabled: !!sessionId && !!token,
  });
