const recruiterService = require("../services/recruiter.service");

const createProfile = async (req, res, next) => {
    console.log("In recruuiter ",req.user);
    
  try {
    const recruiter = await recruiterService.createRecruiterProfile(
      req.user.id,
      req.body
    );
    res.status(201).json({ success: true, recruiter });
  } catch (err) {
    next(err);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const recruiter = await recruiterService.updateRecruiterProfile(
      req.user._id,
      req.body
    );
    res.status(200).json({ success: true, recruiter });
  } catch (err) {
    next(err);
  }
};

const getProfile = async (req, res, next) => {
  try {
    const recruiter = await recruiterService.getRecruiterProfile(req.user._id);
    res.status(200).json({ success: true, recruiter });
  } catch (err) {
    next(err);
  }
};

const reportRecruiter = async (req, res, next) => {
  try {
    const { recruiterId, reason } = req.body;
    const updated = await recruiterService.reportRecruiter(
      recruiterId,
      req.user._id,
      reason
    );
    res
      .status(200)
      .json({ success: true, message: "Recruiter reported successfully." });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createProfile,
  updateProfile,
  getProfile,
  reportRecruiter,
};
