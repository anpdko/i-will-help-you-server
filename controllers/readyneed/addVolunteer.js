const { Volunteers } = require("../../models/readyneed.module");

const addVolunteer = async (req, res) => {
  const newVolunteer = await Volunteers.create({ ...req.body });
  res.status(201);
  res.json({
    code: 201,
    message: "Add volunteer success",
    data: newVolunteer,
  });
};

module.exports = addVolunteer;
