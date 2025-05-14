const Joi = require("joi");
const mongoose = require("mongoose");

// Custom validation for ObjectId
const objectId = Joi.string().custom((value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.message("Invalid ObjectId");
  }
  return value;
}, "ObjectId Validation");

exports.recruiterValidationSchema = Joi.object({
  companyName: Joi.string().trim().required(),
  companyWebsite: Joi.string().uri().trim().required(),
  companyLogo: Joi.string().uri().optional(),
  companySize: Joi.string()
    .valid("1-10", "11-50", "51-200", "201-500", "500+")
    .required(),
  companyType: Joi.string()
    .valid("Startup", "SME", "Enterprise", "Agency", "Other")
    .required(),
  companyDescription: Joi.string().max(1000).required(),
  companyEstablished: Joi.date().required(),
  designation: Joi.string().required(),
  contactNumber: Joi.string()
    .pattern(/^[0-9+\-() ]{7,20}$/)
    .required(),

  linkedInProfile: Joi.string().uri().trim().optional(),
  address: Joi.string().required(),
});
