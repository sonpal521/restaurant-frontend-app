import React, { useEffect, useState } from "react";
import "./Verify.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { verifyOrderPayment } from "../../services/orderService"; 
function Verify() {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success"); // Get payment success status from URL
  const orderId = searchParams.get("orderId"); // Get Order ID from URL
  const navigate = useNavigate();

  // State to manage loading and errors
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Handles the payment verification process.
   */
  const verifyPayment = async () => {
    // Check if required parameters exist
    if (!orderId || !success) {
      setError("Invalid order verification parameters.");
      setLoading(false);
      return;
    }

    try {
      const isVerified = await verifyOrderPayment(success, orderId); //  Call API service

      // Ensure spinner is visible for at least 2 seconds
      setTimeout(() => {
        if (isVerified) {
          navigate("/myorders"); //  Redirect to My Orders page if successful
        } else {
          setError("Payment verification failed.");
          setTimeout(() => navigate("/"), 3000); // Redirect to Home after 3 seconds
        }
        setLoading(false);
      }, 2000); //  Minimum 2-second delay before hiding the spinner
    } catch (err) {
      setTimeout(() => {
        setError(err.message);
        setLoading(false);
        setTimeout(() => navigate("/"), 3000); // Redirect to Home after 3 seconds
      }, 2000); //  Minimum 2-second delay
    }
  };

  /**
   * useEffect runs verifyPayment when the component mounts or when orderId/success changes.
   */
  useEffect(() => {
    verifyPayment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId, success]);

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
