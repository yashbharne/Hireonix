const jwt = require("jsonwebtoken");
const { User } = require("../models/index");

const checkProfileCompletion = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No token provided",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log(decoded);

    const user = await User.findById(decoded.id).select(
      "isProfileComplete isEmailVerified isActive"
    );
    console.log("user", user);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.isEmailVerified) {
      return res.status(403).json({
        success: false,
        message: "Please verify your email to proceed",
      });
    }

    if (!user.isProfileComplete) {
      return res.status(403).json({
        success: false,
        message: "Please complete your profile to proceed",
      });
    }
    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "Account is not active",
      });
    }

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token profile",
    });
  }
};

module.exports = checkProfileCompletion;
