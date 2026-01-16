import z from "zod";

const email = z
  .string()
  .min(1, "Email is required")
  .email("Please enter a valid email address");

const password = z.string().min(1, "Password is required");

export const loginSchemaForm = z.object({
  email,
  password,
});

export const registerSchemaForm = z
  .object({
    name: z.string().min(1, "Name is required"),
    email,
    password,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "password does not match",
    path: ["confirmPassword"],
  });

export type LoginForm = z.infer<typeof loginSchemaForm>;
export type RegisterForm = z.infer<typeof registerSchemaForm>;
