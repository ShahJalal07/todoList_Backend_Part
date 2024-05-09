const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      validate(value) {
        if (!value) {
          throw new Error("Name is required");
        }
        if (value.length < 3) {
          throw new Error("Name must be at least 3 characters");
        }
        if (value.length > 50) {
          throw new Error("Name must be less than 50 characters");
        }
        // if (!/^[a-zA-Z]+$/.test(value)) {
        //   throw new Error("Name must only contain letters");
        // }
      },
    },
    lastName: {
      type: String,
      required: true,
      validate(value) {
        if (!value) {
          throw new Error("Name is required");
        }
        if (value.length < 3) {
          throw new Error("Name must be at least 3 characters");
        }
        if (value.length > 50) {
          throw new Error("Name must be less than 50 characters");
        }
        // if (!/^[a-zA-Z]+$/.test(value)) {
        //   throw new Error("Name must only contain letters");
        // }
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate(value) {
        if (value) {
          return value.includes("@");
        }
        if (!value) {
          throw new Error("Email is required");
        }
        if (!/\S+@\S+\.\S+/.test(value)) {
          throw new Error("Email is invalid");
        }
        if (!/^[a-zA-Z0-9]+$/.test(value)) {
          throw new Error("Email must only contain letters and numbers");
        }
        if (value.length < 3) {
          throw new Error("Email must be at least 3 characters");
        }
        if (value.length > 50) {
          throw new Error("Email must be less than 50 characters");
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (value.length < 6) {
          throw new Error("Password must be at least 6 characters");
        }
        if (value.length > 50) {
          throw new Error("Password must be less than 50 characters");
        }
        if (!/^[a-zA-Z0-9]+$/.test(value)) {
          throw new Error("Password must only contain letters and numbers");
        }
        if (!/[a-zA-Z]/.test(value)) {
          throw new Error("Password must contain at least one letter");
        }
        if (!/[0-9]/.test(value)) {
          throw new Error("Password must contain at least one number");
        }
      },
    },
    ProfilePic: {
      type: String,
      required: true,
      validate(value) {
        if (!value) {
          throw new Error("ProfilePic is required");
        }
      },
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    versionKey: false,
  }
);

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
