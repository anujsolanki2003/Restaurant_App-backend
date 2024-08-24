// package requires/imports

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");

// files requires/imports
require("./config/connection");
const testRoute = require("./routes/testRoute");
const authRoute = require("./routes/authRoutes");
const userRoute = require("./routes/userRoutes");
const restaurantRoute =require("./routes/restaurantRoutes")
const categoryRoute =require("./routes/categoryRoutes")
const foodRoute =require("./routes/foodRoutes")

// rest object
const app = express();

// dotenv configure
dotenv.config();
const port = process.env.PORT || 8000;

//middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// routes
app.use("/api/v1/test", testRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/restaurant", restaurantRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/food", foodRoute);



//listening port
app.listen(port, () => {
  console.log(
    `server running in ${process.env.DEV_MODE} mode  at port ${port}`
  );
});
