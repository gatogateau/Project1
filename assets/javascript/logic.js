// script for jarvis environmental group


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


            // open weather map
            // http://api.openweathermap.org/data/2.5/uvi?appid={appid}&lat={lat}&lon={lon}x`x`
            // api documentation
            var appid = "e7518ef6cc901e2bd7fa37d2a513d300";

            // api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}
            var queryUrl = "http://api.openweathermap.org/data/2.5/weather?appid=" + appid + "&lat=" + browserLatitude + "&lon=" + browserLongitude;
            // var appid = "e7518ef6cc901e2bd7fa37d2a513d300";

            console.log(queryUrl);
            // set up .ajax and pull response
            $.ajax({
                url: queryUrl,
                method: "GET"
            }).then(function (response) {

                // verify all outputs
                console.log(response);
                console.log(response.main.temp);
                // kelvin to Fahrenheit equation
                console.log(((((response.main.temp)) - 273.15) * 1.8) + 32);
                // are we getting number return?
                console.log(typeof (response.main.temp));
                console.log(response.weather[0].description);
                console.log(response.wind.speed);


                //JSON variables
                var weatherDesc = response.weather[0].description;
                // change temp from Kelvin to Fahrenheit and round to 1 decimal place
                var temp = Math.round((((((response.main.temp)) - 273.15) * 1.8) + 32)*10)/10;
                var wind = response.wind.speed;


                // send information to HTML 
                // $("#temp").html("<h3>Temperature is " + temp + " fahrenheit</h3>");
                // $("#wind").html("<h3>The wind speed is " + wind + " mph </h3>");
                $("#weather").html("<h3>Temperature: "+ temp+ " | Weather description: " + weatherDesc +
                    " | Wind Speed: "+ wind +" mph</h3>");
            });

        }

        getLocation();

        
        // this is the local hour for the page
        // setting a background image for the time of day: night, day, sunset

        var sunset=0;

    function currenthour() {
        var d = new Date();
        var n = d.getHours();
        console.log (n);
        if (n < 7 || n >19 ) {
            sunset = "night";
            document.getElementById("weather").style.backgroundImage = "url('assets/images/night.jpg')";
            document.getElementById("weather").style.color="white";
        } else if (n >= 6 && n <=17){
            sunset= "day";
            document.getElementById("weather").style.backgroundImage = "url('assets/images/day.jpg')";
            document.getElementById("weather").style.color="black";
        } else {
            sunset="dusk";
            document.getElementById("weather").style.backgroundImage = "url('assets/images/sunset.jpg')";
            document.getElementById("weather").style.color="white";
        }
    }
    currenthour();
    console.log (sunset);
    



        // google map api.  input zip code and get google image, and/or add full address for image

        // set image for day/night

        // add a spinner to the weather api while it is loading



        // set image for weather description


