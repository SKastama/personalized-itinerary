require('dotenv').config();

const express = require("express");
const cookieParser = require('cookie-parser');
const cors = require("cors");



require("./config/mongoose.config")(process.env.DB_NAME);

// const myFirstSecret = process.env.FIRST_SECRET_KEY;
// const payload = {
//     id: user._id
// };

// // notice that we're using the SECRET_KEY from our .env file
// const userToken = jwt.sign(payload, process.env.SECRET_KEY);

const app = express();

app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());


require("./routes/itineray.routes")(app);


app.listen(process.env.DB_PORT, () =>
    console.log(`Listening on port ${process.env.DB_PORT}`)
);