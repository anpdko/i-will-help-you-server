const { Volunteers } = require("../../models/readyneed.module");
const { HttpError } = require("../../helpers");

const removeVolunteer = async (req, res) => {
  const { id } = req.params;
  const volunteer = await Volunteers.findByIdAndRemove(id);
  if (!volunteer) {
    throw HttpError(404, "Volunteer not found");
  }

  res.status(200);
  res.json({
    code: 200,
    message: "Remove volunteer by ID success",
    data: volunteer,
  });
};

module.exports = removeVolunteer;
