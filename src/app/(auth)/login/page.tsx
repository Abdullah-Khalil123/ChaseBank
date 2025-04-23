"use client";

import React, { Suspense } from "react";
import Login from "@/components/LoginPage";

const LoginPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Login />
    </Suspense>
  );
};

export default LoginPage;
