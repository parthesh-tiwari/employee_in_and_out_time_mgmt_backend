const express = require("express");

const {
  fetchCompanyWiseEmployees,
  addEmployee,
  deleteEmployee,
} = require("../controllers/employeeController");

const router = express.Router();

router.get("/:companyId", fetchCompanyWiseEmployees);

router.post("/", addEmployee);

router.delete("/:id", deleteEmployee);

module.exports = router;
