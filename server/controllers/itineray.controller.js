const Itineray = require("../models/itineray.model");

// Export an object that is full of methods.
module.exports = {
    // long-form syntax - key: value
    create: function (req, res) {
        console.log("create method executed");

        // req.body is the form data or data sent in from postman / js requests.
        Itineray.create(req.body)
            .then((itineray) => {
                // newly created dest from DB with auto generated id and createdAt.
                res.json(itineray);
            })
            .catch((err) => {
                res.status(400).json(err);
            });
    },

    // Shorthand method in object syntax.
    getAll(req, res) {
        console.log("getAll method executed");
        Itineray.find()
            .then((itinerays) => {
                res.json(itinerays);
            })
            .catch((err) => {
                res.json(err);
            });
    },

    getOne(req, res) {
        console.log("getOne method executed", "url params:", req.params);

        Itineray.findById(req.params.id)
            .then((itineray) => {
                res.json(itineray);
            })
            .catch((err) => {
                res.json(err);
            });
    },

    delete(req, res) {
        console.log("delete method executed", "url params:", req.params);

        Itineray.findByIdAndDelete(req.params.id)
            .then((itineray) => {
                res.json(itineray);
            })
            .catch((err) => {
                res.json(err);
            });
    },

    update(req, res) {
        console.log("update method executed", "url params:", req.params);

        Itineray.findByIdAndUpdate(req.params.id, req.body, {
            runValidators: true, // Run model validations again.
            new: true, // return newly updated document.
        })
            .then((itineray) => {
                res.json(itineray);
            })
            .catch((err) => {
                res.status(400).json(err);
            });
    },

    // NOT ON EXAM.
    createMany(req, res) {
        const promises = req.body.map((dest) => {
            return Itineray.create(dest);
        });

        Promise.allSettled(promises).then((results) => {
            res.json(results);
        });
    },
};