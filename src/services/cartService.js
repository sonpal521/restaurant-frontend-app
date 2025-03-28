import axiosInstance from "../config/AxiosInstance";

/**
 * Adds an item to the cart in the backend.
 * itemId - ID of the item to add.
 * token - User authentication token.
 */
export const addToCartAPI = async (itemId, token) => {
  try {
    await axiosInstance.post(
      "/api/cart/add",
      { itemId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  } catch (error) {
    console.error("Error adding to cart:", error.response?.data || error.message);
  }
};

/**
 * Removes an item from the cart in the backend.
 *  itemId - ID of the item to remove.
 *  token - User authentication token.
 */
export const removeFromCartAPI = async (itemId, token) => {
  try {
    await axiosInstance.post(
      "/api/cart/remove",
      { itemId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  } catch (error) {
    console.error("Error removing item:", error.response?.data || error.message);
  }
};

/**
 * Fetches the cart data from the backend.
 *  token - User authentication token.
 */
export const loadCartDataAPI = async (token) => {
  try {
    const response = await axiosInstance.post(
      "/api/cart/get",
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data.cartData || {}; // Ensure it returns an object
  } catch (error) {
    console.error("Error loading cart:", error.response?.data || error.message);
    return {}; // Return empty object to prevent crashes
  }
};

/**
 * Fetches the food list from the backend.
 
 */
export const fetchFoodListAPI = async () => {
  try {
    const response = await axiosInstance.get("/api/food/list");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching food list:", error.response?.data || error.message);
    return [];
  }
};
