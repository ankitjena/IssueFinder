const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Busboy = require('busboy');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const mongoURL = "mongodb://127.0.0.1:27017/problem"
const problemModel = require('../models/problems');
const crypto = require('crypto');
const path = require('path');

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

const upload = multer({ storage: storage });

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', upload.single('file'), (req, res) => {
    console.log(req.body);
    console.log(req.file.filename);
    let model = new problemModel(req.body);
    model.filename = file_name;
    console.log(model);
    model.save()
    .then((team) => {
      res.send(team)
    })
    .catch(err => {
      res.send(err)
    })
});
module.exports = router;
