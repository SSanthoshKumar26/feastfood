import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState("");
    const [food_list, setFoodList] = useState([]);
    const url = process.env.REACT_APP_API_URL || "https://backend-3dxi.onrender.com";

    // Add item to the cart
    const addToCart = async (itemId) => {
        try {
            // Optimistically update the cart
            setCartItems((prev) => {
                const updatedCart = { ...prev };
                updatedCart[itemId] = (updatedCart[itemId] || 0) + 1;
                return updatedCart;
            });

            if (token) {
                const response = await axios.post(
                    `${url}/api/cart/add`,
                    { itemId, userId: token },
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                if (response.data.success) {
                    setCartItems(response.data.cart);
                } else {
                    // Revert if unsuccessful
                    setCartItems((prev) => {
                        const updatedCart = { ...prev };
                        updatedCart[itemId] = (updatedCart[itemId] || 0) - 1;
                        return updatedCart;
                    });
                }
            }
        } catch (error) {
            console.error("Error adding to cart:", error);
            // Revert cart change if there's an error
            setCartItems((prev) => {
                const updatedCart = { ...prev };
                updatedCart[itemId] = (updatedCart[itemId] || 0) - 1;
                return updatedCart;
            });
        }
    };

    // Remove item from the cart
    const removeFromCart = async (itemId) => {
        try {
            // Optimistically update the cart
            setCartItems((prev) => {
                const updatedCart = { ...prev };
                if (updatedCart[itemId] > 0) {
                    updatedCart[itemId] -= 1;
                }
                return updatedCart;
            });

            if (token) {
                const response = await axios.post(
                    `${url}/api/cart/remove`,
                    { itemId, userId: token },
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                if (response.data.success) {
                    setCartItems(response.data.cart);
                } else {
                    // Revert if unsuccessful
                    setCartItems((prev) => {
                        const updatedCart = { ...prev };
                        updatedCart[itemId] = (updatedCart[itemId] || 0) + 1;
                        return updatedCart;
                    });
                }
            }
        } catch (error) {
            console.error("Error removing from cart:", error);
            // Revert cart change if there's an error
            setCartItems((prev) => {
                const updatedCart = { ...prev };
                updatedCart[itemId] = (updatedCart[itemId] || 0) + 1;
                return updatedCart;
            });
        }
    };

    // Fetch food list
    const fetchFoodList = async () => {
        try {
            const response = await axios.get(`${url}/api/food/list`);
            setFoodList(response.data.data);
        } catch (error) {
            console.error("Error fetching food list:", error);
        }
    };

    // Get total cart amount
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                const itemInfo = food_list.find((product) => product._id === item);
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[item];
                }
            }
        }
        return totalAmount;
    };

    // Clear cart items
    const clearCart = () => {
        setCartItems({});
    };

    // Initialize context on mount
    useEffect(() => {
        fetchFoodList();
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        clearCart,
        url,
        token,
        setToken,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
