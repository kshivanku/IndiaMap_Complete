var map = L.map('map');
$(document).ready(function(){
  createMap();
  $.get( "/placedata", function( data ) {
    // console.log(data);
    mapData(data);
  });
});

function createMap(){
  map.setView([19.6640624, 78.5320107], 4);

  var tile_url = 'https://api.mapbox.com/styles/v1/kshivanku/cj0hh1fnq001l2smnzkqpoa4y/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoia3NoaXZhbmt1IiwiYSI6ImNpejRqcnpjMTA0bXEyeHF3aGdhNGx2MjQifQ.-5YZ6vX9kAU3CbEQlSta5g';
  var options= {
    maxZoom: 18,
    minZoom: 4
  }
  L.tileLayer(tile_url,options).addTo(map);
}

function mapData(data){
  var color;
  for (i = 0 ; i < data.length ; i++) {
    if(data[i].level != "DISTRICT"){
      if(data[i].level == "VILLAGE") {
        color = '#BD0F40'
      }
      else {
        color = '#BD7B0F';
      }
      if(data[i].ne_lat){
        var rect_options = {
          color: color,
          weight: 1
        }
        var bounds = [[data[i].ne_lat, data[i].ne_lng], [data[i].sw_lat, data[i].sw_lng]];
        var rect = L.rectangle(bounds, rect_options).addTo(map);
        rect.bindPopup(data[i].name);
      }
      else {
        var circle_options = {
          color: color,
          fillColor: color,
          fillOpacity: 0.5,
          radius: 500
        }
        var circle = L.circle([data[i].lat, data[i].lng],circle_options).addTo(map);
        circle.bindPopup(data[i].name);
      }
    }
  }
}
