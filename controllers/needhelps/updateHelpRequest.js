const { NeedHelps } = require("../../models/readyneed.module");
const { HttpError } = require("../../helpers");

const updateHelpRequest = async (req, res) => {
  const { id } = req.params;
  const result = await NeedHelps.findByIdAndUpdate(id, req.body, {
    new: true,
  }).select({ createdAt: 0, updatedAt: 0 });

  if (!result) {
    throw HttpError(404, "Help reuqest not found");
  }

  res.status(201);
  res.json({
    code: 201,
    message: "Help reuqest update success",
    data: result,
  });
};

module.exports = updateHelpRequest;