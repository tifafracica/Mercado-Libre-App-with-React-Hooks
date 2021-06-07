const express = require('express');
const { getAllItems, getItem } = require('../controller/apiController');

const router = express.Router();

router.get("/items", getAllItems);
router.get("/items/:id", getItem);

module.exports = router;