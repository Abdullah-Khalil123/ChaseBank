"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "../../providers/AuthProvider";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirectUrl") || "/overview";
  const { login, isAuthenticated, getToken } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [useToken, setUseToken] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [debugInfo, setDebugInfo] = useState("");
  const [errors, setErrors] = useState({
    email: false,
    password: false,
    token: false,
  });

  // Check if user is already authenticated and redirect if needed
  // This is needed to handle direct navigation to login page while already authenticated
  useEffect(() => {
    const checkAuth = () => {
      const isAuth = isAuthenticated();
      const currentToken = getToken();
      console.log(
        "Login page auth check:",
        isAuth ? "Authenticated" : "Not authenticated"
      );

      if (isAuth && currentToken) {
        console.log(
          "User is already authenticated, redirecting to:",
          redirectUrl
        );
        router.replace(redirectUrl);
      }
    };

    checkAuth();
  }, [isAuthenticated, redirectUrl, router, getToken]);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setLoginError("");
    setDebugInfo("");

    // Validate fields
    const newErrors = {
      email: email.trim() === "",
      password: password.trim() === "",
      token: useToken && token.trim() === "",
    };

    setErrors(newErrors);

    // If no errors, proceed with login
    if (
      !newErrors.email &&
      !newErrors.password &&
      !(useToken && newErrors.token)
    ) {
      setIsLoading(true);

      try {
        // Use the login function from AuthProvider
        await login(email, password, rememberMe);

        // Debug check after login
        const currentToken = getToken();
        console.log("After login, token exists:", currentToken ? "Yes" : "No");
        setDebugInfo(`Login successful!`);

        // Redirect after login
        console.log("Redirecting to", decodeURIComponent(redirectUrl));
        router.push(decodeURIComponent(redirectUrl));
      } catch (error) {
        console.error("Login error:", error);
        setLoginError(
          error instanceof Error
            ? error.message
            : "An error occurred during login"
        );
        setIsLoading(false);
      }
    }
  };

  const handleTokenChange = (checked: boolean) => {
    setUseToken(checked);
    if (!checked) {
      setErrors({ ...errors, token: false });
    }
  };

  return (
    <div className="h-full min-h-[500px] flex items-center justify-center bg-cover bg-center py-8">
      <div className="bg-white p-8 rounded shadow-md w-[384px] h-auto">
        {loginError && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-sm">
            {loginError}
          </div>
        )}

        {debugInfo && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded text-sm">
            {debugInfo}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-6 relative">
            <label
              htmlFor="email"
              className="text-gray-600 text-sm font-medium"
            >
              Username
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full py-1 border-b-[1px] border-black outline-none bg-transparent"
              required
            />
            {errors.email && (
              <div className="flex items-center mt-1 text-xs text-red-500">
                <span className="inline-flex items-center justify-center w-4 h-4 mr-1 rounded-full bg-red-100 text-red-500">
                  !
                </span>
                Please enter your email.
              </div>
            )}
          </div>

          <div className="mb-6 relative">
            <label
              htmlFor="password"
              className="text-gray-600 text-sm font-medium"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full py-1 border-b-[1px] border-black outline-none bg-transparent"
                required
              />
              <span
                className="absolute right-0 top-1 text-sm font-bold text-[#0060F0] cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                Show
              </span>
            </div>
            {errors.password && (
              <div className="flex items-center mt-1 text-xs text-red-500">
                <span className="inline-flex items-center justify-center w-4 h-4 mr-1 rounded-full bg-red-100 text-red-500">
                  !
                </span>
                Please enter your password.
              </div>
            )}
          </div>

          {useToken && (
            <div className="mb-6 relative">
              <label
                htmlFor="token"
                className="text-gray-600 text-sm font-medium"
              >
                Token
              </label>
              <input
                type="text"
                id="token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="w-full py-1 border-b-2 border-blue-500 outline-none bg-transparent"
                required={useToken}
              />
              {errors.token && (
                <div className="flex items-center mt-1 text-xs text-red-500">
                  <span className="inline-flex items-center justify-center w-4 h-4 mr-1 rounded-full bg-red-100 text-red-500">
                    !
                  </span>
                  Please enter your token code.
                </div>
              )}
            </div>
          )}

          <div className="flex justify-between mb-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember-me"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="mr-2 size-5"
              />
              <label htmlFor="remember-me" className="text-gray-700 text-sm">
                Remember me
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="use-token"
                checked={useToken}
                onChange={(e) => handleTokenChange(e.target.checked)}
                className="mr-2 size-5"
              />
              <label htmlFor="use-token" className="text-gray-700 text-sm">
                Use token
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition-colors ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>

          <div className="mt-6 space-y-2">
            <Link
              href="/forgot-password"
              className="text-[#0060F0] hover:underline flex items-center text-sm"
            >
              Forgot username/password?{" "}
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
            <Link
              href="/signup"
              className="text-[#0060F0] hover:underline flex items-center text-sm"
            >
              Not Enrolled? Sign Up Now.{" "}
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
