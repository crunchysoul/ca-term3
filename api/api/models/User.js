const mongoose = require("./init");

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  // unique is not for validation, for performance
  email: {
    type: String,
    required: true,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
  password: {type: String, required: true},
});

const User = mongoose.model("User", userSchema);

module.exports = User;
