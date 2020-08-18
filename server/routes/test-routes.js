const express = require("express");

const testControllers = require("../controllers/test-controllers");

const router = express.Router();

// For hardware testing
router.post("/", testControllers.createTestData);
router.get("/", testControllers.getTestData);
router.delete("/clear", testControllers.deleteTestData);

module.exports = router;
