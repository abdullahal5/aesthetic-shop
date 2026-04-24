import { axiosClient } from "@/lib/axios.client";
import type {
  TLoginRequest,
  LoginResponseWrapper,
  RefreshTokenResponseWrapper,
  LogoutResponseWrapper,
  AdminInfoResponseWrapper,
} from "@/types/auth.types";

export const authService = {
  login: async (payload: TLoginRequest): Promise<LoginResponseWrapper> => {
    const { data } = await axiosClient.post<LoginResponseWrapper>(
      "/auth/login",
      payload,
    );
    return data;
  },

  refreshToken: async (
    refreshToken: string,
  ): Promise<RefreshTokenResponseWrapper> => {
    const { data } = await axiosClient.post<RefreshTokenResponseWrapper>(
      "/auth/refresh-token",
      { refreshToken },
    );
    return data;
  },

  logout: async (): Promise<LogoutResponseWrapper> => {
    const { data } =
      await axiosClient.post<LogoutResponseWrapper>("/auth/logout");
    return data;
  },

  getAdminInfo: async (): Promise<AdminInfoResponseWrapper> => {
    const { data } =
      await axiosClient.get<AdminInfoResponseWrapper>("/auth/admin-info");
    return data;
  },
};
