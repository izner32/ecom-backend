const jwt = require('jsonwebtoken');

module.exports.authenticate = (req, res, next) => {
    const token = req.header('Authorization');
  
    // Check if token exists - would only exist if user is logged in
    if (!token) {
        return res.send("Access denied. Token not provided");
    }
  
    try {
        // Verify and decode the token
        const decoded = jwt.verify(token, 'your-secret-key');
        req.userId = decoded.userId; // Attach user ID to the request object
        next();
    } catch (err) {
        res.send("Invalid token");
    }
};