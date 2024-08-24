const Food = require("../models/foodModel");

// CREATE FOOD
const createFoodController = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      catgeory,
      code,
      isAvailabe,
      restaurant,
      rating,
    } = req.body;

    if (!title || !description || !price || !restaurant) {
      return res.status(500).send({
        success: false,
        message: "Please Provide all fields",
      });
    }
    const newFood = new Food({
      title,
      description,
      price,
      imageUrl,
      foodTags,
      catgeory,
      code,
      isAvailabe,
      restaurant,
      rating,
    });

    await newFood.save();
    res.status(201).send({
      success: true,
      message: "New Food Item Created",
      newFood,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in create food api",
      error,
    });
  }
};

// get All food items

const getAllFoodsController = async(req, res) => {
    try {
        const foods = await Food.find({});
        if (!foods) {
          return res.status(404).send({
            success: false,
            message: "No food items found",
          });
        }
        res.status(200).send({
          success: true,
          totalFoods: foods.length,
          foods,
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "Error in Get ALL Foods API",
          error,
        });
      }
};

const getSingleFoodController = async(req, res) => {
    try {
        const foodId = req.params.id;
        if (!foodId) {
          return res.status(404).send({
            success: false,
            message: "please provide food id",
          });
        }
        const food = await Food.findById(foodId);
        if (!food) {
          return res.status(404).send({
            success: false,
            message: "No Food Found with this id",
          });
        }
        res.status(200).send({
          success: true,
          food,
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "Error In get Single Food API",
          error,
        });
      }
};

// GET FOOD BY Restaurant
const getFoodByRestaurantController = async (req, res) => {
    try {
      const restaurantId = req.params.id;
      if (!restaurantId) {
        return res.status(404).send({
          success: false,
          message: "please provide id",
        });
      }
      const food = await Food.find({ restaurant: restaurantId });
      if (!food) {
        return res.status(404).send({
          success: false,
          message: "No Food Found with this id",
        });
      }
      res.status(200).send({
        success: true,
        message: "food based on restaurant Id",
        food,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error In get Single Food API",
        error,
      });
    }
  };

  // update food item

  const updateFoodController= async(req,res)=>{
    try {
        const foodID = req.params.id;
        if (!foodID) {
          return res.status(404).send({
            success: false,
            message: "no food id was found",
          });
        }
        const food = await Food.findById(foodID);
        if (!food) {
          return res.status(404).send({
            success: false,
            message: "No Food Item Found",
          });
        }
        const {
          title,
          description,
          price,
          imageUrl,
          foodTags,
          catgeory,
          code,
          isAvailabe,
          resturnat,
          rating,
        } = req.body;
        const updatedFood = await Food.findByIdAndUpdate(foodID,
          {
            title,
            description,
            price,
            imageUrl,
            foodTags,
            catgeory,
            code,
            isAvailabe,
            resturnat,
            rating,
          },
          { new: true }
        );
        res.status(200).send({
          success: true,
          message: "Food Item Updated Successfully",
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "Erorr In Update Food API",
          error,
        });
      }
  }

  // delete food item

  const deleteFoodController= async(req,res)=>{
    try {
        const foodId = req.params.id;
        if (!foodId) {
          return res.status(404).send({
            success: false,
            message: " Please provide food item id",
          });
        }
        const food = await Food.findById(foodId);
        if (!food) {
          return res.status(404).send({
            success: false,
            message: "No Food item Found with id",
          });
        }
        await Food.findByIdAndDelete(foodId);
        res.status(200).send({
          success: true,
          message: "Food Item Deleted Successfully ",
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "Eror In Delete Food APi",
          error,
        });
      }
  }

module.exports = {
  createFoodController,
  getAllFoodsController,
  getSingleFoodController,
  getFoodByRestaurantController,
  updateFoodController,
  deleteFoodController
};
