const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getRevenueByBookId = async (req, res) => {
  const { bookId } = req.params;

  try {
    const revenues = await prisma.revenue.findMany({
      where: { bookId: parseInt(bookId) },
    });
    res.json(revenues);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
};

const getRevenueByOwnerId = async (req, res) => {
  const { ownerId } = req.params;

  try {
    const revenues = await prisma.revenue.findMany({
      where: { userId: parseInt(ownerId) },
    });
    res.json(revenues);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
};

const getAllRevenues = async (req, res) => {
  const { limit = 10, page = 1 } = req.query;
  const skip = (page - 1) * limit;

  try {
    const revenues = await prisma.revenue.findMany({
      skip: parseInt(skip),
      take: parseInt(limit),
      include: {
        user: true,
        book: true,
      },
    });

    const totalRevenues = await prisma.revenue.count();

    res.json({
      revenues,
      totalRevenues,
      totalPages: Math.ceil(totalRevenues / limit),
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
};

const generateEarningSummaryForOwnerId = async (req, res) => {
  const { startDate, endDate, userId } = req.body;

  try {
    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setDate(end.getDate() + 1);

    const earnings = await prisma.revenue.aggregate({
      where: {
        userId: parseInt(userId),
        createdAt: {
          gte: start,
          lt: end,
        },
      },
      _sum: {
        amount: true,
      },
    });

    res.json(earnings);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
};

const totalEarningSummary = async (req, res) => {
  const { startDate, endDate } = req.body;

  try {
    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setDate(end.getDate() + 1);

    const earnings = await prisma.revenue.aggregate({
      where: {
        createdAt: {
          gte: start,
          lt: end,
        },
      },
      _sum: {
        amount: true,
      },
    });

    res.json(earnings);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
};

module.exports = {
  getRevenueByBookId,
  getRevenueByOwnerId,
  getAllRevenues,
  generateEarningSummaryForOwnerId,
  totalEarningSummary,
};
