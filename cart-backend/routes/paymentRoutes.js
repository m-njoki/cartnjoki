const Payment = require('../models/Payment');
const PaymentRouter = require('express').Router();
const Order = require('../models/Order');

PaymentRouter.post('/', async (req, res) => {
  try {
    console.log('Incoming Payment Body:', req.body);
    const { orderId, amount, paymentMethod } = req.body;

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ error: 'Order not found' });

    if (order.totalAmount !== amount) {
      return res.status(400).json({ error: 'Incorrect payment amount' });
    }

    // Set status based on cash or cash_on_delivery
    const status = (paymentMethod === 'cash' || paymentMethod === 'cash_on_delivery') ? 'pending' : 'paid';

    const payment = new Payment({
      orderId,
      amount,
      paymentMethod,
      status,
    });

    await payment.save();

    // Update order status conditionally
    order.status = status === 'paid' ? 'processing' : 'pending';
    await order.save();

    res.status(201).json(payment);
  } catch (err) {
    console.error('Error saving payment:', err);
    res.status(400).json({ error: err.message });
  }
});

module.exports = PaymentRouter;
