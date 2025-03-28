import axiosInstance from '../config/AxiosInstance';

/**
 * Fetches user orders from the backend API.
 * token - The user's authentication token.

 */
export const fetchUserOrders = async (token) => {
    try {
        const response = await axiosInstance.post(
            "/api/order/userorders",
            {},
            { headers: { Authorization: `Bearer ${token}` } }
        );

        console.log("Full API Response:", response.data);

        if (response.data.success) {
            return response.data.data || [];
        } else {
            console.error("Failed to fetch orders:", response.data.message);
            return [];
        }
    } catch (error) {
        console.error("Error fetching orders:", error.response?.data || error.message);
        return [];
    }
};


/**
 * Places an order for the logged-in user.
 * token - The user's authentication token.
 * orderData - Order details including address, items, and amount.
 
 */
export const placeUserOrder = async (token, orderData) => {
  try {
    const response = await axiosInstance.post("/api/order/place", orderData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.data.success) {
      return response.data.session_url; // Return payment session URL
    } else {
      console.error("Failed to place order:", response.data.message);
      return null;
    }
  } catch (error) {
    console.error("Order placement error:", error.response?.data || error.message);
    return null;
  }
};





/**
 * Verifies the payment for an order.
 *  success - Payment success status.
 *  orderId - Unique Order ID.

 */
// export const verifyOrderPayment = async (success, orderId) => {
//   try {
//     const response = await axiosInstance.post("/api/order/verify", {
//       success,
//       orderId,
//     });

//     return response.data.success; // Return true if payment verification is successful
//   } catch (error) {
//     console.error("Payment verification error:", error);
//     throw new Error("An error occurred while verifying payment.");
//   }
// };
