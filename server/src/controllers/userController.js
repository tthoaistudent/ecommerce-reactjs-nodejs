const bcrypt = require("bcrypt");

const User = require("../models/user");

exports.getAllUser = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

exports.getOneUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).send("User not found!");
    }

    res.status(200).send(user);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

exports.createUser = async (req, res) => {
  try {
    const data = req.body;
    const user = await User.findOne({ phone: data.phone });
    if (user) {
      res.status(409).send("Phone already registed!!");
      return;
    }

    const newUser = new User(data);
    await newUser.save();
    res.status(200).send(newUser);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const data = req.body;
    if (!user) {
      res.status(404).send("User not found!!");
      return;
    }

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    const userUpdate = await User.findByIdAndUpdate(
      { _id: req.params.id },
      data,
      {
        new: true,
      }
    );

    res.status(200).send(userUpdate);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).send("User not found!");
    }
    await user.deleteOne();
    res.status(200).send(user);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

exports.updateAvatar = async (req, res) => {
  try {
    const file = req.file;
    const user = req.user;
    if (!file) {
      res.status(404).send("File not found!");
    }
    const updateUser = await User.findByIdAndUpdate(
      { _id: user._id },
      { avatar: file.filename },
      { new: true }
    );

    res.status(200).send(updateUser);
  } catch (e) {
    res.status(500).send(e.message);
  }
};
