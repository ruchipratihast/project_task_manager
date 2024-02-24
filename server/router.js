const Router = require("express").Router();
const verifyJwt = require("./middlewares/authMiddleware");

Router.get('/health', (req, res) => {
    res.json({
        service: "Pro Manage Server",
        status: "Active",
        time: new Date(),
    });
});

//auth route
Router.post("/register", require("./controllers/auth/register"));
Router.post("/login", require("./controllers/auth/login"));

//task route
// Router.get("/tasks", verifyJwt, require("./controllers/auth/register")); 
// Router.post("/task/create", verifyJwt, require("./controllers/tasks/create"));
Router.get("/tasks", verifyJwt, require("./controllers/tasks/get"));
Router.post("/tasks", verifyJwt, require("./controllers/tasks/create"));
Router.put("/task/edit/:taskId", verifyJwt, require("./controllers/tasks/update"));
// Router.delete("/task/edit/:taskId", verifyJwt, require("./controllers/auth/register")); 

module.exports = Router;

