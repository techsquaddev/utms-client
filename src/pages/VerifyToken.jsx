import { verifyToken } from "@/api/userApi";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const VerifyToken = () => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      try {
        const token = searchParams.get("token");
        const response = await verifyToken(token);
        localStorage.setItem("token", response.data.token);
        setMessage(response.data.message);
        navigate("/");
      } catch (error) {
        setMessage("Verification failed or token expired.");
      }
    };

    verify();
  }, [searchParams, navigate]);

  return <div>{message}</div>;
};

export default VerifyToken;
