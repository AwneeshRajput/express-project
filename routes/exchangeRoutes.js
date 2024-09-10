const express = require("express");
const { getAvailableCurrencies, convertCurrency } = require("../controllers/exchange.controller");

const router = express.Router();

router.get('/currencies', getAvailableCurrencies);
router.get("/convert", convertCurrency);

module.exports = router;
