const { jobApplicationService } = require("../services/index");
const { sendEmail } = require("../utils/mailService");
const { resumeReceivedTemplate } = require("../utils/emailTemplate");
const { User, Job } = require("../models/index");

exports.uploadResume = async (req, res, next) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: "Resume file is required" });
  }
  try {
    const application = await jobApplicationService.applyForJob(
      req.user.id,
      req.body.jobId,
      req.file
    );

    const candidateEmail = await User.findById(application.candidateId).select(
      "email name -_id"
    );
    const job = await Job.findById(application.jobId).select("title -_id");
    const confirmation = await sendEmail(
      candidateEmail.email,
      "Resume Received - " + job.title,
      resumeReceivedTemplate(candidateEmail.name, job.title)
    );

    res.status(201).json({
      success: true,
      message:
        "Application submitted successfully. You will receive an email confirmation.",
      data: application,
    });
  } catch (error) {
    next(error);
  }
};

exports.getApplicationsByJobId = async (req, res, next) => {
  try {
    const { jobId } = req.params;
    const recruiterId = req.user.id;
    const applications = await jobApplicationService.getApplications(
      jobId,
      recruiterId
    );
    res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error) {
    next(error);
  }
};

exports.getApplicationById = async (req, res, next) => {
  console.log("In controller");
  try {
    const { applicationId } = req.params;
    const recruiterId = req.user.id;
    console.log(applicationId, recruiterId);

    const application = await jobApplicationService.getApplicationById(
      applicationId,
      recruiterId
    );

    res.status(200).json({
      success: true,
      application,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateApplicationStatus = async (req, res, next) => {
  try {
    const { applicationId } = req.params;
    const recruiterId = req.user.id;
    const { status } = req.body;

    const application = await jobApplicationService.updateApplicationStatus(
      applicationId,
      recruiterId,
      status
    );

    res.status(200).json({
      success: true,
      message: `Application ${status} successfully.`,
      application,
    });
  } catch (error) {
    next(error);
  }
};
