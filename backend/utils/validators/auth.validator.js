const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validator.middleware");
const User = require("../../models/User.model");
const asyncHandler = require("express-async-handler");

exports.registerValidator = [
  check("name")
    .notEmpty()
    .withMessage("Name is required")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Name is too short")
    .isLength({ max: 32 })
    .withMessage("Name is too long"),

  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isLength({ min: 2 })
    .withMessage("Email is too short")
    .isLength({ max: 100 })
    .withMessage("Email is too long")
    .isEmail()
    .withMessage("invalid Email format")
    .custom(
      asyncHandler(async (val, { req }) => {
        const email = await User.findOne({ email: val });
        if (email) {
          return Promise.reject(new Error("email already exists"));
        }
        return true;
      })
    ),

  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("you can't input password less than 8 characters")
    .isLength({ max: 30 })
    .withMessage("you can't input password more than 30 characters"),

  check("passwordConfirm")
    .notEmpty()
    .withMessage("Password confirm is required")
    .custom((val, { req }) => {
      if (req.body.password !== val) {
        throw new Error("Password confirm does not match password!");
      }
      return true;
    }),

  validatorMiddleware,
];

exports.loginValidator = [
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isLength({ min: 2 })
    .withMessage("Email is too short")
    .isLength({ max: 100 })
    .withMessage("Email is too long")
    .isEmail()
    .withMessage("invalid Email format"),

  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("you can't input password less than 8 characters")
    .isLength({ max: 30 })
    .withMessage("you can't input password more than 30 characters"),

  validatorMiddleware,
];
