import React, { useContext } from 'react';
import "./FoodItem.css";
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axiosInstance from '../../config/AxiosInstance'; // Import axiosInstance

function FoodItem({ id, name, price,title, description, image }) {
    const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);

    // Construct the full image URL using axiosInstance baseURL
    const imageUrl = `${axiosInstance.defaults.baseURL}/images/${image}`;

    return (
        <div className="food-item">
            <div className="food-item-img-container">
                <img className='food-item-image' src={imageUrl} alt={name} />
                {!cartItems[id] ? (
                    <img className='add' onClick={() => addToCart(id)} src={assets.add_icon_white} alt='Add' />
                ) : (
                    <div className="food-item-counter">
                        <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt='Remove' />
                        <p>{cartItems[id]}</p>
                        <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt='Add' />
                    </div>
                )}
            </div>
            <div className="food-item-info">
                <div className="food-item-name-rating">
                    <p>{name}</p>
                    <img src={assets.rating_starts} alt='Rating' />
                </div>
                <p className="food-item-title">{title}</p>
                <p className="food-item-desc">{description}</p>

                <p className="food-item-price">£{price}</p>
              <button onClick={()=> addToCart(id)} className='cart-btn'>Add To Cart</button>
            </div>
            
        </div>
    );
}

export default FoodItem;
