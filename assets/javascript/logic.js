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
		// console.log(response);
		// console.log(response.main.temp);
		// // kelvin to Fahrenheit equation
		// console.log(((((response.main.temp)) - 273.15) * 1.8) + 32);
		// // are we getting number return?
		// console.log(typeof (response.main.temp));
		// console.log(response.weather[0].description);
		// console.log(response.wind.speed);


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


// var lati = 44.352;
// var longi = -72.740;
var charityAddressGlobal = "1600+Amphitheatre+Parkway,+Mountain+View,+CA";
var queryUrlGoog = "https://www.google.com/maps/embed/v1/place?key=AIzaSyBXpzbfHI2sL1V4bFVuHsHG6omST-ujp-8&q="  + charityAddressGlobal;


// added variable for google search


// function initAutocomplete() {


// 	var longvalue = -111.894382;
// 	var latvalue = 40.569312;

// 	// new google api to get lat and long from address
// 	// var queryUrlGoog = "https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyB9BOR1LsCivhFAucA6QVKYnPderodAq7E";



// 	console.log(queryUrlGoog);
// 	// set up .ajax and pull response
// 	$.ajax({
// 		url: queryUrlGoog,
// 		method: "GET"
// 	}).then(function (response) {

// 		// verify all outputs
// 		console.log("the latitude = " + response.results[0].geometry.location.lat);
// 		console.log("the longitude = " + response.results[0].geometry.location.lng);
// 		var lat = response.results[0].geometry.location.lat;
// 		var lng = response.results[0].geometry.location.lng;
// 		longvalue = lng;
// 		latvalue = lat;

// 		var map = new google.maps.Map(document.getElementById('map'), {
// 			// center: { lat: 44.352, lng: -72.740 },
// 			center: { lat: latvalue, lng: longvalue },
// 			zoom: 8,
// 			mapTypeId: 'roadmap'
// 		});

// 	});


	// Create the search box and link it to the UI element.
	// address id should be pac-input
	// test to clear input
	// var input = document.getElementById('pac-input');

	// var input = $('<input value="84119" id="pac-input" class="controls" type="text" placeholder="Search Box">');
	// console.log (input);
// 	var searchBox = new google.maps.places.SearchBox(input);
// 	map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

// 	// Bias the SearchBox results towards current map's viewport.
// 	map.addListener('bounds_changed', function () {
// 		searchBox.setBounds(map.getBounds());
// 	});

// 	var markers = [];
// 	// Listen for the event fired when the user selects a prediction and retrieve
// 	// more details for that place.
// 	searchBox.addListener('places_changed', function () {
// 		var places = searchBox.getPlaces();

// 		if (places.length == 0) {
// 			return;
// 		}

// 		// Clear out the old markers.
// 		markers.forEach(function (marker) {
// 			marker.setMap(null);
// 		});
// 		markers = [];

// 		// For each place, get the icon, name and location.
// 		var bounds = new google.maps.LatLngBounds();
// 		places.forEach(function (place) {
// 			if (!place.geometry) {
// 				console.log("Returned place contains no geometry");
// 				return;
// 			}
// 			var icon = {
// 				url: place.icon,
// 				size: new google.maps.Size(71, 71),
// 				origin: new google.maps.Point(0, 0),
// 				anchor: new google.maps.Point(17, 34),
// 				scaledSize: new google.maps.Size(25, 25)
// 			};

// 			// Create a marker for each place.
// 			markers.push(new google.maps.Marker({
// 				map: map,
// 				icon: icon,
// 				title: place.name,
// 				position: place.geometry.location
// 			}));

// 			if (place.geometry.viewport) {
// 				// Only geocodes have viewport.
// 				bounds.union(place.geometry.viewport);
// 			} else {
// 				bounds.extend(place.geometry.location);
// 			}
// 		});
// 		map.fitBounds(bounds);
// 	});

// }

// set image for weather description
// Code from Manju goes here

var searchResults = [];
var charityAppId = "";
var charityApiKey = "";
// var charityAddressGlobal = "";

var config = {
	apiKey: "AIzaSyDI4LjuGplq3orXgSY25y8QJntcnOPlNbo",
	authDomain: "jarvis-in-class.firebaseapp.com",
	databaseURL: "https://jarvis-in-class.firebaseio.com",
	projectId: "jarvis-in-class",
	storageBucket: "jarvis-in-class.appspot.com",
	messagingSenderId: "864119021655"
};

firebase.initializeApp(config);

// Create a variable to reference the database.
var database = firebase.database();

window.onload = function () {

	database.ref().on("value", function (childSnapshot) {

		// console.log(childSnapshot.val());
		// console.log(childSnapshot.val().charityAppId, childSnapshot.val().charityApiKey);
		charityAppId = childSnapshot.val().charityAppId;
		charityApiKey = childSnapshot.val().charityApiKey;
		// console.log(childSnapshot.val().charityAppId, childSnapshot.val().charityApiKey);
	});

	searchResults = JSON.parse(localStorage.getItem("lsArray"));
	// console.log(searchResults);
	$("#charList").empty();
	$("#charDisplay").empty();
	populateSummary();

};

