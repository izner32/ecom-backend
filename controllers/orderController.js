const Order = require('../models/Order');

// Non-admin users only
module.exports.createOrder = (req, res) => {
    const userId = req.userId; 
    
    User.findById(userId)
    .then((user) => {
        if (user && !user.isAdmin) { 
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
        } else {
            res.status(403).json({ error: 'Unauthorized. Only non-admins can create products.' });
        }
    })
    .catch((err) => {
        // Error occurred while querying the user
        res.status(500).json({ error: 'Failed to query user' });
    });
};

// Non-admin users only
module.exports.getUserOrders = (req, res) => {
    const userId = req.userId; 
    
    User.findById(userId)
    .then((user) => {
        if (user && !user.isAdmin) { 
            Order.find({ userId })
            .then((orders) => res.json(orders))
            .catch((err) => res.status(500).json({ error: 'Failed to retrieve user orders' }));
        } else {
            res.status(403).json({ error: 'Unauthorized. Only non-admins can create products.' });
        }
    })
    .catch((err) => {
        // Error occurred while querying the user
        res.status(500).json({ error: 'Failed to query user' });
    });
};

// Admin users only
module.exports.getAllOrders = (req, res) => {
    const userId = req.userId; 
    
    User.findById(userId)
    .then((user) => {
        if (user && user.isAdmin) { 
            Order.find()
            .then((orders) => res.json(orders))
            .catch((err) => res.status(500).json({ error: 'Failed to retrieve orders' }));
        } else {
            res.status(403).json({ error: 'Unauthorized. Only admins can create products.' });
        }
    })
    .catch((err) => {
        // Error occurred while querying the user
        res.status(500).json({ error: 'Failed to query user' });
    });
};