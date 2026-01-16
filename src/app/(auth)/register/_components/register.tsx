"use client";

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
import { INITIAL_REGISTER_FORM } from "@/constants/auth-constant";
import {
  RegisterForm,
  registerSchemaForm,
} from "@/validations/auth-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

import { useForm } from "react-hook-form";

export default function Register() {
  const form = useForm<RegisterForm>({
    resolver: zodResolver(registerSchemaForm),
    defaultValues: INITIAL_REGISTER_FORM,
  });

  const onSubmit = form.handleSubmit(async (data) => {
    console.log(data);
  });

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Student Registration</CardTitle>
        <CardDescription>
          Join the platform to start your first quiz session and track your
          progress.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-4">
            <FormInput
              form={form}
              type="text"
              name="name"
              label="Full Name"
              placeholder="Insert full name here"
            />
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
              placeholder="Create a password"
            />
            <FormInput
              form={form}
              type="password"
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Confirm your password"
            />
            <Button type="submit">Register</Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="self-center">
        <p className="text-[12px] font-light ">
          Already have an account?{" "}
          <Link href="/login" className="font-bold text-blue-800">
            Login
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
