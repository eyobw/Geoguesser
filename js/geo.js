

 

$(document).ready(function(){

	//leaflet variables
	var d;
	var points ;
	var a = 60.204837;
	var b = 24.653622;
	var map = L.map('map').setView([a, b], 13);
	var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
	var cloudmadeUrl='http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png';

	//flickr variables
	var apiKey = '936c8201f7ef5555a78d0b575ee22f4c';
	var url = 'http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + apiKey;
		url += '&user_id=84661314@N07&has_geo=1&extras=geo&format=json&jsoncallback=?';
	
	//variabeles for latitude and longitude
	var lat1, long1;
	var picLat, picLong;	
		
		var count = 0;								

		L.tileLayer(osmUrl, {
			maxZoom: 50
		}).addTo(map);
	var marker = L.marker([0,0]).addTo(map);
	//function that puts pin on the position where the player make his guess
	
	//map.removeLayer(marker);
	map.on('click', function (e) {	
		lat1 = e.latlng.lat;
		long1 = e.latlng.lng;
		marker.setLatLng(e.latlng);
	});


	
	/*function reloadPage()	{
		$('#images').load(document.URL +  '#images');
	}*/

	$(function(){
		var count = 0;								
		var htmlString = "<ul>";
		$.getJSON(url, function(data){
		  if(count <= 10){
			  var ranNum = Math.floor(Math.random()*($(data.photos.photo).size()));
			  console.log("Rand: " + ranNum)
			  //console.log(data)
			  var pic = data.photos.photo[ranNum];
			  console.log(pic)
			  //var img = (pic.media.m);   //.replace("_m.jpg", "_s.jpg");
			  var img = "http://farm" + pic.farm + ".staticflickr.com/" + pic.server + "/" + pic.id + "_" + pic.secret + ".jpg"
			  console.log(img);
			   picLat = pic.latitude;
			   picLong = pic.longitude;
			  var link  = pic.link;
			  var title = pic.title;
				htmlString += '<p><img src="' + img + '" width="500" height="500"/>';
				htmlString += '</li>';
				count++;
				$('#images').append(htmlString);				
				//displayImages(data);
			}else{
			  htmlString += '</ul>'
			  $('#images').html(htmlString);
			}
			document.writeln(htmlString);
			//console.log("wtf: " + htmlString)
		});
	});

   
function deg2rad(deg) {
  return deg * (Math.PI/180)
}
/*$( '.btn btn-primary').click(function() {
	  function getDistanceFromLatLonInKm(lat1,lon1,picLat,picLong) {
	  var R = 6371; // Radius of the earth in km
	  var dLat = deg2rad(picLat-lat1);  // deg2rad below
	  var dLon = deg2rad(picLong-lon1); 
	  var a = 
	    Math.sin(dLat/2) * Math.sin(dLat/2) +
	    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(picLat)) * 
	    Math.sin(dLon/2) * Math.sin(dLon/2)
	    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
  $('#images').append('distance'+d);
}
});*/

$( "#target" ).click(function() {
  var R = 6371;
  var dLat = deg2rad(picLat-lat1);
  var dLong = deg2rad(picLong-long1); 
  var a = 
	    Math.sin(dLat/2) * Math.sin(dLat/2) +
	    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(picLat)) * 
	    Math.sin(dLong/2) * Math.sin(dLong/2)
	    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
   d = R * c; // Distance in km*/

   

   if(d<5){
   	points = 2000;
   }else if (5<d<=7){
   	points = 1500;
   }else if(7<d<=9){
   	points = 1000;
   }else if(d>9){
   	points = 100;
   }

   	var pointA = new L.LatLng(lat1, long1);
	var pointB = new L.LatLng(picLat, picLong);
	var pointList = [pointA, pointB];

	var firstpolyline = new L.Polyline(pointList, {
	color: 'red',
	weight: 3,
	opacity: 0.5,
	smoothFactor: 1

}).addTo(map);

  
  alert( "Your estimation is  " + d+ "km away, and you earned "+points+"points");
  location.reload();
});


});


