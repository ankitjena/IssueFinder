const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const passport = require('../passport');
const mcache = require('memory-cache');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const mongoURL = "mongodb://127.0.0.1:27017/problem"
const crypto = require('crypto');
const path = require('path');
const userModel = require('../models/user')

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

router.post('/signup', upload.single('file'), (req, res) => {
    console.log('user signup');

    let model = new userModel(req.body);
    model.filename = file_name;
    model.save()
    .then((team) => {
      res.send(team)
    })
    .catch(err => {
      res.send(err)
    })

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


//get all users
router.get('/', function(req, res, next) {
  userModel.find({}, function(err, data){
    if(err){
      console.log(err);
    }
    else{
      res.send(data);;
    }
  })
})

//filename of image
router.get('/image/:filename', function(req, res, next)  {
  gfs.files.findOne({ filename: req.params.filename }, function(err, file)  {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }

    // Check if image
    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
      // Read output to browser
      const readstream = gfs.createReadStream(file.filename);
      return readstream.pipe(res);

    } else {
      res.status(404).json({
        err: 'Not an image'
      });
    }
  });
});

router.post('/logout', (req, res) => {
    if (req.user) {
        req.logout()
        res.send({ msg: 'logging out' })
    } else {
        res.send({ msg: 'no user to log out' })
    }
})


module.exports = router
