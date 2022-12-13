const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/categoryController");

router.post("", categoryController.addCategory);
router.get("", categoryController.getAllCategory);
router.patch("/:id", categoryController.updateCategory);
router.delete("/:id", categoryController.delete);
router.get("/:id", categoryController.getOneCategory);

module.exports = router;
