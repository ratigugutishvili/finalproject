const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
  // Add more fields as per your product requirements
});

module.exports = mongoose.model('User', UserSchema);