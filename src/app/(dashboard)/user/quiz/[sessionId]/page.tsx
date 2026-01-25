"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ChevronLeft, ChevronRight, Send } from "lucide-react";
import { toast } from "sonner";
import { useActiveQuiz, useSubmitQuiz } from "@/hooks/useQuiz";
import { IQuizAnswers } from "@/types/Quiz";
import { Timer } from "@/components/common/quiz/timer";
import { Spinner } from "@/components/ui/spinner";
import { useAuthStore } from "@/libs/store/auth-store";
import { AxiosError } from "axios";

export default function QuizPage() {
  const token = useAuthStore((state) => state.token) as string;
  const router = useRouter();
  const params = useParams();
  const sessionId = params.sessionId as string;

  // Ambil data quiz aktif dari API berdasarkan token
  const { data: { data: activeQuizData } = {}, isLoading } =
    useActiveQuiz(token);

  console.log(activeQuizData);

  // Mutation untuk submit jawaban quiz
  const submitQuizMutation = useSubmitQuiz();

  // Index soal yang sedang ditampilkan (0 = soal pertama)
  const [currentQuestion, setCurrentQuestion] = useState(0);

  // Object untuk nyimpen jawaban user
  // Contoh: { "1": "A", "2": "C" }
  const [answers, setAnswers] = useState<IQuizAnswers>({});

  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [showExpiredDialog, setShowExpiredDialog] = useState(false);

  // Validasi session quiz
  useEffect(() => {
    if (activeQuizData?.data && activeQuizData.data.session_id !== sessionId) {
      router.push("/user/dashboard");
    }
  }, [activeQuizData, sessionId, router]);

  const handleAnswerChange = (value: string) => {
    // console.log(value); // isi jawaban user
    /**
		 activeQuizData?.data?.questions[currentQuestion] -> misalnya ada 10 soal, maka ini akan mengambil data soal ke 1
		 activeQuizData?.data?.questions[currentQuestion]?.question_number -> ini akan mengambil nomor soal
		 questionNumber -> nomor soal
		 */
    const questionNumber =
      activeQuizData?.data?.questions[currentQuestion]?.question_number;
    // jika ada nomor soal, simpan jawaban
    if (questionNumber) {
      setAnswers((prev) => ({
        ...prev,
        [questionNumber.toString()]: value,
      }));
    }
    console.log(answers);

    /**
		question_number = 3
		value = "B"
		maka state answers akan berisi:
		{
			"3": "B"
		}
		 */
  };

  const handleNext = () => {
    if (
      activeQuizData?.data &&
      currentQuestion < activeQuizData.data.questions.length - 1
    ) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    /**
		Payload ke API:
		{
			"answers": {
				"1": "A",
				"2": "C",
				"3": "B"
			}
		}
		 */

    try {
      const { data: submitResult } = await submitQuizMutation.mutateAsync({
        data: answers,
        token,
      });
      if (submitResult.success) {
        router.push(`/user/result/${submitResult.data.session_id}`);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        // console.log(error);
        const message =
          error.response?.data.error.message ?? "Something went wrong!";
        toast.error(message, {
          description: error.response?.data.error.details?.split(":")[1],
        });
      } else {
        toast.error("Unexpected error");
      }
    }
    setShowSubmitDialog(false);
  };

  const handleExpire = () => {
    setShowExpiredDialog(true);
  };

  if (isLoading) {
    return <Spinner className="mx-auto size-10" />;
  }

  if (!activeQuizData?.data) {
    return (
      <div className="mx-auto text-center py-12">
        <p className="text-gray-600">No active quiz found.</p>
        <Button onClick={() => router.push("/user/dashboard")} className="mt-4">
          Go to Dashboard
        </Button>
      </div>
    );
  }

  // Ambil data utama dari active quiz:
  // - questions     → daftar semua soal
  // - subtest_name  → nama subtest (misal: Matematika, Bahasa Inggris)
  // - expires_at    → waktu quiz berakhir
  //
  // Contoh activeQuizData.data:
  // {
  //   subtest_name: "Matematika Dasar",
  //   expires_at: "2026-01-22T10:00:00Z",
  //   questions: [
  //     { question_number: 1, question: "2 + 2 = ?" },
  //     { question_number: 2, question: "5 × 3 = ?" },
  //     { question_number: 3, question: "10 - 4 = ?" }
  //   ]
  // }
  const { questions, subtest_name, expires_at } = activeQuizData.data;

  // Ambil satu soal yang sedang aktif berdasarkan index currentQuestion
  // Contoh:
  // currentQuestion = 1
  // question = {
  //   question_number: 2,
  //   question: "5 × 3 = ?"
  // }
  const question = questions[currentQuestion];

  // Hitung progress pengerjaan quiz dalam bentuk persentase
  // Rumus: (soal saat ini + 1) / total soal × 100
  // Contoh:
  // currentQuestion = 1
  // questions.length = 5
  // progress = ((1 + 1) / 5) * 100 = 40
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  // Hitung jumlah soal yang sudah dijawab user
  // Berdasarkan jumlah key di object "answers"
  //
  // Contoh answers:
  // {
  //   "1": "A",
  //   "2": "C",
  //   "4": "B"
  // }
  //
  // answeredCount = 3
  const answeredCount = Object.keys(answers).length;

  return (
    <div className="max-w-5xl w-full mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{subtest_name}</h1>
          <p className="text-gray-500">
            Question {currentQuestion + 1} of {questions.length}
          </p>
        </div>
        {/* <Timer expiresAt={expires_at} onExpire={handleExpire} /> */}
      </div>

      <Progress value={progress} className="h-2" />

      <Card>
        <CardHeader>
          <CardTitle>
            {question.question_number}. {question.question_text.split(":")[0]}:
            <br />
            {question.question_text.split(":")[1]}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={answers[question.question_number.toString()] || ""} // default value dari soal atau jika udah diisi dia langsung load dari answers
            onValueChange={handleAnswerChange}
          >
            {question.options.map((option: string, idx: number) => (
              <div
                key={idx}
                className="flex items-center space-x-2 p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
              >
                <RadioGroupItem value={option} id={`option-${idx}`} />
                <Label htmlFor={`option-${idx}`} className="cursor-pointer">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>

        <div className="text-sm text-gray-500">
          Answered: {answeredCount} / {questions.length}
        </div>

        {currentQuestion < questions.length - 1 ? (
          <Button onClick={handleNext}>
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button onClick={() => setShowSubmitDialog(true)}>
            <Send className="w-4 h-4 mr-2" />
            Submit Quiz
          </Button>
        )}
      </div>

      <AlertDialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Submit Quiz?</AlertDialogTitle>
            <AlertDialogDescription>
              You have answered {answeredCount} out of {questions.length}{" "}
              questions.
              {answeredCount < questions.length && (
                <span className="block mt-2 text-orange-600 font-medium">
                  Warning: You haven{"'"}t answered all questions yet.
                </span>
              )}
              Are you sure you want to submit?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleSubmit}>Submit</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showExpiredDialog} onOpenChange={setShowExpiredDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Time{"'"}s Up!</AlertDialogTitle>
            <AlertDialogDescription>
              The quiz time has expired. Your session is no longer valid.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => router.push("/dashboard")}>
              Go to Dashboard
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

/**
User buka /quiz/:sessionId
        ↓
Ambil token dari store
        ↓
Fetch active quiz (useActiveQuiz)
        ↓
Loading → Spinner
        ↓
Validasi session
        ↓
Render soal ke-1
        ↓
User jawab → answers state
        ↓
Next / Previous
        ↓
Submit
        ↓
API success → /result/:sessionId
 */
