const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../models/User.js");

usersGetAll = (req, res, next) => {
  User.find()
    .select("email password")
    .then(users => {
      const response = {
        count: users.length,
        users: users.map(user => {
          const request = {
            type: "GET",
            url: `http://localhost:7000/users/${user.id}`,
          };
          return {
            email: user.email,
            password: user.password,
            _id: user._id,
            request: request,
          };
        }),
      };
      console.log(response);
      res.status(200).json(response);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({error});
    });
};

usersGet = (req, res, next) => {
  const id = req.params.userId;
  User.findById(id)
    .select("email password")
    .then(doc => {
      console.log(doc);
      if (doc) {
        res.status(200).json({
          user: doc,
          request: {
            type: "GET",
            description: `GET user by ID: ${doc.id}`,
            url: `http://localhost:7000/users/${doc.id}`,
          },
        });
      } else {
        res.status(404).json({
          message: `No valid entry found for provided Id: ${id}`,
        });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: error,
      });
    });
};

const signUp = (req, res, next) => {
  User.find({email: req.body.email}).then(user => {
    if (user.length !== 0) {
      return res.status(409).json({
        message: `${req.body.email} Email existed`,
      });
    }

    bcrypt.hash(req.body.password, 10, (error, hash) => {
      if (error) {
        return res.status(500).json({
          error: error,
        });
      }

      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        password: hash,
      });

      user
        .save()
        .then(result => {
          console.log(result);
          res.status(200).json({
            message: "User created",
          });
        })
        .catch(error => {
          console.log(error);
          res.status(500).json({
            error: error,
          });
        });
    });
  });
};

const logIn = (req, res, next) => {
  User.find({email: req.body.email})
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }

      bcrypt.compare(req.body.password, user[0].password, (error, result) => {
        if (error) {
          return res.status(401).json({
            message: "Auth failed",
          });
        }

        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id,
            },
            process.env.JWT_KEY,
            {
              expiresIn: "1h",
            },
          );
          return res.status(200).json({
            message: "Auth successful",
            token: token,
          });
        }

        res.status(401).json({
          message: "Auth failed",
        });
      });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: error,
      });
    });
};

const usersDelete = (req, res, next) => {
  User.remove({_id: req.params.userId})
    .then(result => {
      console.log(result);
      res.status(200).json({
        message: "User deleted",
      });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: error,
      });
    });
};

module.exports = {
  usersGetAll,
  usersGet,
  signUp,
  logIn,
  usersDelete,
};
