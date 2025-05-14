const express = require("express");
const router = express.Router();
const { recruiterController } = require("../controllers/index");
const auth = require("../middlewares/auth.middleware");
const asyncHandler = require("../middlewares/async.middleware");
const { validate } = require("../middlewares/validate.middleware");
const { recruiter } = require("../validations/index");
const checkProfileCompletion = require("../middlewares/checkProfileCompletion")

router
  .route("/profile")
  .post(
      auth("recruiter"),
    validate(recruiter.recruiterValidationSchema),
    asyncHandler(recruiterController.createProfile)
  );
router
  .route("/profile")
  .put(auth("recruiter"), asyncHandler(recruiterController.updateProfile));
router
  .route("/profile")
  .get(auth("recruiter"), asyncHandler(recruiterController.getProfile));
router
  .route("/report")
  .post(auth("candidate"), asyncHandler(recruiterController.reportRecruiter));

module.exports = router;
