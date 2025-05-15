const { interviewerService } = require("../services/index");
const { sendEmail } = require("../utils/mailService");
const { sendInterviewerCredentialsMail } = require("../utils/emailTemplate");

exports.addInterviewer = async (req, res, next) => {
  try {
    const recruiterId = req.user.id;
    const interviewerData = req.body;

    const newInterviewer = await interviewerService.createInterviewer(
      interviewerData,
      recruiterId
    );

    const confirmation = await sendEmail(
      newInterviewer.email,
      "Your Interviewer Account Credentials",
      sendInterviewerCredentialsMail(
        newInterviewer.email,
        newInterviewer.password
      )
    );

    res.status(201).json({
      message: "Interviewer added successfully",
      interviewer: newInterviewer,
    });
    aw;
  } catch (error) {
    next(error);
  }
};
