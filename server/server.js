const express = require("express");
const cors = require("cors");

// Environment vars
const port = 8000;
const db_name = "itinerays";


// Import the function from mongoose.config then execute it.
require("./config/mongoose.config")(db_name);


const app = express();

app.use(cors());

// req.body is undefined without this!
app.use(express.json());
require("./routes/itineray.routes")(app);

// After all the routes have been added, server is ready to handle requests.
app.listen(port, () =>
    console.log(`Listening on port ${port} for REQuests to RESpond to.`)
);