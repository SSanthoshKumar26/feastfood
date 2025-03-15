import React, { useContext, useState } from "react";
import { StoreContext } from "../../context/Storecontext"; // Ensure this path is correct
import { jwtDecode } from "jwt-decode";
 // Correct import for jwt-decode
import axios from "axios";
import "./Placeorder.css";

const Placeorder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const deliveryCharge = 5; // Example delivery charge

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const placeorder = async (event) => {
    event.preventDefault();
    setMessage(""); // Clear previous messages
    setLoading(true); // Start loading

    // Ensure token is available
    if (!token) {
      setMessage("You need to be logged in to place an order.");
      setLoading(false);
      return;
    }

    let decodedToken;
    try {
      decodedToken = jwtDecode(token); // Decode the token
    } catch (error) {
      setMessage("Invalid token.");
      setLoading(false);
      return;
    }

    // Ensure the decoded token contains the userId
    if (!decodedToken || !decodedToken.id) {
      setMessage("User ID is missing from token.");
      setLoading(false);
      return;
    }

    // Prepare order items
    const orderItems = food_list
      .filter((item) => cartItems[item._id] > 0)
      .map((item) => ({
        ...item,
        quantity: cartItems[item._id],
      }));

    // Prepare order data
    const orderData = {
      userId: decodedToken.id, // Correct userId extraction
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + deliveryCharge,
    };

    try {
      const response = await axios.post(`${url}/api/order/place`, orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url); // Redirect to payment session
      } else {
        setMessage("Error placing the order.");
      }
    } catch (error) {
      setMessage("Failed to place the order: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={placeorder} className="place-order">
      <div className="place-order-info">
        <p className="header1">Delivery Information</p>
        <div className="form-fields">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={data.firstName}
            onChange={onChangeHandler}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={data.lastName}
            onChange={onChangeHandler}
            required
          />
        </div>
        <input
          type="email"
          name="email"
          placeholder="Email address"
          value={data.email}
          onChange={onChangeHandler}
          required
        />
        <input
          type="text"
          name="street"
          placeholder="Street"
          value={data.street}
          onChange={onChangeHandler}
          required
        />
        <div className="form-fields">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={data.city}
            onChange={onChangeHandler}
            required
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={data.state}
            onChange={onChangeHandler}
            required
          />
        </div>
        <div className="form-fields">
          <input
            type="text"
            name="zipCode"
            placeholder="Zip Code"
            value={data.zipCode}
            onChange={onChangeHandler}
            required
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={data.country}
            onChange={onChangeHandler}
            required
          />
        </div>
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={data.phone}
          onChange={onChangeHandler}
          required
        />
      </div>

      {/* Cart Summary */}
      <div className="cart-summary">
        <div className="cart-details">
          <div className="cart-total-summary">
            <h2>Cart Totals</h2>
            <div>
              <div className="cart-detail-item">
                <p>Subtotal</p>
                <p>${getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cart-detail-item">
                <p>Delivery</p>
                <p>${deliveryCharge}</p>
              </div>
              <hr />
              <div className="cart-detail-item">
                <b>Total</b>
                <p>${getTotalCartAmount() + deliveryCharge}</p>
              </div>
            </div>
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Processing..." : "PROCEED to PAYMENT"}
          </button>
        </div>
      </div>

      {/* Display message */}
      {message && <p className="message">{message}</p>}
    </form>
  );
};

export default Placeorder;
