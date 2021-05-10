const express = require("express");
const mongoose = require("mongoose");

const app = express();

require("dotenv").config();

//db connect
mongoose
    .connect(process.env.Mongo_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("connected to mongodb");
    })
    .catch((error) => {
        console.log("Error", error);
    });

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("REST API");
});

//start server
app.listen(PORT, console.log(`server running on http://localhost:${PORT}`));
