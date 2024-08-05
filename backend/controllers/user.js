const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const approve = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await prisma.user.update({
      where: { id: parseInt(userId) },
      data: { approved: true },
    });
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: JSON.stringify(error) });
  }
};

const activate = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await prisma.user.update({
      where: { id: parseInt(userId) },
      data: { active: true },
    });
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: JSON.stringify(error) });
  }
};

const deactivate = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await prisma.user.update({
      where: { id: parseInt(userId) },
      data: { active: false },
    });
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: JSON.stringify(error) });
  }
};

const users = async (req, res) => {
  const { search, limit = 10, page = 1 } = req.query;
  const skip = (page - 1) * limit;

  try {
    const where = search
      ? {
          OR: [
            { email: { contains: search, mode: "insensitive" } },
            { phoneNumber: { contains: search, mode: "insensitive" } },
            { location: { contains: search, mode: "insensitive" } },
          ],
        }
      : {};

    const allUsers = await prisma.user.findMany({
      where,
      take: parseInt(limit),
      skip: parseInt(skip),
    });

    const totalUsers = await prisma.user.count({ where });

    res.status(200).json({
      users: allUsers,
      totalUsers,
      totalPages: Math.ceil(totalUsers / limit),
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: JSON.stringify(error) });
  }
};

const deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    await prisma.user.delete({ where: { id: parseInt(userId) } });
    res.status(204).send();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: JSON.stringify(error) });
  }
};

const editUser = async (req, res) => {
  const { userId } = req.params;
  const { email, phoneNumber, location, role, approved, active } = req.body;

  try {
    const data = { email, phoneNumber, location, role, approved, active };

    const user = await prisma.user.update({
      where: { id: parseInt(userId) },
      data,
    });
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: JSON.stringify(error) });
  }
};

module.exports = {
  approve,
  activate,
  deactivate,
  users,
  deleteUser,
  editUser,
};
