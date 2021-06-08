const { user, thought } = require('../models');

const userControllers = {

    getAlltheUsers(req,res) {
        user.find({})

        .select('-__v')
        .sort({ _id: -1 })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    //find one user by id

    getUserID({ params }, res) {
        user.findOne({ _id: params.id })
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .populate({
            path: 'friends',
            seclect: '-__v'
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'Wait, there is no one with that id found anywhere! ' });
                return;
            }
            res.json(dbUserData)
        })

        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    //   creates a new user

    makeUser({ body }, res) {
        user.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    },

    //updating user its _id

    updateTheUser({ params, body }, res) {
        user.findOneAndUpdate({ _id: params.id } , body, { new: true, runValidators: true })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'Wait, No user was found with this id!!'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },


    // function to delete user by id


    deleteTheUser({ params }, res) {
        thought.deleteMany({ _id: params.id })
          .then(() => {
            user.findOneAndDelete({ _id: params.id })
    
          .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'Wait, cannot delete the user no user found with this id' });
              return;
            }
            res.json(dbUserData);
          });
        })
          .catch(err => res.status(400).json(err));
      },


 // add a fiend to a users friend list

 addTheFriend({ params }, res){
    user.findOneAndUpdate({ _id: params.userId}, { $push: {friends: params.friendId} }, {new: true})
    .then(dbUserData => {
        if(!dbUserData) {
            res.status(404).json({ message: "Cannot add the friend, the id was not found"});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => res.status(400).json(err));
},


//funciton to deltee friend

deleteTheFriend({ params }, res) {
    user.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: 'Cannot delete a friend, none found with this Id' });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  }
};

module.exports = userControllers