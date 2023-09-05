const { Volunteers } = require("../../models/readyneed.module");
const { HttpError } = require("../../helpers");

const getVolunteerBiId = async (req, res) => {
  const { id } = req.params;
  const volunteer = await Volunteers.findById(id, "-createdAt -updatedAt");
  if (!volunteer) {
    throw HttpError(404, "Volunteer not found");
  }

  res.status(200);
  res.json({
    code: 200,
    message: "Get volunteer by ID success",
    data: volunteer,
  });
};

module.exports = getVolunteerBiId;
