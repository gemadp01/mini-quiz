import RegisterSuccess from "@/app/(auth)/register/_components/register-success";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register Success | Mini Quiz",
  description: "Register Success!",
};

export default function RegisterSuccessPage() {
  return <RegisterSuccess />;
}
