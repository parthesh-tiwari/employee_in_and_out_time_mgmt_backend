const Entry = require("../models/Entry");

const addEntry = async (req, res) => {
  try {
    const { name, employeeId, emailAddress, mobileNumber, type } = req.body;

    if (!employeeId || !type) {
      return res.status(400).json({
        status: "incorrect-data-sent",
        entry: null,
      });
    }

    const entry = await Entry.create({
      name,
      employeeId,
      emailAddress,
      mobileNumber,
      type,
    });

    return res.status(201).json({
      status: "success",
      entry,
    });
  } catch (error) {
    console.error("Error from Entry controller's addEntry", error);
    return res.status(500).json({
      status: "failed",
      entry: null,
      error: error.message,
    });
  }
};

const fetchEntriesByEmployee = async (req, res) => {
  try {
    const { employeeId } = req.params;

    const entries = await Entry.find({ employeeId });

    return res.json({
      status: "success",
      entries,
    });
  } catch (error) {
    console.error(
      "Error from Entry controller's fetchEntriesByEmployee",
      error
    );
    return res.status(500).json({
      status: "failed",
      entries: null,
      error: error.message,
    });
  }
};

const deleteEntry = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        status: "incorrect-data-sent",
      });
    }

    const deletedEntry = await Entry.findByIdAndDelete(id);

    if (!deletedEntry) {
      return res.status(404).json({
        status: "failed",
        error: "Entry not found",
      });
    }

    return res.json({
      status: "success",
      entry: deletedEntry,
    });
  } catch (error) {
    console.error("Error from Entry controller's deleteEntry", error);
    return res.status(500).json({
      status: "failed",
      entry: null,
      error: error.message,
    });
  }
};

module.exports = {
  addEntry,
  fetchEntriesByEmployee,
  deleteEntry,
};
