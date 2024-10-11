const express = require("express");
const router = express.Router();
const userController = require("../controller/UsersController");
const AuthVarifyMiddleware = require("../middleware/AuthVarifyMiddleware");
const todotaskController = require("../controller/TodotaskController");

// todo user start
router.post("/registation", userController.Registation);
router.post("/login", userController.Login);
router.post(
  "/updateProfile",
  AuthVarifyMiddleware,
  userController.updateProfile
);
router.get(
  "/profile-view",
  AuthVarifyMiddleware,
  userController.ProfileDetails
);
router.get("/email-verify/:email", userController.EmailmailVerify);
router.get("/otp-verify/:email/:otp/:status", userController.otp);
router.post("/changePassword", userController.changePassword);
router.post("/reset-password", userController.resetPasswordRequest);
router.post("/profileNameChange", userController.profileNameChange);
// todo user end

// Todo Task start

// todo task create start
router.post("/addTask", AuthVarifyMiddleware, todotaskController.createTask);
// todo task create end

// todo task update start
router.put(
  "/updateTask/:id/:status",
  AuthVarifyMiddleware,
  todotaskController.updateTask
);
// todo task update end

// todo task update by id start
router.put(
  "/updateById/:id",
  AuthVarifyMiddleware,
  todotaskController.updateById
);
// todo task update by id end

// todo task delete start
router.delete(
  "/deleteTask/:id",
  AuthVarifyMiddleware,
  todotaskController.deleteTask
);
// todo task delete end

// todo list check status start
router.get(
  "/checkbystatus/:status",
  AuthVarifyMiddleware,
  todotaskController.statusCount
);
// todo list check status end

// todo list count start
router.get("/count", AuthVarifyMiddleware, todotaskController.count);
// todo list count end

// Todo Task end

module.exports = router;
