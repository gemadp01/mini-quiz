"use client";

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
import { useAuthStore } from "@/libs/store/auth-store";
import quizServices from "@/services/quiz-service";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export default function UserDashboard() {
  const token = useAuthStore((state) => state.token) as string;

  const { data: subtests, isLoading } = useQuery({
    queryKey: ["subtests"],
    queryFn: async () => {
      const { data } = await quizServices.getSubtests(token);

      if (data.error)
        toast.error("Get subtests failed", {
          description: data.error.message,
        });

      return data;
    },
  });

  return (
    <div className="w-full">
      <div className="flex flex-col lg:flex-row mb-4 gap-2 justify-between w-full">
        <h1 className="text-2xl font-bold">User Quiz History</h1>
        <div className="flex gap-2">
          <Input placeholder="Search by name" />
        </div>
      </div>
      <div className="mb-5">
        <p>Select a module to begin your assesment.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
        {isLoading && <div>Loading...</div>}
        {subtests?.map(
          (subtest: {
            id: string;
            name: string;
            description: string;
            is_active: boolean;
          }) => (
            <Card key={subtest.id} className="flex flex-col justify-between">
              <CardHeader>
                <CardTitle className="text-xl">{subtest.name}</CardTitle>
                <CardAction>
                  <Badge>
                    {subtest.is_active ? "Not Started" : "Complete"}
                  </Badge>
                </CardAction>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {subtest.description}
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Start Quiz</Button>
              </CardFooter>
            </Card>
          ),
        )}
      </div>
    </div>
  );
}
