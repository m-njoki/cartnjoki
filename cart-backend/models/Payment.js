const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  amount: { type: Number, required: true },
  status: {
    type: String,
    enum: ['paid', 'failed', 'pending'],
    default: 'pending'
  },
  paymentMethod: { type: String, default: 'mpesa' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Payment', paymentSchema);