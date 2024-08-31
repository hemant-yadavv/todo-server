const express = require("express");
const router = express.Router();

const { login, signup } = require("../controllers/auth");
const { auth } = require("../middlewares/auth");
const { createTodo } = require("../controllers/createTodo")
const { getTodo } = require("../controllers/getTodo")
const { updateTodo } = require("../controllers/updateTodo")
const { deleteTodo } = require("../controllers/deleteTodo")


router.post("/login", login);
router.post("/signup", signup);


// protected route for authenticated user
router.get("/dashboard", auth, (req, res) => {
    res.json({
        success: true,
        message: "This is authenticated user page",
        user: req.user
    });
});


router.post("/createTodo", auth, createTodo);
router.get("/getTodos", auth, getTodo);
router.put("/updateTodo/:id", auth, updateTodo);
router.delete("/deleteTodo/:id", auth, deleteTodo);

module.exports = router;