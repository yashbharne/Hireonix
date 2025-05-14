const Interviewer = require("../models/interviewer.model");
const bcrypt = require("bcryptjs");
const ApiError = require("../utils/ApiError");
const { User } = require("../models/index");

exports.createInterviewer = async (data, recruiterId) => {
  const { name, empId, email, password } = data;

  // Check if empId or username already exists
  const exists = await Interviewer.findOne({ empId: empId });
  if (exists) throw new ApiError("Interviewer already exists");

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = await User.create({
        name
    })

  //   const newInterviewer = await Interviewer.create({
  //     name,
  //     empId,
  //     position,
  //     domain,
  //     recruiter: recruiterId,
  //     tempAccess: {
  //       username,
  //       hashedPassword,
  //     },
  //   });

  return newInterviewer;
};
