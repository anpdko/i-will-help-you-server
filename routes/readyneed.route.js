const express = require("express");

const router = express.Router();
const { isValidId } = require("../middleware/isValidId");
const { validateBody } = require("../middleware/validateBody");

const {
  getAllVolunteers,
  getVolunteerBiId,
  addVolunteer,
  removeVolunteer,
  updateVolunteer,
} = require("../controllers/readyneed");
const { controllerWrapper } = require("../helpers");
const { verifyToken } = require("../middleware/admin.middleware");
const { volunteerAddSchema, volunteerUpdateSchema } = require("../schemas");

router.get("/", verifyToken, controllerWrapper(getAllVolunteers));
router.get("/:id", verifyToken, isValidId, controllerWrapper(getVolunteerBiId));
router.post(
  "/",
  validateBody(volunteerAddSchema),
  controllerWrapper(addVolunteer)
);
router.put(
  "/:id",
  verifyToken,
  isValidId,
  validateBody(volunteerUpdateSchema),
  controllerWrapper(updateVolunteer)
);
router.delete(
  "/:id",
  verifyToken,
  isValidId,
  controllerWrapper(removeVolunteer)
);

module.exports = router;
