const { volunteerAddSchema, volunteerUpdateSchema } = require("./volunteer");
const { needHelpsAddSchema, needHelpsUpdateSchema } = require("./needHelps");
const { teamsAddSchema, teamsUpdateSchema } = require("./teams");

module.exports = {
  volunteerAddSchema,
  volunteerUpdateSchema,
  needHelpsAddSchema,
  needHelpsUpdateSchema,
  teamsAddSchema,
  teamsUpdateSchema,
};
