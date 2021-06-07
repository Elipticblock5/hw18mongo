const mongoose = require("mongoose");
const {Schema, model} = require("mongoose");


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require: true,
        // not needed min:3,
        // not needed max:20,
        unique:true,
        trim: true
    },
    email:{
        type:String,
        required: true,
        max: 50,
        unique: [true, 'You have to enter an email.']
    },
   thoughts: [
       {
           type: mongoose.Schema.Types.ObjectId,
           ref: "thought"
       }
   ],
   friends: [
       {
           type: mongoose.Schema.Types.ObjectId,
           ref: 'user'
       }
   ]
},
{
    toJson: {
        virtuals: true,
    },
    id:false
}
);



// assingment criteria Schame setting 'firndCount


userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

const user = model('user', userSchema);

module.exports = user;


    
