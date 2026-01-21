/* eslint-disable @typescript-eslint/no-explicit-any */
import quizServices from "@/services/quiz-service";
import { ISubmitQuizData } from "@/types/Quiz";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useStartQuiz = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (subtestId: string) => quizServices.startQuiz(subtestId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activeQuiz"] });
    },
    onError: (error: any) => {
      const message = error.response?.data?.error || "Failed to start quiz";
      toast.error(message);
    },
  });
};

export const useActiveQuiz = () => {
  return useQuery({
    queryKey: ["activeQuiz"],
    queryFn: quizServices.getActiveQuiz,
    refetchOnWindowFocus: false,
  });
};

export const useSubmitQuiz = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ISubmitQuizData) => quizServices.submitQuiz(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activeQuiz"] });
      queryClient.invalidateQueries({ queryKey: ["quizHistory"] });
      toast.success("Quiz submitted successfully!");
    },
    onError: (error: any) => {
      const message = error.response?.data?.error || "Failed to submit quiz";
      toast.error(message);
    },
  });
};

export const useQuizHistory = (limit = 10, offset = 0) => {
  return useQuery({
    queryKey: ["quizHistory", limit, offset],
    queryFn: () => quizServices.getHistory(limit, offset),
  });
};

export const useQuizResult = (sessionId: string) => {
  return useQuery({
    queryKey: ["quizResult", sessionId],
    queryFn: () => quizServices.getResult(sessionId),
    enabled: !!sessionId,
  });
};
