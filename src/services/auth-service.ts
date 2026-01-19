import { instance } from "@/libs/axios/instance";
import endpoint from "@/services/endpoint-constant";
import { ILoginData, IRegisterData } from "@/types/Auth";
import { IProfileData, IProfileSecurity } from "@/types/Profile";

const authServices = {
  register: (payload: IRegisterData) =>
    instance.post(`${endpoint.AUTH}/register`, payload),

  login: (payload: ILoginData) =>
    instance.post(`${endpoint.AUTH}/login`, payload),

  logout: () => instance.post(`${endpoint.AUTH}/logout`),

  getCurrentUser: (token: string) =>
    instance.get(`${endpoint.AUTH}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  updateProfileData: (token: string, payload: IProfileData) =>
    instance.put(`${endpoint.PROFILE}/profile-data`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  updateProfileSecurity: (token: string, payload: IProfileSecurity) =>
    instance.put(`${endpoint.PROFILE}/profile-security`, payload, {
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
