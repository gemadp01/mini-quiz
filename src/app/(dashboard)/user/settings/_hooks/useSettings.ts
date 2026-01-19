import {
  INITIAL_PROFILE_DATA_FORM,
  INITIAL_PROFILE_SECURITY_FORM,
} from "@/constants/profile-constant";
import { useAuthStore } from "@/libs/store/auth-store";
import authServices from "@/services/auth-service";
import {
  profileDataSchemaForm,
  profileSecuritySchemaForm,
  TProfileDataForm,
  TProfileSecurityForm,
} from "@/validations/profile-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const useSettings = () => {
  const profileData = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token) as string;
  const [loadingProfileData, setLoadingProfileData] = useState(false);

  const formProfileData = useForm<TProfileDataForm>({
    resolver: zodResolver(profileDataSchemaForm),
    defaultValues: INITIAL_PROFILE_DATA_FORM,
  });

  const formProfileSecurity = useForm<TProfileSecurityForm>({
    resolver: zodResolver(profileSecuritySchemaForm),
    defaultValues: INITIAL_PROFILE_SECURITY_FORM,
  });

  const onSubmitProfileData = async (data: TProfileDataForm) => {
    try {
      setLoadingProfileData(true);

      await authServices.updateProfileData(token, data);
      useAuthStore.getState().updateUser(data);
      toast.success("Profile data updated!");
    } catch (error) {
      if (error instanceof AxiosError) {
        // console.error(error.response);
        const message =
          error.response?.data.error.message ?? "Something went wrong!";
        toast.error(message);
      } else {
        toast.error("Unexpected error");
      }
    } finally {
      setLoadingProfileData(false);
    }
  };

  const onSubmitProfileSecurity = async (data: TProfileSecurityForm) => {
    try {
      setLoadingProfileData(true);

      await authServices.updateProfileSecurity(token, data);

      toast.success("Profile security updated!");
    } catch (error) {
      if (error instanceof AxiosError) {
        // console.error(error.response);
        const message = error.response?.data.error ?? "Something went wrong!";
        toast.error(message);
      } else {
        toast.error("Unexpected error");
      }
    } finally {
      setLoadingProfileData(false);
    }
  };

  useEffect(() => {
    if (profileData) {
      formProfileData.reset({
        name: profileData.name ?? "",
        email: profileData.email ?? "",
      });
    }
  }, [profileData, formProfileData]);

  return {
    formProfileData,
    formProfileSecurity,
    onSubmitProfileData,
    onSubmitProfileSecurity,
    loadingProfileData,
  };
};

export default useSettings;
