import { INITIAL_LOGIN_FORM } from "@/constants/auth-constant";
import { useAuthStore } from "@/libs/store/auth-store";
import authServices from "@/services/auth-service";
import { loginSchemaForm, TLoginForm } from "@/validations/auth-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const useLogin = () => {
  const router = useRouter();
  const { setUser, clearAuth } = useAuthStore();
  const user = useAuthStore((state) => state.user);

  const [loading, setLoading] = useState(false);

  const form = useForm<TLoginForm>({
    resolver: zodResolver(loginSchemaForm),
    defaultValues: INITIAL_LOGIN_FORM,
  });

  const onSubmit = async (data: TLoginForm) => {
    try {
      setLoading(true);

      const { data: loginResponse } = await authServices.login(data); // ini akan otomatis throw error jika status code 400, 401, 403, 404, 409, 422, 500, 502, 503

      if (loginResponse.success) {
        const { access_token } = loginResponse.data;

        const { data: userResponse } =
          await authServices.getCurrentUser(access_token);

        if (userResponse.success) {
          setUser(userResponse.data);
          toast.success("Login successful!");
          router.push("/user");
        }
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        // console.log(error);
        const message =
          error.response?.data.error.message ?? "Something went wrong!";
        toast.error(message);
      } else {
        toast.error("Unexpected error");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      clearAuth();
    }
  }, [clearAuth, user]);

  return {
    form,
    onSubmit,
    loading,
  };
};

export default useLogin;
