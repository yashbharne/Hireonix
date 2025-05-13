const { authService, otpService } = require("../services");

exports.register = async (req, res, next) => {
  try {
    const data = await authService.registerUser(req.body);
    const otp = await otpService.generateOtp({
      userId: data.user.userId,
      email: data.user.email,
    });
    res
      .status(201)
      .json({ success: true, message: data.message, otp: otp.message });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const data = await authService.loginUser(req.body);
    res.status(200).json({ success: true, ...data });
  } catch (err) {
    next(err);
  }
};
