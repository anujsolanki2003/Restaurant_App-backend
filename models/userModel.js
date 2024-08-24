
const mongoose = require("mongoose");

// schema

const userSchema= new mongoose.Schema({
    username :{
        type:String,
        required:[true, "username is required"]
    },
    email :{
        type:String,
        required:[true, "Email is required"],
        unique:true
    },
    password :{
        type:String,
        required:[true, "password is required"],
    },
    address :{
        type:String,
        required:[true, "address is required"],
        default:"Agra"
    },
    phone:{
        type:Number,
        required:true
    },
    // profile:{
    //     type:String,
    //     url:""
    // },
    userType:{
        type:String,
        enum:["client", "admin", "vendor"],
        default:"client"
    },
    answer:{
        type:String,
        required:[true, "Answer key is required"]
    }
},{timestamps:true})

// defining model

const User= mongoose.model("User",userSchema);

// exporting model
module.exports= User;