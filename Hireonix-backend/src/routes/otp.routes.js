const express = require("express");
const router = express.Router();
const { otpController } = require("../controllers/index");
const { otpValidateSchema } = require("../validations/index");
const asyncHandler = require("../middlewares/async.middleware");
const { validate } = require("../middlewares/validate.middleware");

router.route("/generate").post(asyncHandler(otpController.generateOtp));
router
  .route("/validate")
  .post(
    validate(otpValidateSchema.validateOtpSchema),
    asyncHandler(otpController.validateOtp)
  );

module.exports = router;
