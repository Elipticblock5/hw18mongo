const mongooes = require("mongoose");

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        require: true,
        min:3,
        max:20,
        unique:true,
        trim: true
    },
    email:{
        type:String,
        required: true,
        max: 50,
        unique: [true, 'Email is needed.']
    },
   thoughts: [
       {
           type: Schema.Types.ObjectId,
           ref: Thought
       }
   ],
   friends: [
       {
           type: Schema.Types.ObjectId,
           ref: 'User'
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


UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User;


    
