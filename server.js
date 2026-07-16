console.log("NEW SERVER FILE LOADED");
const express = require("express");
const cors = require("cors");
const db = require("./db");
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Cloud E-Commerce Backend is Running...");
});

app.post("/register", (req, res) => {

    const { name, email, password } = req.body;

    const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

    db.query(sql, [name, email, password], (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Registration Failed"
            });
        }

        res.status(200).json({
            message: "User Registered Successfully"
        });

    });

});

app.post("/login", (req, res) => {

    const { email, password } = req.body;

    const sql = "SELECT * FROM users WHERE email=? AND password=?";

    db.query(sql, [email, password], (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Database Error"
            });
        }

        if (result.length > 0) {

            res.status(200).json({
                message: "Login Successful"
            });

        } else {

            res.status(401).json({
                message: "Invalid Email or Password"
            });

        }

    });

});
const PORT = 8000;
app.post("/add-product", (req, res) => {

    const { name, price, image } = req.body;

    const sql = "INSERT INTO products (product_name, price, image) VALUES (?, ?, ?)";

    db.query(sql, [name, price, image], (err, result) => {

        if (err) {
            return res.status(500).json({ message: "Failed to Add Product" });
        }

        res.json({ message: "Product Added Successfully" });

    });

});
app.get("/test", (req, res) => {
    res.send("Test Route Working");
});
app.get("/products", (req, res) => {

    const sql = "SELECT * FROM products";

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json({
                message: "Database Error"
            });
        }

        res.json(result);

    });

});app.post("/cart", (req, res) => {

    const { user_id, product_id, quantity } = req.body;

    const sql = "INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)";

    db.query(sql, [user_id, product_id, quantity], (err, result) => {

        if (err) {
            return res.status(500).json({
                message: "Failed to Add to Cart"
            });
        }

        res.json({
            message: "Added to Cart Successfully"
        });

    });

});app.get("/cart", (req, res) => {

    const sql = "SELECT * FROM cart";

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json({
                message: "Database Error"
            });
        }

        res.json(result);

    });

});app.post("/place-order", (req, res) => {

    const { user_id, total } = req.body;

    const sql = "INSERT INTO orders (user_id, total) VALUES (?, ?)";

    db.query(sql, [user_id, total], (err, result) => {

        if (err) {
            return res.status(500).json({
                message: "Order Failed"
            });
        }

        res.json({
            message: "Order Placed Successfully"
        });

    });

});app.delete("/delete-product/:id", (req, res) => {

    const id = req.params.id;

    const sql = "DELETE FROM products WHERE id=?";

    db.query(sql, [id], (err, result) => {

        if (err) {
            return res.status(500).json({
                message: "Delete Failed"
            });
        }

        res.json({
            message: "Product Deleted Successfully"
        });

    });

});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});