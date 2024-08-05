const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const rent = async (req, res) => {
  const { ownerId, renterId, totalPrice, startDate, endDate } = req.body;

  try {
    const newRent = await prisma.rent.create({
      data: {
        ownerId,
        renterId,
        totalPrice,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      },
    });
    res.status(201).json(newRent);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
};

const removerent = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.rent.delete({
      where: { id: parseInt(id, 10) },
    });
    res.status(204).send();
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
};

const getRents = async (req, res) => {
  const { search, limit = 10, page = 1 } = req.query;
  const skip = (page - 1) * limit;

  try {
    const where = {};

    if (search) {
      where.OR = [
        { owner: { name: { contains: search, mode: "insensitive" } } },
        { renter: { name: { contains: search, mode: "insensitive" } } },
      ];
    }

    const rents = await prisma.rent.findMany({
      where,
      skip: parseInt(skip, 10),
      take: parseInt(limit, 10),
    });

    const totalRents = await prisma.rent.count({ where });

    res.json({
      rents,
      totalRents,
      totalPages: Math.ceil(totalRents / limit),
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
};

const getrentbyid = async (req, res) => {
  const { id } = req.params;

  try {
    const rent = await prisma.rent.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!rent) {
      return res.status(404).json({ error: "Rent not found" });
    }

    res.json(rent);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
};

const getrentsbyrenterid = async (req, res) => {
  const { renterId } = req.params;
  const { limit = 10, page = 1 } = req.query;
  const skip = (page - 1) * limit;

  try {
    const rents = await prisma.rent.findMany({
      where: { renterId: parseInt(renterId, 10) },
      skip: parseInt(skip, 10),
      take: parseInt(limit, 10),
    });

    const totalRents = await prisma.rent.count({
      where: { renterId: parseInt(renterId, 10) },
    });

    res.json({
      rents,
      totalRents,
      totalPages: Math.ceil(totalRents / limit),
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
};

const getrentsbyownerid = async (req, res) => {
  const { ownerId } = req.params;
  const { limit = 10, page = 1 } = req.query;
  const skip = (page - 1) * limit;

  try {
    const rents = await prisma.rent.findMany({
      where: { ownerId: parseInt(ownerId, 10) },
      skip: parseInt(skip, 10),
      take: parseInt(limit, 10),
    });

    const totalRents = await prisma.rent.count({
      where: { ownerId: parseInt(ownerId, 10) },
    });

    res.json({
      rents,
      totalRents,
      totalPages: Math.ceil(totalRents / limit),
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
};

module.exports = {
  rent,
  removerent,
  getRents,
  getrentbyid,
  getrentsbyrenterid,
  getrentsbyownerid,
};
