const express = require("express");
const router = express.Router();
const {
  newAllSheetVolunteers,
  addSheetVolunteers,
} = require("../controllers/sheet/volunteers");

router.get("/new-sheet-volunteers", newAllSheetVolunteers);

router.get("/add-sheet-volunteers", addSheetVolunteers);

module.exports = router;
