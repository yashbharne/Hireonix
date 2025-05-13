const { Otp, User } = require("../models/index");
const crypto = require("crypto");
const ApiError = require("../utils/ApiError");
const { sendEmail } = require("../utils/mailService");
const { sendOtpTemplate } = require("../utils/emailTemplate");

const generateOtp = async ({ userId, email }) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpHash = crypto.createHash("sha256").update(otp).digest("hex");
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  await Otp.deleteMany({ userId: userId });

  await Otp.create({
    userId: userId,
    otp: otpHash,
    expiresAt,
  });

  await sendEmail(
    email,
    "Your Verification OTP",
    sendOtpTemplate(otp, expiresAt)
  );

  return { message: "OTP sent to email" };
};

const verifyOtp = async (userId, otp) => {
  const otpHash = crypto.createHash("sha256").update(otp).digest("hex");

  const otpRecord = await Otp.findOne({
    userId,
    otp: otpHash,
    expiresAt: { $gt: new Date() },
  });

  if (!otpRecord) {
    throw new ApiError("Invalid or expired OTP", 400);
  }

  await Otp.deleteMany({ userId: userId });
  await User.findByIdAndUpdate(
    userId,
    { isEmailVerified: true },
    { new: true }
  );
  return true;
};

module.exports = {
  generateOtp,
  verifyOtp,
};
