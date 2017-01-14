var toDo = require('../models/toDo');

module.exports = {

    createToDo: function(req, res, next) {
        toDo.create(req.body, function(err, result) {
            if (err) {
                return res.status(500).send(err)
            } else {
                res.status(200).json(result)
            }
        });
    },
    readToDo: function(req, res, next) {
        toDo.find({}, function(err, result) {
            if (err) {
                return res.status(500).send(err)
            } else {
                res.status(200).json(result)
            }
        });
    },
    update: function(req, res) {
      // console.log(req.body)
     toDo.findByIdAndUpdate(req.params.id, req.body, function(err, result) {
        if (err) {
          res.status(500).send(err);
       } else {
        res.status(200).send(result);
            }
        });
    },
    deleteToDo: function(req, res) {
     toDo.findByIdAndRemove(req.params.id, function(err, result) {
        if (err) {
          res.status(500).send(err);
        }
        res.status(200).send(result);
     });
  },

    //
    // register: function(req, res, next) {
    //   User.create(req.body, function(err, result) {
    //     if(err) return res.status(500).send(err);
    //     newUser = result.toObject();
    //     newUser.password = null;
    //     res.status(200).json(newUser);
    //   });
    // },
    //
    // read: function(req, res, next) {
    //   User.find(req.query, function(err, result) {
    //     if (err) return res.status(500).send(err);
    //     for (var i = 0; i < result.length; i++) {
    //       delete result[i].password;
    //     }
    //     res.status(200).send(result);
    //   });
    // },
    //
    // me: function(req, res, next) {
    //   if (!req.user) return res.status(401).send('current user not defined');
    //   req.user.password = null;
    //   return res.status(200).json(req.user);
    // },
    //
    // update: function(req, res, next) {
    //   User.findByIdAndUpdate(req.params._id, req.body, function(err, result) {
    //     if (err) next(err);
    //     res.status(200).send('user updated');
    //   });
    // }
};
