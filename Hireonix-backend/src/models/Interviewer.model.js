const mongoose = require("mongoose");

const InterviewerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    empId: { type: String, unique: true },
    position: { type: String },
    domain: { type: String },

    recruiter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    interviewSchedules: [
      {
        candidate: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        date: { type: Date },
        startTime: { type: Date },
      },
    ],

    isInterviewInProgress: {
      type: Boolean,
      default: false,
    },

    feedbacks: [
      {
        candidate: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        round: Number,
        comment: String,
      },
    ],
  },
  { timestamps: true }
);
InterviewerSchema.index({
  "interviewSchedules.date": 1,
  "interviewSchedules.startTime": 1,
});

module.exports = mongoose.model("Interviewer", InterviewerSchema);
