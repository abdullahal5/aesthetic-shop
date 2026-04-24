import { TApiResponse } from ".";

// Request Types
export type TLoginRequest = {
  username: string;
  password: string;
};

// Response Types
export type TLoginResponse = {
  accessToken: string;
  refreshToken: string;
  admin: {
    id: string;
    username: string;
    role: string;
    email?: string;
  };
};

export type TRefreshTokenResponse = {
  accessToken: string;
};

export type TJwtPayload = {
  id?: string;
  username: string;
  role: string;
};

// Combined types for hooks
export type LoginResponseWrapper = TApiResponse<TLoginResponse>;
export type RefreshTokenResponseWrapper = TApiResponse<TRefreshTokenResponse>;
export type LogoutResponseWrapper = TApiResponse<null>;
export type AdminInfoResponseWrapper = TApiResponse<{
  id: string;
  username: string;
  role: string;
  isActive: boolean;
  lastLogin: Date;
}>;
