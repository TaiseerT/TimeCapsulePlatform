const Capsule = require("../models/TimeCapsule.model");

exports.updateCapsuleStatus = async function () {
  try {
    const now = new Date();

    const capsules = await Capsule.find({
      release_date: { $lte: now },
      status: { $ne: "released" },
    });

    if (capsules.length === 0) {
      console.log("No capsules need status updates.");
      return;
    }

    for (let capsule of capsules) {
      capsule.status = "released";
      await capsule.save();
    }

    console.log("Status updates completed successfully.");
  } catch (error) {
    console.error("Error updating capsule statuses:", error.message);
  }
};
