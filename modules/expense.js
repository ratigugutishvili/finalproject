const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
  createdAt: { type: String, required: false},
  type: { type: String, required: true },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  userId: { type: String, required: true },
  // Add more fields as per your product requirements
});

module.exports = mongoose.model('expense', ExpenseSchema);