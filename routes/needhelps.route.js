const express = require("express");

const router = express.Router();
const { isValidId } = require("../middleware/isValidId");
const { validateBody } = require("../middleware/validateBody");

const {
  getAllHelpRequest,
  getHelpRequestBiId,
  addHelpRequest,
  removeHelpRequest,
  updateHelpRequest,
} = require("../controllers/needhelps");


const { controllerWrapper } = require("../helpers");
const { verifyToken } = require("../middleware/admin.middleware");
const { needHelpsAddSchema, needHelpsUpdateSchema  } = require("../schemas");

router.get("/", verifyToken, controllerWrapper(getAllHelpRequest));
router.get("/:id", verifyToken, isValidId, controllerWrapper(getHelpRequestBiId));
router.post(
  "/",
  validateBody(needHelpsAddSchema),
  controllerWrapper(addHelpRequest)
);
router.put(
  "/:id",
  verifyToken,
  isValidId,
  validateBody(needHelpsUpdateSchema),
  controllerWrapper(updateHelpRequest)
);
router.delete(
  "/:id",
  verifyToken,
  isValidId,
  controllerWrapper(removeHelpRequest)
);

module.exports = router;
  
