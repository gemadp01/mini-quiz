export interface IProfileData {
  name: string;
  email: string;
}

export interface IProfileSecurity {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}
