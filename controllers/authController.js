const User = require('../models/User');
const bcrypt = require("bcryptjs");
const passport = require("passport-local");


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

module.exports.loginValidation = (passport) => {
    passport.use(
      new passport.Strategy({ usernameField: "email" }, (email, password, done) => {
        // Check if email exists
        User.findOne({ email: email })
            .then((user) => {
                if (!user) {
                    console.log("Incorrect email");
                    return done();
                }
                // Check if password is correct
                bcrypt.compare(password, user.password, (error, isMatch) => {
                    if (error) throw error;
                    if (isMatch) {
                        return done(null, user);
                    } else {
                        console.log("Wrong Password");
                        return done();
                    }
                });
            })
            .catch((error) => console.log(error));
        })
    );
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
        User.findById(id, (error, user) => {
            done(error, user);
        });
    });
};

module.exports.login = (req, res) => {
    const { email, password } = req.body;
    //Required
    if (!email || !password) {
        console.log("Please fill in all the fields");
        res.render("login", {
            email,
            password,
        });
    } else {
        passport.authenticate("local", {
            successRedirect: "/dashboard",
            failureRedirect: "/login",
            failureFlash: true,
        })(req, res);
    }
};

