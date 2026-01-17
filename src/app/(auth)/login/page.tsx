import Login from "@/app/(auth)/login/_components/login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Mini Quiz",
  description: "Login to your account",
};

export default function LoginPage() {
  return <Login />;
}
