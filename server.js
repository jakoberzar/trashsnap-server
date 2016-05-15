var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var multer = require('multer');
var monk = require('monk');
var db = monk('localhost:27017/baza1');

var entries=[{
    latitude: 46,
    longitude: 14,
    text: 'yo1',
    imglink: '/uploads/bosti.jpg'
    
  }, {
    latitude: 46,
    longitude: 14.2,
    text: 'yo2',
    imglink: '/uploads/klasika.jpg'
  }
];


/*

function dodajGaNot(vnos, callback) {
  entries.push(entry);
  MongoClient.connect("mongodb://localhost:27017/baza1", function(err, db) {
    if(!err) {
      console.log("We are connected");
      db.createCollection('entries', function(err, collection) {
        if (err) {console.error(err) }
        else {
          entries = collection;
          collection.insert(vnos);
        }
        callback(true);
      });
    } else { callback(false) }
    
  });
}*/

// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});


app.use('/', express.static(__dirname + '/public_html'));
app.get('/', function (req, res) {
  res.sendfile('public_html/index.html');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended:true
}));


// Upload brez slike
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
  var db = req.db;
  var collection = db.get('entries');
  collection.insert(entry);
  res.end("gg uploaded lol that was ez!")
});


app.get('/api/v1/entries', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  var db = req.db;
  var collection = db.get('entries');
  collection.find({},{},function(e,docs){
     res.send(JSON.stringify(docs));   
  });
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});
