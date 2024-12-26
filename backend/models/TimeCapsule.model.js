const mongoose = require("mongoose");

const CapsuleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 32,
    },
    content: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 200,
    },
    release_date: {
      type: Date,
      required: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["released", "not-released"],
      default: "not-released",
    },
    link: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

CapsuleSchema.pre("save", async function () {
  if (this.isModified("release_date") && this.release_date < new Date()) {
    this.status = "released";
  }
});

module.exports =
  mongoose.models.Capsule || mongoose.model("Capsule", CapsuleSchema);
