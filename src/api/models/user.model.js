const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { setError } = require("../../utils/error.util"); //ayuda a arreglar los fallos en postman al pedir post

const {
  validationPassword,
  validationEmail,
} = require("../../utils/validator.util");

const userSchema = new mongoose.Schema({
  email: { type: String, trim: true, required: true },
  password: { type: String, trim: true, required: true },
  role: { type: String, trim: true, default: "user", required: true },
});

userSchema.pre("save", function (next) {
  if (!validationPassword(this.password)) {
    return next(setError("404", "The password does not meet the requirements"));
  }
  if (!validationEmail(this.email)) {
    return next(setError("404", "The email is not correct"));
  }

  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