$(document).on("click", "#charRadioLoc", function () {
	// console.log("Radio button selected for location");
	$("#charLocZip").attr("disabled", "true");
	$("#charLocZip").val("");
	$("#charLocCity").removeAttr("disabled");
	$("#charLocState").removeAttr("disabled");
});

$(document).on("click", "#charRadioZip", function () {
	// console.log("Radio button selected for zip");
	$("#charLocZip").removeAttr("disabled");
	$("#charLocCity").attr("disabled", "true");
	$("#charLocState").attr("disabled", "true");
	$("#charLocCity").val("");
});

$(document).on("click", "#subInput", function () {


	// console.log("Search button hit");
	event.preventDefault();
	var newSearch = $("#charInput").val().trim();
	newSearch = newSearch.replace(/ /g, "%20");

	$("#googFrame").attr("src","https://www.google.com/maps/embed/v1/place?key=AIzaSyBXpzbfHI2sL1V4bFVuHsHG6omST-ujp-8&q=University+of+Utah+Sandy+Center+UT");

	var queryURL = "https://api.data.charitynavigator.org/v2/Organizations?app_id=" + charityAppId + "&app_key=" + charityApiKey + "&pageSize=20&search=" + newSearch + "&searchType=name_only&rated=true";
	console.log(queryURL);
	// &categoryID=&causeID=
	var radioValue = $('input[name=location]:checked').val();
	console.log(radioValue);

	if (radioValue === "state") {
		console.log($("#charLocCity").val().trim());
		if ($("#charLocCity").val()) {
			var charCity = $("#charLocCity").val().trim();
			charCity = charCity.replace(/ /g, "%20");
			queryURL = queryURL + "&city=" + charCity;
			console.log(queryURL);
		}
		if ($("#charLocState :selected").val()) {
			var charState = $("#charLocState :selected").val();
			queryURL = queryURL + "&state=" + charState;
			console.log(queryURL);
		}
	} else {
		if (radioValue === "zip") {
			console.log($("#charLocZip").val().trim());
			if ($("#charLocZip").val()) {
				var charZip = $("#charLocZip").val().trim();
				queryURL = queryURL + "&zip=" + charZip;
				console.log(queryURL);
			}
		}
	}

	if ($("#categoryID :selected").val()) {
		var charCategoryID = $("#categoryID :selected").val();
		queryURL = queryURL + "&categoryID=" + charCategoryID;
		console.log(queryURL);
	}

	console.log("Category: " + $("#categoryID :selected").val());
	console.log("State: " + $("#charLocState :selected").val());
	// console.log("Searching for " + newSearch);
	// cartoons.push(newCartoon);
	// renderButtons();
	$("#charInput").val("");



	$.ajax({
		url: queryURL,
		method: "GET",
		error: function (response) {
			// console.log("Error response");
			var results = response;
			// console.log(results);
			// console.log(results.status);
			searchResults = [];
			$("#charDisplay").html("<h2>" + results.responseJSON.errorMessage + "</h2>");
			// console.log(results.responseJSON.errorMessage);
			$("#charList").empty();
			localStorage.setItem("lsArray", JSON.stringify(searchResults));
		}
	})
		.then(function (response) {
			var results = response;
			console.log(results);
			// ========================
			$("#charList").empty();
			$("#charDisplay").empty();

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
				// console.log(charitySummaryObject);
				localStorage.setItem("lsArray", JSON.stringify(searchResults));
			}
			// console.log(searchResults);
			populateSummary();
		})
		;

});
function populateSummary() {

	var charList = $("#charList");

	if (searchResults.length > 0) {
		var heading = $("<h1>");
		heading.html("Charities For You");
		$("#charList").append(heading);
	}
	// console.log("In populate summary. Length: " + searchResults.length);
	// console.log(searchResults);
	for (var i = 0; i < searchResults.length; i++) {
		// console.log("inside pop summary " + i);
		var charityHREF = $("<a href='#'>")
		var charitySummary = $("<div>");
		charitySummary.attr("id", "charity-div");
		charitySummary.attr("data-ein", searchResults[i].ein);
		var charityName = $("<h2 class='text-center'>");
		charityName.text(searchResults[i].name);

		var charityRating = $("<img>")
		charityRating.attr("src", searchResults[i].rating);

		var charityCategory = $("<h3>");
		charityCategory.text("Category: " + searchResults[i].category);

		var charityCause = $("<h3>");
		charityCause.text("Cause: " + searchResults[i].cause);

		var charityTag = $("<h3>");
		charityTag.text(searchResults[i].tagline);

		var charityAddress = $("<h3>");
		charityAddress.html(searchResults[i].addressLine1 + "<br>" + searchResults[i].addressLine2);

		charitySummary.append(charityName);
		newLine(charitySummary, 1);
		charitySummary.append(charityRating);
		newLine(charitySummary, 1);
		charitySummary.append(charityCategory);
		charitySummary.append(charityCause);
		charitySummary.append(charityTag);
		charitySummary.append(charityAddress);
		charityHREF.append(charitySummary);
		$("#charList").append(charityHREF);
		newLine(charList, 2);
	}
}

