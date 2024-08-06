const jwt = require("jsonwebtoken");
const prisma = new PrismaClient();

const roleChecker = (allowedRoles) => {
  return async (req, res, next) => {
    try {
      const token = req.cookies.token;
      if (!token) return res.status(401).json({ error: "Unauthorized" });

      const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
      const userId = decoded.id;

      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (!user) return res.status(404).json({ error: "User not found" });

      if (!allowedRoles.includes(user.role)) {
        return res.status(403).json({ error: "Forbidden" });
      }

      req.user = user;
      next();
    } catch (error) {
      res.status(403).json({ error: "Forbidden", message: error.message });
    }
  };
};

module.exports = roleChecker;
