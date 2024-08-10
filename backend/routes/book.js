const express = require("express");
const {
  addBook,
  editBook,
  deleteBook,
  getAllBooks,
  getBookById,
  getBookStatisticsByCategory,
  approveBook,
} = require("../controllers/book");
const { uploadFiles } = require("../middlewares/uploadFiles");
const roleChecker = require("../middlewares/checkAuth");

const router = express.Router();

router.post("/", roleChecker("create", "Book"), uploadFiles, addBook);
router.put("/:id", roleChecker("update", "Book"), uploadFiles, editBook);
router.delete("/:id", roleChecker("delete", "Book"), deleteBook);
router.get("/", getAllBooks);
router.get("/:id", getBookById);
router.get(
  "/statistics/category",
  roleChecker("read", "Book"),
  getBookStatisticsByCategory
);
router.put("/approve/:bookId", roleChecker("approve", "Book"), approveBook);

module.exports = router;
