const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['expense', 'income'], // 只能是 "expense" 或 "income"
    required: true
  },
  category: {
    type: String,
    enum: ['food', 'transport', 'entertainment', 'other'], // 可根據需求擴展
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0.01 // 確保金額不能為 0
  },
  date: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    trim: true
  }
}, { timestamps: true }); // 自動添加 createdAt 和 updatedAt

const Record = mongoose.model('Record', recordSchema);

module.exports = Record;
