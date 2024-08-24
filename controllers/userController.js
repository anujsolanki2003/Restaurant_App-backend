const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
// getting user by id
const getUserController = async (req, res) => {
  try {
    // const getUser = await User.findById({ _id: req.body.id });
    const getUser = await User.find();
    //validation
    if (!getUser) {
      return res.status(404).send({
        success: false,
        msg: "User Not Found",
      });
    }
    // console.log(getUser);
    getUser.password = undefined; // here we are hiding password from the user
    return res.status(200).send({
      success: true,
      msg: "User Get Successfully",
      getUser,
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

// updating user
const updateUserController = async (req, res) => {
  try {
    // find user
    const updatedUser = await User.findById({ _id: req.body.id });
    // console.log(updatedUser);

    //validation
    if (!updatedUser) {
      return res.status(404).send({
        success: false,
        msg: "User Not Found",
      });
    }

    // getting user details from req.body for updating
    const { username, address, phone } = req.body;
    // console.log(username, address, phone);
    if (username) {
      updatedUser.username = username;
    }
    if (address) {
      updatedUser.address = address;
    }
    if (phone) {
      updatedUser.phone = phone;
    }
    // console.log(updatedUser.username, address, phone);
    // save user after updating
    await updatedUser.save();

    // sending response
    return res.status(200).send({
      success: true,
      msg: "User updated Successfully",
      updatedUser,
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

// update password

const updatePasswordController = async (req, res) => {
  try {
    //find user
    const user = await User.findById({ _id: req.body.id });
    //valdiation
    if (!user) {
      return res.status(404).send({
        success: false,
        msg: "Usre Not Found",
      });
    }
    // get data from user
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(500).send({
        success: false,
        msg: "Please Provide Old or New PasswOrd",
      });
    }
    //check user password  | compare password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        msg: "Invalid old password",
      });
    }
    //hashing password
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    res.status(200).send({
      success: true,
      msg: "Password Updated!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "Error In Password Update API",
      error,
    });
  }
};


// reset password using answer key

const resetPasswordController = async (req,res) => {
  try {
    // getting data from req.body for reset password
    const {email, newPassword, answer}= req.body;
    
    //validation
    if(!email ||!newPassword || !answer){
      return res.status(404).send({
        success: false,
        msg: "Please Provide All Fields",
      });
    }
   // find user from database

   const user = await User.findOne({email ,answer })
   //validation
   if (!user) {
    return res.status(401).send({
      success:false,
      msg:"User not Found Or Invalid Answer Key"
    })
   }
   // hashing new password
   const salt = bcrypt.genSaltSync(10);
   const hashedPassword = await bcrypt.hash(newPassword, salt);

   user.password=hashedPassword;

   // save user
   await user.save();

   // sending response
   return res.status(200).send({
    success: true,
    msg: "Password Reset Successfully",
    user,
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


// delete user

const deleteUserController= async(req, res)=>{
    try {
      // find id from req.params and delete user by findByIdAndDelete method
      await User.findByIdAndDelete({_id:req.params.id})
      res.status(200).send({
        success:true,
        msg:"Your Account has been deleted"
      })
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        success: false,
        msg: "Internal Server Error",
        error,
      });
    }
}

module.exports = {
  getUserController,
  updateUserController,
  updatePasswordController,
  resetPasswordController,
  deleteUserController
};
