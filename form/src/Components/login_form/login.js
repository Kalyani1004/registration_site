import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "bootstrap/dist/css/bootstrap.min.css";
import "./login.css";

const Login = () => {
    const location = useLocation(); // Get the location object
    const navigate = useNavigate(); // Get navigate function to handle redirects
    const successMessage = location.state?.successMessage; // Extract success message from state
    const [message, setMessage] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        // Delay the display of the success message by 2 seconds
        if (successMessage) {
            setTimeout(() => {
                setMessage(successMessage);
            }, 2000); // 2-second delay
        }
    }, [successMessage]); // Trigger the effect only when the message is available

    const handleLogin = async (e) => {
        e.preventDefault();

        // Send login data to backend
        const response = await fetch("http://localhost:5000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            // Success: Redirect to home page
            navigate("/home");
        } else {
            // Show error if login fails
            alert(data.error || "Login failed");
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h1 className="login-card-title">Login</h1>
                {message && (
                    <div className="alert alert-success" role="alert">
                        {message}
                    </div>
                )}
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="d-grid mt-3">
                        <button className="btn btn-primary" type="submit">
                            Login
                        </button>
                    </div>
                </form>
                <p className="text-center mt-3">
                    Don't have an account?{" "}
                    <a href="/registration">Register here</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
