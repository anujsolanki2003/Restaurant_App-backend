const express = require("express");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { createCategoryController, getAllCategoryController, updateCategoryController, deleteCategoryController } = require("../controllers/categoryController");


// router object
const router = express.Router();

//routes
// create category || post
router.post("/create-category", authMiddleware, createCategoryController);

// get all category || get
router.get("/getAll-category",  getAllCategoryController);

// UPDATE CATEGORY || PUT
router.put("/update-category/:id", authMiddleware, updateCategoryController);

// DLEETE CATEGORY || DELETE
router.delete("/delete-category/:id", authMiddleware, deleteCategoryController);


module.exports = router;
