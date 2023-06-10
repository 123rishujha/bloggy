const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/userModel");

const authMiddleware = async (req, res, next) => {
  let token = req.headers?.authorization?.split(" ")[1];
  // const { token } = req.cookies;
  console.log("token from authmiddleware", token);
  if (!token) {
    let error = new Error("User Not Authorized,token not found in cookieeeee");
    error.statusCode = 401;
    return next(error);
  }
  if (token) {
    try {
      let decoded = jwt.verify(token, process.env.JWT_SECRET);
      // console.log(decoded);
      if (decoded) {
        try {
          let user = await UserModel.findOne({ _id: decoded.userId });
          req.user = user;
          // console.log(user);
          next();
        } catch (err) {
          console.log(
            "error occured while find finding user in database in authMiddleware"
          );
          next(err);
        }
      }
    } catch (err) {
      console.log("error occured while verifying jwt token in authmiddleware");
      err.statusCode = 401;
      err.message = err.message
        ? `${err.message}-please provide valid token`
        : "please provide valid token";
      next(err);
    }
  }
};

module.exports = {
  authMiddleware,
};
