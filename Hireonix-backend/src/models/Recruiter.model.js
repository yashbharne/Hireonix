const mongoose = require("mongoose");

const recruiterSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    companyWebsite: {
      type: String,
      trim: true,
      required: true,
    },
    companyLogo: {
      type: String,
    },
    companySize: {
      type: String,
      enum: ["1-10", "11-50", "51-200", "201-500", "500+"],
      required: true,
    },
    companyType: {
      type: String,
      enum: ["Startup", "SME", "Enterprise", "Agency", "Other"],
      required: true,
    },
    companyDescription: {
      type: String,
      maxlength: 1000,
      required: true,
    },
    companyEstablished: {
      type: Date,
      required: true,
    },

    designation: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    linkedInProfile: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      required: true,
    },

    // Moderation
    isApproved: {
      type: Boolean,
      default: false,
    },
    approvalRemarks: {
      type: String,
    },
    reportedBy: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        reason: {
          type: String,
        },
        reportedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Recruiter", recruiterSchema);
