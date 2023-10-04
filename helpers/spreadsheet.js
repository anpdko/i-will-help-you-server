const { GoogleSpreadsheet } = require("google-spreadsheet");
const { JWT } = require("google-auth-library");

const GOOGLE_SHEET_VOLUNTEERS_ID = process.env.GOOGLE_SHEET_VOLUNTEERS_ID;
const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL;
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/gm, "\n");

const serviceAccountAuth = new JWT({
   email: GOOGLE_CLIENT_EMAIL,
   key: GOOGLE_PRIVATE_KEY,
   scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const getDocSheet = async () => {
   const doc = new GoogleSpreadsheet(GOOGLE_SHEET_VOLUNTEERS_ID, serviceAccountAuth);
   await doc.loadInfo();

   return doc
}

module.exports = { getDocSheet }