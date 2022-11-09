var buttonContainerEl = document.querySelector("#all-buttons");
var posterPath = null;

//gets the value of the ID of the div that has the button that was clicked
buttonContainerEl.addEventListener("click", grabData);

function grabData(event) {
	console.log(event.target.dataset.genreid);
	console.log(event.target.dataset);
	var genreID = event.target.dataset.genreid;
	getTitleByGenre(genreID);
}
///var actionButtonEl = document.getElementById("28"); //28 is the id for "action movie genre"
function printConsole() {
	console.log("test");
}

//	var genreID = event.target.dataset.genreID; //records the ivalue (question number, basically)

//have an event listener on a genre buttons parent and as the user clicks on the genre buttons, the string gets built. the event listener is listening to the specific click, the child, that has its own data that is the genre ID.
//gets a number of title IDs based on the user's (multiple) genre preferences'

function getTitleByGenre(genreID) {
	//gets a movie title given a genreCodeString
	var genreCodeString = genreID; //this is an example of what will be passed here from user input any number of genre codes written as a string with commas
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
			var randomIndex = Math.floor(Math.random() * genreObject.results.length);
			var title = genreObject.results[randomIndex].title;

			console.log(randomIndex);

			console.log(
				title + "has now been parsed in GetTitleByGenre (our first function)"
			);

			originalTitle = genreObject.results[randomIndex].original_title;
			document.querySelector("#original_title").textContent = originalTitle;

			overView = genreObject.results[randomIndex].overview;
			document.querySelector("#overview").textContent = overView;

			voteAverage = genreObject.results[randomIndex].vote_average;
			document.querySelector("#vote_average").textContent = voteAverage;

			posterPath = genreObject.results[randomIndex].poster_path; //made global by deleting var
			document
				.querySelector(".poster")
				.children[0].children[0].setAttribute("src", posterPath);

			getWatchModeId(title); //title gets passed to getWatch
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
