export interface LoginResponseModel {
  jwtToken: string;
  refreshToken: string;
  expiresAt: string | Date;
  username: string;
}