function newLine(divIdTag, numLines) {
	for (var i = 0; i < numLines; i++) {
		var breakTag = $("<br>");
		divIdTag.append(breakTag);
	}
}

$(document).on("click", "#charity-div", function () {
	var ein = $(this).attr("data-ein");
	console.log(ein);

	queryURL = "https://api.data.charitynavigator.org/v2/Organizations/" + ein + "?app_id=" + charityAppId + "&app_key=" + charityApiKey;

	console.log(queryURL);

	$.ajax({
		url: queryURL,
		method: "GET"
	}).then(function (response) {
		// var results = response;
		console.log(response);
		// ========================
		$("#charList").empty();
		$("#charDisplay").empty();

		var summaryArea = $("#charList");
		var heading = $("<h1>");
		heading.html(response.charityName);
		$("#charList").append(heading);

		newLine(summaryArea, 1);

		var tagline = $("<h2 class='text-center'>");
		tagline.html(response.tagLine);
		$("#charList").append(tagline);
		newLine(summaryArea, 2);

		var detailsDiv = $("<div>");

		var ratingImage = $("<img>");
		ratingImage.attr("src", response.currentRating.ratingImage.large);
		detailsDiv.append(ratingImage);
		newLine(detailsDiv, 1);

		var charityMission = $("<h3>");
		charityMission.html(response.mission);
		detailsDiv.append(charityMission);
		newLine(detailsDiv, 1);

		var charityCategory = $("<h3>");
		charityCategory.text("Category: " + response.category.categoryName);
		detailsDiv.append(charityCategory);
		newLine(detailsDiv, 1);


		var charityCause = $("<h3>");
		charityCause.text("Cause: " + response.cause.causeName);
		detailsDiv.append(charityCause);
		newLine(detailsDiv, 1);


		var charityIRS = $("<h3>");
		charityIRS.html("IRS Classification: <br>" +
			response.irsClassification.deductibility + " under " + response.irsClassification.subsection + "<br>" +
			response.irsClassification.foundationStatus + "<br>"
		);
		detailsDiv.append(charityIRS);
		newLine(detailsDiv, 1);


		var charityAddress = $("<h3>");
		var stringAddress1 = "";

		if (response.mailingAddress.streetAddress1 !== null) {
			stringAddress1 += response.mailingAddress.streetAddress1;
		}
		if (response.mailingAddress.streetAddress2 !== null) {
			stringAddress1 += ", ";
			stringAddress1 += response.mailingAddress.streetAddress2;
		}


		charityAddress.html(stringAddress1 + "<br>" + response.mailingAddress.city + ", " + response.mailingAddress.stateOrProvince + " " + response.mailingAddress.postalCode);
		detailsDiv.append(charityAddress);
		newLine(detailsDiv, 2);

		charityAddressGlobal = stringAddress1 + "," + response.mailingAddress.city + "," + response.mailingAddress.stateOrProvince +
			" " + response.mailingAddress.postalCode;

		charityAddressGlobal = charityAddressGlobal.replace(/ /g, "+");
		console.log(charityAddressGlobal);
		queryUrlGoog = "https://www.google.com/maps/embed/v1/place?key=AIzaSyBXpzbfHI2sL1V4bFVuHsHG6omST-ujp-8&q="  + charityAddressGlobal;
		console.log(queryUrlGoog);
		$("#googFrame").attr("src",queryUrlGoog);
		
		var charityURL = $("<a>");
		charityURL.attr("href", response.websiteURL);
		charityURL.attr("target", "_blank");
		charityURL.html("<h3>" + response.websiteURL + "</h3>");
		detailsDiv.append(charityURL);
		newLine(detailsDiv, 2);


		var charityDonateButton = $("<button class='btn btn-info btn-lg btn-block'>");
		var charityDonateURL = $("<a>");
		charityDonateURL.attr("href", "https://www.charitynavigator.org/index.cfm?bay=my.donations.makedonation&ein=" + ein + "&");
		charityDonateURL.attr("target", "_blank");
		charityDonateURL.html("<h3> Donate via Charity Navigator </h3>");
		charityDonateButton.append(charityDonateURL);
		charityDonateButton.addClass("cartoon-button");
		detailsDiv.append(charityDonateButton);
		newLine(detailsDiv, 1);

		$("#charList").append(detailsDiv);

		var backToSearchResults = $("<button class='btn btn-primary btn-lg btn-block'>");
		backToSearchResults.attr("id", "search-results");
		backToSearchResults.html("<h3> Back to Search Results </h3>");
		$("#charDisplay").append(backToSearchResults);

	});

});

$(document).on("click", "#search-results", function () {
	searchResults = JSON.parse(localStorage.getItem("lsArray"));
	console.log(searchResults);
	$("#charList").empty();
	$("#charDisplay").empty();
	populateSummary();
	$("#googFrame").attr("src","https://www.google.com/maps/embed/v1/place?key=AIzaSyBXpzbfHI2sL1V4bFVuHsHG6omST-ujp-8&q=University+of+Utah+Sandy+Center+UT");
});
