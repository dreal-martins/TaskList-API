const {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} = require("../errors");
const User = require("../models/User");

// @desc register User
// route POST /auth/register
// @access Public
const registerUser = async (req, res, next) => {
  try {
    const user = await User.create({ ...req.body });
    const token = user.createJWT();
    res
      .status(201)
      .json({ user: { name: user.name, email: user.email }, token: token });
  } catch (error) {
    next(error);
  }
};

// @desc login User/Set token
// route POST /auth/login
// @access Public
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new BadRequestError("Please provide email or password");
    }
    const user = await User.findOne({ email });
    if (!user) {
      throw new UnauthenticatedError("Invalid Credentials");
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      throw new UnauthenticatedError("Invalid Credentials");
    }

    const token = user.createJWT();
    res.setHeader("Authorization", `Bearer ${token}`);
    res
      .status(200)
      .json({ user: { name: user.name, email: user.email }, token: token });
  } catch (error) {
    next(error);
  }
};

// @desc update User details
// route POST /auth/profile
// @access Private
const updateUser = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);
    if (!user) {
      throw new NotFoundError("User not found");
    } else {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = req.body.password;
      }
      await user.save();
      res.status(200).json({
        user: {
          name: user.name,
          email: user.email,
        },
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc logout User
// route POST /auth/logout
// @access Private
const logoutUserq = (req, res, next) => {
  try {
    res.removeHeader("Authorization");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    next(error);
  }
};
// @desc logout User
// route POST /auth/logout
// @access Private
const logoutUserw = (req, res, next) => {
  try {
    res.removeHeader("Authorization");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    next(error);
  }
};
// @desc logout User
// route POST /auth/logout
// @access Private
const logoutUser = (req, res, next) => {
  try {
    res.removeHeader("Authorization");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  updateUser,
  logoutUser,
};
