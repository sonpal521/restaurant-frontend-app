import React, { useEffect, useState } from "react";
import "./Verify.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import axiosInstance from "../../config/AxiosInstance";

function Verify() {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const navigate = useNavigate();

  // State to manage loading and errors
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        navigate("/myorders"); // Redirect to My Orders page if successful
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

  useEffect(() => {
    verifyPayment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId, success]); // Only run if orderId or success changes

  return (
    <div className="verify">
      {loading ? (
        <p className="spinner"></p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <p>Redirecting...</p>
      )}
    </div>
  );
}

export default Verify; 