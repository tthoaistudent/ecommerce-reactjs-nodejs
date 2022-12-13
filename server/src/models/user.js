const mongoose = require("mongoose");
const { Schema } = mongoose;

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    permission: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;

  return userObject;
};

userSchema.methods.getAuthToken = async function () {
  const user = this;
  const jwtKey = process.env.JWT_KEY;
  const token = await jwt.sign({ id: user.id }, jwtKey);
  return token;
};

userSchema.statics.findCrential = async function (phone, password) {
  const user = await User.findOne({ phone });
  if (!user) {
    throw Error("Phone not registed!!");
  }

  const isComparePassword = await bcrypt.compare(password, user.password);
  if (!isComparePassword) {
    throw Error("Password incorrect!!");
  }

  return user;
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const user = this;
  const passwordHash = await bcrypt.hash(user.password, 10);
  user.password = passwordHash;
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
