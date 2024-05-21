"use client";
import "@styles/Register.scss";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
const Register = () => {
  const router = useRouter();
  const [formData, setFormdata] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
  });
  const [passwordMatch, setPasswordMatch] = useState(true);
  useEffect(() => {
    setPasswordMatch(
      formData.password !== formData.confirmPassword &&
        formData.confirmPassword !== ""
        ? false
        : true
    );
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value, files } = e.target;
    setFormdata({
      ...formData,
      [name]: name === "profileImage" ? files[0] : value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const registerForm = new FormData();
      for (var key in formData) {
        registerForm.append(key, formData[key]);
      }
      const response = await fetch("/api/register", {
        method: "POST",
        body: registerForm,
      });
      if (response.ok) {
        router.push("/login");
      }
    } catch (err) {
      console.log("registeration failed", err.message);
    }
  };

  const loginWithGoogle = () => {
    signIn("google", { callbackUrl: "/" });
  };
  return (
    <div className="register">
      <img
        src="/assets/register.jpg"
        alt="register"
        className="register_decor"
      />
      <div className="register_content">
        <form className="register_content_form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={formData.userName}
            placeholder="Username"
            name="userName"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            value={formData.email}
            placeholder="Email"
            name="email"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            value={formData.password}
            placeholder="Password"
            name="password"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            value={formData.confirmPassword}
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={handleChange}
            required
          />
          {!passwordMatch && (
            <p style={{ color: "red" }}>Passwords are not matched</p>
          )}
          <input
            id="image"
            type="file"
            name="profileImage"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleChange}
            required
          />
          <label htmlFor="image">
            <img src="/assets/addImage.png" alt="add profile" />
            <p>Upload Profile Photo</p>
          </label>
          {formData.profileImage && (
            <img
              src={URL.createObjectURL(formData.profileImage)}
              alt="profile image"
              style={{ maxWidth: "80px" }}
            />
          )}
          <button type="submit" disabled={!passwordMatch}>
            Register
          </button>
        </form>
        <button type="button" onClick={loginWithGoogle} className="google">
          <p>Log In With Google</p>
          <FcGoogle />
        </button>
        <a href="/login">Already have an account? Login here</a>
      </div>
    </div>
  );
};

export default Register;
