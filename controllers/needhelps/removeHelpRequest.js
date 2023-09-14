const { needHelps } = require("../../models/readyneed.module");
const { HttpError } = require("../../helpers");

const removeHelpRequest = async (req, res) => {
  const { id } = req.params;
  const helpRequest = await needHelps.findByIdAndRemove(id);
  if (!helpRequest) {
    throw HttpError(404, "Help reuqest not found");
  }

  res.status(200);
  res.json({
    code: 200,
    message: "Remove help reuqest by ID success",
    data: helpRequest,
  });
};

module.exports = removeHelpRequest;