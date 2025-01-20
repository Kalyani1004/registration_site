import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import "bootstrap/dist/css/bootstrap.min.css";
import "./home.css";

const Home = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Retrieve user data from localStorage (or from an API if you prefer)
        const userData = JSON.parse(localStorage.getItem("user"));
        if (!userData) {
            // Redirect to login if no user data exists
            navigate("/login");
        } else {
            setUser(userData);
        }
    }, [navigate]);

    const handleLogout = () => {
        // Clear user session and redirect to login page
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <div className="home-container">
            <div className="home-card">
                <h1 className="home-title">Welcome to the Home Page!</h1>
                {user && (
                    <div className="user-info">
                        <p>Hello, {user.name}!</p>
                        <p>Email: {user.email}</p>
                    </div>
                )}
                <div className="d-grid mt-3">
                    <button className="btn btn-danger" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;
