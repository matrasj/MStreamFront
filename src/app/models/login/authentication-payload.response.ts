export interface AuthenticationPayloadResponse {
  jwtToken: string;
  refreshToken: string;
  expiresAt: string | Date;
  email: string;
}
