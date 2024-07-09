const express = require('express');
const router = express.Router();
// Register a new user
router.get("/", (req, res) => res.send("Hello World!"));

module.exports = router;
