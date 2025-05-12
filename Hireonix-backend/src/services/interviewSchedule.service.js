const { Interview, JobApplication } = require("../models/index");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

exports.scheduleInterviewService = async ({
  candidateId,
  jobId,
  recruiterId,
  rounds,
  interviewerEmpId,
}) => {
  const application = await JobApplication.findOne({ candidateId, jobId });
  if (!application || application.status !== "shortlisted") {
    throw new Error("Candidate is not shortlisted.");
  }

  const username = interviewerEmpId;
  const rawPassword = crypto.randomBytes(4).toString("hex");
  const hashedPassword = await bcrypt.hash(rawPassword, 10);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        

  const interview = await Interview.create({
    candidate: candidateId,
    job: jobId,
    recruiter: recruiterId,
    rounds,
    tempAccess: {
      username,
      hashedPassword,
      expiresAt,
    },
  });

  // TODO: Send email to interviewer with temp credentials

  return {
    interview,
    tempLogin: { username, rawPassword },
  };
};
