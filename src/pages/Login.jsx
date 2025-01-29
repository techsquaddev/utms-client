import React, { useState } from "react";
import { loginUser } from "@/api/userApi";
import { toast } from "react-toastify";
import { Wrapper } from "@/components";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await loginUser(email);
      toast.success(response.data.message);
      setEmail("");
    } catch (error) {
      toast.error("Failed to send magic link. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-full">
      <Wrapper>
        <h2 className="text-center text-3xl font-extrabold text-gray-800">
          Login
        </h2>
        <div className="mt-8 p-8 mx-5 bg-white rounded-3xl shadow-lg space-y-5">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email*
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 mt-1 border rounded-lg shadow-sm focus:ring-primary focus:border-primary border-gray-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-primary rounded-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              {isLoading ? "Sending Magic Link..." : "Login"}
            </button>
          </form>
          <p className="text-center text-sm text-gray-600">
            Don't have an account?
            <Link to="/register" className="text-primary hover:underline">
              {" "}
              Register here
            </Link>
          </p>
        </div>
        <div className="mt-4 p-5 mx-5 bg-white border-2 border-secondary rounded-3xl shadow-lg">
          <p className="text-soft-text text-left text-sm">
            After clicking the login button, a verification email will be sent
            to your email. If the email has not arrived, please also check your
            junk/spam emails. Then click the link in that email to verify your
            login.
          </p>
        </div>
      </Wrapper>
    </div>
  );
};

export default Login;
