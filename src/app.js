const express = require("express");

const bookRoutes = require("./routes/bookRoutes");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Library Management API is running 🚀");
});

app.use("/books", bookRoutes);

module.exports = app;