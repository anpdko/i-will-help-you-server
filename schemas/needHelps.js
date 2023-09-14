const Joi = require("joi");

const emailRegexp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

const needHelpsAddSchema = Joi.object({
  firstName: Joi.string().min(2).required(),
  lastName: Joi.string().min(2).required(),
  email: Joi.string().pattern(emailRegexp).required(),
  phone: Joi.string().required(),
  typeOfAssistance: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().required(),
        isActive: Joi.boolean().default(false),
      })
    )
    .min(1)
    .required(),
  comment: Joi.string(),
  file: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().required(),
        file: Joi.binary(),
      })
    )
    .min(1)
    .required(),
  mailing: Joi.boolean(),
  dataProcessing: Joi.boolean().required(),
});

const needHelpsUpdateSchema = Joi.object({
  firstName: Joi.string().min(2),
  lastName: Joi.string().min(2),
  phone: Joi.string(),
  typeOfAssistance: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().required(),
        isActive: Joi.boolean().default(false),
      })
    )
    .min(1)
    .required(),
  email: Joi.string().pattern(emailRegexp),
  file: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().required(),
        file: Joi.binary(),
      })
    )
    .min(1)
    .required(),
  comment: Joi.string(),
  mailing: Joi.boolean(),
  dataProcessing: Joi.boolean().required(),
});

module.exports = { needHelpsAddSchema, needHelpsUpdateSchema };
