const express = require("express");
const usersController = require("../controllers/users.js");
const checkAuth = require("../middleware/check-auth.js");

const router = express.Router();

router.get("/", checkAuth, usersController.usersGetAll);
router.get("/:userId", checkAuth, usersController.usersGet);
router.post("/signup", usersController.signUp);
router.post("/login", usersController.logIn);
router.delete("/:userId", checkAuth, usersController.usersDelete);

module.exports = router;
