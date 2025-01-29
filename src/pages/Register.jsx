import { registerUser } from "@/api/userApi";
import { Wrapper } from "@/components";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await registerUser(formData);
      toast.success(response.data.message || "Registration successful!");
      toast.info("Please check spam/junk emails as well! 👀");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-full">
      <Wrapper>
        <h2 className="text-center text-3xl font-extrabold text-gray-800">
          Register
        </h2>
        <div className="mt-8 p-8 mx-5 bg-white rounded-3xl shadow-lg space-y-5">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  className="mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm"
                  placeholder="Ashen"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  className="mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm"
                  placeholder="Fernando"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm"
                placeholder="it21276142@my.sliit.lk"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-primary rounded-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                {isLoading ? "Sending Email Verification Link..." : "Register"}
              </button>
            </div>
          </form>
          <p className="text-center text-sm text-gray-600">
            Already have an account?
            <Link to="/login" className="text-primary hover:underline">
              {" "}
              Login here
            </Link>
          </p>
        </div>
        <div className="mt-4 p-5 mx-5 bg-white border-2 border-secondary rounded-3xl shadow-lg">
          <p className="text-soft-text text-left text-sm">
            After clicking the register button, a verification email will be
            sent to your email. If the email has not arrived, please also check
            your junk/spam emails. Then click the link to verify your email.
          </p>
        </div>
      </Wrapper>
    </div>
  );
};

export default Register;
