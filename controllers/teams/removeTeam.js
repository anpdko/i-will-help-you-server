const { Teams } = require("../../models/teams.module");
const { HttpError } = require("../../helpers");

const removeTeam = async (req, res) => {
  const { id } = req.params;
  const team = await Teams.findByIdAndRemove(id);
  if (!team) {
    throw HttpError(404, "Team not found");
  }

  res.status(200);
  res.json({
    code: 200,
    message: "Removed team by ID success",
    data: team,
  });
};

module.exports = removeTeam;
