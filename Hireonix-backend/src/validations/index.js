const { application } = require("express");

module.exports = {
  authValidateSchema: require("./auth.validations"),
  resume: require("./resume.validations"),
  jobValidateSchema: require("./job.validations"),
  application: require("./application.validations"),
  interview: require("./interview.validations"),
  otpValidateSchema: require("./otp.validations"),
  recruiter: require("./recruiter.validations")
};
