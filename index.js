const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");

dotenv.config();

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true },()=>{
    console.log("you are connected to MongoDB")
});

// adding middleware section , parses posts
app.use(express.json());
app.use(helmet());  //for security
app.use(morgan("common"));

app.use("/api/users" , userRoute);




app.listen(8800,()=>{
    console.log("nate your server is running")
})