const Router = require("express").Router();

Router.get('/health', (req, res) => {
    res.json({
        service: "job listing server",
        status: "Active",
        time: new Date(),
    });
});

//auth route
Router.get("/register", require("./controllers/auth/register")); 
Router.post("/login", require("./controllers/auth/login"));

module.exports = Router;

