const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");

dotenv.config();

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true },()=>{
    console.log("you are connected to MongoDB")
});

app.listen(8800,()=>{
    console.log("nate your server is running")
})