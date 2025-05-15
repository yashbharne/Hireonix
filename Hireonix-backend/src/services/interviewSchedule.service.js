const { Interview, JobApplication, Job } = require("../models/index");
const {
  validateInterviewRound,
  getShortlistedCandidates,
  getAvailableInterviewers,
} = require("./shared/interviewScheduling");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const ApiError = require("../utils/ApiError");

exports.scheduleInterviewService = async ({
  jobId,
  recruiterId,
  round,
  domain,
  date,
}) => {
 const job = await Job.findById(jobId);
 if (!job) throw new ApiError("Job not found", 400);

 // Step 1: Validate round
 const checkPreviousRoundIsCompleted = await validateInterviewRound(
   jobId,
   round
 );
 if (!checkPreviousRoundIsCompleted) {
   throw new ApiError(
     `Cannot schedule Round ${round} before completing previous rounds.`,
     400
   );
 }

 // Step 2: Get current round info
 const currentRound = job.interviewRounds.find((r) => r.roundNumber === round);
 if (!currentRound)
   throw new ApiError(`Round ${round} not defined in Job`, 400);

 // Step 3: Shortlisted candidates
 const shortlistedCandidates = await getShortlistedCandidates(jobId);
 if (!shortlistedCandidates.length)
   throw new ApiError("No shortlisted candidates found", 404);

 // Step 4: Available Interviewers
 const availableInterviewers = await getAvailableInterviewers(
   recruiterId,
   domain,
   date,
   7
 );
 if (!availableInterviewers.length)
   throw new ApiError("No Interviewer is Available", 404);

 // Step 5: Distribute interviews
 const maxInterviewsPerDay = 7;
 const totalSlots = availableInterviewers.length * maxInterviewsPerDay;
 const candidatesToSchedule = shortlistedCandidates.slice(0, totalSlots);


 let schedule = [];
 let startTime = new Date(date);
 startTime.setMinutes(Math.ceil(startTime.getMinutes() / 15) * 15);

 for (let i = 0; i < candidatesToSchedule.length; i++) {
   const interviewerIndex = i % availableInterviewers.length;
   const interviewer = availableInterviewers[interviewerIndex];

   const existingCount = schedule.filter(
     (s) => s.interviewerId === interviewer.userId
   ).length;
   if (existingCount >= maxInterviewsPerDay) continue;

   const interview = {
     candidateId: candidatesToSchedule[i].candidateId,
     interviewerId: interviewer.userId,
     jobId,
     startTime: new Date(startTime),
     endTime: new Date(startTime.getTime() + 45 * 60 * 1000),
     status: "pending",
     roundNumber: currentRound.roundNumber,
     mode: currentRound.mode,
     domain: currentRound.domain,
   };

   schedule.push(interview);

   if ((i + 1) % availableInterviewers.length === 0) {
     startTime = new Date(startTime.getTime() + 45 * 60 * 1000);
   }
 }

 // Save scheduled interviews
 await InterviewSchedule.insertMany(schedule);




};
