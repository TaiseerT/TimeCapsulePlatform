const express = require("express");
const router = express.Router();

// time capsule validation
const {
  createCapsuleValidator,
  updateCapsuleValidator,
  deleteCapsuleValidator,
} = require("../utils/validators/capsule.validator");

// capsule controllers
const {
  createCapsule,
  updateCapsule,
  getCapsuleById,
  deleteCapsule,
  getCapsules,
  getByLink,
} = require("../controllers/capsule.controller");
const authController = require("../controllers/auth.controller");

router
  .route("/")
  .get(
    authController.protect,
    authController.allowedTo("user", "admin"),
    getCapsules
  );
router
  .route("/getCapsuleById/:id")
  .get(
    authController.protect,
    authController.allowedTo("user", "admin"),
    getCapsuleById
  );
router.route("/getCapsuleByLink/:id").get(getByLink);
router
  .route("/createCapsule")
  .post(
    authController.protect,
    authController.allowedTo("user", "admin"),
    createCapsuleValidator,
    createCapsule
  );
router
  .route("/updateCapsule/:id")
  .patch(
    authController.protect,
    authController.allowedTo("user", "admin"),
    updateCapsuleValidator,
    updateCapsule
  );
router
  .route("/deleteCapsule/:id")
  .delete(
    authController.protect,
    authController.allowedTo("user", "admin"),
    deleteCapsuleValidator,
    deleteCapsule
  );

module.exports = router;
