const itinerayController = require("../controllers/itineray.controller");

/*
LEADING SLASH REQUIRED in routes!
Export a function to be called in server.js where the app will be passed in.
*/
module.exports = (app) => {
    /*
    @route("/api/itinerays")
    def create:
    when this URL is visited, execute the controller function.
    */
    app.post("/api/itinerays/admin", itinerayController.create);
    app.post("/api/itinerays", itinerayController.create);
    app.get("/api/itinerays/all", itinerayController.getAll);
    app.get("/api/itinerays/:id", itinerayController.getOne);
    app.delete("/api/itinerays/:id", itinerayController.delete);
    app.put("/api/itinerays/:id", itinerayController.update);
    // app.post("/api/itinerays/many", itinerayController.createMany);
    app.get("https://api.zoom.us/v2/",)
};