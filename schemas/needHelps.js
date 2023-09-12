const Joi = require("joi");

const emailRegexp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

const needHelpsAddSchema = Joi.object({
  firstName: Joi.string().min(2).required(),
  lastName: Joi.string().min(2).required(),
  email: Joi.string().pattern(emailRegexp).required(),
  phone: Joi.string().required(),
  checkboxes: Joi.object().pattern(
    Joi.string(),
    Joi.boolean()
  ).min(1).required(),
  comment: Joi.string(),
  nameFileLoading: Joi.string(),
  mailing: Joi.boolean(),
  dataProcessing: Joi.boolean().required(),
});

const needHelpsUpdateSchema = Joi.object({
  firstName: Joi.string().min(2),
  lastName: Joi.string().min(2),
  phone: Joi.string(),
  checkboxes: Joi.object().pattern(
    Joi.string(),
    Joi.boolean()
  ).min(1).required(),
  email: Joi.string().pattern(emailRegexp),
  nameFileLoading: Joi.string(),
  comment: Joi.string(),
  mailing: Joi.boolean(),
  dataProcessing: Joi.boolean().required(),
});

module.exports = { needHelpsAddSchema, needHelpsUpdateSchema };
