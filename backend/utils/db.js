const mongoose = require("mongoose");
exports.connectDB = async function () {
  if (mongoose.connection.readyState >= 1) {
    return mongoose.connection;
  }

  return mongoose
    .connect(process.env.DB_URL, {
      dbName: "misraj-assignment",
    })
    .then(() => {
      console.log("MongoDB Connected");
    });
};
