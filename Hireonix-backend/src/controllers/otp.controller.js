const { otpService } = require("../services/index");

exports.validateOtp = async (req, res, next) => {
  try {
    const { userId, otp } = req.body;
    const validation = await otpService.verifyOtp(userId, otp);
    res.status(200).json({
      success: true,
      message: "Otp Verification successful",
    });
  } catch (error) {
    next(error);
  }
};

exports.generateOtp = async (req, res, next) => {
  try {
    const otp = await otpService.generateOtp({
      userId: req.body,
      email: req.body,
    });
    res.status(201).json({ success: true, otp: otp.message });
  } catch (error) {
    next(error);
  }
};
