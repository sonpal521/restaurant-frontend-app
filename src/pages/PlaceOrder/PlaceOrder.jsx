import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { placeUserOrder } from "../../services/orderService"; // Importing the API function

function PlaceOrder() {
  // Accessing cart and authentication details from the global store
  const { getTotalCartAmount, token, food_list, cartItems } = useContext(StoreContext);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const navigate = useNavigate();

  // Handles input field changes
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Function to process order placement
  const handlePlaceOrder = async (event) => {
    event.preventDefault();

    if (!token) {
      alert("You must be logged in to place an order.");
      return;
    }

    // Prepare order items from cart
    const orderItems = food_list
      .filter((item) => cartItems[item._id] > 0)
      .map((item) => ({
        name: item.name,
        price: item.price,
        quantity: cartItems[item._id],
      }));

    const orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2, // Adding delivery fee
    };

    try {
      const sessionUrl = await placeUserOrder(token, orderData);
      if (sessionUrl) {
        window.location.replace(sessionUrl); // Redirecting to payment page
      } else {
        alert("Error placing order. Try again.");
      }
    } catch (error) {
      console.error("Order placement error:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  // Redirects user to cart if not authenticated or cart is empty
  useEffect(() => {
    if (!token || getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  }, [token]);

  return (
    <form onSubmit={handlePlaceOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required onChange={onChangeHandler} name="firstName" value={data.firstName} type="text" placeholder="First Name" />
          <input required onChange={onChangeHandler} name="lastName" value={data.lastName} type="text" placeholder="Last Name" />
        </div>
        <input required onChange={onChangeHandler} name="email" value={data.email} type="email" placeholder="Email Address" />
        <input required onChange={onChangeHandler} name="street" value={data.street} type="text" placeholder="Street" />
        <div className="multi-fields">
          <input required onChange={onChangeHandler} name="city" value={data.city} type="text" placeholder="City Name" />
          <input required onChange={onChangeHandler} name="state" value={data.state} type="text" placeholder="State Name" />
        </div>
        <div className="multi-fields">
          <input required onChange={onChangeHandler} name="zipcode" value={data.zipcode} type="text" placeholder="Zip code" />
          <input required onChange={onChangeHandler} name="country" value={data.country} type="text" placeholder="Country" />
        </div>
        <input required onChange={onChangeHandler} name="phone" value={data.phone} type="text" placeholder="Phone" />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>£{getTotalCartAmount().toFixed(2)}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>£{getTotalCartAmount() === 0 ? "0.00" : "2.00"}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>£{(getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2).toFixed(2)}</p>
            </div>
          </div>
          <button type="submit">Proceed To Checkout</button>
        </div>
      </div>
    </form>
  );
}

export default PlaceOrder;
