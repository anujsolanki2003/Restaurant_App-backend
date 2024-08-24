const express = require("express");
const { authMiddleware } = require("../middlewares/authMiddleware");
const {
  createFoodController,
  getAllFoodsController,
  getSingleFoodController,
  getFoodByRestaurantController,
  updateFoodController,
  deleteFoodController,
  placeOrderController,
  orderStatusController,
} = require("../controllers/foodController");
const adminMiddleware = require("../middlewares/adminMiddleware");

// router object
const router = express.Router();

//routes
// create food || post
router.post("/create", authMiddleware, createFoodController);

// get all food || get
router.get("/getAll", getAllFoodsController);

// get  food by Id || get
router.get("/get/:id", getSingleFoodController);

// get  food by RestaurantId || get
router.get("/getByRestaurant/:id", getFoodByRestaurantController);


// UPDATE food || PUT
router.put("/update/:id",authMiddleware, updateFoodController)

// DLEETE food || DELETE
router.delete("/delete/:id",authMiddleware, deleteFoodController)

// PLACE ORDER
router.post("/placeOrder", authMiddleware, placeOrderController);

// ORDER STATUS
router.post("/orderStatus/:id", authMiddleware, adminMiddleware, orderStatusController
);

module.exports = router;
