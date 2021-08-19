const express = require("express");
const router = express.Router();


const {
  getAllEnvelopes,
  createEnvelope,
  getAnEnvelope,
  deleteEnvelope,
	updateEnvelope,
    transfer
} = require("../controllers/envelopes");

router.get("/", getAllEnvelopes);
router.get("/:id", getAnEnvelope);
router.post("/", createEnvelope);
router.put("/:id", updateEnvelope);
router.delete("/:id", deleteEnvelope);
router.post("/transfer/:fromId/:toId", transfer);

module.exports = router;

