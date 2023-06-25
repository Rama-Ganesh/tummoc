const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const City = require("../models/city.model");

const register = async (req, res) => {
  try {
    const city = await City.findOne({
      city: req.body.city,
    });

    if (!city) {
      return res.status(400).send("City not found");
    }

    const hash = bcrypt.hashSync(req.body.password, 5);
    const newUser = new User({
      ...req.body,
      city: city,
      password: hash,
    });
    newUser.city = city;

    await newUser.save();
    res.status(200).send("User has been created");
  } catch (error) {
    res.status(500).send(error);
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username }).populate(
      "city"
    );
    if (!user) return res.status(404).send("User not found.");

    const isCorrect = bcrypt.compareSync(req.body.password, user.password);
    if (!isCorrect) return res.status(400).send("Wrong password or username.");

    const { password, ...info } = user._doc;
    res.status(200).send(info);
  } catch (error) {
    res.status(500).send(error);
  }
};

const logout = async (req, res) => {
  res.send("It works");
};

module.exports = { login, register, logout };
