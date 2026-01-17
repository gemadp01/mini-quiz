import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MailCheck } from "lucide-react";

export default function RegisterSuccess() {
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Create Account Success!</CardTitle>
        <CardDescription>
          Check your email to verify your account
        </CardDescription>
      </CardHeader>
      <CardContent className="max-w-full">
        <MailCheck className="text-emerald-500 size-15 w-full" />
      </CardContent>
    </Card>
  );
}
