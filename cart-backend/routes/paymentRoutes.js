const Payment = require('../models/Payment');
const PaymentRouter = require('express').Router();
const Order = require('../models/Order');

PaymentRouter.post('/', async (req, res) => {
  try {
    const { orderId, amount } = req.body;
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ error: 'Order not found' });

    if (order.totalAmount !== amount) {
      return res.status(400).json({ error: 'Incorrect payment amount' });
    }

    const payment = new Payment({ orderId, amount, status: 'paid' });
    await payment.save();
    order.status = 'processing';
    await order.save();
    res.status(201).json(payment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

PaymentRouter.get('/', async (req, res) => {
  const payments = await Payment.find().populate('orderId');
  res.json(payments);
});

module.exports = PaymentRouter;
