import { useState } from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";



export function LoginForm({ className = "", ...props }) {

  const navigate = useNavigate();
  const [values, setValues] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({ username: "", password: "" });

  const validate = (name, value) => {
    if (name === "username") {
      if (!value) 
        return "Username is required";
      if (value.length < 3) 
        return "Username must be at least 3 characters";
      if (!/^[a-zA-Z0-9_]+$/.test(value)) 
        return "Username can only contain letters, numbers, and underscores";
      return "";
    }
    if (name === "password") {
      if (!value) 
        return "Password is required";
      if (value.length < 8) 
        return "Password must be at least 8 characters";
      if (!/[A-Z]/.test(value)) 
        return "Password must contain an uppercase letter";
      if (!/[0-9]/.test(value)) return "Password must contain a number";
      return "";
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: validate(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: validate(name, value) }));
  };

  const [submitError, setSubmitError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const usernameError = validate("username", values.username);
    const passwordError = validate("password", values.password);
    setErrors({ username: usernameError, password: passwordError });
    setSubmitError("");

    if (usernameError || passwordError) return;

    try {
      setLoading(true);
      const res = await fetch("http://localhost:8080/auth/v1/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: values.username,
          password: values.password,
        }),
      });

      const result = await res.json();

      if (!res.ok || result.status !== "success") {
        setSubmitError(result.errors || "Invalid email or password");
        return;
      }


      Cookies.set("token", result.data, {
          expires: 14,
          path: "/"
      });   

      const today = new Date();

      const day = String(today.getDate()).padStart(2, "0");
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const year = today.getFullYear();

      const date = `${day}-${month}-${year}`;

      localStorage.setItem("datelogin", date);
      
      navigate("/"); 
    } catch (err) {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className={`flex flex-col gap-6 ${className}`}
      onSubmit={handleSubmit}
      noValidate
      {...props}
    >
      <div className="flex flex-col items-center gap-1 text-center">
        <h1 className="text-2xl font-bold text-black">Login to your account</h1>
        <p className="text-sm text-gray-600">
          Enter your email below to login to your account
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <label htmlFor="username" className="mb-2 block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="johndoe"
            required
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full rounded-lg border px-4 py-3 text-sm outline-none ${
              errors.username ? "border-red-400 focus:border-red-500" : "border-gray-300 focus:border-black"
            }`}
          />
          {errors.username && (
            <p className="mt-1.5 text-sm text-red-500">{errors.username}</p>
          )}
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              Password
            </label>
            <a href="#" className="text-sm text-gray-500 underline-offset-4 hover:underline">
              Forgot your password?
            </a>
          </div>
          <input
            id="password"
            name="password"
            type="password"
            required
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full rounded-lg border px-4 py-3 text-sm outline-none ${
              errors.password ? "border-red-400 focus:border-red-500" : "border-gray-300 focus:border-black"
            }`}
          />
          {errors.password && (
            <p className="mt-1.5 text-sm text-red-500">{errors.password}</p>
          )}
        </div>

        {submitError && (
          <p className="text-center text-sm text-red-500">{submitError}</p>
        )}

        <Button
          text={loading ? "Logging in..." : "Login"}
          type="submit"
          disabled={loading}
          styleClass="w-full justify-center"
        />

        <div className="flex items-center gap-3 text-sm text-gray-500">
          <div className="h-px flex-1 bg-gray-300" />
          <span>Or continue with</span>
          <div className="h-px flex-1 bg-gray-300" />
        </div>

        <button
          type="button"
          className="flex items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5">
            <path
              d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
              fill="currentColor"
            />
          </svg>
          Login with GitHub
        </button>

        <p className="text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <a href="/SignUp" className="font-medium text-black underline underline-offset-4">
            Sign up
          </a>
        </p>
      </div>
    </form>
  );
}

export default LoginForm;