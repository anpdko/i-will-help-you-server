const { needHelps } = require("../../models/needhelps.module");

const getAllHelpRequest = async (req, res) => {
  const newNeedHelps = await needHelps.create({ ...req.body });
  res.status(201);
  res.json({
    code: 201,
    message: "Get all need help request success",
    data: newNeedHelps,
  });
};

module.exports = getAllHelpRequest;