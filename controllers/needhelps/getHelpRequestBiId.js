const { NeedHelps } = require("../../models/needhelps.module");
const { HttpError } = require("../../helpers");

const getHelpRequestBiId = async (req, res) => {
  const { id } = req.params;
  const helpRequest = await NeedHelps.findById(id, "-createdAt -updatedAt");
  if (!helpRequest) {
    throw HttpError(404, "Help reuqest not found");
  }

  res.status(200);
  res.json({
    code: 200,
    message: "Get help reuqest by ID success",
    data: helpRequest,
  });
};

module.exports = getHelpRequestBiId;