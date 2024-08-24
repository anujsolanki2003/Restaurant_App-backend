const mongoose = require("mongoose");

//schema
const categorySchema = new mongoose.Schema(
    {
      title: {
        type: String,
        required: [true, "category title is required"],
      },
      imageUrl: {
        type: String,
        default:
          "https://image.similarpng.com/very-thumbnail/2021/09/Good-food-logo-design-on-transparent-background-PNG.png",
      },
    },
    { timestamps: true }
  );


// defining model

const Category= mongoose.model("Category",categorySchema);

// exporting model
module.exports= Category;