const express = require("express");
const {
  getUserController,
  updateUserController,
  updatePasswordController,
  resetPasswordController,
  deleteUserController,
} = require("../controllers/userController");
const { authMiddleware } = require("../middlewares/authMiddleware");

// router object
const router = express.Router();

//routes
// get user info  || get
router.get("/getUser",  getUserController);

// update user || put
router.put("/updateUser", authMiddleware, updateUserController);

// update password || post
router.post("/updatePassword", authMiddleware, updatePasswordController);

// reset password || post
router.post("/resetPassword", authMiddleware, resetPasswordController);

// delete user || delete

router.delete('/deleteUser/:id', authMiddleware, deleteUserController)

module.exports = router;
