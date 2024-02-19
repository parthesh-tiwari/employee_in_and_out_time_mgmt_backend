const express = require("express");

const {
  fetchEntriesByEmployee,
  addEntry,
  deleteEntry,
} = require("../controllers/entryController");

const router = express.Router();

router.get("/:employeeId", fetchEntriesByEmployee);

router.post("/", addEntry);

router.delete("/:id", deleteEntry);

module.exports = router;
