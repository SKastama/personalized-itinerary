const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');


const ItineraySchema = new mongoose.Schema(
    {
        department: {
            type: String,
            // required: [true, "{PATH} is required."],
        },

        title: {
            type: String,
            // required: [true, "{PATH} is required."],
            // minlength: [1, "{PATH} must be at least {MINLENGTH} characters."],
        },

        firstName: {
            type: String,
            // required: [true, "{PATH} is required."],
            // minlength: [1, "{PATH} must be at least {MINLENGTH} characters."],
        },

        lastName: {
            type: String,
            // required: [true, "{PATH} is required."],
            // minlength: [1, "{PATH} must be at least {MINLENGTH} characters."],
        },

        phone: {
            type: Number,
            // required: [true, "{PATH} is required."],
        },

        email: {
            type: String,
            // required: [true, "{PATH} is required."],
        },

    },
    { timestamps: true } // adds createdAt and updatedAt
);

const UserSchema = new mongoose.Schema(
    {
        // uDepartment: {
        //     type: String,
        //     required: [true, "{PATH} is required."],
        // },

        // uTitle: {
        //     type: String,
        //     required: [true, "{PATH} is required."],
        //     minlength: [1, "{PATH} must be at least {MINLENGTH} characters."],
        // },

        uFirstName: {
            type: String,
            required: [true, "{PATH} is required."],
            minlength: [1, "{PATH} must be at least {MINLENGTH} characters."],
        },
// Comment
        uLastName: {
            type: String,
            required: [true, "{PATH} is required."],
            minlength: [1, "{PATH} must be at least {MINLENGTH} characters."],
        },

        uPhone: {
            type: Number,
            required: [true, "{PATH} is required."],
        },

        uEmail: {
            type: String,
            required: [true, "{PATH} is required."],
            validate: {
                validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
                message: "Please enter a valid email"
            }
        },

        uPassword: {
            type: String,
            required: [true, "{PATH} is required."],
        },

        itineray: [ItineraySchema],

    }, { timestamps: true }
);

// Comment
UserSchema.virtual('confirmPassword')
    .get(() => this._confirmPassword)
    .set(value => this._confirmPassword = value);


UserSchema.pre('validate', function (next) {
    if (this.uPassword !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    next();
});

UserSchema.pre('save', function (next) {
    bcrypt.hash(this.uPassword, 10)
        .then(hash => {
            this.uPassword = hash;
            next();
        })
        .catch((err) => console.log(err));
});


const User = mongoose.model("User", UserSchema);

// The mongoose model that lets you connect to it's DB collection.
module.exports = User;

