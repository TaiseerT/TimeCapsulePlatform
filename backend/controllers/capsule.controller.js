const Capsule = require("../models/TimeCapsule.model.js");
const factory = require("./handlersFactory.js");
/**
 * @desc     create time capsule
 * @route    /api/capsule/createCapsule
 * @method   POST
 * @access   private
 */
exports.createCapsule = factory.createOne(Capsule);

/**
 * @desc     update time capsule by id
 * @route    /api/capsule/updateCapsule/:id
 * @method   PATCH
 * @access   private
 */
exports.updateCapsule = factory.updateOne(Capsule);

/**
 * @desc     delete time capsule by id
 * @route    /api/capsule/deleteCapsule/:id
 * @method   DELETE
 * @access   private
 */
exports.deleteCapsule = factory.deleteOne(Capsule);

/**
 * @desc     get time capsule by id
 * @route    /api/capsule/getCapsule/:id
 * @method   GET
 * @access   private
 */
exports.getCapsuleById = factory.getOne(Capsule);

/**
 * @desc     get all time capsules
 * @route    /api/capsule/
 * @method   GET
 * @access   private
 */
exports.getCapsules = factory.getAll(Capsule);

/**
 * @desc     get time capsule by link
 * @route    /api/capsule/getCapsuleByLink/:id
 * @method   GET
 * @access   public
 */
exports.getByLink = factory.getCapsuleByLink(Capsule);
