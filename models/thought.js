
const dateFormat = require('../utils/dateFormat');
const mongoose = require("mongoose");
const { Schema, model, Types} = require("mongoose");

const userReactionSchema = new mongoose.Schema({
   //laid out per assignment criteria
   
    recationId:{
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId()
    },

    reactionBody:{
        type:String,
        required: 'Say Something Anything!',
        max: 280
       
    },

    username: {
        type: String,
        required: 'You need a username, nothing anons here!'
    },

    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtValue => dateFormat(createdAtValue)
    }
},

  
{
    toJson: {
        virtuals: true,
        getters: true
    },
    id:false
}
);


const thoughtSchema = new mongoose.Schema(
    {
        thoughtText: {
            type:String,
            required: 'if you have a thought, you gotta share!',
            minlenght: 1, 
            maxLength: 280 //280 per assingment criterias
        },

        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtValue => dateFormat(createdAtValue)
        },

        username: {
            type: String, 
            required: 'You have to have a username, no anons here'

        },

        reactions: [userReactionSchema],
    },

    {
        toJson: {
            virtuals: true,
            getters: true
        },
        id: false
    
    }
);

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
  });

const thought = model('thought', thoughtSchema);

module.exports = thought;