import { createContext, useEffect, useState } from "react";
import { addToCartAPI, removeFromCartAPI, loadCartDataAPI, fetchFoodListAPI } from "../services/cartService";

const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);

  const addToCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
    if (token) await addToCartAPI(itemId, token);
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev };
      if (updatedCart[itemId] > 1) {
        updatedCart[itemId] -= 1;
      } else {
        delete updatedCart[itemId];
      }
      return updatedCart;
    });
    if (token) await removeFromCartAPI(itemId, token);
  };

  const getTotalCartAmount = () => {
    return Object.keys(cartItems).reduce((total, itemId) => {
      const itemInfo = food_list.find((product) => product._id === itemId);
      return itemInfo ? total + itemInfo.price * cartItems[itemId] : total;
    }, 0);
  };

  const loadCartData = async (userToken) => {
    const cartData = await loadCartDataAPI(userToken);
    setCartItems(cartData);
  };

  const fetchFoodList = async () => {
    const foodData = await fetchFoodListAPI();
    setFoodList(foodData);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);

    async function loadData() {
      await fetchFoodList();
      if (storedToken) {
        await loadCartData(storedToken);
      }
    }
    loadData();
  }, []);

  return (
    <StoreContext.Provider value={{ food_list, cartItems, setCartItems, addToCart, removeFromCart, token, setToken, getTotalCartAmount }}>
      {children}
    </StoreContext.Provider>
  );
};

export { StoreContext, StoreContextProvider }; // ✅ Only Named Exports
