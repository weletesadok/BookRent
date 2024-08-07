const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const addBook = async (req, res) => {
  const {
    name,
    author,
    category,
    publicationDate,
    details,
    ownerId,
    quantity,
    price,
  } = req.body;
  try {
    const book = await prisma.book.create({
      data: {
        name,
        author,
        category,
        publicationDate: new Date(publicationDate),
        details,
        ownerId: Number(ownerId),
        quantity: Number(quantity),
        price: Number(price),
        image: req.fileUrls,
      },
    });
    res.status(201).json({ message: "book added successfully ", data: book });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", message: JSON.stringify(error) });
  }
};

const editBook = async (req, res) => {
  const { id } = req.params;
  const { name, author, category, publicationDate, details, quantity, price } =
    req.body;

  try {
    const book = await prisma.book.update({
      where: { id: parseInt(id, 10) },
      data: {
        name,
        author,
        category,
        publicationDate: new Date(publicationDate),
        details,
        quantity,
        price,
        image: req.fileUrls,
      },
    });
    res.json(book);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", message: JSON.stringify(error) });
  }
};

const deleteBook = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.book.delete({
      where: { id: parseInt(id, 10) },
    });
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", message: JSON.stringify(error) });
  }
};

const getAllBooks = async (req, res) => {
  const { search, sort, page = 1, category, limit = 10 } = req.query;
  const skip = (Number(page) - 1) * Number(limit);

  try {
    const where = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { author: { contains: search, mode: "insensitive" } },
        { details: { contains: search, mode: "insensitive" } },
      ];
    }

    if (category) {
      where.category = { has: category };
    }

    const books = await prisma.book.findMany({
      where,
      orderBy: sort ? { [sort]: "asc" } : undefined,
      skip,
      take: Number(limit),
    });

    const totalBooks = await prisma.book.count({ where });

    res.json({
      books,
      totalBooks,
      totalPages: Math.ceil(totalBooks / Number(limit)),
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: JSON.stringify(error) });
  }
};

const getBookById = async (req, res) => {
  const { id } = req.params;

  try {
    const book = await prisma.book.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.json(book);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", message: JSON.stringify(error) });
  }
};

const getBookStatisticsByCategory = async (req, res) => {
  try {
    const statistics = await prisma.book.groupBy({
      by: ["category"],
      _count: {
        id: true,
      },
      where: {
        quantity: {
          gt: 0,
        },
      },
    });

    const formattedStatistics = statistics.map((stat) => ({
      category: stat.category,
      availableBooks: stat._count.id,
    }));

    res.json(formattedStatistics);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", message: JSON.stringify(error) });
  }
};

const approveBook = async (req, res) => {
  try {
    const { bookId } = req.params;

    const book = await prisma.book.findById(bookId);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    book.approved = true;
    await book.save();

    res.status(200).json({ message: "Book approved successfully", book });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  addBook,
  editBook,
  deleteBook,
  getAllBooks,
  getBookById,
  getBookStatisticsByCategory,
  approveBook,
};
