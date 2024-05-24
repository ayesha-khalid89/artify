"use client";

import "@styles/Login.scss";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signIn("credentials", {
        redirect: false,
        email: email,
        password: password,
        callbackUrl: "/",
      });
      if (response.ok) {
        router.push("/");
      }

      if (response.error) {
        setError("Invalid Email or Password");
      }
    } catch (err) {
      console.log("err");
    }
  };
  const loginWithGoogle = () => {
    signIn("google", { callbackUrl: "/" });
  };
  return (
    <div className="login">
      <img src="/assets/login.jpg" alt="login" className="login_decor" />
      <div className="login_content">
        <form className="login_content_form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
          {error && <p className="error">{error}</p>}
          <button type="submit">Log In</button>
        </form>
        <button onClick={loginWithGoogle} className="google">
          <p>Log In with Google</p>
          <FcGoogle />
        </button>
        <a href="/register">Don't have an account? Sign Up here.</a>
      </div>
    </div>
  );
};

export default Login;
