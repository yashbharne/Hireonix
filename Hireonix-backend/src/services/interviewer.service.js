const bcrypt = require("bcryptjs");
const ApiError = require("../utils/ApiError");
const {
  User,
  Interviewer,
  JobApplication,
  Interview,
} = require("../models/index");

exports.createInterviewer = async (data, recruiterId) => {
  const { name, empId, email, password } = data;

  const existingUser = await User.findOne({ email });
  const existingInterviewer = await Interviewer.findOne({ empId });
  if (existingUser) throw new ApiError("User with this email already exists");
  if (existingInterviewer)
    throw new ApiError("Interviewer with this Employee ID already exists");

  const hashedPassword = await bcrypt.hash(password, 10);

  // 3. Create interviewer as a User
  const newUser = await User.create({
    name,
    email,
    role: "interviewer",
    password: hashedPassword,
    isTemporaryPassword: true,
  });

  // 4. Create Interviewer profile
  const newInterviewer = await Interviewer.create({
    userId: newUser._id,
    empId,
    recruiter: recruiterId,
  });

  return { ...newUser.toObject(), password };
};

const INTERVIEW_DURATION_MINUTES = 45;
const MAX_DAILY_INTERVIEWS = 10;

function addMinutes(date, minutes) {
  return new Date(date.getTime() + minutes * 60000);
}

exports.assignInterviews = async ({ jobId, date }, recruiterId) => {
  const shortlistedCandidates = await JobApplication.find({
    jobId,
    status: "shortlisted",
  }).populate("candidateId");

  if (!shortlistedCandidates.length) {
    throw new ApiError("No shortlisted candidates found.");
  }

  const interviewers = await Interviewer.find({ recruiter: recruiterId });

  if (!interviewers.length) {
    throw new ApiError("No interviewers available.");
  }

  const scheduleStartTime = new Date(date);
  const assignments = [];

  for (const candidate of shortlistedCandidates) {
    let assigned = false;

    for (const interviewer of interviewers) {
      // Filter interviews on same day
      const todaysInterviews = interviewer.interviewSchedules.filter(
        (i) => i.date.toDateString() === scheduleStartTime.toDateString()
      );

      if (todaysInterviews.length >= MAX_DAILY_INTERVIEWS) continue;

      // Find next available slot
      let slotStart = scheduleStartTime;
      for (const interview of todaysInterviews) {
        const end = addMinutes(interview.startTime, INTERVIEW_DURATION_MINUTES);
        if (slotStart < end) {
          slotStart = addMinutes(end, 5); // buffer
        }
      }

      // Assign
      interviewer.interviewSchedules.push({
        candidate: candidate.candidateId._id,
        date: slotStart,
        startTime: slotStart,
      });

      await interviewer.save();

      await Interview.create({
        candidate: candidate.candidateId._id,
        job: jobId,
        recruiter: recruiterId,
        status: "Scheduled",
        rounds: [
          {
            roundNumber: 1,
            interviewers: [interviewer._id],
            mode: "Online", // or "Offline" as per request
            date: slotStart,
            time: slotStart, // optional if using Date directly
          },
        ],
      });

      // Update application status
      candidate.status = "scheduled";
      await candidate.save();

      assignments.push({
        candidate: candidate.candidateId.name,
        interviewer: interviewer.userId,
        slot: slotStart,
      });

      assigned = true;
      break;
    }

    if (!assigned) {
      candidate.status = "reschedule";
      candidate.statusReason = "No available interviewer";
      await candidate.save();
    }
  }

  return assignments;
};
