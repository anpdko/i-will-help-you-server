const { Volunteers } = require("../../models/readyneed.module");
const { getDocSheet } = require("../../helpers/spreadsheet");
const { flattenObject } = require("../../helpers/flattenObject/flattenObjectVolunteer");
const createSheetVolunteers = require('./createSheetVolunteers')

// последний id из таблицы с данными
const getIdToSearchAfter = async (doc, tableLength) => {
  for (let i = tableLength - 1; i >= 0; i--) {
    try {
      sheetItem = doc.sheetsByIndex[i];
      rowsItem = await sheetItem.getRows();
      if (rowsItem.length > 0) {
        return rowsItem[rowsItem.length - 1].get("_id");
      }
    }
    catch(err){}
  }
  return null;
};

const updateSheetVolunteers = async () => {
  try {
    const doc = await getDocSheet();
    const tableLength = doc.sheetsByIndex.length;
    let sheet = doc.sheetsByIndex[tableLength - 1];
    if (sheet) {
      let idToSearchAfter = await getIdToSearchAfter(doc, tableLength);
  
      const result = await Volunteers.find({
        _id: { $gt: idToSearchAfter },
      }).select({ updatedAt: 0 });
      if (result.length > 0) {
        const flattenedArray = result.map((obj) => flattenObject(obj));
        await sheet.addRows(flattenedArray);
      }
    }
  }
  catch (e) {
    console.log("error: " + e?.message);
    createSheetVolunteers()
  }
};

module.exports = updateSheetVolunteers;
