const Product = require('../models/Product');

// Admin users only
module.exports.createProduct = (req, res) => {
    const userId = req.userId; 

    User.findById(userId)
    .then((user) => {
        if (user && user.isAdmin) {    
            const { name, price, description } = req.body;
    
            const newProduct = new Product({
                name,
                price,
                description,
            });
  
            newProduct
            .save()
            .then((product) => res.json({ success: true, product }))
            .catch((err) => res.status(500).json({ error: 'Failed to create product' }));
        } else {
            res.status(403).json({ error: 'Unauthorized. Only admins can create products.' });
        }
      })
    .catch((err) => {
        // Error occurred while querying the user
        res.status(500).json({ error: 'Failed to query user' });
    });
};

// Every users
module.exports.getAllProducts = (req, res) => {
    Product.find()
    .then((products) => res.json({ success: true, products }))
    .catch((err) => res.status(500).json({ error: 'Failed to retrieve products' }));
};

// Every users
module.exports.getAllActiveProducts = (req, res) => {
    Product.find({ isActive: true })
    .then((products) => res.json({ success: true, products }))
    .catch((err) => res.status(500).json({ error: 'Failed to retrieve active products' }));
};

// Every users
module.exports.getSingleProduct = (req, res) => {
  const productId = req.params.productId;

  // Find the product by its ID
    Product.findById(productId)
    .then((product) => {
        if (!product) {
            return res.status(404).json({ success: false, error: 'Product not found' });
        }
        res.json({ success: true, product });
    })
    .catch((err) => res.status(500).json({ error: 'Failed to retrieve product' }));
};

// Admin users only
module.exports.updateProduct = (req, res) => {
    const userId = req.userId; 
    
    User.findById(userId)
    .then((user) => {
        if (user && user.isAdmin) { 
            const productId = req.params.productId;
            const { name, price, description } = req.body;

            Product.findByIdAndUpdate(
                productId,
                { name, price, description },
                { new: true }
            )
            .then((product) => {
                if (!product) {
                    return res.status(404).json({ success: false, error: 'Product not found' });
                }
                res.json({ success: true, product });
                })
            .catch((err) => res.status(500).json({ error: 'Failed to update product' }));
        } else {
            res.status(403).json({ error: 'Unauthorized. Only admins can create products.' });
        }
    })
    .catch((err) => {
        // Error occurred while querying the user
        res.status(500).json({ error: 'Failed to query user' });
    });
};

// Admin users only
module.exports.archiveProduct = (req, res) => {
    const userId = req.userId; 
    
    User.findById(userId)
    .then((user) => {
        if (user && user.isAdmin) { 
            const productId = req.params.productId;
        
            Product.findByIdAndUpdate(productId, { isActive: false }, { new: true })
            .then((product) => {
                if (!product) {
                    return res.status(404).json({ success: false, error: 'Product not found' });
                }
                res.json({ success: true, product });
            })
            .catch((err) => res.status(500).json({ error: 'Failed to archive product' }));
        } else {
            res.status(403).json({ error: 'Unauthorized. Only admins can create products.' });
        }
    })
    .catch((err) => {
        // Error occurred while querying the user
        res.status(500).json({ error: 'Failed to query user' });
    });
};