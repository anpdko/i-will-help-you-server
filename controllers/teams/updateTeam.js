const { Teams } = require("../../models/teams.module");
const { HttpError } = require("../../helpers");

const updateTeam = async (req, res) => {
  const { id } = req.params;
  const result = await Teams.findByIdAndUpdate(id, req.body, {
    new: true,
  }).select({ createdAt: 0, updatedAt: 0 });

  if (!result) {
    throw HttpError(404, "Team not found");
  }

  res.status(201);
  res.json({
    code: 201,
    message: "Team update success",
    data: result,
  });
};

module.exports = updateTeam;
