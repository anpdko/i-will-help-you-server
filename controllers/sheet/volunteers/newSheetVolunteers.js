const { Volunteers } = require("../../../models/readyneed.module");
const { getDocSheet } = require("../../../helpers/spreadsheet");
const {flattenObject} = require("../../../helpers/flattenObject/flattenObjectVolunteer");

const newSheetVolunteers = async (req, res) => {
  const result = await Volunteers.find().select({ createdAt: 0, updatedAt: 0 });
  const doc = await getDocSheet();

  if (result.length > 0) {
    const keyObject = Object.keys(JSON.parse(JSON.stringify(result[0])));
    const sheet = await doc.addSheet({ headerValues: keyObject });

    const flattenedArray = result.map((obj) => flattenObject(obj));
    const moreRows = await sheet.addRows(flattenedArray);
  }

  res.status(200);
  res.json({
    code: 200,
    message: "New sheet volunteers",
    data: "OK",
  });
};

module.exports = newSheetVolunteers;
