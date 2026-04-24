import { toast } from "sonner";

type ToastType = "success" | "error" | "info" | "warning";

interface ToastOptions {
  description?: string;
  duration?: number;
  position?:
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "top-center"
    | "bottom-center";
  icon?: string | React.ReactNode;
}

export const showToast = {
  success: (title: string, options?: ToastOptions) => {
    toast.success(title, {
      description: options?.description,
      duration: options?.duration || 3000,
      position: options?.position || "bottom-right",
      icon: options?.icon || "✅",
    });
  },

  error: (title: string, options?: ToastOptions) => {
    toast.error(title, {
      description: options?.description,
      duration: options?.duration || 4000,
      position: options?.position || "bottom-right",
      icon: options?.icon || "❌",
    });
  },

  info: (title: string, options?: ToastOptions) => {
    toast.info(title, {
      description: options?.description,
      duration: options?.duration || 3000,
      position: options?.position || "bottom-right",
      icon: options?.icon || "ℹ️",
    });
  },

  warning: (title: string, options?: ToastOptions) => {
    toast.warning(title, {
      description: options?.description,
      duration: options?.duration || 4000,
      position: options?.position || "bottom-right",
      icon: options?.icon || "⚠️",
    });
  },

  loading: (title: string, options?: Omit<ToastOptions, "icon">) => {
    return toast.loading(title, {
      description: options?.description,
      position: options?.position || "bottom-right",
    });
  },

  dismiss: (id?: string | number) => {
    if (id) {
      toast.dismiss(id);
    } else {
      toast.dismiss();
    }
  },
};

// Optional: Predefined toast messages for auth
export const authToasts = {
  loginSuccess: (username?: string) => ({
    title: "Login Successful!",
    description: `Welcome back, ${username || "Admin"}!`,
  }),
  loginError: (error?: string) => ({
    title: "Login Failed",
    description: error || "Invalid username or password",
  }),
  logoutSuccess: {
    title: "Logged Out",
    description: "You have been successfully logged out.",
  },
  logoutError: {
    title: "Logout Failed",
    description: "An error occurred during logout.",
  },
  sessionExpired: {
    title: "Session Expired",
    description: "Please login again to continue.",
  },
};
