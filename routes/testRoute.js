const express = require("express");
const {getUser,testUser}= require("../controllers/testController")
const router= express.Router();

router.post("/test-post", testUser)
router.get("/test-user", getUser);

module.exports= router;
