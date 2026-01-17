import Register from "@/app/(auth)/register/_components/register";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register | Mini Quiz",
  description: "Register to your account",
};

export default function RegisterPage() {
  return <Register />;
}
