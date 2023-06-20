const User = require('../models/User');
const bcrypt = require("bcryptjs");

module.exports.registerController = (req, res) => {
    const { username, email, password, isAdmin } = req.body;

    if (!username || !email || !password) {
        console.log("Fill empty fields");
    }

    User.findOne({ email: email })
    .then((user) => {
        // Check if email exists already
        if (user) {
            console.log("Email Exists");
            res.render("register", {
                username,
                email,
                password,
                isAdmin,
            });
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
};

