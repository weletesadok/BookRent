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

const router = express.Router();

router.post("/", uploadFiles, addBook);
router.put("/:id", uploadFiles, editBook);
router.delete("/:id", deleteBook);
router.get("/", getAllBooks);
router.get("/:id", getBookById);
router.get("/statistics/category", getBookStatisticsByCategory);
router.put("/approve/:bookId", approveBook);

module.exports = router;
