var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var multer = require('multer');
/*var util = require('util');
var fs = require('fs');*/

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
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, req.body.id + ".jpg")
  }
})
var upload = multer({ storage: storage })
app.post('/api/v1/upload/photo', upload.single('image'), function(req, res, next) {
  console.log("Can you say gg! " + req.body.id);
  var entry = { 
    text: req.body.text,  
    latitude: parseFloat(req.body.latitude),
    longitude: parseFloat(req.body.longitude)
  };
  entries.push(entry);
  res.end("gg uploaded lol that was ez!")
});


app.get('/api/v1/entries', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(entries));
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});