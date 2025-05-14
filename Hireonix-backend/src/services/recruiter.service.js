const { User, Recruiter } = require("../models/index");
const ApiError = require("../utils/ApiError");

const createRecruiterProfile = async (userId, recruiterData) => {
  const user = await User.findById(userId);
  if (!user || user.role !== "recruiter") {
    throw new ApiError(
      "Only users with role 'recruiter' can create recruiter profiles."
    );
  }

  const existingProfile = await Recruiter.findOne({ userId });
  if (existingProfile) throw new ApiError("Profile already exists.");

  const recruiter = await Recruiter.create({ userId, ...recruiterData });

  user.isProfileComplete = true;
  await user.save();

  return recruiter;
};

const updateRecruiterProfile = async (userId, updateData) => {
  const user = await User.findById(userId);
  if (!user || user.role !== "recruiter") {
    throw new ApiError(
      "Only users with role 'recruiter' can create recruiter profiles."
    );
  }
  return await Recruiter.findOneAndUpdate({ userId }, updateData, {
    new: true,
  });
};

const getRecruiterProfile = async (userId) => {
  const user = await User.findById(userId);
  if (!user || user.role !== "recruiter") {
    throw new ApiError(
      "Only users with role 'recruiter' can create recruiter profiles."
    );
  }
  return await Recruiter.findOne({ userId }).populate(
    "userId",
    "name email isEmailVerified"
  );
};

const reportRecruiter = async (recruiterId, reportingUserId, reason) => {
  const user = await User.findById(userId);
  if (!user || user.role !== "recruiter") {
    throw new ApiError(
      "Only users with role 'recruiter' can create recruiter profiles."
    );
  }
  return await Recruiter.findByIdAndUpdate(
    recruiterId,
    {
      $push: {
        reportedBy: {
          userId: reportingUserId,
          reason,
        },
      },
    },
    { new: true }
  );
};

module.exports = {
  createRecruiterProfile,
  updateRecruiterProfile,
  getRecruiterProfile,
  reportRecruiter,
};
