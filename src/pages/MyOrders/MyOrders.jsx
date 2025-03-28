import React, { useContext, useEffect, useState } from 'react';
import "./MyOrder.css";
import { StoreContext } from '../../context/StoreContext';
import { assets } from "../../assets/assets";
import { fetchUserOrders } from '../../services/orderService'; // Importing the API function

function MyOrders() {
    const [data, setData] = useState([]);
    const { token } = useContext(StoreContext);

    // Function to fetch orders when the component mounts or token changes
    const fetchOrders = async () => {
        if (!token) return; // Prevent API call if token is missing

        try {
            const orders = await fetchUserOrders(token);
            setData(orders);
        } catch (error) {
            console.error("Error fetching orders:", error.message);
            setData([]);
        }
    };

    // Fetch orders when the component mounts or the token changes
    useEffect(() => {
        fetchOrders();
    }, [token]);

    return (
        <div className='my-orders'>
            <h2>My Orders</h2>
            <div className="container">
                {data.map((order) => (
                    <div className='my-orders-order' key={order._id}>
                        <img src={assets.parcel_icon} alt="" />
                        <p>
                            {order.items.map((item, index) => (
                                <span key={item._id || index}>
                                    {item.name} x {item.quantity}
                                    {index !== order.items.length - 1 ? "," : ""}
                                </span>
                            ))}
                        </p>
                        <p>${order.amount}.00</p>
                        <p>Items: {order.items.length}</p>
                        <p><span>&#x25cf;</span> {order.status}</p>
                        <button onClick={fetchOrders}>Track Order</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyOrders;
