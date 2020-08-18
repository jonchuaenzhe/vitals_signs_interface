const express = require("express");
const { check } = require("express-validator");

const dataControllers = require("../controllers/ecgData-controllers");

const router = express.Router();

router.get("/:eid", dataControllers.getEcgData);
router.get("/", dataControllers.getAllEcgData);
router.post("/", check("ecg_data").isArray(), dataControllers.createEcgData);
router.patch("/:eid", check("ecg_data").isArray(), dataControllers.updateEcgData);
router.delete("/:eid", dataControllers.deleteEcgData);
router.delete("/clear", dataControllers.deleteAllEcgData);

module.exports = router;
