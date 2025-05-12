const mongoose = require("mongoose");

const InterviewerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  empId: { type: String, required: true },
  position: { type: String },
  domain: { type: String },
  feedback: { type: String },
  tempAccess: {
    username: { type: String },
    hashedPassword: { type: String },
  },
});

const InterviewRoundSchema = new mongoose.Schema({
  roundNumber: { type: Number },
  interviewers: [InterviewerSchema],
  mode: {
    type: String,
    enum: ["Online", "Offline"],
    required: true,
  },
  interviewLink: { type: String },
  date: { type: Date },
  time: { type: String },
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
      enum: ["Scheduled", "Completed", "Cancelled"],
      default: "Scheduled",
    },
    rounds: [InterviewRoundSchema],
    finalFeedback: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Interview", InterviewSchema);
