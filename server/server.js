require('dotenv').config();

const express = require("express");
const cookieParser = require('cookie-parser');
const cors = require("cors");
const nodemailer = require("nodemailer");


require("./config/mongoose.config")(process.env.DB_NAME);

const app = express();
app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        type: "OAuth2",
        user: process.env.EMAIL,
        pass: process.env.WORD,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    },
});

transporter.verify((err, success) => {
    err
        ? console.log(err)
        : console.log(`=== Server is ready to take messages: ${success} ===`);
});


app.post("/send", function (req, res) {
    let mailOptions = {
        from: process.env.EMAIL,
        to: `${req.body.mailerState.email}`,
        subject: `Message from: ${process.env.EMAIL}`,
        text: `${req.body.mailerState.message}`,
    };
    // let mailOptions = {
    //     from: `${req.body.mailerState.email}`,
    //     to: process.env.EMAIL,
    //     subject: `Message from: ${req.body.mailerState.email}`,
    //     text: `${req.body.mailerState.message}`,
    // };

    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            res.json({
                status: "fail",
            });
            } else {
            console.log("== Message Sent ==");
            res.json({
                status: "success",
            });
        }
    });
});


require("./routes/itineray.routes")(app);


app.listen(process.env.DB_PORT, () =>
    console.log(`Listening on port ${process.env.DB_PORT}`)
);