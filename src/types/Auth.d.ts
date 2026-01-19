export interface IUser {
  id: string;
  email: string;
  name: string;
  is_verified: boolean;
  role: string;
  created_at: string;
  updated_at: string;
}

export interface IAuthSuccessResponse {
  success: boolean;
  data: {
    access_token: string;
    refresh_token: string;
    expires_in: number;
  };
}

// export interface IRefreshTokenResponse {
//   success: boolean;
//   data: {
//     access_token: string;
//     refresh_token: string;
//     expires_in: number;
//   };
// }

export interface IRegisterData {
  email: string;
  password: string;
  name: string;
}

export interface ILoginData {
  email: string;
  password: string;
}

export interface IVerifyEmailData {
  token: string;
}

export interface IVerifyEmailResponse {
  success: boolean;
  message: string;
}
