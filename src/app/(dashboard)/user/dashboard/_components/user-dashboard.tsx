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
import { Spinner } from "@/components/ui/spinner";
import {
  SUBTEST_ICON_MAP,
  subtestsIconKey,
} from "@/constants/subtests-constant";
import { useAuthStore } from "@/libs/store/auth-store";
import subtestsServices from "@/services/subtests-service";
import { ISubtest } from "@/types/Subtest";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useMemo, useState } from "react";
import { Fragment } from "react/jsx-runtime";
import { toast } from "sonner";

export default function UserDashboard() {
  const token = useAuthStore((state) => state.token) as string;
  const [searchTerm, setSearchTerm] = useState("");

  const { data: { data: subtests } = {}, isLoading } = useQuery({
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

  const subtestsFiltered = useMemo(() => {
    if (!searchTerm) return subtests;

    return subtests.filter((subtest: ISubtest) =>
      subtest.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [searchTerm, subtests]);

  if (isLoading) return <Spinner className="mx-auto size-10" />;

  return (
    <>
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
                  <Badge>
                    {subtest.is_active ? "Not Started" : "Complete"}
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
                <Button className="w-full">Start Quiz</Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </>
  );
}
