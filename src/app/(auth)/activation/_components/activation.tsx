import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { UserRoundCheck, UserRoundX } from "lucide-react";

interface PropTypes {
  status: "true" | "false";
}

export default function Activation(props: PropTypes) {
  const { status } = props;

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">
          {status === "true" ? "Activation Success" : "Activation Failed"}
        </CardTitle>
        <CardDescription>
          {status === "true"
            ? "Thank you for your registration"
            : "Confirmation code is invalid"}
        </CardDescription>
      </CardHeader>
      <CardContent className="max-w-full">
        {status === "true" ? (
          <UserRoundCheck className="text-emerald-500 size-15 w-full" />
        ) : (
          <UserRoundX className="text-red-500 size-15 w-full" />
        )}
      </CardContent>
      {status === "true" ? (
        <CardFooter className="self-center">
          <Button>Go to login</Button>
        </CardFooter>
      ) : (
        <p className="text-center text-[12px] font-bold ">
          Please check your email to verify your account!
        </p>
      )}
    </Card>
  );
}
