import { createContext, useEffect, useState } from "react";
import { addToCartAPI, removeFromCartAPI, loadCartDataAPI, fetchFoodListAPI } from "../services/cartService"; // ✅ Import API functions

const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);

  /**
   * Add an item to the cart and sync with the backend.
   * itemId - The ID of the item to add.
   */
  const addToCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));

    if (token) {
      await addToCartAPI(itemId, token); //  Call API service
    }
  };

  /**
   * Remove an item from the cart and sync with the backend.
   * itemId - The ID of the item to remove.
   */
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev };
      if (updatedCart[itemId] > 1) {
        updatedCart[itemId] -= 1;
      } else {
        delete updatedCart[itemId]; // Remove item if quantity reaches 0
      }
      return updatedCart;
    });

    if (token) {
      await removeFromCartAPI(itemId, token); //  Call API service
    }
  };

  /**
   * Calculate the total cart amount.
   */
  const getTotalCartAmount = () => {
    return Object.keys(cartItems).reduce((total, itemId) => {
      const itemInfo = food_list.find((product) => product._id === itemId);
      return itemInfo ? total + itemInfo.price * cartItems[itemId] : total;
    }, 0);
  };

  /**
   * Load cart data for logged-in users.
   * userToken - User authentication token.
   */
  const loadCartData = async (userToken) => {
    const cartData = await loadCartDataAPI(userToken); //  Call API service
    setCartItems(cartData);
  };

  /**
   * Fetch the food list from the backend.
   */
  const fetchFoodList = async () => {
    const foodData = await fetchFoodListAPI(); //  Call API service
    setFoodList(foodData);
  };

  /**
   * Load initial data when the component mounts.
   */
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);

    async function loadData() {
      await fetchFoodList();
      if (storedToken) {
        await loadCartData(storedToken);
      }
    }

    loadData(); // Fetch food list and user cart on component mount
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    token,
    setToken,
    getTotalCartAmount,
  };

  return <StoreContext.Provider value={contextValue}>{children}</StoreContext.Provider>;
};

export { StoreContext, StoreContextProvider };
export default StoreContextProvider;
