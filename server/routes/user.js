const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const passport = require('../passport');
const mcache = require('memory-cache');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const crypto = require('crypto');
const path = require('path');
const mongoURL = "mongodb://127.0.0.1:27017/problem"


//gridfs
const conn = mongoose.createConnection(mongoURL);
let gfs;
let file_name;
conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('files');
});
var storage = new GridFsStorage({
  url: mongoURL,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
          if(err) {
            return reject(err);
          }
          const filename = buf.toString('hex') + path.extname(file.originalname);
          file_name = filename;
          const fileInfo = {
            filename: filename,
            bucketName: 'files'
          };
          resolve(fileInfo);
      });
    });
  }
});

const upload =  multer({ storage: storage });



router.post('/signup', upload.single('file'),(req, res) => {
    console.log('user signup');
    console.log(req.body);

    const { username, password, bio } = req.body
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
                password: password,
                bio: bio,
                filename: file_name
            })
            newUser.save((err, savedUser) => {
                if (err) return res.json(err)
                res.json(savedUser)
            })
        }
    })
})

function setCurrentUser(token, user){
  mcache.put(token, JSON.stringify(user))
};

function delCurrentUser(){
  mcache.put("token", null)
}
router.post(
    '/login',
    function (req, res, next) {
        console.log('routes/user.js, login, req.body: ');
        console.log(req.body)
        next()
    },
    passport.authenticate('local'),
    (req, res) => {
        setCurrentUser("token", req.user)
        console.log(mcache.get("token"))
        console.log('logged in', req.user);
        var userInfo = {
            username: req.user.username
        };
        res.send(userInfo);
    }

)

router.get('/', (req, res, next) => {
    console.log('===== user!!======')
    console.log(req.user)
    userActive = mcache.get("token");
    console.log(userActive);
    if (userActive) {
        res.send(userActive)
    } else {
        res.send(null)
    }
})

router.post('/logout', (req, res) => {
    delCurrentUser();
    if (req.user) {
        req.logout()
        res.send({ msg: 'logging out' })
    } else {
        res.send({ msg: 'no user to log out' })
    }
})


module.exports = router
