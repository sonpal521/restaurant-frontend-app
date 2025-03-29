import React, { useEffect, useState } from "react";
import "./Verify.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import axiosInstance from "../../config/AxiosInstance";

function VerifyPage() {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const navigate = useNavigate();

  // State to manage loading and errors
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyPayment = async () => {
      // Ensure orderId and success exist before making the request
      if (!orderId || !success) {
        setError("Invalid order verification parameters.");
        setLoading(false);
        return;
      }

      try {
        const response = await axiosInstance.post("/api/order/verify", {
          success,
          orderId,
        });

        if (response.data.success) {
          setMessage("Payment verified successfully! Redirecting to your orders...");
          setTimeout(() => navigate("/myorders"), 3000); // Redirect after 3 seconds
        } else {
          setError("Payment verification failed.");
          setTimeout(() => navigate("/"), 3000); // Redirect after 3 seconds
        }
      } catch (err) {
        console.error("Payment verification error:", err);
        setError("An error occurred while verifying payment.");
        setTimeout(() => navigate("/"), 3000); // Redirect after 3 seconds
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [orderId, success, navigate]); // Ensure `navigate` is added to dependencies

  return (
    <div className="verify">
      {loading ? (
        <div className="spinner"></div>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <p className="success">{message}</p>
      )}
    </div>
  );
}

export default VerifyPage;
