const User = require('../models/User');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

module.exports.register = (req, res) => {
    const { username, email, password, isAdmin } = req.body;

    if (!username || !email || !password) {
        return res.send("Fill all empty fields");
    } else {
        User.findOne({ email: email })
        .then((user) => {
            // Check if email exists already
            if (user) {
                return res.send("Email already exists");
            // Create new user
            } else {
                const newUser = new User({
                    username,
                    email,
                    password,
                    isAdmin,
                });
                // Hash password
                bcrypt.genSalt(10, (err, salt) =>
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then((result) => res.send(result))
                        .catch((err) => console.log(err));
                    })
                );
            }
        });
    }
};

module.exports.login = (req, res) => {
    const { email, password } = req.body;
  
    User.findOne({ email })
        .then((user) => {
            // Check if email exists
            if (!user) {
                return res.send("Email not found");
            }
    
            // Check if password is correct
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                    throw err;
                }
                if (isMatch) {
                    // Create and sign a JWT
                    const token = jwt.sign({ userId: user._id }, 'your-secret-key', {
                    expiresIn: '1h' // Token expiration time
                    });
        
                    res.json({ token });
                } else {
                    res.send("Invalid password");
                }
            });
        })
        .catch((err) => console.log(err));
};

module.exports.authenticate= (req, res, next) => {
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



