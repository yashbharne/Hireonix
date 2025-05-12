const Joi = require("joi");

exports.scheduleInterviewSchema = Joi.object({
  candidateId: Joi.string().length(24).required(),
  jobId: Joi.string().length(24).required(),
  recruiterId: Joi.string().length(24).required(),
  rounds: Joi.array()
    .items(
      Joi.object({
        roundNumber: Joi.number().integer().min(1).required(),
        interviewers: Joi.array()
          .items(
            Joi.object({
              name: Joi.string().required(),
              empId: Joi.string().required(),
              position: Joi.string().required(),
              domain: Joi.string().required(),
            })
          )
          .min(1)
          .required(),
        mode: Joi.string().valid("Online", "Offline").required(),
        interviewLink: Joi.string().uri().when("mode", {
          is: "Online",
          then: Joi.required(),
          otherwise: Joi.optional(),
        }),
        date: Joi.string().isoDate().required(),
        time: Joi.string()
          .pattern(/^([0-1]\d|2[0-3]):([0-5]\d)$/)
          .required(),
      })
    )
    .min(1)
    .required(),
});
