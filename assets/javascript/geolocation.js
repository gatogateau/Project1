

var browserLatitude = 0;
var browserLongitude = 0;
function getLocation() {
   if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(showPosition);
   } else {
       console.log("Geolocation is not supported by this browser.");
   }
}

function showPosition(position) {
   browserLatitude = position.coords.latitude;
   browserLongitude = position.coords.longitude;
   console.log("lati " + browserLatitude);
   console.log("long " + browserLongitude);
}

getLocation();
        
        
 
// open weather map
// http://api.openweathermap.org/data/2.5/uvi?appid={appid}&lat={lat}&lon={lon}x`x`
// api documentation
var appid = "e7518ef6cc901e2bd7fa37d2a513d300";
var queryUrl= "http://api.openweathermap.org/data/2.5/uvi?appid="+appid+"&lat="+browserLatitude+"&lon="+browserLongitude;
// var appid = "e7518ef6cc901e2bd7fa37d2a513d300";
console.log (queryUrl);
$.ajax({
    url:queryUrl ,
    method: "GET"
}).then(function (response) {
    console.log(response);
});