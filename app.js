var express = require('express');
var request = require('sync-request');
var app = express();

var markerData = require('./markerData.js');
var kd_url = "https://api.instagram.com/v1/tags/kingdomdreamusa/media/recent?access_token=193865020.f6dc531.95be1d76f20e401988645ed150014dd0";

//define my static folder
app.use('/static', express.static(__dirname + "/public",{maxAge:86400000}));

app.get('/', function(req, res) {
	res.sendfile(__dirname+"/views/index.html");
});

app.get('/markers', function(req, res) {
	//data = JSON.stringify(markerData.getMarkers());
  data = loadPin();
  //console.log(data);
  
  res.send(data);
});

function loadPin()
{
  var res = request('GET', kd_url);
  var obj = JSON.parse(res.getBody());
  var pin = "[";
  for(var i = 0; i < obj.data.length; i++) {
    if (obj.data[i].location != null) {
      lat = obj.data[i].location.latitude;
      lon = obj.data[i].location.longitude;
      
      pin += "{";
      pin += "\"id\":" + i + ',';
      pin += "\"name\":" + "\"a\"" + ',';
      pin += "\"position\":" + "{";
      pin += "\"lat\":" + lat + ',';
      pin += "\"long\":" + lon + '}';
      pin += "}";

      if ( i < obj.data.length -2) {
        pin += ',';
      }
    }
  }
  
  pin += "]";
  return pin;
}

app.listen(3000);
console.log("Listening to port 3000");
