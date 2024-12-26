const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const cron = require("node-cron");

dotenv.config({ path: ".env" });
const db = require("./utils/db");
const globalError = require("./middlewares/errors.middleware.js");
const ApiError = require("./utils/apiError");
const { updateCapsuleStatus } = require("./utils/updateCapsuleStatuses.js");

const app = express();
db.connectDB();
app.use(cors());
app.options("*", cors());
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode: ${process.env.NODE_ENV}`);
}

// routes
app.use("/api/auth", require("./routes/auth.routes.js"));
app.use("/api/capsule", require("./routes/capsule.routes.js"));
app.use("*", (req, res, next) => {
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
});

// Error Handler Middleware
app.use(globalError);

const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});

// Handle rejection outside express
process.on("unhandledRejection", (err) => {
  console.error(`UnhandledRejection Errors: ${err.name} | ${err.message}`);
  server.close(() => {
    console.error(`Shutting down....`);
    process.exit(1);
  });
});

// Update time capsule status every 5 mins if release_date has passed
cron.schedule("*/5 * * * *", async () => {
  try {
    await updateCapsuleStatus();
  } catch (error) {
    console.error("Error in cron job:", error);
  }
});
