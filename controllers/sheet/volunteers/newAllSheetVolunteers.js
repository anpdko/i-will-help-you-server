const { Volunteers } = require("../../../models/readyneed.module");
const { getDocSheet } = require("../../../helpers/spreadsheet");
const {flattenObject} = require("../../../helpers/flattenObject/flattenObjectVolunteer");

getTitleTable = () => {
  const currentDate = new Date();

  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();

  return `${year}-${month}-${day}`
}

const newAllSheetVolunteers = async (req, res) => {
  try {
    const result = await Volunteers.find().select({ updatedAt: 0 });
    const doc = await getDocSheet();
    const tableLength = doc.sheetsByIndex.length

    if (result.length > 0) {
      const keyObject = Object.keys(JSON.parse(JSON.stringify(result[0])));
      const sheet = await doc.addSheet({ headerValues: keyObject });

      const flattenedArray = result.map((obj) => flattenObject(obj));
      const moreRows = await sheet.addRows(flattenedArray);
      const titleTable = getTitleTable() + '_#' + (tableLength + 1)
      try {
        await sheet.updateProperties({ title: titleTable});
      }
      catch (e) {
        await sheet.updateProperties({ title: titleTable + '_copy'});
      }
    }

    res.status(200);
    res.json({
      code: 200,
      message: "New sheet volunteers",
      data: "OK",
    });
  }
  catch (e) {
    console.log(e);
  }
  
};

module.exports = newAllSheetVolunteers;
