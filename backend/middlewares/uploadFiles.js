const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "files");
  },
  filename: (req, file, cb) => {
    const fileName = uuidv4() + "_" + file.originalname;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

const uploadFiles = (req, res, next) => {
  upload.array("files", 10)(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: "File upload error" });
    } else if (err) {
      return res.status(500).json({ message: JSON.stringify(err) });
    }
    req.fileUrls = [];
    if (req.files) {
      req.fileUrls = req.files?.map((file) => file.path);
    }
    next();
  });
};
module.exports = { uploadFiles };
