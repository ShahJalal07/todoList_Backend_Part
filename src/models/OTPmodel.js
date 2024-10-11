const mongoose = require("mongoose");
const otpSchema = new mongoose.Schema(
    {
        email: { type: String },
        otp: { type: String },
        status: { type: Number ,},
        createdDate: { type: Date, default: Date.now() },
    },
    { versionKey: false }
);
const OtpModel = mongoose.model("otps", otpSchema);
module.exports = OtpModel