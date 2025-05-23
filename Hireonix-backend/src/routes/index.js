const express = require("express");
const router = express.Router();
const authRoutes = require("./auth.routes");
const candidateRoutes = require("./jobApplication.routes");
const jobRoutes = require("./job.routes");
const otpRoutes = require("./otp.routes");
const recruiterRoutes = require("./recruiter.routes");
const interviewerRoutes = require("./interviewer.routes");
// Array of route objects
const routes = [
  { path: "/api/auth", handler: authRoutes },
  { path: "/api/application", handler: candidateRoutes },
  { path: "/api/recruiter", handler: jobRoutes },
  { path: "/api/otp", handler: otpRoutes },
  { path: "/api/recruiter", handler: recruiterRoutes },
  { path: "/api/interviewer", handler: interviewerRoutes },
];

// Dynamically use each route
routes.forEach(({ path, handler }) => {
  router.use(path, handler);
});

module.exports = router;
