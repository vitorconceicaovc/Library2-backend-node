// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../../api/controllers/userController");

router.post("/users/register", userController.registerUser);

module.exports = router;
