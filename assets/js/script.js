////////////////////////////////////////////////////////////////
//getByGenre gets movie titles given a string of genre codes using the ADVANCED MOVIE SEARCH API.

var actionButton = document.getElementById("28"); //28 is the id for "action movie genre"
function printConsole() {
	console.log("test");
}
actionButton.addEventListener("click", printConsole);
//have an event listener on a genre buttons parent and as the user clicks on the genre buttons, the string gets built. the event listener is listening to the specific click, the child, that has its own data that is the genre ID.
//gets a number of title IDs based on the user's (multiple) genre preferences'

function getByGenre() {
	//gets a movie title given a genreCodeString
	var genreCodeString = "35, 14, 12"; //this is an example of what will be passed here from user input any number of genre codes written as a string with commas
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
			var title = genreObject.results[0].title;
			console.log("Title: " + title);
			getWatchModeId(title);
		});
	getWatchModeId(); //I need to somehow figure out how to pass "title" to getWatchMode!
}
getByGenre(); //calling the function

//the following needs to somehow get the var title from the getByGenre function!
function getWatchModeId(title) {
	console.log("var movieName: " + title); //error title is not defined
	var watchIdURL =
		"https://watchmode.p.rapidapi.com/search/?search_field=name&search_value=" +
		movieName;

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
			//console.log(watchIdObject);
			for (let i = 0; i < 5; i++) {
				//saying i<5 in the above line is not really... good. better would be to have title_results.length be defined ahead of time
				var watchModeId = watchIdObject.title_results[i].id;
				console.log("getWatchModeId " + watchModeId);
			}
		});
}
getWatchModeId(); //calling the function

////////////////////////////////////////////////////////////////////////////////////////////////
//getStreamSources takes a seven digit Watchmode ID and give where to watch, buy or rent, and price. It also uses the watchmode API.
function getStreamSources() {
	var watchModeId = 1346024;
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
			//console.log(sourcesObject);
			var numOfTitles = 10;

			for (let i = 0; i < numOfTitles; i++) {
				var streamSource = sourcesObject[i].name;
				var streamPrice = sourcesObject[i].price;
				var BuyOrRent = sourcesObject[i].type;
				console.log(
					"getStreamSources " +
						streamSource +
						"  " +
						BuyOrRent +
						"  " +
						streamPrice
				);
			}
		});
	//probably we should pass the title codes to the next function somehow
}
getStreamSources(); //call the function!

//list of genre codes
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
