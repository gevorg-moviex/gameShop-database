const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json()); 

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "#kocjuGEVO11",
    database: "game_shop"
});

app.get("/", (req, res) => {
    return res.json("From backend slide");
});

app.get("/users", (req, res) => {
    const sql = "SELECT * FROM user_register";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});
app.post("/register", (req, res) => {
    const { userName, userSurname, userEmail, userPassword } = req.body;

    if (!userName || !userSurname || !userEmail || !userPassword) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const sql = "INSERT INTO user_register (name, surname, email, password) VALUES (?, ?, ?, ?)";
    db.query(sql, [userName, userSurname, userEmail, userPassword], (err, result) => {
        if (err) {
            console.error("Error inserting user:", err); // Log the error
            return res.status(500).json({ message: "Error registering user" });
        }
        return res.status(201).json({ message: "User registered successfully" });
    });
});


app.listen(8082, () => {
    console.log("Listening on port 8082");
});
