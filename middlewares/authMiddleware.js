const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {
    //extracting token from the req.headers
    const token = req.headers["authorization"].split(" ")[1];
    await jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        res.status(402).send({
          success: false,
          msg: "Unathorized User",
          err,
        });
      } else {
        req.body.id = decode.id;
        next();
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "Internal Server Error",
      error,
    });
  }
};

module.exports = { authMiddleware };
