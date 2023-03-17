const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../pgPool');
const passport = require('passport');
const initializePassport = require('../config/passport');
initializePassport(passport);

const { hashPassword } = require('../middleware/authMiddleware')

router.post('/register', async(req, res, next) => {
    let { name, email, password, password2 } = req.body;
    console.log({
        name,
        email,
        password,
        password2
    });

    let errors = [];
    if (!name || !email || !password || !password2) {
        errors.push({message: 'please enter all fields'})
    }
    if (password.length < 6) {
        errors.push({message: 'password should be atleast 6 characters'})
    }
    if (password != password2) {
        errors.push({message: 'passwords do not match'})
    }
    if (errors.length > 0) {
        console.log('render register page now')
        res.send(errors);
    } else {
        let messages = [];
        let hashedPassword = await bcrypt.hash(password, 10);
        let user = db.query(`SELECT * FROM users WHERE email = $1`, [email], (error, results) => {
            if (error) {
                return next(error);
            }
            if (results.rows[0]) {
                console.log('user already exists with that email')
                res.send([{message: 'user already exists with that email'}]);
            } else {
                try {
                    db.query(`INSERT INTO users ( name, email, password ) VALUES ($1, $2, $3)`,
                    [name, email, hashedPassword], (error, results) => {
                        if (error) {
                            return next(error);
                        }                    
                        res.send('you are registered, please login')
                    })
                } catch (err) {
                    console.log(err);
                    return res.status(500).json(err);
                }
            }
        })    
    }
});

router.post('/login', function (req, res, next) {

    passport.authenticate('local', function (err, user, info) {
        if (err) {
            console.log('here')
            return res.status(401).json(err);
        }
        if (!user) { 
            console.log('yo here guy')
            return res.send([info]); 
        }
    
        req.logIn(user, function (err) {
            if (err) { console.log(err); }
            return res.send(user);
        });
    
    })(req, res, next);
});

router.post('/logout', function (req, res, next) {

    req.logout(function(err) {
        if (err) { 
            return next(err); 
        }
        res.send('Logged Out');
      });
    });

module.exports = router;