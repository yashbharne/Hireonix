const express = require("express");
const router = express.Router();
const authRoutes = require("./auth.routes");
const candidateRoutes = require("./jobApplication.routes");
const jobRoutes = require("./job.routes");
const otpRoutes = require("./otp.routes");
// Array of route objects
const routes = [
  { path: "/api/auth", handler: authRoutes },
  { path: "/api/application", handler: candidateRoutes },
  { path: "/api/recruiter", handler: jobRoutes },
  { path: "/api/otp", handler: otpRoutes },
];

// Dynamically use each route
routes.forEach(({ path, handler }) => {
  router.use(path, handler);
});

module.exports = router;
