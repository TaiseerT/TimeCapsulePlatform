const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validator.middleware");
const Capsule = require("../../models/TimeCapsule.model");
const asyncHandler = require("express-async-handler");
exports.createCapsuleValidator = [
  check("title")
    .notEmpty()
    .withMessage("Capsule title is required")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Capsule title is too short")
    .isLength({ max: 32 })
    .withMessage("Capsule title is too long")
    .custom(
      asyncHandler(async (val, { req }) => {
        const title = await Capsule.findOne({ title: val });
        if (title) {
          return Promise.reject(new Error("Capsule already exists"));
        }
        return true;
      })
    ),
  check("content")
    .notEmpty()
    .withMessage("Capsule content is required")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Capsule content is too short")
    .isLength({ max: 200 })
    .withMessage("Capsule content is too long"),
  check("release_date")
    .notEmpty()
    .isISO8601()
    .toDate()
    .withMessage("Capsule release date is required"),

  validatorMiddleware,
];

exports.updateCapsuleValidator = [
  check("id").isMongoId().withMessage("Invalid time capsule id format"),

  check("title")
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage("Title is too short")
    .isLength({ max: 32 })
    .withMessage("Title is too long"),
  check("content")
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage("Content is too short")
    .isLength({ max: 200 })
    .withMessage("Content is too long"),

  check("release_date").optional().isISO8601().toDate(),
  validatorMiddleware,
];

exports.deleteCapsuleValidator = [
  check("id").isMongoId().withMessage("Invalid capsule id format"),
  validatorMiddleware,
];
