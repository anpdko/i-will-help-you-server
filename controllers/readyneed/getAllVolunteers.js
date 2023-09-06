const { Volunteers } = require("../../models/readyneed.module");

const getAllVolunteers = async (req, res) => {
  const result = await Volunteers.find().select({ createdAt: 0, updatedAt: 0 });
  res.status(200);
  res.json({
    code: 200,
    message: "Get all volunteers success",
    data: result,
  });
};

module.exports = getAllVolunteers;
