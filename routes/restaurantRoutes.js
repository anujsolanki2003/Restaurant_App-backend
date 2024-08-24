const express = require("express");
const { authMiddleware } = require("../middlewares/authMiddleware");
const {
  createRestaurantController,
  getAllRestaurantController,
  getRestaurantController,
  deleteRestaurantController,
} = require("../controllers/restaurantController");

// router object
const router = express.Router();

//routes
// create restaurent || post
router.post("/createRest", authMiddleware, createRestaurantController);

// getAll restaurant  || get

router.get("/getAllRest", getAllRestaurantController);

// get restaurant by id  || get

router.get("/getRest/:id", getRestaurantController);

// delete restaurant by id  || delete
router.delete("/deleteRest/:id", authMiddleware, deleteRestaurantController);
module.exports = router;
