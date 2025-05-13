const Joi = require("joi");
const mongoose = require("mongoose");


exports.validateOtpSchema = Joi.object({
  userId: Joi.string()
      .custom((value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          return helpers.message("Invalid Job ID");
        }
        return value;
      })
        .required(),
    otp:Joi.string().required()
});