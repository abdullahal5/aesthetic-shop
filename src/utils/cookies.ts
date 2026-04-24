export const setCookie = (
  name: string,
  value: string,
  days: number = 7,
  path: string = "/",
) => {
  if (typeof document === "undefined") return;

  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);

  document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=${path}; SameSite=Lax; ${window.location.protocol === "https:" ? "Secure;" : ""}`;
};

export const getCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) {
    return parts.pop()?.split(";").shift() || null;
  }

  return null;
};

export const deleteCookie = (name: string, path: string = "/") => {
  if (typeof document === "undefined") return;

  document.cookie = `${name}=; path=${path}; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
};

// For multiple tokens
export const setAuthCookies = (accessToken: string, refreshToken: string) => {
  setCookie("accessToken", accessToken, 1); // 1 day
  setCookie("refreshToken", refreshToken, 7); // 7 days
};

export const clearAuthCookies = () => {
  deleteCookie("accessToken");
  deleteCookie("refreshToken");
};
