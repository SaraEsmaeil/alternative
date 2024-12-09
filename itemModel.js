const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  category: { type: String },
  status: { type: String, enum: ['available', 'borrowed'], default: 'available' },
  condition: { type: String },
  building: { type: String }, // Updated field
});

module.exports = mongoose.model('Item', itemSchema);
