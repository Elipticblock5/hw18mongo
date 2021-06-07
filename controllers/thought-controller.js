const { thought, User } = require('../models');

const thoughtControllers = {
 
//get all thoughts via api route

  getAllTheThought(req, res) {
    thought.find({})
    .populate({
      path: 'reactions',
      select: '-__v'
    })
    .select('-__v')
    .sort({ _id: -1 })
    .then(dbThoughtData => res.json(dbThoughtData))
    .catch(err => {
      console.log(err);
      res.sendStatus(400);
    });
  },



    getThoughtById({ params }, res) {
      thought.findOne({ _id: params.id })
       .populate({
        path: 'reactions',
        select: '-__v'
      })
       .select('-__v')
       .sort({ _id: -1 })
       .then(dbThoughtData => {
        if (!dbThoughtData) {
            res.status(404).json({ message: 'Disaster, no thought found by this id' });
            return;
          }
          res.json(dbThoughtData);
        })

        //catch err
        .catch(err => {
          console.log(err);
          res.status(400).json(err);
        });
    },

  
    createThought({ body }, res) {
        thought.create(body)
        .then(({ _id }) => {
        return User.findOneAndUpdate(
            { _id: body.userId },
            { $push: { thought: _id } },
            { new: true }
            );
            })
            .then(dbThoughtData => {
        if (!dbThoughtData) {
            res.status(404).json({ message: 'Thougts, what thoughts, no thought found with this id' });
            return;
        }
        res.json(dbThoughtData);
        })

        //catch err
        .catch(err => res.json(err));
    },


 //function to update user thought


    updateUserThought({ params, body }, res) {
        thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
          .then(dbThoughtData => {
            if (!dbThoughtData) {
              res.status(404).json({ message: 'Cant update a thought that doesnt exiest, no thought with this id' });
              return;
            }
            res.json(dbThoughtData);
          })

          //catch err
          .catch(err => res.json(err));
      },


      //function to delete user thoughts

    deleteUserThought({ params }, res) {
        thought.findOneAndDelete({ _id: params.id })
          .then(dbThoughtData => {
              if (!dbThoughtData) {
                res.status(404).json({ message: 'Would love to delete, but no though with this id' });
                return;
              }
              return User.findOneAndUpdate(
                { _id: parmas.userId },
                { $pull: { thoughts: params.Id } },
                { new: true }
              )
            })

            //no id message
            .then(dbUserData => {
              if (!dbUserData) {
                res.status(404).json({ message: 'There were no users found with this id' });
                return;
              }
              res.json(dbUserData);
            })
            .catch(err => res.json(err));
        },


    // add a user rection funtion

    addUserReaction({ params, body }, res){
        thought.findOneAndUpdate({ _id: params.thoughtId}, { $push: {reactions: body} }, {new: true, runValidators: true})
        .populate({path: 'reactions', select: '-__v'})
        .select('-__v')
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({ message: "Love to add a reaction, but no id found"});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
    },

     // remove a reaction


     removeUserReaction({ params }, res){
        rhought.findOneAndUpdate({ _id: params.thoughtId}, { $pull: {reactionId: params.reactionId} }, {new: true })
        .then(dbThoughtData => {
          if (!dbThoughtData) {
            res.status(404).json({ message: 'Cant remove, no id found'});
            return;
          }
         res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    }
  
  
  };
  
  
  module.exports = thoughtControllers