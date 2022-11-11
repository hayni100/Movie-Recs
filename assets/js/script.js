var buttonContainerEl = document.querySelector("#all-buttons");
var posterPath = null; //posterPath gets used during getTitleByGenre but needs to be global, so its up here.



///Proposed expansion of genre buttons////////////////////////////////////////////////// Rhys thinks it would be cool to recommend movies based on multiple preferred genres. the following is a possible expanded version of grabData. instead of just running our program on one genre button, it will allow the user to select multiple genre buttons before submitting them. It could use buttons that toggle colors when pressed and unpressed. maybe it should use local storage to store the genre values.
localStorage.setItem(28,"");
localStorage.setItem(12,"");
localStorage.setItem(35,"");
localStorage.setItem(80,"");
localStorage.setItem(27,"");
localStorage.setItem(18,"");
localStorage.setItem(10751,"");
localStorage.setItem(14,"");
localStorage.setItem(36,"");
localStorage.setItem(99,"");
localStorage.setItem(10402,"");
localStorage.setItem(9648,"");
localStorage.setItem(10749,"");
localStorage.setItem(878,"");
localStorage.setItem(10770,"");
localStorage.setItem(53,"");
localStorage.setItem(10752,"");
localStorage.setItem(37,"");
buttonContainerEl.addEventListener("click", grabData);
function grabData(event) 
{ //could run whenever a genre buttin is clicked, updates what buttons are clicked to local storage
	function grabData(event) {
		//if button is clicked //put an if statment here
		var genreID = event.target.dataset.genreid;
			localStorage.setItem(genreID, genreID);//no reason the keys for the genreId's sholdn't just be equal to the genre ids themselves. 
		//if button has been UNclicked -//put an else statement here
			localStorage.setItem(genreID, "")
	}
}
//the following will construct a string out of what genre codes are saved in values in local storage. getItem(28) gets the value of the 28 key wich will either be empty ("") or "28".
let Action = localStorage.getItem(28);
let Adventure = localStorage.getItem(12);
let Comedy= localStorage.getItem(35); 
let Crime= localStorage.getItem(80); 
let Horror= localStorage.getItem(27); 
let Drama= localStorage.getItem(18); 
let Family= localStorage.getItem(10751); 
let Fantasy= localStorage.getItem(14); 
let hiStory= localStorage.getItem(36); 
let Documentary= localStorage.getItem(99); 
let Music= localStorage.getItem(10402); 
let Mystery= localStorage.getItem(9648); 
let Romance= localStorage.getItem(10749); 
let SciFi= localStorage.getItem(878);
let TvMovie= localStorage.getItem(10770); 
let Thriller= localStorage.getItem(53); 
let War= localStorage.getItem(10752); 
let Western= localStorage.getItem(37); 

var string = Action+Adventure+Comedy+Crime+Horror+Drama+Family+Fantasy+hisStory+Documentary+Music+Mystery+Romance+SciFi+TvMovie+Thriller+War+Western;






//here the var genreID gets the value of the genre id associated with the movie genre showing on the button that was clicked
buttonContainerEl.addEventListener("click", grabData);
function grabData(event) {
	var genreID = event.target.dataset.genreid;
	getTitleByGenre(genreID);
}

function getTitleByGenre(genreID) {
	//gets a movie title given a genreCodeString
	var genreCodeString = genreID; //for now genreCodeStriing just gets genreID, a single genre ID, but can already take a series of genre codes separated by commas. genreCodeString could be reset to assemble a string from local storage
	var genreURL = //This is the url needed for our first API call for movies by genre.
		"https://advanced-movie-search.p.rapidapi.com/discover/movie?with_genres=" +
		genreCodeString +
		"&page=1";

	const options = {
		//This is information the API needs for the call
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
			//the parsed object is full of information like titles, overviews, and movie posters.
			var randomIndex = Math.floor(Math.random() * genreObject.results.length);
			//the randomIndex is like a bookmark that lets us pick a movie at random from a long list of movies and repeatedly come back to it to collect different pieces of information pertaining to that particular movie- specifically the title, original title, overview (movie summary), and vote average.
			var title = genreObject.results[randomIndex].title;
			originalTitle = genreObject.results[randomIndex].original_title;
			overView = genreObject.results[randomIndex].overview;
			voteAverage = genreObject.results[randomIndex].vote_average;
			posterPath = genreObject.results[randomIndex].poster_path;
			document.querySelector("#original_title").textContent = originalTitle;
			document.querySelector("#overview").textContent = overView;
			document.querySelector("#vote_average").textContent = voteAverage;
			document
				.querySelector(".poster")
				.children[0].children[0].setAttribute("src", posterPath);
			getWatchModeId(title); //calls the next API call function. "title" is the only var from here that it will need.
		});
}
getTitleByGenre(); //calling the function

function getWatchModeId(title) {
	var watchIdURL = //this is the url that we need for the next API call
		"https://watchmode.p.rapidapi.com/search/?search_field=name&search_value=" +
		title;
	const options2 = {
		method: "GET",
		headers: {
			"X-RapidAPI-Key": "ab5fb0b08dmsh801b30df51c049dp15ea7ejsn09d021675790",
			"X-RapidAPI-Host": "watchmode.p.rapidapi.com",
		},
	};
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
			// var streamSource = "Zamazon"; //sourcesObject[0].name;
			// var streamPrice = "three hundred pennies"; //sourcesObject[0].price;
			// var ownership = "Rent-to-own"; //sourcesObject[0].type;
			// // document.querySelector("#streamSource").textContent = streamSource;
			// // document.querySelector("#streamPrice").textContent = streamSource;
			//document.querySelector("#ownership").textContent = ownership;

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
