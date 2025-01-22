import { useAuth } from "@/api/authContext";
import { verifyToken } from "@/api/userApi";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

const VerifyToken = () => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState("");
  const { fetchUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      try {
        const token = searchParams.get("token");
        const response = await verifyToken(token);
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

  // Return a loader here
  return <div>{message}</div>;
};

export default VerifyToken;
