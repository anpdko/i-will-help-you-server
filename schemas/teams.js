const Joi = require("joi");

const fullNameRegexp = /^[A-Za-zА-Яа-яЁёҐґІіЇїЄє\s-]+$/;
const languageOptional = ["en", "ua"];

const teamsAddSchema = Joi.object({
  translations: Joi.array().items(
    Joi.object({
      language: Joi.string()
        .valid(...languageOptional)
        .required(),
      fullName: Joi.string().pattern(fullNameRegexp).required(),
      activity: Joi.string().required(),
    })
  ),
  imgPath: Joi.string().required(),
  linkedIn: Joi.string().optional(),
});

const teamsUpdateSchema = Joi.object({
  translations: Joi.array().items(
    Joi.object({
      language: Joi.string()
        .valid(...languageOptional)
        .required(),
      fullName: Joi.string().pattern(fullNameRegexp).required(),
      activity: Joi.string().required(),
    })
  ),
  imgPath: Joi.string().optional(),
  linkedIn: Joi.string().optional(),
});

module.exports = { teamsAddSchema, teamsUpdateSchema };
