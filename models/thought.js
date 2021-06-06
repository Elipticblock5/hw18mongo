const mongooes = require("mongoose");
const dateFormat = require('../utils/dateFormat');

const userReactionSchema = new mongoose.Schema({
    recationId:{
        type: mongooes.Schema.Types.ObjectId,
        default: () => new mongooes.Types.ObjectId()
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


const ThoughtSchema = new mongooes.Schema(
    {
        thoughtText: {
            type:String,
            required: 'if you have a thought, you gotta share!',
            minlenght: 1, 
            maxLength: 300
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

        reactions: [ReactionSchema],
    },

    {
        toJson: {
            virtuals: true,
            getters: true
        },
        id: false
    
    }
);

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
  });

const Thought = model('thought', ThoughtSchema);

module.exports = thought;