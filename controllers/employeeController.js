const User = require("../models/User");
const bcrypt = require("bcryptjs");

const addEmployee = async (req, res) => {
  try {
    const {
      name,
      username,
      emailAddress,
      companyName,
      companyId,
      mobileNumber,
      password,
    } = req.body;

    if (
      !name ||
      !username ||
      !emailAddress ||
      !mobileNumber ||
      !password ||
      !companyName ||
      !companyId
    ) {
      return res.status(200).json({
        status: "incorrect-data-sent",
        employee: null,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      emailAddress,
      mobileNumber,
      password: hash,
      companyName,
      companyId,
      username,
    });

    if (!user) {
      return res.status(200).json({
        status: "failed",
        employee: null,
      });
    }
    return res.status(200).json({
      status: "success",
      employee: { id: user._id, createdAt: user.createdAt },
    });
  } catch (error) {
    console.log("Error from employeeController's addEmployee", error);
    return res.status(500).json({
      status: "failed",
      employee: null,
    });
  }
};

const fetchCompanyWiseEmployees = async (req, res) => {
  try {
    const { companyId } = req.params;

    const employees = await User.find({
      companyId,
    });

    if (!employees) {
      return res.json({
        status: "failed",
        employees: null,
      });
    }
    return res.json({
      status: "success",
      employees: employees,
    });
  } catch (error) {
    console.log(
      "Error from employeeController's fetchCompanyWiseEmployeesF",
      error
    );
    return res.json({
      status: "failed",
      employees: [],
    });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(200).json({
        status: "incorrect-data-sent",
      });
    }
    const response = await User.findByIdAndDelete(id).select({});

    if (!response) {
      return res.status(200).json({
        status: "failed",
      });
    }

    return res.status(200).json({
      status: "success",
    });
  } catch (error) {
    console.log("Error from employeeController's deleteEmployee", error);
    return res.status(500).json({
      status: "failed",
    });
  }
};

module.exports = {
  addEmployee,
  fetchCompanyWiseEmployees,
  deleteEmployee,
};
