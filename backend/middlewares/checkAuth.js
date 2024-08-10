const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const { AbilityBuilder, Ability } = require("@casl/ability");

const prisma = new PrismaClient();

const defineAbilitiesFor = (role) => {
  const { can, cannot, build } = new AbilityBuilder(Ability);

  switch (role) {
    case "ADMIN":
      can("manage", "all");
      break;
    case "OWNER":
      can("read", "all");
      can("create", "Book");
      can("update", "Book");
      can("delete", "Book");
      can("approve", "Book");
      can("manage", "Revenue");
      can("generate", "EarningSummary");
      break;
    case "RENTER":
      can("read", "Book");
      can("create", "Rent");
      can("delete", "Rent");
      can("read", "Rent");
      break;
    default:
      can("read", "Book");
      cannot("manage", "all");
      break;
  }

  return build();
};

const roleChecker = (action, subject) => {
  return async (req, res, next) => {
    try {
      const token = req.cookies.refreshToken;
      if (!token) return res.status(401).json({ error: "Unauthorized" });
      
      const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
      const userId = decoded.userId;

      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (!user) return res.status(404).json({ error: "User not found" });

      const abilities = defineAbilitiesFor(user.role);
      if (!abilities.can(action, subject)) {
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
