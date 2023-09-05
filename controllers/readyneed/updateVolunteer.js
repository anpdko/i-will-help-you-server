const { Volunteers } = require("../../models/readyneed.module");
const { HttpError } = require("../../helpers");

const updateVolunteer = async (req, res) => {
  const { id } = req.params;
  const result = await Volunteers.findByIdAndUpdate(id, req.body, {
    new: true,
  }).select({ createdAt: 0, updatedAt: 0 });

  if (!result) {
    throw HttpError(404, "Volunteer not found");
  }

  res.status(201);
  res.json({
    code: 201,
    message: "Volunteer update success",
    data: result,
  });
};

module.exports = updateVolunteer;
