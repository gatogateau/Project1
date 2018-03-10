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
        var temp = Math.round((((((response.main.temp)) - 273.15) * 1.8) + 32) * 10) / 10;
        var wind = response.wind.speed;


        // send information to HTML 
        // $("#temp").html("<h3>Temperature is " + temp + " fahrenheit</h3>");
        // $("#wind").html("<h3>The wind speed is " + wind + " mph </h3>");
        $("#weather").html("<h3>Temperature: " + temp + " | Weather description: " + weatherDesc +
            " | Wind Speed: " + wind + " mph</h3>");
    });

}

getLocation();


// this is the local hour for the page
// setting a background image for the time of day: night, day, sunset

var sunset = 0;

function currenthour() {
    var d = new Date();
    var n = d.getHours();
    console.log(n);
    if (n < 7 || n > 19) {
        sunset = "night";
        document.getElementById("weather").style.backgroundImage = "url('assets/images/night.jpg')";
        document.getElementById("weather").style.color = "white";
    } else if (n >= 6 && n <= 17) {
        sunset = "day";
        document.getElementById("weather").style.backgroundImage = "url('assets/images/day.jpg')";
        document.getElementById("weather").style.color = "black";
    } else {
        sunset = "dusk";
        document.getElementById("weather").style.backgroundImage = "url('assets/images/sunset.jpg')";
        document.getElementById("weather").style.color = "white";
    }
}
currenthour();
console.log(sunset);


// google maps
function initMap() {
    var uluru = { lat: 44.352, lng: -72.740 };
    var map = new google.maps.Map(document.getElementById('maps'), {
        zoom: 4,
        center: uluru
    });
    console.log("testing");
    var marker = new google.maps.Marker({
        position: uluru,
        map: map
 
    });

    console.log(map);
}

console.log("hello");
        // google map api.  input zip code and get google image, and/or add full address for image

        // set image for day/night

        // add a spinner to the weather api while it is loading



        // set image for weather description
// Code from Manju goes here

var searchResults = [];

$(document).on("click", "#subInput", function () {

	console.log("Search button hit");
	event.preventDefault();
	var newSearch = $("#charInput").val().trim();
	newSearch = newSearch.replace(/ /g, "%20");

	console.log("Searching for " + newSearch);
	// cartoons.push(newCartoon);
	// renderButtons();
	$("#charInput").val("");

	var queryURL = "https://api.data.charitynavigator.org/v2/Organizations?app_id=09ceb587&app_key=a02d0e73a4f8e0d9c64bddca938d32ea&pageSize=10&search=" + newSearch + "&searchType=name_only&minRating=0&maxRating=4&categoryID=&causeID=";

	$.ajax({
		url: queryURL,
		method: "GET"
	}).then(function (response) {
		var results = response;
		console.log(results);
		// ========================
		$("#charList").empty();
		$("#charDisplay").empty();

		var heading = $("<h1>");
		heading.html("Charities For You");
		$("#charList").append(heading);

		searchResults = [];
		for (var i = 0; i < results.length; i++) {
			var stringAddress1 = "";
			if (results[i].mailingAddress.streetAddress1 !== null) {
				stringAddress1 += results[i].mailingAddress.streetAddress1;
			}
			if (results[i].mailingAddress.streetAddress2 !== null) {
				stringAddress1 += ", ";
				stringAddress1 += results[i].mailingAddress.streetAddress2;
			}

			var stringAddress2 = results[i].mailingAddress.city + ", " + results[i].mailingAddress.stateOrProvince + " " + results[i].mailingAddress.postalCode;

			var charitySummaryObject = {
				ein: results[i].ein
				, name: results[i].charityName
				, rating: results[i].currentRating.ratingImage.large
				, category: results[i].category.categoryName
				, cause: results[i].cause.causeName
				, tagline: results[i].tagLine
				, addressLine1: stringAddress1
				, addressLine2: stringAddress2
			};

			searchResults.push(charitySummaryObject);
			console.log(charitySummaryObject);
			localStorage.setItem("lsArray", JSON.stringify(searchResults));
		}
		console.log(searchResults);
		populateSummary();

	});

});
function populateSummary() {

	$("#charList").empty();
	$("#charDisplay").empty();

	console.log("In populate summary. Length: " + searchResults.length);
	console.log(searchResults);
	for (var i = 0; i < searchResults.length; i++) {
		console.log("inside pop summary " + i);
		var charityHREF = $("<a href='#'>")
		var charitySummary = $("<div>");
		charitySummary.attr("id", "charity-div");
		charitySummary.attr("data-ein", searchResults[i].ein);
		var charityName = $("<p class='text-center'>");
		charityName.text(searchResults[i].name);

		var charityRating = $("<img>")
		charityRating.attr("src", searchResults[i].rating);

		var charityCategory = $("<p>");
		charityCategory.text("Category: " + searchResults[i].category);

		var charityCause = $("<p>");
		charityCause.text("Cause: " + searchResults[i].cause);

		var charityTag = $("<p>");
		charityTag.text(searchResults[i].tagline);

		var charityAddress = $("<p>");
		charityAddress.html(searchResults[i].addressLine1 + "<br>" + searchResults[i].addressLine1);

		charitySummary.append(charityName);
		charitySummary.append(charityRating);
		charitySummary.append(charityCategory);
		charitySummary.append(charityCause);
		charitySummary.append(charityTag);
		charitySummary.append(charityAddress);
		charityHREF.append(charitySummary);
		$("#charList").append(charityHREF);

	}
}


