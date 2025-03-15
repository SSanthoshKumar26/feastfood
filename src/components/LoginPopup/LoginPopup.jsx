import React, { useContext, useState, useEffect } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/Storecontext';
import axios from 'axios';

const LoginPopup = ({ setShowLogin }) => {
    const { url, setToken } = useContext(StoreContext);

    const [currState, setCurrState] = useState("Login");
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [agreeTerms, setAgreeTerms] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(""); // State for error message

    // Check if the token exists in localStorage (Auto-login if token exists)
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setToken(token); // Set the token in the context
            setShowLogin(false); // Close the login popup if already logged in
        }
    }, [setToken, setShowLogin]);

    // Handle input changes
    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle form submission
    const onSubmitHandler = async (event) => {
        event.preventDefault();

        if (currState === "Sign Up" && !data.name) {
            return; // Do not submit if name is missing for Sign Up
        }

        if (data.password.trim().length < 8) {
            return; // Password must be at least 8 characters long
        }

        try {
            setLoading(true);

            let newUrl = url;
            newUrl += currState === "Login" ? "/api/user/login" : "/api/user/register";

            const response = await axios.post(newUrl, data);

            if (response.data.success) {
                // On successful login or registration, directly log the user in
                setToken(response.data.token);
                localStorage.setItem("token", response.data.token);
                setShowLogin(false); // Close the login popup
                setError(""); // Clear any error messages on success
            } else {
                // If not successful, show error for login
                if (currState === "Login") {
                    setError("Account not found. Please sign up first.");
                }
                return;
            }
        } catch (error) {
            console.error("Error during API call:", error);

            // Custom error message if login fails (e.g., user doesn't exist)
            if (currState === "Login") {
                setError("Account not found. Please sign up first.");
            } else {
                setError("Something went wrong. Please try again later.");
            }
        } finally {
            setLoading(false);
        }
    };

    // Direct logout logic (no alerts)
    const onLogoutHandler = () => {
        localStorage.removeItem("token");
        setToken(null);
        setShowLogin(false); // Close the login popup directly on logout
    };

    return (
        <div className="login-popup">
            <form className="login-popup-container" onSubmit={onSubmitHandler}>
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Close" />
                </div>
                <div className="login-popup-inputs">
                    {currState === "Sign Up" && (
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            value={data.name}
                            onChange={onChangeHandler}
                            required
                        />
                    )}
                    <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={data.email}
                        onChange={onChangeHandler}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={data.password}
                        onChange={onChangeHandler}
                        required
                    />
                </div>
                {error && <p className="error-message">{error}</p>} {/* Display error message */}
                <button type="submit" disabled={loading}>
                    {currState === "Sign Up" ? "Create Account" : "Login"}
                </button>
                <div className="login-popup-condition">
                    <input
                        type="checkbox"
                        checked={agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                        required
                    />
                    <p>By continuing, I agree to the terms of use & privacy policy.</p>
                </div>
                {currState === "Login" ? (
                    <p>
                        Create a new account?{" "}
                        <span onClick={() => setCurrState("Sign Up")}>Click here</span>
                    </p>
                ) : (
                    <p>
                        Already have an account?{" "}
                        <span onClick={() => setCurrState("Login")}>Click here</span>
                    </p>
                )}
            </form>

            {/* Add logout button if user is logged in */}
            {localStorage.getItem("token") && (
                <button onClick={onLogoutHandler}>Logout</button>
            )}
        </div>
    );
};

export default LoginPopup;
