const { Teams } = require("../../models/teams.module");

const addTeam = async (req, res) => {
  const newTeam = await Teams.create({ ...req.body });
  res.status(201);
  res.json({
    code: 201,
    message: "Add team success",
    data: newTeam,
  });
};

module.exports = addTeam;
