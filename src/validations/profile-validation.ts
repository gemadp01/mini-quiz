import z from "zod";

const email = z
  .string()
  .min(1, "Email is required")
  .refine((value) => value.toLowerCase().endsWith("@gmail.com"), {
    message: "Email must be a @gmail.com address",
  });

const name = z.string().min(1, "Name is required");

const password = z.string().min(8, "Password must be at least 8 characters");

export const profileDataSchemaForm = z.object({
  name,
  email,
});

export const profileSecuritySchemaForm = z
  .object({
    oldPassword: password,
    newPassword: password,
    confirmNewPassword: password,
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "password does not match",
    path: ["confirmNewPassword"],
  });

export type TProfileDataForm = z.infer<typeof profileDataSchemaForm>;
export type TProfileSecurityForm = z.infer<typeof profileSecuritySchemaForm>;
