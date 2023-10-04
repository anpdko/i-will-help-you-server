const express = require("express");
const router = express.Router();
const {
  newSheetVolunteers,
  addSheetVolunteers,
} = require("../controllers/sheet/volunteers");

router.get("/new-sheet-volunteers", newSheetVolunteers);

router.get("/add-sheet-volunteers", addSheetVolunteers);

module.exports = router;
