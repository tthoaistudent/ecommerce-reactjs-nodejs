const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.login = async (req, res) => {
  try {
    const { phone, password } = req.body;
    const user = await User.findCrential(phone, password);
    const token = await user.getAuthToken();
    res.status(200).send({ token, user });
  } catch (e) {
    res.status(500).send(e.message);
  }
};

exports.getCurrentUser = async (req, res) => {
  try {
    const token = req.header("Authorization").split(" ")[1];
    if (!token) {
      throw Error("UnAuthentization!");
    }
    const decode = await jwt.verify(token, process.env.JWT_KEY);
    const user = await User.findById(decode.id);
    if (!user) {
      res.status(401).send("UnAuthentization!");
      return;
    }

    res.status(200).send(user);
  } catch (e) {
    res.status(500).send(e.message);
  }
};
