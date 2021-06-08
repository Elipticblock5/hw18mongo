const express = require("express");
const app = express();
const mongoose = require("mongoose");

//removed to fix server routing


//const userRoute = require("./routes/users");
//const thoughtRoute = require("./routes/api/thought");


const PORT = process.env.PORT || 8800;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));









mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/hw18mongo', {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: false,

},()=>{
    console.log("Nate you are awesome, you are connected to MongoDB")
});


mongoose.set('debug', true);


app.use(require('./routes'));





mongoose.set('debug', true);






app.listen(PORT, () => console.log(`Nate you are connected on localhost: ${PORT}`));
