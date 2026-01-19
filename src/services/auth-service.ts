import { instance } from "@/libs/axios/instance";
import endpoint from "@/services/endpoint-constant";
import { ILoginData, IRegisterData } from "@/types/Auth";

const authServices = {
  register: (payload: IRegisterData) =>
    instance.post(`${endpoint.AUTH}/register`, payload),

  login: (payload: ILoginData) =>
    instance.post(`${endpoint.AUTH}/login`, payload),

  logout: () => instance.post(`${endpoint.AUTH}/logout`),

  getCurrentUser: (token: string) =>
    instance.get("/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    }),

  // refresh: async (refreshToken: string) => {
  //   const response = await instance.post<IRefreshTokenResponse>(
  //     `${endpoint.AUTH}/refresh`,
  //     {
  //       refresh_token: refreshToken,
  //     },
  //   );
  //   return response.data;
  // },
};

export default authServices;
