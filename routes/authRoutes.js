const express = require("express");
const {
  registerController,
  loginController,
} = require("../controllers/authController");
const { authMiddleware } = require("../middlewares/authMiddleware");

// router object
const router = express.Router();

//routes
//REGISTER -> POST
router.post("/register", registerController);

//LOGIN -> POST
router.post("/login", authMiddleware, loginController);
// export router

module.exports = router;
