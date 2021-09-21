const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// {PATH} will be replaced with the field name, such as "location".
const itinerayschema = new mongoose.Schema(
    {
        department: {
            type: String,
            required: [true, "{PATH} is required."],
        },

        firstName: {
            type: String,
            required: [true, "{PATH} is required."],
            minlength: [1, "{PATH} must be at least {MINLENGTH} characters."],
        },

        lastName: {
            type: String,
            required: [true, "{PATH} is required."],
            minlength: [1, "{PATH} must be at least {MINLENGTH} characters."],
        },

        phone: {
            type: Number,
            required: [true, "{PATH} is required."],
        },

        email: {
            type: String,
            required: [true, "{PATH} is required."],
        },

    },
    { timestamps: true } // adds createdAt and updatedAt
);

/*
Register schema with mongoose and provide a string to name the collection. This
also returns a reference to our model that we can use for DB operations.
*/
const Itineray = mongoose.model("Itineray", itinerayschema);

// The mongoose model that lets you connect to it's DB collection.
module.exports = Itineray;