const { Teams } = require("../../models/teams.module");

const getAllTeams = async (req, res) => {
  const result = await Teams.find();
  res.status(200);
  res.json({ code: 200, message: "Get all teams success", data: result });
};

module.exports = getAllTeams;
