const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const { v4: uuidv4 } = require("uuid");

const generateToken = (data) => {
  return jwt.sign({ data }, "thesecret", { expiresIn: "4h" });
};

const updateUser = async (data, id) => {
  try {
    if (!data || !id) {
      return false;
    }

    const updatedUser = await User.findByIdAndUpdate(id, data);
    return updatedUser ? true : false;
  } catch (error) {
    console.log("Error from authController's updateUser", error);
    return false;
  }
};

const register = async (req, res) => {
  try {
    const {
      fullName,
      username,
      emailAddress,
      companyName,
      companyId,
      mobileNumber,
      password,
    } = req.body;

    if (
      !fullName ||
      !username ||
      !emailAddress ||
      !mobileNumber ||
      !password ||
      !companyName ||
      !companyId
    ) {
      return res.status(200).json({
        status: "incorrect-data-sent",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await User.create({
      fullName,
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
      });
    }
    return res.status(200).json({
      status: "success",
    });
  } catch (error) {
    console.log("Error from authController's register", error);
    return res.status(500).json({
      status: "failed",
    });
  }
};

const login = async (req, res) => {
  try {
    const { emailAddress, password } = req.body;

    if (!emailAddress || !password) {
      return res.status(200).json({
        status: "incorrect-data-sent",
        user: null,
        token: null,
      });
    }

    const existingUser = await User.findOne({
      emailAddress: emailAddress,
    });

    if (!existingUser) {
      return res.status(200).json({
        status: "user-not-found",
        user: null,
        token: null,
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (isPasswordCorrect) {
      return res.status(200).json({
        status: "success",
        user: {
          id: existingUser._id,
          name: existingUser.name,
          username: existingUser.username,
          emailAddress: existingUser.emailAddress,
          type: existingUser.type,
          companyId: existingUser.companyId,
          companyName: existingUser.companyName,
          mobileNumber: existingUser.mobileNumber,
        },
        token: generateToken(existingUser._id),
        message: "User logged in successfully",
      });
    } else {
      return res.status(200).json({
        status: "incorrect-password",
        user: null,
        token: null,
      });
    }
  } catch (error) {
    console.log("Error from authController's login", error);
    return res.status(200).json({
      status: "internal-server-error",
      user: null,
      token: null,
    });
  }
};

const changePassword = async (req, res) => {
  try {
    const { password, id, newPassword } = req.body;

    const existingUser = await User.findById(id);

    if (!existingUser) {
      return res.status(200).json({
        status: "user-not-found",
      });
    }

    const existingUserPassword = existingUser.password;

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUserPassword
    );

    if (!isPasswordCorrect) {
      return res.status(200).json({
        status: "incorrect-password",
      });
    }

    console.log(isPasswordCorrect);

    const salt = await bcrypt.genSalt(10);
    const newPasswordHash = await bcrypt.hash(newPassword, salt);

    const data = {
      password: newPasswordHash,
    };

    const updatedUser = await User.findByIdAndUpdate(id, data).select({});

    if (updatedUser) {
      return res.status(200).json({
        status: "success",
      });
    }

    return res.status(200).json({
      status: "failed",
    });
  } catch (error) {
    console.log("Error from authController's changePassword", error);
    return res.status(500).json({
      status: "failed",
    });
  }
};

module.exports = { register, login, changePassword, updateUser };
