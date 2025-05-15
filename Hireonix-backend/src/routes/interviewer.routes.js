const express = require("express");
const router = express.Router();
const { interviewerCOntroller } = require("../controllers/index");
const auth = require("../middlewares/auth.middleware");
const checkProfileCompletion = require("../middlewares/checkProfileCompletion");
const asyncHandler = require("../middlewares/async.middleware");

router.route("/add").post(
  auth("recruiter"),
  checkProfileCompletion,
  asyncHandler(interviewerCOntroller.addInterviewer)
);

module.exports = router;
