const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

const register = async (req, res) => {
  const { email, password, phoneNumber, location, role } = req.body;
  console.log(req.body);
  console.log(req.fileUrls);

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        avatar: req.fileUrls,
        password: hashedPassword,
        phoneNumber,
        location,
        role,
      },
    });

    const accessToken = jwt.sign(
      { userId: user.id, role: user.role },
      accessTokenSecret,
      { expiresIn: "15m" }
    );
    const refreshToken = jwt.sign(
      { userId: user.id, role: user.role },
      refreshTokenSecret,
      { expiresIn: "7d" }
    );

    res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true });

    res.json({ accessToken, user });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", message: JSON.stringify(error) });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const accessToken = jwt.sign(
      { userId: user.id, role: user.role },
      accessTokenSecret,
      { expiresIn: "15m" }
    );
    const refreshToken = jwt.sign(
      { userId: user.id, role: user.role },
      refreshTokenSecret,
      { expiresIn: "7d" }
    );

    res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true });

    res.json({ accessToken, message: "Login successfull" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", message: JSON.stringify(error) });
  }
};

const refresh = (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const user = jwt.verify(refreshToken, refreshTokenSecret);

    const accessToken = jwt.sign(
      { userId: user.userId, role: user.role },
      accessTokenSecret,
      { expiresIn: "15m" }
    );

    res.json({ accessToken });
  } catch (error) {
    res.status(403).json({ error: "Forbidden" });
  }
};

const logout = (req, res) => {
  res.clearCookie("refreshToken");
  res.json({ message: "Logged out successfully" });
};

module.exports = {
  register,
  login,
  refresh,
  logout,
};
