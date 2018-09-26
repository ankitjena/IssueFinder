const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const passport = require('../passport');
const mcache = require('memory-cache');
const jwt = require('jsonwebtoken');

router.post('/signup', (req, res) => {
    console.log('user signup');

    const { username, password } = req.body
    // ADD VALIDATION
    User.findOne({ username: username }, (err, user) => {
        if (err) {
            console.log('User.js post error: ', err)
        } else if (user) {
            res.json({
                error: `Sorry, already a user with the username: ${username}`
            })
        }
        else {
            const newUser = new User({
                username: username,
                password: password
            })
            newUser.save((err, savedUser) => {
                if (err) return res.json(err)
                return res.json(savedUser)
            })
        }
    })
})

router.post(
    '/login',
    function (req, res, next) {
        console.log('routes/user.js, login, req.body: ');
        console.log(req.body)
        next()
    },
    passport.authenticate('local', {session: false}),
    (req, res) => {
        const token = jwt.sign({username: req.user.username}, "eita_jwt_secret");
        console.log('logged in', req.user);
        var userInfo = {
            username: req.user.username
        };
        console.log(token)
        return res.json({username: req.user.username, token})
    }

)

router.get('/:token', (req, res, next) => {
    console.log('===== user!!======')
    console.log(req.params.token);
    jwt.verify(req.params.token, 'eita_jwt_secret', function(err, decoded) {
      if(err) {
        console.log("not verified")
        return res.status(200).send(err);
      }
      else {
      console.log(decoded)
      return res.status(200).send(decoded);
    }
    })
})

router.post('/logout', (req, res) => {
    if (req.user) {
        req.logout()
        res.send({ msg: 'logging out' })
    } else {
        res.send({ msg: 'no user to log out' })
    }
})


module.exports = router
