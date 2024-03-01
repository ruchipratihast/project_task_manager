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
Router.put("/update/:userId", verifyJwt, require("./controllers/auth/update"));

//task route
Router.get("/tasks", verifyJwt, require("./controllers/tasks/get"));
Router.get("/tasks/:filter", verifyJwt, require("./controllers/tasks/filterTask"));
Router.post("/tasks", verifyJwt, require("./controllers/tasks/create"));
Router.put("/tasks/:taskId", verifyJwt, require("./controllers/tasks/update"));
Router.put("/tasks-section/:taskId", verifyJwt, require("./controllers/tasks/updateSection"));
Router.delete("/tasks/:taskId", verifyJwt, require("./controllers/tasks/delete"));

module.exports = Router;

