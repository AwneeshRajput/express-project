const axios = require("axios");
const BASE_API_URL = "https://open.er-api.com/v6/latest";

const getAvailableCurrencies = async (req,res) =>{
    try {
        const response = await axios.get(BASE_API_URL);
        const currencies = Object.keys(response.data.rates);
        res.status(200).json({ data: currencies });
      } catch (error) {
        res.status(500).json({ message: "The service is currently down, please check again later" });
      }
    };

const convertCurrency = async (req,res) =>{
    const { value, currency, to_currency } = req.query;

  // Validate query parameters
  if (!value || isNaN(value) || value < 0 || !currency || !to_currency || currency.length !== 3 || to_currency.length !== 3) {
    return res.status(400).json({ message: "Incomplete or Incorrect data passed" });
  }

  try {
    // Fetch rates based on the provided currency
    const response = await axios.get(`${BASE_API_URL}/${currency.toUpperCase()}`);
    const rates = response.data.rates;

    // Check if the target currency exists
    if (!rates[to_currency.toUpperCase()]) {
      return res.status(404).json({ message: "Cannot find given currency code" });
    }

    // Calculate the conversion
    const result = value * rates[to_currency.toUpperCase()];
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ message: "The service is currently down, please check again later" });
  }
}

module.exports = { getAvailableCurrencies, convertCurrency };
