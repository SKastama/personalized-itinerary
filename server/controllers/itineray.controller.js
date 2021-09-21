const User = require("../models/user.model");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");


// Export an object that is full of methods.
module.exports = {
    register(req, res) {
        const user = new User(req.body);
        user
            .save()
            .then((newUser) => {
                res.json({ msg: "success!", user: newUser });
            })
            .catch((err) => res.status(400).json(err));
    },

    login(req, res) {
        User.findOne({ uEmail: req.body.uEmail })
            .then((user) => {
            if (user === null) {
                res.status(400).json({ msg: "invalid login attempt" });
            } else {
                bcrypt
                    .compare(req.body.uPassword, user.uPassword)
                    .then((passwordIsValid) => {
                        if (passwordIsValid) {
                            res
                            .cookie(
                                "usertoken",
                                jwt.sign({ _id: user._id }, process.env.JWT_SECRET),
                                {
                                    httpOnly: true,
                                }
                            )
                            .json({ msg: "success!" });
                        } else {
                            res.status(400).json({ msg: "invalid login attempt" });
                        }
                    })
                    .catch((err) =>
                        res.status(400).json({ msg: "invalid login attempt" })
                    );
                }
            })
            .catch((err) => res.json(err));
    },
    

    logout(req, res) {
        res.clearCookie("usertoken");
        res.json({ msg: "usertoken cookie cleared" });
    },

    getLoggedInUser(req, res) {
        const decodedJWT = jwt.decode(req.cookies.usertoken, { complete: true });
    
        User.findById(decodedJWT.payload._id)
            .then((user) => res.json(user))
            .catch((err) => res.json(err));
    },

    create: function (req, res) {
        console.log("create method executed");
        User.create(
            req,
            {
                $push: {
                    itineray: new Itineray(req.body)
                }
            },
        )
            .then((newItineray) => {
                res.json({ itineray: newItineray });
            })
            .catch((err) => {
                res.status(400).json(err);
            });
        },


        // User.create(req.body)
        //     .then((user) => {
        //         res.json(user);
        //     })
        //     .catch((err) => {
        //         res.status(400).json(err);
        //     });
    // },

    // Shorthand method in object syntax.
    getAll(req, res) {
        console.log("getAll method executed");
        User.find()
            .then((users) => {
                res.json(users);
            })
            .catch((err) => {
                res.json(err);
            });
    },

    getOne(req, res) {
        console.log("getOne method executed", "url params:", req.params);

        User.findById(req.params.id)
            .then((user) => {
                res.json(user);
            })
            .catch((err) => {
                res.json(err);
            });
    },

    delete(req, res) {
        console.log("delete method executed", "url params:", req.params);

        User.findByIdAndDelete(req.params.id)
            .then((user) => {
                res.json(user);
            })
            .catch((err) => {
                res.json(err);
            });
    },

    update(req, res) {
        console.log("update method executed", "url params:", req.params);

        User.findByIdAndUpdate(req.params.id, req.body, {
            runValidators: true, // Run model validations again.
            new: true, // return newly updated document.
        })
            .then((user) => {
                res.json(user);
            })
            .catch((err) => {
                res.status(400).json(err);
            });
    },
};