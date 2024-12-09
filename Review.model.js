const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  reviewerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  revieweeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
  rating: { type: Number, required: true },
  comment: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Review', reviewSchema);
