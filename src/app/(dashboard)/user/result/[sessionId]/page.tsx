"use client";

import { useRouter, useParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle2, XCircle, Home, History } from "lucide-react";
import { format } from "date-fns";
import { useQuizResult } from "@/hooks/useQuiz";
import { useAuthStore } from "@/libs/store/auth-store";

export default function ResultPage() {
  const token = useAuthStore((state) => state.token) as string;
  const router = useRouter();
  const params = useParams();
  const sessionId = params.sessionId as string;

  const { data: { data: quizResult } = {}, isLoading } = useQuizResult(
    sessionId,
    token,
  );

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Skeleton className="h-12 w-64" />
        <Skeleton className="h-96" />
      </div>
    );
  }

  if (!quizResult?.data) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Result not found.</p>
        <Button onClick={() => router.push("/dashboard")} className="mt-4">
          Go to Dashboard
        </Button>
      </div>
    );
  }

  const percentage =
    (quizResult.data.result.score / quizResult.data.result.total_questions) *
    100;
  const isPassed = percentage >= 60;
  const dataResult = quizResult.data.result;
  // console.log(dataResult);

  return (
    <div className="max-w-6xl w-full mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Quiz Results</h1>
        <p className="text-gray-600 mt-2">{dataResult.subtest_name}</p>
      </div>

      <Card
        className={`border-2 ${isPassed ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}
      >
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-3xl">
                {dataResult.score} / {dataResult.total_questions}
              </CardTitle>
              <CardDescription className="text-lg mt-2">
                {percentage.toFixed(1)}% Score
              </CardDescription>
            </div>
            <div
              className={`p-4 rounded-full ${isPassed ? "bg-green-200" : "bg-red-200"}`}
            >
              {isPassed ? (
                <CheckCircle2 className="w-12 h-12 text-green-700" />
              ) : (
                <XCircle className="w-12 h-12 text-red-700" />
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg">
              <p className="text-sm text-gray-600">Correct Answers</p>
              <p className="text-2xl font-bold text-green-600">
                {dataResult.correct_answers}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <p className="text-sm text-gray-600">Wrong Answers</p>
              <p className="text-2xl font-bold text-red-600">
                {dataResult.total_questions - dataResult.correct_answers}
              </p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg">
            <p className="text-sm text-gray-600">Submitted At</p>
            <p className="text-lg font-medium">
              {format(new Date(dataResult.completed_at), "PPpp")}
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Status</p>
            <Badge
              variant={isPassed ? "default" : "destructive"}
              className="text-base px-4 py-1"
            >
              {isPassed ? "PASSED" : "FAILED"}
            </Badge>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button
          onClick={() => router.push("/user/dashboard")}
          variant="outline"
          className="flex-1 cursor-pointer"
        >
          <Home className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
        <Button
          onClick={() => router.push("/user/history")}
          className="flex-1 cursor-pointer"
        >
          <History className="w-4 h-4 mr-2" />
          View History
        </Button>
      </div>
    </div>
  );
}
