const express = require('express');
const Payment = require('../models/Payment');
const Order = require('../models/Order');

const PaymentRouter = express.Router();

PaymentRouter.post('/', async (req, res) => {
  try {
    console.log('Incoming Payment Body:', req.body);

    const { orderId, amount, paymentMethod } = req.body;

    // Validate required fields
    if (!orderId || !amount || !paymentMethod) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ error: 'Order not found' });

    // Ensure amount matches
    if (order.totalAmount !== amount) {
      return res.status(400).json({ error: 'Incorrect payment amount' });
    }

    // Determine payment status
    let status;
    if (paymentMethod === 'cash' || paymentMethod === 'cash_on_delivery') {
      status = 'pending'; // To be confirmed by admin/delivery
    } else if (paymentMethod === 'mpesa') {
      status = 'paid'; // Assume payment success for now (can integrate STK push callback later)
    } else {
      return res.status(400).json({ error: 'Invalid payment method' });
    }

    // Create payment
    const payment = new Payment({
      orderId,
      amount,
      paymentMethod,
      status,
    });
    await payment.save();

    // Update order status accordingly
    order.status = status === 'paid' ? 'processing' : 'pending';
    await order.save();

    return res.status(201).json({ message: 'Payment successful', payment });
  } catch (err) {
    console.error('Error saving payment:', err);
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
});

module.exports = PaymentRouter;
