import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./registration.css";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirm_password: "",
    });

    const [errorMessage, setErrorMessage] = useState(""); // State to hold error message
    const [successMessage, setSuccessMessage] = useState(""); // State to hold success message

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Password validation
        if (formData.password !== formData.confirm_password) {
            alert("Passwords do not match!");
            return;
        }

        try {
            // Send data to backend
            const response = await fetch("http://localhost:5000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                // Success: Show the success message and clear the form
                setSuccessMessage(data.message);
                setErrorMessage(""); // Clear any previous error message
                setFormData({ name: "", email: "", password: "", confirm_password: "" });

                // Redirect to login after 2 seconds with a success message
                setTimeout(() => {
                    window.location.href = "/login"; // Assuming login route
                }, 2000);
            } else {
                // Error: Show the error message
                setErrorMessage(data.error);
                setSuccessMessage(""); // Clear any previous success message
            }
        } catch (error) {
            console.error("Error:", error);
            setErrorMessage("An unexpected error occurred.");
            setSuccessMessage(""); // Clear any previous success message
        }
    };

    return (
        <div className="registration-container">
            <div className="registration-card">
                <h1 className="register-card-title">Register yourself here</h1>
                
                {/* Display success message */}
                {successMessage && <div className="alert alert-success">{successMessage}</div>}
                
                {/* Display error message */}
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Enter your name"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            id="confirm_password"
                            name="confirm_password"
                            value={formData.confirm_password}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Confirm your password"
                            required
                        />
                    </div>
                    <div className="d-grid mt-3">
                        <button className="btn btn-primary" type="submit">
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
