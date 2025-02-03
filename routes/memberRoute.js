const express = require("express");
const router = express.Router();
const {
  createMember,
  getAllMembers,
  getMemberById,
  updateMember,
  deleteMember,
  getFilteredMembers,
} = require("../controllers/memberController");
const { protect, adminOnly } = require("../middlewares/authMiddleware");

router.route("/addmember").post(createMember).get(getAllMembers);

router.route("/:id").get(getMemberById).put(updateMember).delete(deleteMember);

router.get("/filtered", getFilteredMembers);

module.exports = router;
