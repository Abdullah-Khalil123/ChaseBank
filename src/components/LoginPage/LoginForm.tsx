"use client";

import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [useToken, setUseToken] = useState(false);
  const [errors, setErrors] = useState({
    username: false,
    password: false,
    token: false,
  });

  interface LoginCredentials {
    username: string;
    password: string;
    token?: string;
    rememberMe: boolean;
    useToken: boolean;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    // Validate fields
    const newErrors = {
      username: username.trim() === "",
      password: password.trim() === "",
      token: useToken && token.trim() === "",
    };

    setErrors(newErrors);

    // If no errors, proceed with login
    if (
      !newErrors.username &&
      !newErrors.password &&
      !(useToken && newErrors.token)
    ) {
      // Handle login logic here
      const credentials: LoginCredentials = {
        username,
        password,
        rememberMe,
        useToken,
      };

      if (useToken) {
        credentials.token = token;
      }

      console.log(credentials);
      router.push("/overview");
    }
  };

  const handleTokenChange = (checked: boolean) => {
    setUseToken(checked);
    if (!checked) {
      setErrors({ ...errors, token: false });
    }
  };

  return (
    <div className="h-[500px] flex items-center justify-center bg-cover bg-center">
      <Head>
        <title>Login</title>
        <meta name="description" content="Login page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="bg-white p-8 rounded shadow-md w-full min-w-[414px]">
        <form onSubmit={handleSubmit}>
          <div className="mb-6 relative">
            <label
              htmlFor="username"
              className="text-gray-600 text-sm font-medium"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full py-1 border-b-2 border-blue-500 outline-none bg-transparent"
              required
            />
            {errors.username && (
              <div className="flex items-center mt-1 text-xs text-red-500">
                <span className="inline-flex items-center justify-center w-4 h-4 mr-1 rounded-full bg-red-100 text-red-500">
                  !
                </span>
                Please tell us your username.
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
                className="w-full py-1 border-b-2 border-blue-500 outline-none bg-transparent"
                required
              />
              <span
                className="absolute right-0 top-1 text-sm text-blue-500 cursor-pointer"
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
                Please tell us your password.
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
                  Please tell us your token code.
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
                className="mr-2"
              />
              <label htmlFor="remember-me" className="text-gray-700">
                Remember me
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="use-token"
                checked={useToken}
                onChange={(e) => handleTokenChange(e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="use-token" className="text-gray-700">
                Use token
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition-colors"
          >
            Sign in
          </button>

          <div className="mt-6 space-y-2">
            <Link
              href="/forgot-password"
              className="text-blue-500 hover:underline flex items-center"
            >
              Forgot username/password?{" "}
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
            <Link
              href="/signup"
              className="text-blue-500 hover:underline flex items-center"
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
