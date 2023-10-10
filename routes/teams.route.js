const express = require("express");

const router = express.Router();
const { isValidId } = require("../middleware/isValidId");
const { validateBody } = require("../middleware/validateBody");

const {
  addTeam,
  getAllTeams,
  removeTeam,
  updateTeam,
} = require("../controllers/teams");

const { controllerWrapper } = require("../helpers");
const { verifyToken } = require("../middleware/admin.middleware");
const { teamsAddSchema, teamsUpdateSchema } = require("../schemas");

const data = require("../data/teams.json");
const { Teams } = require("../models/teams.module");
router.get("/add", (req, res) => {
  try {
    data.map(async (elem) => {
      await Teams.create(elem);
    });
    res.json("OK");
  } catch (err) {
    console.log(err);
  }
});

router.get("/", controllerWrapper(getAllTeams));

router.post(
  "/",
  verifyToken,
  validateBody(teamsAddSchema),
  controllerWrapper(addTeam)
);

router.put(
  "/:id",
  verifyToken,
  isValidId,
  validateBody(teamsUpdateSchema),
  controllerWrapper(updateTeam)
);

router.delete("/:id", verifyToken, isValidId, controllerWrapper(removeTeam));

module.exports = router;
