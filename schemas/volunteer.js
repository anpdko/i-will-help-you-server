const Joi = require("joi");

const emailRegexp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

const volunteerAddSchema = Joi.object({
  firstName: Joi.string().min(2).required(),
  lastName: Joi.string().min(2).required(),
  dateOfBirth: Joi.string().required(),
  phone: Joi.string().required(),
  country: Joi.string().required(),
  network: Joi.string(),
  email: Joi.string().pattern(emailRegexp).required(),
  daysVolunteer: Joi.array().items(
    Joi.object({
      day: Joi.string().required(),
      timeStart: Joi.string().required(),
      timeFinish: Joi.string().required(),
    })
  ),
  languages: Joi.array().items(
    Joi.object({
      language: Joi.string(),
      level: Joi.string(),
    })
  ),
  skills: Joi.array().items(Joi.string()),
  comment: Joi.string().allow(""),
  mailing: Joi.boolean(),
});

const volunteerUpdateSchema = Joi.object({
  firstName: Joi.string().min(2),
  lastName: Joi.string().min(2),
  dateOfBirth: Joi.string(),
  phone: Joi.string(),
  country: Joi.string(),
  network: Joi.string(),
  email: Joi.string().pattern(emailRegexp),
  daysVolunteer: Joi.array().items(
    Joi.object({
      day: Joi.string(),
      timeStart: Joi.string(),
      timeFinish: Joi.string(),
    })
  ),
  languages: Joi.array().items(
    Joi.object({
      language: Joi.string(),
      level: Joi.string(),
    })
  ),
  skills: Joi.array().items(Joi.string()),
  comment: Joi.string().allow(""),
  mailing: Joi.boolean(),
});

module.exports = { volunteerAddSchema, volunteerUpdateSchema };
