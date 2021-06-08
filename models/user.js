
const {Schema, model} = require("mongoose");
//adding date format
const dateFormat = require('../utils/dateFormat');


const userSchema = new Schema({
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
           type: Schema.Types.ObjectId,
           ref: "thought"
       }
   ],
   friends: [
       {
           type: Schema.Types.ObjectId,
           ref: 'user'
       }
   ]
},
{
    toJson: {
        virtuals: true,
        getters: true
    },
     // prevents virtuals from creating duplicate of _id as `id`
    id:false
}
);



// assingment criteria Schame setting 'firndCount


userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

const user = model('user', userSchema);

module.exports = user;


    
