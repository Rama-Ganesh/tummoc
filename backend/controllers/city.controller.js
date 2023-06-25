const City = require("../models/city.model");

const createCity = async (req, res) => {
  try {
    const newCity = new City(req.body);
    await newCity.save();
    res.status(200).send("City has been created.");
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { createCity };
