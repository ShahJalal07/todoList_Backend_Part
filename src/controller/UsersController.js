const otpModel = require("../models/OTPmodel");
const UserModel = require("../models/UserModel");
const userModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utility/SendOTPemail");
const SendEmailUtility = require("../utility/SendOTPemail");
const OtpModel = require("../models/OTPmodel");

// registation starts here
exports.Registation = async (req, res) => {
  try {
    const reqBody = req.body;
    const newUser = await userModel.create(reqBody);
    res.status(200).json({
      status: "success",
      data: {
        newUser,
      },
    });
  } catch (err) {
    res.status(200).json({
      status: "fail",
      data: err,
    });
  }
};
// registation ends here

// login starts here
exports.Login = async (req, res) => {
  try {
    const reqBody = req.body;
    const user = await userModel.findOne({ email: reqBody.email });
    if (!user) {
      return res.status(400).json({
        status: "fail",
        data: "User not found",
      });
    }
    if (user.password !== reqBody.password) {
      return res.status(400).json({
        status: "fail",
        data: "Wrong Password",
      });
    } else {
      const payload = {
        exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1 hour
        data: user["email"],
      };
      const token = jwt.sign(payload, "2030405010");
      const responsibeData = {
        email: user["email"],
        name: user["name"],
        ProfilePhoto: user["ProfilePic"],
        date: user["createdAt"],
      };
      res.status(200).json({
        status: "success",
        data: responsibeData,
        token: token,
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "fail",
      data: err,
    });
  }
};
// login ends here

// update profile starts
exports.updateProfile = async (req, res) => {
  try {
    const email = req.headers.email;
    const reqBody = req.body;
    const query = { email: email };
    const user = await userModel.updateOne(query, reqBody);
    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      data: err,
    });
  }
};
// update profile end

// get profile starts
exports.getProfile = async (req, res) => {
  try {
    const email = req.headers.email;
    const query = { email: email };
    const user = await UserModel.aggregate([
      { $match: query },
      {
        $project: {
          password: 0,
        },
      },
    ]);
    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      data: err,
    });
  }
};
// get profile end

// email verification starts
exports.EmailmailVerify = async (req, res) => {
  try {
    let email = req.params.email;
    let query = { email: email };
    let otp = Math.floor(100000 + Math.random() * 900000); // Generate 6 digit random number
    const user = await UserModel.findOne(query);

    if (!user) {
      return res.status(200).json({ status: "fail", data: "User not found" });
    } else {
      // sept -1
      let createTopt = await OtpModel.create({ email: email, otp: otp });
      // setp - 2
      let sendEmail = SendEmailUtility(
        email,
        "To-Do-Tasker Password Verification",
        `Your OTP is ${otp}`
      );
      res
        .status(200)
        .json({ status: "success", data: "OTP send successfully" });
    }
  } catch (error) {
    res.status(200).json({ status: "fail", data: error });
  }
};

// email verification end

// otp vefication start
exports.otp = async (req, res) => {
  try {
    const email = req.params.email;
    const otp = req.params.otp;
    const status = 0;
    const updateStatus = -1;

    const OTPcheck = await otpModel.aggregate([
      { $match: { email: email, otp: otp } },
      { $count: "total" },
    ]);

    if (OTPcheck.length > 0) {
      const updateOtp = await OtpModel.updateOne(
        { email: email, otp: otp, status: status },
        { email: email, otp: otp, status: updateStatus }
      );
      res
        .status(200)
        .json({ status: "success", data: "OTP verified successfully" });
    } else {
      res.status(200).json({ status: "fail", data: "Invalid OTP" });
    }
  } catch (error) {
    res.status(200).json({ status: "fail", data: error });
  }
};
// otp vefication end

// reset password starts
exports.resetPassword = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const newPassword = req.body.newPassword; // Corrected variable name
    const otp = req.body.otp;
    const UpdateStatus = -1;

    const user = await userModel.findOne({ email: email });

    if (!user) {
      // User with provided email not found
      return res.status(200).json({ status: "fail", data: "Email not found" });
    }

    if (user.password !== password) {
      // Previous password does not match
      return res.status(200).json({ status: "fail", data: "Your previous password does not match" });
    }

    // Update password
    const updatedUser = await userModel.updateOne({ email: email }, { password: newPassword });

    if (updatedUser) {
      // Password successfully updated
      return res.status(200).json({ status: "success", data: "Password successfully reset" });
    } else {
      // Failed to update password
      return res.status(200).json({ status: "fail", data: "Failed to reset password" });
    }
  } catch (error) {
    // Error handling
    res.status(500).json({ status: "fail", data: error.message });
  }
};

// reset password end
