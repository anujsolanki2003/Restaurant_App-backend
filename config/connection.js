const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/food-app")
  .then(() => console.log("Db connected successfully"))
  .catch(() => {
    console.log("Error in Db connection");
  });
