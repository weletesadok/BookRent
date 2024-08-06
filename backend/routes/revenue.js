const express = require("express");
const {
  getRevenueByBookId,
  getRevenueByOwnerId,
  getAllRevenues,
  generateEarningSummaryForOwnerId,
  totalEarningSummary,
} = require("../controllers/revenue");

const router = express.Router();

router.get("/book/:bookId", getRevenueByBookId);
router.get("/owner/:ownerId", getRevenueByOwnerId);
router.get("/", getAllRevenues);
router.post("/summary/owner", generateEarningSummaryForOwnerId);
router.post("/summary/total", totalEarningSummary);

module.exports = router;
