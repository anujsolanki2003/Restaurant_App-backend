const mongoose = require("mongoose");

//schema
const orderSchema = new mongoose.Schema(
    {},
    { timestamps: true }
  );


// defining model

const Order= mongoose.model("Order",orderSchema);

// exporting model
module.exports= Order;