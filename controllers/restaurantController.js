const Restaurant = require("../models/restaurantModel");

// create retaurant controller

const createRestaurantController = async (req, res) => {
  try {
    const {
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    } = req.body;
    // validation
    if (!title || !coords) {
      return res.status(500).send({
        success: false,
        message: "please provide title and address",
      });
    }
    const newResturant = new Restaurant({
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    });

    await newResturant.save();

    res.status(201).send({
      success: true,
      message: "New Resturant Created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Create Resturant api",
      error,
    });
  }
};

// get All restaurant data

const getAllRestaurantController = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();

    // validation
    if (!restaurants) {
      return res.status(404).send({
        success: false,
        msg: "Restaurant Not Found",
      });
    }

    // response
    res.status(200).send({
      success: true,
      msg: "Restaurant Data",
      restaurantCount: restaurants.length,
      restaurants,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      msg: "Internal Server Error",
      error,
    });
  }
};

// get indivisual restaurant by ID

const getRestaurantController = async (req, res) => {
    try {
        // extracting restaurantId from req.params
        const restaurantId= req.params.id;
        // validation
        if (!restaurantId) {
            return res.status(404).send({
                success: false,
                msg: "Please provide restaurant Id",
              });
        }

      const restaurant =  await Restaurant.findById(restaurantId);
      if (!restaurant) {
        return res.status(404).send({
            success: false,
            msg: "No Restaurant Found",
          });
    }

    // send response
    res.status(200).send({
        success: true,
        msg: "Your Desired Restaurant",
        restaurant
    })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
          success: false,
          msg: "Internal Server Error",
          error,
        });
      }
};

// delete Restaurant

const deleteRestaurantController = async (req, res) => {
    try {
      const restaurantId = req.params.id;
      if (!restaurantId) {
        return res.status(404).send({
          success: false,
          message: "No Restaurant Found OR Provide Restaurant ID",
        });
      }
      await Restaurant.findByIdAndDelete(restaurantId);
      res.status(200).send({
        success: true,
        message: "Restaurant Deleted Successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Eror in delete restaurant api",
        error,
      });
    }
  };

module.exports = {
  createRestaurantController,
  getAllRestaurantController,
  getRestaurantController,
  deleteRestaurantController
};
