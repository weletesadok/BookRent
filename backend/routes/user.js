const express = require("express");
const {
  approve,
  activate,
  deactivate,
  users,
  deleteUser,
  editUser,
} = require("../controllers/user");

const router = express.Router();

router.patch("/approve/:userId", approve);
router.patch("/activate/:userId", activate);
router.patch("/deactivate/:userId", deactivate);
router.get("/", users);
router.delete("/:userId", deleteUser);
router.put("/:userId", editUser);

module.exports = router;
