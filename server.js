var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

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
  },{
    latitude: 46,
    longitude: 14.2,
    text: 'yo'
  }

];

app.post('/api/v1/upload', function(req, res) {
  var entry = req.body;
  entries.push(entry);
});

app.get('/api/v1/entries', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(entries));
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});