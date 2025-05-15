const mongoose = require("mongoose");

const InterviewRoundSchema = new mongoose.Schema({
  roundNumber: { type: Number, required: true },
  interviewers: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Interviewer",
  },

  mode: {
    type: String,
    enum: ["Online", "Offline"],
    required: true,
  },
  interviewLink: { type: String }, // For online interviews
  date: { type: Date, required: true },
  startTime: { type: Date, required: true },

  status: {
    type: String,
    enum: ["Scheduled", "In Progress", "Completed", "Cancelled"],
    default: "Scheduled",
  },
  feedback: { type: String },
});

const InterviewSchema = new mongoose.Schema(
  {
    candidate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    recruiter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["Scheduled", "Completed", "Cancelled", "Re-Scheduled"],
      default: "Scheduled",
    },
    rounds: [InterviewRoundSchema],
    finalFeedback: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Interview", InterviewSchema);
