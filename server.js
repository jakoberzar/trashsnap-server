var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var multer = require('multer');

app.use('/', express.static(__dirname + '/public_html'));
app.get('/', function (req, res) {
  res.sendfile('public_html/index.html');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended:true
}));

var entries=[{
    latitude: 46.365733,
    longitude: 14.308714,
    text: 'Tržič kao',
    imglink: '/uploads/bosti.jpg',
    time: '2016-12-23 22:11:33'
    
  }, {
    latitude: 46,
    longitude: 14.2,
    text: 'yo2',
    imglink: '/uploads/klasika.jpg',
    time: '2016-1-14 22:44:33'
  }
];

// Upload brez slike
app.post('/api/v1/upload', function(req, res) {
  var entry = { 
    text: req.body.text,  
    latitude: parseFloat(req.body.latitude),
    longitude: parseFloat(req.body.longitude)
  };
  
  if (latitude == 0 && longitude == 0) {
    latitude = 46.0500176;
    longitude = 14.469030400000065;
  }
  
  console.log(req.body.photo);
  entries.push(entry);
  res.send('ty');
});

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public_html/uploads/')
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, file.originalname)
  }
})
var upload = multer({ storage: storage })

// Upload s sliko
app.post('/api/v1/upload/photo', upload.single('image'), function(req, res, next) {
  var entry = { 
    text: req.body.text,  
    latitude: parseFloat(req.body.latitude),
    longitude: parseFloat(req.body.longitude),
    imgid: req.body.id,
    imglink: '/uploads/' + req.body.id + ".jpg",
    time: req.body.time
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