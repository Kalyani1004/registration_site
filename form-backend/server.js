const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Pool } = require("pg");
const bcrypt = require("bcrypt");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// PostgreSQL connection setup
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Test database connection
pool.connect((err) => {
    if (err) {
        console.error("Database connection error", err.stack);
    } else {
        console.log("Connected to PostgreSQL database");
    }
});

// Registration route
app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if email already exists
        const emailCheck = await pool.query("SELECT * FROM registration WHERE email = $1", [email]);
        if (emailCheck.rows.length > 0) {
            return res.status(400).json({ error: "Email already in use" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new user into the database
        const result = await pool.query(
            "INSERT INTO registration (name, email, password) VALUES ($1, $2, $3) RETURNING *",
            [name, email, hashedPassword]
        );

        res.status(201).json({ message: "Registration successful" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Login route
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const result = await pool.query("SELECT * FROM registration WHERE email = $1", [email]);

        if (result.rows.length === 0) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        const user = result.rows[0];

        // Compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        res.status(200).json({ message: "Login successful" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
