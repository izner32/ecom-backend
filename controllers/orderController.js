const Order = require('../models/Order');

// Non-admin users only
module.exports.createOrder = (req, res) => {
    const userId = req.userId;
    const isAdmin = req.isAdmin;

    if (isAdmin) {
        return res.status(403).json({ error: 'Access denied. Non-admin privilege required' });
    }
  
    const { products, totalAmount } = req.body;
  
    const newOrder = new Order({
      userId,
      products,
      totalAmount,
    });
  
    newOrder
    .save()
    .then(() => res.send('Order created successfully'))
    .catch((err) => res.status(500).json({ error: 'Failed to create order' }));
};

// Non-admin users only
module.exports.getUserOrders = (req, res) => {
    const userId = req.userId;
    const isAdmin = req.isAdmin;

    if (isAdmin) {
        return res.status(403).json({ error: 'Access denied. Non-admin privilege required' });
    }
  
    Order.find({ userId })
    .then((orders) => res.json(orders))
    .catch((err) => res.status(500).json({ error: 'Failed to retrieve user orders' }));
};

// Admin users only
module.exports.getAllOrders = (req, res) => {
    const isAdmin = req.isAdmin;
  
    if (!isAdmin) {
        return res.status(403).json({ error: 'Access denied. Admin privilege required' });
    }
  
    Order.find()
    .then((orders) => res.json(orders))
    .catch((err) => res.status(500).json({ error: 'Failed to retrieve orders' }));
};