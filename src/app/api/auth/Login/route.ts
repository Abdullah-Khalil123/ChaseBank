// app/api/login/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password } = body;

  // Mock auth logic (replace with your actual auth check)
  if (email === "admin@example.com" && password === "password123") {
    const token = "mocked-auth-token"; // Replace with real JWT or session token

    const res = NextResponse.json({ message: "Login successful" });
    res.cookies.set("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });

    return res;
  }

  return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
}
