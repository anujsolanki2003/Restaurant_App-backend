const mongoose = require("mongoose");

const foodSchema= new mongoose.Schema({
    
        title: {
          type: String,
          required: [true, " Food title is required"],
        },
        description: {
            type: String,
            required: [true, " food description is requir"],
          },
          price: {
            type: Number,
            required: [true, "food price is require"],
          },
          imageUrl: {
            type: String,
            default:
              "https://image.similarpng.com/very-thumbnail/2021/09/Good-food-logo-design-on-transparent-background-PNG.png",
          },
          foodTags: {
            type: Array,
          },
          catgeory: {
            type: String,
          },
          code: {
            type: String,
          },
          isAvailabe: {
            type: Boolean,
            default: true,
          },
          restaurant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Resturant",
          },
       
        rating: {
          type: Number,
          default: 1,
          min: 1,
          max: 5,
        },
        ratingCount: { type: String },
        code: {
          type: String,
        },
       
      },
{timestamps:true})

// defining model

const  Food= mongoose.model(" Food",foodSchema);

// exporting model
module.exports= Food;