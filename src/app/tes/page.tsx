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
import { Loader2, ChevronLeft, ChevronRight, Send } from "lucide-react";
import { toast } from "sonner";
import { useActiveQuiz, useSubmitQuiz } from "@/hooks/useQuiz";
import { IQuizAnswers } from "@/types/Quiz";
import { Timer } from "@/components/common/quiz/timer";

export default function QuizPage() {
  const router = useRouter();
  const params = useParams();
  const sessionId = params.sessionId as string;

  const { data: activeQuizData, isLoading } = useActiveQuiz();
  const submitQuizMutation = useSubmitQuiz();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<IQuizAnswers>({});
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [showExpiredDialog, setShowExpiredDialog] = useState(false);

  useEffect(() => {
    if (activeQuizData?.data && activeQuizData.data.session_id !== sessionId) {
      router.push("/dashboard");
    }
  }, [activeQuizData, sessionId, router]);

  const handleAnswerChange = (value: string) => {
    const questionNumber =
      activeQuizData?.data?.questions[currentQuestion]?.question_number;
    if (questionNumber) {
      setAnswers((prev) => ({
        ...prev,
        [questionNumber.toString()]: value,
      }));
    }
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
    try {
      const result = await submitQuizMutation.mutateAsync({ answers });
      if (result.success) {
        router.push(`/result/${result.data.session_id}`);
      }
    } catch (error) {
      toast.error("Failed to submit quiz");
    }
    setShowSubmitDialog(false);
  };

  const handleExpire = () => {
    setShowExpiredDialog(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (!activeQuizData?.data) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No active quiz found.</p>
        <Button onClick={() => router.push("/dashboard")} className="mt-4">
          Go to Dashboard
        </Button>
      </div>
    );
  }

  const { questions, subtest_name, expires_at } = activeQuizData.data;
  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const answeredCount = Object.keys(answers).length;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{subtest_name}</h1>
          <p className="text-gray-600">
            Question {currentQuestion + 1} of {questions.length}
          </p>
        </div>
        <Timer expiresAt={expires_at} onExpire={handleExpire} />
      </div>

      <Progress value={progress} className="h-2" />

      <Card>
        <CardHeader>
          <CardTitle>
            {question.question_number}. {question.question_text}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={answers[question.question_number.toString()] || ""}
            onValueChange={handleAnswerChange}
          >
            {question.options.map((option, idx) => (
              <div
                key={idx}
                className="flex items-center space-x-2 p-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <RadioGroupItem value={option} id={`option-${idx}`} />
                <Label
                  htmlFor={`option-${idx}`}
                  className="flex-1 cursor-pointer"
                >
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

        <div className="text-sm text-gray-600">
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
