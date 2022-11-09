var posterPath = null;
////////////////////////////////////////////////////////////////
//getTitleByGenre gets movie titles given a string of genre codes using the ADVANCED MOVIE SEARCH API.

var actionButton = document.getElementById("28"); //28 is the id for "action movie genre"
function printConsole() {
	console.log("test");
}
actionButton.addEventListener("click", printConsole);
//have an event listener on a genre buttons parent and as the user clicks on the genre buttons, the string gets built. the event listener is listening to the specific click, the child, that has its own data that is the genre ID.
//gets a number of title IDs based on the user's (multiple) genre preferences'

function getTitleByGenre() {
	//gets a movie title given a genreCodeString
	var genreCodeString = "12,"; //this is an example of what will be passed here from user input any number of genre codes written as a string with commas
	var genreURL =
		"https://advanced-movie-search.p.rapidapi.com/discover/movie?with_genres=" +
		genreCodeString +
		"&page=1";

	const options = {
		method: "GET",
		headers: {
			"X-RapidAPI-Key": "ab5fb0b08dmsh801b30df51c049dp15ea7ejsn09d021675790",
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
			console.log(genreObject);
			//I have no idea why putting this inside a function is helping
			var title = genreObject.results[1].title;
			console.log(
				title + "has now been parsed in GetTitleByGenre (our first function)"
			);

			getWatchModeId(title); //get passed to getWatch

			var originalTitle = genreObject.results[0].original_title; //this item must be passed THROUGH getWatchModeId (where nothing happens to them) AND to getStreamSources (where they will be appended to the DOM)
			posterPath = genreObject.results[0].poster_path; //this item must be passed THROUGH getWatchModeId (where nothing happens to them) AND to getStreamSources (where they will be appended to the DOM)
			var overView = genreObject.results[0].overview; //this item must be passed THROUGH getWatchModeId (where nothing happens to them) AND to getStreamSources (where they will be appended to the DOM)
			var voteAverage = genreObject.results[0].vote_average; //this item must be passed THROUGH getWatchModeId (where nothing happens to them) AND to getStreamSources (where they will be appended to the DOM)
			console.log(posterPath);
			document
				.querySelector(".card-image")
				.children[0].children[0].setAttribute("src", posterPath);
		});
}
getTitleByGenre(); //calling the function

//the following needs to somehow get the var title from the getTitleByGenre function!
function getWatchModeId(title) {
	console.log(
		"getWatchModeId (our second function) is now receiving this 'title' from GetTitleByGenre (our first function)" +
			title
	);
	var watchIdURL =
		"https://watchmode.p.rapidapi.com/search/?search_field=name&search_value=" +
		title;

	const options2 = {
		method: "GET",
		headers: {
			"X-RapidAPI-Key": "ab5fb0b08dmsh801b30df51c049dp15ea7ejsn09d021675790",
			"X-RapidAPI-Host": "watchmode.p.rapidapi.com",
		},
	};

	fetch(watchIdURL, options2) //returns an object with two keys- title results and people results
		.then(function (response) {
			if (!response.ok) {
				throw response.json();
			}
			return response.json();
		})
		.then(function (watchIdObject) {
			console.log(watchIdObject);
			var watchModeId = watchIdObject.title_results[0].id; //use this single line to grab just the first title Id
			// var watchModesArray = [] //if we want more than one title result turn on this array builder code
			// for (let i = 0; i < 5; i++) {
			// 	var watchModeId = watchIdObject.title_results[i].id;
			// 	watchModesArray.push(watchModeId);
			//}
			//var IdString = watchModesArray.toString();//if we want more than one title result turn this on also and pass it down as a parameter somehow
			getStreamSources(JSON.stringify(watchModeId));
		});
}

//getStreamSources takes a seven digit Watchmode ID and give where to watch, buy or rent, and price. It also uses the watchmode API.
function getStreamSources(watchModeId) {
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
			"X-RapidAPI-Key": "ab5fb0b08dmsh801b30df51c049dp15ea7ejsn09d021675790",
			"X-RapidAPI-Host": "watchmode.p.rapidapi.com",
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
			console.log(sourcesObject[0].type); //testing the parsed object. sholud return "buy" or "rent"
			var streamSource = sourcesObject[0].name;
			var streamPrice = sourcesObject[0].price;
			var BuyOrRent = sourcesObject[0].type;

			// var numOfSources = 1;
			// for (let i = 0; i < numOfSources; i++) {
			// 	var streamSource = sourcesObject[i].name;
			// 	var streamPrice = sourcesObject[i].price;
			// 	var BuyOrRent = sourcesObject[i].type;
			// 	console.log(
			// 		"These are the getStreamSources: " +
			// 			streamSource +
			// 			"  " +
			// 			BuyOrRent +
			// 			"  " +
			// 			streamPrice
			// 	);
			// }
		});
	//probably we should pass the title codes to the next function somehow
}

//expand for list of genre codes
// {
// 	"genres": [
// 	  {
// 		"id": 28,
// 		"name": "Action"
// 	  },
// 	  {
// 		"id": 12,
// 		"name": "Adventure"
// 	  },
// 	  {
// 		"id": 16,
// 		"name": "Animation"
// 	  },
// 	  {
// 		"id": 35,
// 		"name": "Comedy"
// 	  },
// 	  {
// 		"id": 80,
// 		"name": "Crime"
// 	  },
// 	  {
// 		"id": 99,
// 		"name": "Documentary"
// 	  },
// 	  {
// 		"id": 18,
// 		"name": "Drama"
// 	  },
// 	  {
// 		"id": 10751,
// 		"name": "Family"
// 	  },
// 	  {
// 		"id": 14,
// 		"name": "Fantasy"
// 	  },
// 	  {
// 		"id": 36,
// 		"name": "History"
// 	  },
// 	  {
// 		"id": 27,
// 		"name": "Horror"
// 	  },
// 	  {
// 		"id": 10402,
// 		"name": "Music"
// 	  },
// 	  {
// 		"id": 9648,
// 		"name": "Mystery"
// 	  },
// 	  {
// 		"id": 10749,
// 		"name": "Romance"
// 	  },
// 	  {
// 		"id": 878,
// 		"name": "Science Fiction"
// 	  },
// 	  {
// 		"id": 10770,
// 		"name": "TV Movie"
// 	  },
// 	  {
// 		"id": 53,
// 		"name": "Thriller"
// 	  },
// 	  {
// 		"id": 10752,
// 		"name": "War"
// 	  },
// 	  {
// 		"id": 37,
// 		"name": "Western"
// 	  }
// 	]
//   }
