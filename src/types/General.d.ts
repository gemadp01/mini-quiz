export interface IApiErrorResponse extends Error {
  success: false;
  error: {
    code: string;
    message: string;
  };
}
