require("dotenv").config();
require("express-async-errors");
const express = require("express");
const { logger, logEvents } = require("./middlewares/logger");
const errorHandler = require("./middlewares/errorHandler");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const checkDatabaseConnection = require("./config/dbCon");

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static("files"));
app.use(cookieParser());

app.use("/auth", require("./routes/auth"));
app.use("/book", require("./routes/book"));
app.use("/user", require("./routes/user"));
app.use("/rent", require("./routes/rent"));
app.use("/revenue", require("./routes/revenue"));

app.all("*", (req, res) => {
  res.status(404).json({ message: "Not Found" });
});

app.use(errorHandler);

checkDatabaseConnection()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error(
      "Failed to start the server due to database connection issues:",
      error
    );
    logEvents(`${JSON.stringify(error)}`, "databaseConnection.log");
  });
