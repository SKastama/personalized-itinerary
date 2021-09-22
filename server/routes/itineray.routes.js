const itinerayController = require("../controllers/itineray.controller");
const { authenticate } = require("../config/jwt.config");

// Comment

module.exports = (app) => {
    app.post("/api/register", itinerayController.register);
    app.post("/api/login", itinerayController.login);
    app.post("/api/logout", itinerayController.logout);

    app.post("/api/itinerays", authenticate, itinerayController.create);
    app.get("/api/itinerays/all", authenticate, itinerayController.getAll);
    app.get("/api/itinerays/:id", authenticate, itinerayController.getOne);
    app.delete("/api/itinerays/:id", authenticate, itinerayController.delete);
    app.put("/api/itinerays/:id", authenticate, itinerayController.update);
    app.get("/api/users/loggedin", authenticate, itinerayController.getLoggedInUser);
    // app.get("https://api.zoom.us/v2/",)
};