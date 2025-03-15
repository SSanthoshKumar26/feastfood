import React, { useContext } from 'react';
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/Storecontext';

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

  const itemCount = cartItems[id] || 0;

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img className="food-item-image" src={`${url}/images/${image}`} alt="" />
        <div className="food-item-cart-control">
          <button
            className="cart-button decrease"
            onClick={() => removeFromCart(id)}
            disabled={itemCount === 0}
          >
            -
          </button>
          <span className="item-count">{itemCount}</span>
          <button className="cart-button increase" onClick={() => addToCart(id)}>
            +
          </button>
        </div>
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="Rating" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
