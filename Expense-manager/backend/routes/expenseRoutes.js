const router = require("express").Router();
const Expense = require("../models/Expense");

router.get("/", async (req, res) => {
  res.json([]);
});

module.exports = router;