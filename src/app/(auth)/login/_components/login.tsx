"use client";

import useLogin from "@/app/(auth)/login/_hooks/useLogin";
import FormInput from "@/components/common/form-input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Spinner } from "@/components/ui/spinner";

import Link from "next/link";

export default function Login() {
  const { form, loading, onSubmit } = useLogin();

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Welcome Back</CardTitle>
        <CardDescription>
          Please sign in to access your examination dashboard.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormInput
              form={form}
              type="email"
              name="email"
              label="Email"
              placeholder="Insert email here"
            />
            <FormInput
              form={form}
              type="password"
              name="password"
              label="Password"
              placeholder="********"
            />
            <Button type="submit">{loading ? <Spinner /> : "Login"}</Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="self-center">
        <p className="text-[12px] font-light">
          Don{"'"}t have an account? {""}
          <Link
            href="/register"
            className="font-bold text-blue-500 hover:text-blue-600"
          >
            Register for an exam
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
