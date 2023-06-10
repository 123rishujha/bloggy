const { UserModel } = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerController = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    let error = new Error("please fill all the fields");
    error.statusCode = 401;
    return next(error);
  }

  try {
    let existUser = await UserModel.findOne({ email });
    if (existUser) {
      // console.log("user exist");
      let err = new Error("user already exist with the provided email");
      err.statusCode = 401;
      next(err);
    } else {
      bcrypt.hash(password, 5, async (err, hash) => {
        if (err) {
          console.log("error occured while hashing the password");
          next(err);
        } else {
          const newUser = new UserModel({
            name,
            email,
            password: hash,
          });
          await newUser
            .save()
            // let savedUser = await newUser.save();
            .then((savedUser) => {
              res.json({
                success: true,
                user: savedUser,
                message: "registration successfull",
              });
            })
            .catch((err) => {
              console.log("error occured while saving the user", err);
              next(err);
            });
        }
      });
    }
  } catch (err) {
    console.log("error from registerCon",err);
    let error = new Error(err);
    // throw error;
    next(error);
  }
};

const loginController = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    let userFound = await UserModel.findOne({ email });
    if (!userFound) {
      let err = { message: "User Not Found" };
      err.statusCode = 404;
      // console.log("user not found", err);
      next(err);
      return;
    } else {
      let match = await bcrypt.compare(password, userFound.password);
      if (match) {
        let token = jwt.sign(
          { userId: userFound._id },
          `${process.env.JWT_SECRET}`
        );
        // res.cookie("token",token,{httpOnly: false}).send({ success: true, message: "login successful", token });
        // res
        //   .cookie("token", token, {
        //     httpOnly: true,
        //     domain: `${process.env.DOMAIN}`,
        //   })
          res.send({ success: true, token, message: "login successful" });
      } else {
        console.log("error occured while comparing password during login", err);
        next(err);
      }
    }
  } catch (err) {
    console.log("error occured while finding user");
    err.statusCode = 400;
    next(err);
  }
};

const logoutController = async (req, res, next) => {
  const user = req.user;
  // console.log("user from logout", user);
  if (!user._id) {
    let error = new Error("User not Authorized");
    error.statusCode = 401;
    next(error);
    return;
  }
  // req.clearCookie("token");
  res.clearCookie("token", { domain: process.env.DOMAIN });
  res.status(200).json({ success: true, message: "Logout successfully", user });
};

const getAllUsers = async (req, res, next) => {
  const { search } = req.query;

  let searchObj = {};
  if (search) {
    searchObj = {
      $or: [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ],
    };
  }

  try {
    let usersFound = await UserModel.find(searchObj)
      .find({ _id: { $ne: req.user._id } })
      .select("-password");
    res.json({
      success: true,
      result: usersFound,
    });
  } catch (err) {
    console.log("error in userControler getAllUsers");
    next(err);
  }
};

const getUser = async (req, res, next) => {
  let userId = req.params.userId || req.user._id;
  // console.log(userId);
  if (!userId) {
    let error = new Error("Forbiden");
    error.statusCode = 403;
    return next(error);
  }
  // console.log(userId);
  try {
    let userFound = await UserModel.findById(userId, "-password");
    if (!userFound) {
      let error = new Error("user not found");
      error.statusCode = 404;
      return next(next);
    }
    if (userFound) {
      res.json({
        success: true,
        user: userFound,
      });
    }
  } catch (err) {
    console.log("error in userControler getUser");
    next(err);
  }
};

module.exports = {
  registerController,
  loginController,
  logoutController,
  getAllUsers,
  getUser,
};
