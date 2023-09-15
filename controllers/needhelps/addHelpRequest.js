const { NeedHelps } = require("../../models/needhelps.module");

const addHelpRequest = async (req, res) => {
  const newHelpReuqesr = await NeedHelps.create(req.body);
  res.status(201);
  res.json({
    code: 201,
    message: "Add need help request success",
    data: newHelpReuqesr,
  });
};

module.exports = addHelpRequest;
