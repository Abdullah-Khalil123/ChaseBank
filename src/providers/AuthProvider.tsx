"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";
import { AxiosError } from "axios";

// Define types for user and context
interface User {
  id: string;
  name: string;
  email: string;
  role: boolean;
  balance: number;
  availableCredit: number;
  accountName?: string;
  accountType?: string;
  accountNumber?: string;
  phone?: string;
  address?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (
    email: string,
    password: string,
    rememberMe: boolean
  ) => Promise<User>;
  logout: () => void;
  getToken: () => string | null;
  isAuthenticated: () => boolean;
}

interface LoginResponse {
  token: string;
  data: {
    user: User;
  };
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

// Helper function to set a cookie
const setCookie = (name: string, value: string, days?: number) => {
  let cookieString = `${name}=${value}; path=/; SameSite=Lax`;

  if (days) {
    const expires = new Date(Date.now() + days * 86400000).toUTCString();
    cookieString += `; expires=${expires}`;
  }

  document.cookie = cookieString;
};

// Helper function to get a cookie
const getCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null; // Handle server-side

  const cookieString = document.cookie;
  const cookies = cookieString.split(";");

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name + "=")) {
      return cookie.substring(name.length + 1);
    }
  }
  return null;
};

// Helper function to delete a cookie
const deleteCookie = (name: string) => {
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Lax`;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check authentication when component mounts
    const checkAuth = async () => {
      try {
        // First check for auth cookie (most reliable)
        const authCookie = getCookie("authToken");

        // Then check session storage (for current session only)
        let authToken = sessionStorage.getItem("authToken");
        let userData = sessionStorage.getItem("user");

        // If not in session storage, try local storage (for "Remember me" = true)
        if (!authToken) {
          authToken = localStorage.getItem("authToken");
          userData = localStorage.getItem("user");
        }

        // Debug auth state
        console.debug("Auth check state:", {
          cookie: !!authCookie,
          sessionToken: !!sessionStorage.getItem("authToken"),
          localToken: !!localStorage.getItem("authToken"),
          userDataExists: !!userData,
        });

        // If no auth token or cookie found, user is not authenticated
        if ((!authToken && !authCookie) || !userData) {
          console.debug("No valid auth tokens found");
          setUser(null);
          setLoading(false);
          return;
        }

        // If auth token is found, set the user
        try {
          const parsedUser = JSON.parse(userData);
          console.debug("Setting user from storage:", parsedUser.id);
          setUser(parsedUser);
        } catch (e) {
          console.error("Error parsing user data:", e);
          setUser(null);

          // Clear invalid data
          sessionStorage.removeItem("authToken");
          sessionStorage.removeItem("user");
          localStorage.removeItem("authToken");
          localStorage.removeItem("user");
          if (typeof window !== "undefined") {
            deleteCookie("authToken");
          }
        }
        setLoading(false);
      } catch (error) {
        console.error("Auth check error:", error);
        setUser(null);
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (
    email: string,
    password: string,
    rememberMe: boolean
  ): Promise<User> => {
    try {
      const response = await axiosInstance.post<LoginResponse>("/auth/login", {
        email,
        password,
      });

      // With Axios, we don't need to check content-type as it automatically parses JSON
      const { token, data: userData } = response.data;

      // Make sure the response has the expected structure
      if (!token || !userData || !userData.user) {
        throw new Error("Invalid response format from server");
      }

      // Store auth data
      if (rememberMe) {
        // For "Remember me" = true: store in localStorage (persists after browser close)
        localStorage.setItem("authToken", token);
        localStorage.setItem("user", JSON.stringify(userData.user));

        // Remove from sessionStorage to avoid conflicts
        sessionStorage.removeItem("authToken");
        sessionStorage.removeItem("user");

        // Set cookie with 30-day expiry
        setCookie("authToken", token, 30);
      } else {
        // For "Remember me" = false: store in sessionStorage (cleared when browser is closed)
        sessionStorage.setItem("authToken", token);
        sessionStorage.setItem("user", JSON.stringify(userData.user));

        // Remove from localStorage to avoid conflicts
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");

        // Set cookie with session expiry (no days parameter)
        // This creates a session cookie that persists until browser close
        setCookie("authToken", token);
      }

      console.log(
        "Login successful, token stored",
        token ? "exists" : "not found",
        "Remember me:",
        rememberMe
      );

      setUser(userData.user);
      return userData.user;
    } catch (error) {
      console.error("Login error:", error);

      // Handle Axios error properly
      if (error instanceof AxiosError && error.response) {
        throw new Error(error.response.data?.message || "Login failed");
      }

      throw error;
    }
  };

  // Logout function
  const logout = () => {
    try {
      // Clear storage regardless of API success
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      localStorage.removeItem("accountData");
      sessionStorage.removeItem("authToken");
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("accountData");

      // Also remove the cookie
      if (typeof window !== "undefined") {
        deleteCookie("authToken");
      }

      // Reset state
      setUser(null);

      // Redirect to login
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Get current auth token
  const getToken = (): string | null => {
    if (typeof window !== "undefined") {
      return (
        getCookie("authToken") ||
        localStorage.getItem("authToken") ||
        sessionStorage.getItem("authToken")
      );
    }
    return null;
  };

  // Verify if user is authenticated
  const isAuthenticated = (): boolean => {
    const token = getToken();
    const userExists =
      user !== null ||
      !!sessionStorage.getItem("user") ||
      !!localStorage.getItem("user");

    return !!token && userExists;
  };

  const contextValue: AuthContextType = {
    user,
    loading,
    login,
    logout,
    getToken,
    isAuthenticated,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
