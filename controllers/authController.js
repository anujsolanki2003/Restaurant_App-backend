const User = require("../models/userModel");
//for hashing password

const bcrypt = require("bcryptjs");
//for generating token
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
  try {
    // req data from the body
    const { username, email, password, phone ,answer} = req.body;

    //validation
    if (!username || !email || !password || !phone ||!answer) {
      return res.status(500).send({
        success: false,
        message: " Please provide all fields ",
      });
    }
    // check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(500).send({
        success: false,
        message: "Email Registered Already Please Login",
      });
    }
    //hashing password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // create new user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      phone,
      answer
    });
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "All fields are required",
      });
    }
    return res.status(201).send({
      success: true,
      message: "Successfully Registered",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Registeration ",
    });
  }
};

// LOGIN

const loginController = async (req, res) => {
  try {
    // get user data for authenticate from req body
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Please provide Email or Password",
      });
    }

    // check user
    const user = await User.findOne({ email });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not Found",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "Invalid Password",
      });
    }
    user.password = undefined; // password is hiding
    // generating token

    const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15d",
    });

    return res.status(200).send({
      success: true,
      message: "Login Successfully",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Login",
      error,
    });
  }
};

//exporting
module.exports = { registerController, loginController };
