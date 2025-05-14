const mongoose = require("mongoose");

const InterviewerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    empId: { type: String, required: true, unique: true },
    position: { type: String },
    domain: { type: String },

    recruiter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },

    tempAccess: {
      username: { type: String, required: true },
      hashedPassword: { type: String, required: true },
    },

    availability: [
      {
        date: { type: Date, required: true },
        startTime: { type: Date, required: true }, // only start time for slot
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

module.exports = mongoose.model("Interviewer", InterviewerSchema);
