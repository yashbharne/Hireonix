const mongoose = require("mongoose");
const paginatePlugin = require("../plugins/paginatePlugin");
const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 100,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      minlength: 20,
    },
    location: {
      type: String,
      required: true,
    },
    jobType: {
      type: String,
      enum: ["Full-time", "Part-time", "Contract"],
      required: true,
    },
    salaryRange: {
      min: { type: Number, required: true },
      max: { type: Number, required: true },
    },
    experience: {
      type: String,
      required: true, // Format: "2+ years"
    },
    skills: {
      type: [String],
      required: true,
    },
    applicationDeadline: {
      type: Date,
      default: null,
    },
    status: {
      type: String,
      enum: ["active", "in-active"],
      default: "active",
    },
    recruiter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    interviewRounds: [
      {
        roundNumber: Number,
        name: String, // e.g., "Technical", "Managerial", "HR"
        domain: String, // e.g., "technical", "manager", "hr"
        mode: {
          type: String,
          enum: ["Online", "Offline"],
          default: "Online",
        },
        isCompleted: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);
jobSchema.plugin(paginatePlugin);

module.exports = mongoose.model("Job", jobSchema);
