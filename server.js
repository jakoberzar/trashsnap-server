var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var multer = require('multer');
var util = require('util');
var fs = require('fs');

app.use('/', express.static(__dirname + '/public_html'));
app.get('/', function (req, res) {
  res.sendfile('public_html/index.html');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended:true
}));


var entries=[{
    latitude: 46,
    longitude: 14,
    text: 'yo'
  }, {
    latitude: 46,
    longitude: 14.2,
    text: 'yo'
  }
];

app.post('/api/v1/upload', function(req, res) {
  var entry = { 
    text: req.body.text,  
    latitude: parseFloat(req.body.latitude),
    longitude: parseFloat(req.body.longitude)
  };
  console.log(req.body.photo);
  entries.push(entry);
  res.send('ty');
});

// Some file upload dark sorcery
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads');
    },
    filename: function (req, file, callback) {
        console.log(file.fieldname);
        callback(null, file.originalname);
    }
});

//var upload = multer({ storage: storage }).single('image');
var upload = multer({ storage: storage }).single('image');

app.post('/api/v1/upload/photo', function(req, res) {
  upload(req, res, function (err) {
      console.log(req.file);
      if (err) {
          console.log("Photo API ERROR: "+err);
          return res.end("Error uploading file.");
      }
      console.log("SUCCESS");
      res.end("File is uploaded");
  });
});

app.get('/api/v1/entries', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(entries));
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});