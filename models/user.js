const mongoose = require("mongoose");
const {Schema, model} = require("mongoose");


const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        require: true,
        // not needed min:3,
        // not neeed max:20,
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


UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

const user = model('user', UserSchema);

module.exports = user;


    
