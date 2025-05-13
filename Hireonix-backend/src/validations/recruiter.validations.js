import Joi from "joi";
import mongoose from "mongoose";

// Custom validation for ObjectId
const objectId = Joi.string().custom((value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.message("Invalid ObjectId");
  }
  return value;
}, "ObjectId Validation");

export const recruiterValidationSchema = Joi.object({
  userId: objectId.required(),

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
  companyEstablished: Joi.date()
    .less("now") 
    .required()
    .messages({
      "date.less":
        "Company establishment date cannot be today or in the future",
      "any.required": "Company establishment date is required",
    }),

  designation: Joi.string().required(),
  contactNumber: Joi.string()
    .pattern(/^(?:\+?\d{1,3}[- ]?)?\d{10}$/)
    .message("Invalid contact number format")
    .optional(),
  linkedInProfile: Joi.string().uri().optional().trim(),
  address: Joi.string().required(),
});
