import { INITIAL_REGISTER_FORM } from "@/constants/auth-constant";
import authServices from "@/services/auth-service";
import {
  registerSchemaForm,
  TRegisterForm,
} from "@/validations/auth-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const useRegister = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<TRegisterForm>({
    resolver: zodResolver(registerSchemaForm),
    defaultValues: INITIAL_REGISTER_FORM,
  });

  const onSubmit = async (data: TRegisterForm) => {
    try {
      setLoading(true);

      const { name, email, password } = data;
      await authServices.register({ name, email, password });

      router.push("/register/success");
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
        const message =
          error.response?.data.error.message ?? "Something went wrong!";
        toast.error(message, {
          description: error.response?.data.error.details?.split(":")[1],
        });
      } else {
        toast.error("Unexpected error");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    loading,
    onSubmit,
  };
};

export default useRegister;
