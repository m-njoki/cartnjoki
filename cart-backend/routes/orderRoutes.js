const Order = require('../models/Order');
const routerOrder = require('express').Router();
const Product = require('../models/Product');

/*}
routerOrder.post('/', async (req, res) => {
  try {
    const { products } = req.body;
    let total = 0;
    for (let item of products) {
      const prod = await Product.findById(item.productId);
      if (!prod || prod.inStock < item.quantity) {
        return res.status(400).json({ error: 'Invalid product or insufficient stock' });
      }
      total += prod.price * item.quantity;
    }

    for (let item of products) {
      await Product.findByIdAndUpdate(item.productId, { $inc: { inStock: -item.quantity } });
    }

    const order = new Order({ products, totalAmount: total });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});*/

routerOrder.post('/', async (req, res) => {
  try {
    const { products, address, pickupStation } = req.body;

    // Validate required fields
    if (!products || !address || !pickupStation) {
      return res.status(400).json({ error: 'Products, address and pickup station are required.' });
    }

    // Calculate totalAmount
    let totalAmount = 0;

    for (const item of products) {
      const product = await Product.findById(item.productId);
      if (!product || product.inStock < item.quantity) {
        return res.status(400).json({ error: 'Invalid product or insufficient stock' });
    }
      totalAmount += product.price * item.quantity;
    }

    // Update product stock
    for (const item of products) {
        await Product.findByIdAndUpdate(item.productId, {
            $inc: { inStock: -item.quantity }
        });
    }


    // Create new order
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
