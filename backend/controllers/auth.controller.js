const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User.model.js");
const ApiError = require("../utils/apiError.js");
const createToken = require("../utils/createToken.js");

/**
 * @desc     register user
 * @route    /api/auth/register
 * @method   POST
 * @access   public
 */
exports.register = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);
  const token = createToken(user._id);
  const { password, ...other } = user._doc;
  res.status(201).json({ ...other, token });
});

/**
 * @desc     login user
 * @route    /api/auth/login
 * @method   POST
 * @access   public
 */
exports.login = asyncHandler(async (req, res, next) => {
  //  check if user exists & if password is correct
  const user = await User.findOne({ email: req.body.email });
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return next(new ApiError("Incorrect email or password", 401));
  }
  const token = createToken(user._id);
  const { password, ...other } = user._doc;
  res.status(200).json({ ...other, token });
});

/**
 * @desc     make sure user is logged in
 */
exports.protect = asyncHandler(async (req, res, next) => {
  // 1) Check if token exist, if exist get
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  )
    token = req.headers.authorization.split(" ")[1];
  if (!token)
    return next(
      new ApiError(
        "You are not logged in, Please login to access this route",
        401
      )
    );

  // 2) Verify token (no change happens, expired token)
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // 3) Check if user exists
  const currentUser = await User.findById(decoded.userId);
  if (!currentUser) {
    return next(
      new ApiError(
        "The user that belongs to this token no longer exists",
        401
      )
    );
  }
  req.user = currentUser;
  next();
});

/**
 * @desc     Authorization (User Permissions)
 * ["user"]
 */

exports.allowedTo = (...roles) =>
  asyncHandler(async (req, res, next) => {
    // 1) access roles
    // 2) access registered user (req.user.role)
    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError("You are not allowed to access this route", 403)
      );
    }
    next();
  });
