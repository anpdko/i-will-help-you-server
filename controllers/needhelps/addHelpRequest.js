const { needHelps } = require("../../models/readyneed.module");

const addHelpRequest = async (req, res) => {
  const newHelpReuqesr = await needHelps.create({ ...req.body });
  res.status(201);
  res.json({
    code: 201,
    message: "Add need help request success",
    data: newHelpReuqesr,
  });
};

module.exports = addHelpRequest;
