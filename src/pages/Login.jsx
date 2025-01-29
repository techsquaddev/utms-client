import React, { useEffect, useState } from "react";
import { loginUser } from "@/api/userApi";
import { toast } from "react-toastify";
import { useAuth } from "@/api/authContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { user } = useAuth();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

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
    <div className="flex items-center justify-center mt-28">
      <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-white shadow-md">
        <h1 className="text-2xl font-bold text-center text-text">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-text"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring focus:ring-border"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-medium text-white bg-primary rounded-md hover:bg-dark-blue focus:outline-none focus:ring focus:ring-primary"
            >
              {isLoading ? "Sending Magic Link..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
