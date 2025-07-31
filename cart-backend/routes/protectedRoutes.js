const express = require('express');
const router = express.Router();
const { requireAuth, requireAdmin } = require('../middleware/authMiddleware');

// Route for any logged-in user
router.get('/user-dashboard', requireAuth, (req, res) => {
  res.json({ message: `Welcome ${req.user.name}`, user: req.user });
});

// Route for admins only
router.get('/admin-dashboard', requireAuth, requireAdmin, (req, res) => {
  res.json({ message: `Admin Panel: Hello ${req.user.name}`, user: req.user });
});

module.exports = router;
