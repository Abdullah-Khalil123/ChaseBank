import React from "react";
import LoginHeader from "./loginHeader";
import Footer from "../partials/footer";
import Image from "next/image";
import LoginForm from "./LoginForm";

const Login = () => {
  return (
    <div className="relative flex flex-col min-h-dvh">
      <Image
        fill
        src={"/background.desktop.day.1.jpeg"}
        alt="Background Login Image"
        className="-z-10 object-cover"
      />
      <LoginHeader />
      <div className="flex-grow flex flex-col justify-between">
        <div className="flex-grow flex items-center justify-center">
          <LoginForm />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Login;
