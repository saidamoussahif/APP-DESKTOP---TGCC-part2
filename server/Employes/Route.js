const express = require("express");
const router = express.Router();

const { addEmploye, getEmployes } = require("./Controller");

router.post("/add", addEmploye);
router.get("/get", getEmployes);

module.exports = router;
