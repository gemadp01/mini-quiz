"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import {
  SUBTEST_ICON_MAP,
  subtestsIconKey,
} from "@/constants/subtests-constant";
import { useActiveQuiz, useStartQuiz } from "@/hooks/useQuiz";
import { useAuthStore } from "@/libs/store/auth-store";
import subtestsServices from "@/services/subtests-service";
import { ISubtest } from "@/types/Subtest";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { AlertCircle, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Fragment } from "react/jsx-runtime";
import { toast } from "sonner";

export default function UserDashboard() {
  const router = useRouter();
  const token = useAuthStore((state) => state.token) as string;
  const [searchTerm, setSearchTerm] = useState("");

  const { data: { data: activeQuizData } = {} } = useActiveQuiz(token);
  const startQuizMutation = useStartQuiz();
  const [selectedSubtest, setSelectedSubtest] = useState<string | null>(null);
  const [showActiveQuizDialog, setShowActiveQuizDialog] = useState(false);

  const { data: { data: subtestsData } = {}, isLoading: subtestsLoading } =
    useQuery({
      queryKey: ["subtests", token],
      queryFn: async () => {
        try {
          const { data } = await subtestsServices.getSubtests(token);

          return data;
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
      },
      enabled: !!token, // enabled when token is available, but it can't be used with useSuspenseQuery
    });

  // console.log(activeQuizData);
  // console.log(subtestsData);

  const subtestsFiltered = useMemo(() => {
    if (!searchTerm) return subtestsData;

    return subtestsData.filter((subtest: ISubtest) =>
      subtest.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [searchTerm, subtestsData]);

  const handleStartQuiz = async (subtestId: string) => {
    if (activeQuizData?.data) {
      setSelectedSubtest(subtestId);
      setShowActiveQuizDialog(true);
      return;
    }

    try {
      const result = await startQuizMutation.mutateAsync({ subtestId, token });
      console.log(result);

      if (result.data.success) {
        router.push(`/quiz/${result.data.session_id}`);
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
  };

  const handleResumeQuiz = () => {
    if (activeQuizData?.data) {
      router.push(`/user/quiz/${activeQuizData.data.session_id}`);
    }
  };

  if (subtestsLoading) return <Spinner className="mx-auto size-10" />;

  return (
    <>
      {activeQuizData?.data && (
        <Alert className=" border-blue-200 mb-4">
          <AlertCircle className="w-4 h-4 dark:bg-red-500 rounded-2xl mt-1.5" />
          <AlertDescription className="flex items-center justify-between">
            <span>
              You have an active quiz:{" "}
              <span className="font-bold text-red-500">
                {activeQuizData.data.subtest_name}
              </span>
            </span>
            <Button
              size="sm"
              className="ml-4 cursor-pointer"
              onClick={handleResumeQuiz}
            >
              Resume <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </AlertDescription>
        </Alert>
      )}
      <div className="mb-5">
        <Input
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
        {!subtestsFiltered || subtestsFiltered.length === 0 ? (
          <div>No subtests found!</div>
        ) : (
          subtestsFiltered?.map((subtest: ISubtest) => (
            <Card key={subtest.id} className="flex flex-col justify-between">
              <CardHeader>
                <CardTitle className="text-xl">
                  <div className="w-fit bg-white p-2 items-center justify-center rounded-md">
                    {SUBTEST_ICON_MAP[
                      subtest.name
                        .split(" ")[0]
                        .toLowerCase() as subtestsIconKey
                    ].map((item) => (
                      <Fragment key={item.title}>
                        <item.icon className={item.className} />
                      </Fragment>
                    ))}
                  </div>
                </CardTitle>
                <CardAction>
                  <Badge
                    variant={
                      activeQuizData?.data.subtest_name === subtest.name
                        ? "secondary"
                        : "default"
                    }
                  >
                    {activeQuizData?.data.subtest_name === subtest.name
                      ? "In progress..."
                      : subtest.is_active
                        ? "Not Started"
                        : "Complete"}
                  </Badge>
                </CardAction>
              </CardHeader>
              <CardContent className="space-y-2">
                <h2 className="text-xl font-semibold">{subtest.name}</h2>
                <p className="text-sm text-muted-foreground">
                  {subtest.description}
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => handleStartQuiz(subtest.id)}
                  className="w-full cursor-pointer"
                  variant={
                    activeQuizData?.data.subtest_name === subtest.name
                      ? "outline"
                      : "default"
                  }
                  disabled={activeQuizData?.data}
                >
                  {activeQuizData?.data.subtest_name === subtest.name
                    ? "In progress..."
                    : "Start Quiz"}
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>

      <AlertDialog
        open={showActiveQuizDialog}
        onOpenChange={setShowActiveQuizDialog}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Active Quiz Found</AlertDialogTitle>
            <AlertDialogDescription>
              You already have an active quiz session. Would you like to resume
              it or start a new one? Note: Starting a new quiz will discard your
              current progress.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button variant="outline" onClick={handleResumeQuiz}>
              Resume Current
            </Button>
            <AlertDialogAction
            // onClick={handleForceNewQuiz}
            >
              Start New
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
