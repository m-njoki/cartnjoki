const Order = require('../models/Order');
const routerOrder = require('express').Router();
const Product = require('../models/Product');


routerOrder.post('/', async (req, res) => {
  try {
    const { products, address, pickupStation, deliveryFee = 0 } = req.body;

    if (!products || !address || !pickupStation) {
      return res.status(400).json({ error: 'Products, address and pickup station are required.' });
    }

    let totalAmount = 0;

    for (const item of products) {
      const product = await Product.findById(item.productId);
      if (!product || product.inStock < item.quantity) {
        return res.status(400).json({ error: 'Invalid product or insufficient stock' });
      }
      totalAmount += product.price * item.quantity;
    }

    // Add the delivery fee to the total
    totalAmount += deliveryFee;

    // Update stock
    for (const item of products) {
      await Product.findByIdAndUpdate(item.productId, {
        $inc: { inStock: -item.quantity }
      });
    }

    const order = new Order({
      products,
      address,
      pickupStation,
      totalAmount
    });

    await order.save();
    res.status(201).json(order);

  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Server error' });
  }
});




routerOrder.get('/', async (req, res) => {
  const orders = await Order.find().populate('products.productId');
  res.json(orders);
});

//GET by ID
routerOrder.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('products.productId');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
    }
});

module.exports = routerOrder;
