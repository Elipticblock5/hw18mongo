const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const morgan = require("morgan");
const userRoute = require("./routes/users");
const thoughtRoute = require("./routes/thought");

dotenv.config();

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true },()=>{
    console.log("Nate you are awesome, you are connected to MongoDB")
});

// adding middleware section , parses posts
app.use(express.json());

app.use(morgan("common"));

app.use("/api/users" , userRoute);
app.use("/api/thought" , thoughtRoute);



app.listen(8800,()=>{
    console.log("Nate your server is running, you da' nodemon")
})