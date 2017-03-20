// WEB SERVER STUFF
var express = require('express');
var fs = require('fs');
var app = express();
var server = app.listen(8000, function(){
  console.log('listening on port 8000');
})

app.use(express.static("public"));

app.get('/placedata', sendData);

function sendData(req, res){
  var latlng_data = JSON.parse(fs.readFileSync("dataParser/output.json"));
  res.send(latlng_data);
}
