import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@radix-ui/react-dropdown-menu";
import { RadioGroupItem } from "@radix-ui/react-radio-group";
import { ChevronLeft, ChevronRight, Send } from "lucide-react";

export default function QuizPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">test</h1>
          <p className="text-gray-600">Question test of test</p>
        </div>
        {/* <Timer  /> */}test
      </div>

      {/* <Progress value={progress} className="h-2" /> */}

      <Card>
        <CardHeader>
          <CardTitle>test</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
          // value={answers[question.question_number.toString()] || ""}
          // onValueChange={handleAnswerChange}
          >
            <div
              // key={idx}
              className="flex items-center space-x-2 p-4 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {/* <RadioGroupItem value={option} id={`option-${idx}`} /> */}
              <Label htmlFor={`option-`} className="flex-1 cursor-pointer">
                test
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          // onClick={handlePrevious}
          // disabled={currentQuestion === 0}
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>

        <div className="text-sm text-gray-600">
          {/* Answered: {answeredCount} / {questions.length} */}
        </div>

        {/* {currentQuestion < questions.length - 1 ? ( */}
        <Button
        // onClick={handleNext}
        >
          Next
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
        {/* ) : ( */}
        <Button
        // onClick={() => setShowSubmitDialog(true)}
        >
          <Send className="w-4 h-4 mr-2" />
          Submit Quiz
        </Button>
        {/* )} */}
      </div>

      {/* <AlertDialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
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
      </AlertDialog> */}
    </div>
  );
}
