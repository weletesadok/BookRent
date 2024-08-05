const express = require("express");
const {
  rent,
  removerent,
  getRents,
  getrentbyid,
  getrentsbyrenterid,
  getrentsbyownerid,
} = require("../controllers/rent");

const router = express.Router();

router.post("/", rent);
router.delete("/:id", removerent);
router.get("/", getRents);
router.get("/:id", getrentbyid);
router.get("/renter/:renterId", getrentsbyrenterid);
router.get("/owner/:ownerId", getrentsbyownerid);

module.exports = router;
