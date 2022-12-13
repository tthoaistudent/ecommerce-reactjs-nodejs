const jwt = require("jsonwebtoken");
const User = require("../models/user");

const admin = async (req, res, next) => {
  try {
    const token = req.header("Authorization").split(" ")[1];
    const decode = jwt.verify(token, process.env.JWT_KEY);
    const user = await User.findOne({ _id: decode.id });
    if (!user) {
      throw new Error("UnAuthenrization!");
    }

    delete user.password;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ message: "Permision Denied!" });
  }
};

module.exports = admin;
