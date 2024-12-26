const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minLength: 2,
    },
    email: {
      type: String,
      required: [true, "Email address is required"],
      unique: true,
      minLength: 2,
      maxLength: 100,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
    passwordChangedAt: Date,
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  // Hashing user password
  this.password = await bcrypt.hash(this.password, 12);
  next();
});
module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
