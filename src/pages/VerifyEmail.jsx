import { useAuth } from "@/api/authContext";
import { verifyEmail } from "@/api/userApi";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState("");
  const { fetchUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      try {
        const token = searchParams.get("token");
        const response = await verifyEmail(token);
        setMessage(response.data.message);
        toast.success(response.data.message);
        await fetchUser();
        navigate("/dashboard");
      } catch (error) {
        setMessage("Verification failed or token expired.");
      }
    };

    verify();
  }, [searchParams, navigate]);

  // TODO: Return a loader here
  return <div>{message}</div>;
};

export default VerifyEmail;
