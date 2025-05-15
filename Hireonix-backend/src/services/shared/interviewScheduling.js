const { Job, JobApplication ,Interviewer} = require("../../models/index");
const ApiError = require("../../utils/ApiError");

const validateInterviewRound = async (jobId, roundNumber) => {
  const job = await Job.findById(jobId);

  if (!job) {
    throw new ApiError("Job not found", 404);
  }

  // If it's the first round, allow scheduling
  if (roundNumber === 1) {
    return true;
  }

  // Check all previous rounds are marked as completed
  const previousRoundsIncomplete = job.interviewRounds
    .filter((r) => r.roundNumber < roundNumber)
    .some((r) => r.isCompleted === false);

  if (previousRoundsIncomplete) {
    return false;
  }

  return true;
};

const getShortlistedCandidates = async (jobId) => {
  const shortlistedApplications = await JobApplication.find({
    jobId,
    status: "shortlisted",
    interviewStatus: "pendingScheduling",
  }).populate("candidateId");
  return shortlistedApplications;
};

const getAvailableInterviewers = async (
  recruiterId,
  domain,
  date,
  maxInterviewsPerDay = 7
) => {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  const isSameDay = new Date().toDateString() === new Date(date).toDateString();

  const interviewers = await Interviewer.find({
    recruiter: recruiterId,
    domain,
  });

  const filtered = interviewers.filter((interviewer) => {
    const interviewsToday = interviewer.interviewSchedules.filter(
      (schedule) => schedule.date >= startOfDay && schedule.date <= endOfDay
    );

    const isOverloaded = interviewsToday.length >= maxInterviewsPerDay;

    if (isSameDay && interviewer.isInterviewInProgress) return false;

    return !isOverloaded;
  });

  return filtered;
};

module.exports = { validateInterviewRound, getShortlistedCandidates, getAvailableInterviewers };
