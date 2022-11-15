console.log("THIS IS THE START OF THE SCRIPT RHYS IS WORKING ON");
var buttonContainerEl = document.querySelector("#all-buttons");
var posterPath = null; //posterPath gets used during getTitleByGenre but needs to be global, so its up here.
localStorage.clear(); //clears all local storage on page load. 
function createEmptyStorage() {//creates a key and value in local storage to start creating a list of genreIds
localStorage.setItem("genreIds","[]")//creates the key and empty value on page load
}
createEmptyStorage();//calls the function just created

buttonContainerEl.addEventListener("click", grabData);//waits for a click on any genre button
function grabData(event) //happens when a click on any genre button happens
{ 
var localGenreIds= JSON.parse(localStorage.getItem("genreIds"));//this is an array list of genre ids already in the local storage
var genreID = event.target.dataset.genreid;//gets the genre ID from the button that was clicked
localGenreIds.push(genreID)//pushes the genreID onto the end of the list from local storage. 
localStorage.setItem("genreIds", JSON.stringify(localGenreIds));//localGenreIds is an array data type
var genreString= localGenreIds.toString();//turns the genreString into an actual string data type
console.log("the string in local storage: "+genreString)
getTitleByGenre(genreString);//passes our first API call function the string of genre codes that it needs
}
console.log("ABOUT TO START FUNCTION THAT CALLS ADVANCED MOVIE SEARCH WITH GENRES TO GET A MOVIE TITLE");
getTitleByGenre(); //calling the function
function getTitleByGenre(genreString) {
	var genreURL = //This is the url needed for our first API call for movies by genre.
		"https://advanced-movie-search.p.rapidapi.com/discover/movie?with_genres=" +
		genreString +
		"&page=1";

	const options = {
		//This is information the API needs for the call
		method: "GET",
		headers: {
			"X-RapidAPI-Key": "ab5fb0b08dmsh801b30df51c049dp15ea7ejsn09d021675790",//Rhys' full subscription to advanced movie search
			"X-RapidAPI-Host": "advanced-movie-search.p.rapidapi.com",
		},
	};
	fetch(genreURL, options)
		.then(function (response) {
			if (!response.ok) {
				throw response.json();
			}
			return response.json();
		})
		.then(function (genreObject) {
			console.log(genreObject+"is the genre parsed object")
			//the parsed object is full of information like titles, overviews, and movie posters.
			var randomIndex = Math.floor(Math.random() * genreObject.results.length);
			//the randomIndex is like a bookmark that lets us pick a movie at random from a long list of movies and repeatedly come back to it to collect different pieces of information pertaining to that particular movie- specifically the title, original title, overview (movie summary), and vote average.
			//var title = genreObject.results[randomIndex].title;//do we even need this?
			var originalTitle = genreObject.results[randomIndex].original_title;
			console.log("the movie title is: "+ originalTitle);
			overView = genreObject.results[randomIndex].overview;
			voteAverage = genreObject.results[randomIndex].vote_average;
			posterPath = genreObject.results[randomIndex].poster_path;
			document.querySelector("#original_title").textContent = originalTitle;
			document.querySelector("#overview").textContent = overView;
			document.querySelector("#vote_average").textContent = voteAverage;
			document
				.querySelector(".poster")
				.children[0].children[0].setAttribute("src", posterPath);
			console.log("ABOUT TO START THE FETCH FUNCTION THAT GETS A WATCHMODE ID SO WE CAN USE WATCHMODE");
			getWatchModeId(originalTitle)
		});
}
function getWatchModeId(title) {
	var watchIdURL = //this is the url that we need for the next API call
		"https://watchmode.p.rapidapi.com/search/?search_field=name&search_value=" +
		title;
	const options2 = {
		method: "GET",
		headers: {

	  	"X-RapidAPI-Key": "7158BxGEKClB0w3h19emEx2CgaspYq6sdZY5mhNX",
		"X-RapidAPI-Host": "watchmode.p.rapidapi.com",
		},
	};console.log(watchIdURL);
	fetch(watchIdURL, options2)
		.then(function (response) {
			if (!response.ok) {
				throw response.json();
			}
			return response.json();
		})
		.then(function (watchIdObject) {
			console.log(watchIdObject);
			var watchModeId = watchIdObject.title_results[0].id; //keeping the array index at zero seems to get us the most relevant title, i.e. "shrek" not "shrek 2"
			getWatchModeStreamSources(JSON.stringify(watchModeId));
		
		});
}

//getStreamSources takes a seven digit Watchmode ID and give where to watch, buy or rent, and price. It also uses the watchmode API.
function getWatchModeStreamSources(watchModeId) {
	console.log(
		"this is getStreamSources (our third and last call function) receiving a single watchModeId from getWatchModeId:   " +
			watchModeId
	);
	var getStreamURL =
		"https://watchmode.p.rapidapi.com/title/" + watchModeId + "/sources/";

	const options = {
		method: "GET",
		headers: {
			regions: "US",
		"X-RapidAPI-Key": "7158BxGEKClB0w3h19emEx2CgaspYq6sdZY5mhNX",//a new key from haein', 46 characters long
		"X-RapidAPI-Host": "watchmode.p.rapidapi.com",
	

			//"X-RapidAPI-Key": "FevleXdIzsv7SUpr6vtL29ukYk8KgR2gWFlDGEB2",//jaydens 40 characters long
			//"X-RapidAPI-Host": "watchmode.p.rapidapi.com",
		},
	};
	fetch(getStreamURL, options)
		.then(function (response) {
			if (!response.ok) {
				throw response.json();
			}
			return response.json();
		})
		.then(function (sourcesObject) {
			console.log(sourcesObject);
			 //var streamSource = "Zamazon"; //sourcesObject[0].name;
			//var streamPrice = "three hundred pennies"; //sourcesObject[0].price;
			//var ownership = "Rent-to-own"; //sourcesObject[0].type;
			 document.querySelector("#streamSource").textContent = streamSource;
			 document.querySelector("#streamPrice").textContent = streamSource;
			document.querySelector("#ownership").textContent = ownership;

			for (let i = 0; i < sourcesObject.length; i++) {
				var streamSource = sourcesObject[i].name;
				var streamPrice = sourcesObject[i].price;
				var ownership = sourcesObject[i].type;
				var streamSentence =
					ownership +
					" this movie on " +
					streamSource +
					" for " +
					streamPrice +
					"------";
				console.log(streamSentence);
				document.querySelector("#streamSentence").textContent = streamSentence;
			}
		});
}



