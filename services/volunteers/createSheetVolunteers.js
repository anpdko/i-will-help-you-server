const { Volunteers } = require("../../models/readyneed.module");
const { getDocSheet } = require("../../helpers/spreadsheet");

getTitleTable = () => {
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  return `${year}-${month}-${day}`
}

const createSheetVolunteers = async () => {
  try {
    const result = await Volunteers.find().select({ updatedAt: 0 });
    const doc = await getDocSheet();
    const tableLength = doc.sheetsByIndex.length

    if (result.length > 0) {
      const keyObject = Object.keys(JSON.parse(JSON.stringify(result[0])));
      const titleTable = getTitleTable() + '_#' + (tableLength + 1)

      const sheet = await doc.addSheet({ headerValues: keyObject });
      try {
        await sheet.updateProperties({ title: titleTable});
      }
      catch (e) {
        await sheet.updateProperties({ title: titleTable + '_copy'});
      }
    }
  }
  catch (e) {
    console.log(e);
  }
  
};

module.exports = createSheetVolunteers;
