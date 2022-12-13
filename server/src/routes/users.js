const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const upload = require("../configs/file");

router.get("", userController.getAllUser);
router.post("", userController.createUser);
router.delete("/:id", userController.deleteUser);
router.patch("/:id", userController.updateUser);
router.get("/:id", userController.getOneUser);

router.post(
  "/update-avatar",
  upload.single("file"),
  userController.updateAvatar
);
module.exports = router;
