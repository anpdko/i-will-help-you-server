const { Volunteers } = require("../../../models/readyneed.module");
const { getDocSheet } = require("../../../helpers/spreadsheet");
const {flattenObject} = require("../../../helpers/flattenObject/flattenObjectVolunteer");

const addSheetVolunteers = async (req, res) => {
  const doc = await getDocSheet();
  // const sheet = doc.sheetsByTitle["Лист28"];
  const tableLength = doc.sheetsByIndex.length
  const sheet = doc.sheetsByIndex[tableLength-1];

  console.log(sheet.title)
  const rows = await sheet.getRows();
  // console.log(rows[rows.length - 1].get('_id'));

  // последний id из таблицы
  const idToSearchAfter = rows[rows.length - 1].get('_id')

  const result = await Volunteers
    .find({ _id: { $gt: idToSearchAfter } })
    .select({ createdAt: 0, updatedAt: 0 });
  if(result.length > 0) {
    const flattenedArray = result.map((obj) => flattenObject(obj));
    const moreRows = await sheet.addRows(flattenedArray);

    res.status(200);
    return res.json({
      code: 200,
      message: "New sheet volunteers",
      data: "New data",
    });
  }

  res.status(200);
  res.json({
    code: 200,
    message: "New sheet volunteers",
    data: "No new data",
  });
};

module.exports = addSheetVolunteers;
