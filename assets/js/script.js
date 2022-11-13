var buttonContainerEl = document.querySelector("#all-buttons");
var posterPath = null; //posterPath gets used during getTitleByGenre but needs to be global, so its up here.


//localStorage.clear(); 
function createEmptyStorage() {
localStorage.setItem("genreIds","[]")
}
createEmptyStorage();

buttonContainerEl.addEventListener("click", grabData);
function grabData(event) 
{ 
var localGenreIds= JSON.parse(localStorage.getItem("genreIds"));//this is an array list of genre ids already in the local storage
var genreID = event.target.dataset.genreid;//gets the id code from the button that was clicked
localGenreIds.push(genreID)//this will push genreID onto the end of the list from local storage. 
console.log("the genreID after a click:  "+ genreID);
localStorage.setItem("genreIds", JSON.stringify(localGenreIds));//localGenreIds is an array 
//data typ
var genreString= localGenreIds.toString();//turns 
console.log("the string in local storage: "+genreString)
getTitleByGenre(genreString);//passes our first API call function the string of genre codes that it needs
}

function getTitleByGenre(genreString) {
	//gets a movie title given a genreCodeString
	//var genreCodeString = genreID; //for now genreCodeStriing just gets genreID, a single genre ID, but can already take a series of genre codes separated by commas. genreCodeString could be reset to assemble a string from local storage
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
			var title = genreObject.results[randomIndex].title;
			originalTitle = genreObject.results[randomIndex].original_title;
			overView = genreObject.results[randomIndex].overview;
			voteAverage = genreObject.results[randomIndex].vote_average;
			posterPath = genreObject.results[randomIndex].poster_path;
			document.querySelector("#original_title").textContent = originalTitle;
			document.querySelector("#overview").textContent = overView;
			document.querySelector("#vote_average").textContent = voteAverage
			
			+ "/10";
			document
				.querySelector(".poster")
				.children[0].children[0].setAttribute("src", posterPath);
			//whereStreaming(title); //calls the next API call function. "title" is the only var from here that it will need.
			searchByTitle(title);
		});
}


function searchByTitle(title) {
	var whereStreamingURL = //this is the url that we need for the next API call
	'https://mdblist.p.rapidapi.com/?s='+title+"'"
	const options = {
		method: "GET",
		headers: {			

			'X-RapidAPI-Key': 'ab5fb0b08dmsh801b30df51c049dp15ea7ejsn09d021675790',//Rhys' X-RapidAPI- Key
			'X-RapidAPI-Host': 'mdblist.p.rapidapi.com'
		},
	};
	fetch(whereStreamingURL, options)
		.then(function (response) {
			if (!response.ok) { 
				throw response.json();
			}
			return response.json();
		})
		.then(function (imdbObject) {
		console.log(imdbObject +" is the imdbIdObject");

			 streams = imdbObject.streams[0].name;
			console.log(streams +" is the first streaming source");
		});
}



			//  document.querySelector("#streamSource").textContent = streamSource;
			//  document.querySelector("#streamPrice").textContent = streamSource;
			// document.querySelector("#ownership").textContent = ownership;

			// for (let i = 0; i < sourcesObject.length; i++) {
			// 	var streamSource = sourcesObject[i].name;
			// 	var streamPrice = sourcesObject[i].price;
			// 	var ownership = sourcesObject[i].type;
			// 	var streamSentence =
			// 		ownership +
			// 		" this movie on " +
			// 		streamSource +
			// 		" for " +
			// 		streamPrice +
			// 		"------";
			// 	console.log(streamSentence);
			// 	document.querySelector("#streamSentence").textContent = streamSentence;
			// }








// function getStreamsByImdbId(ImdbID){
// 	var getStreamsURL = 
// 	"https://mdblist.p.rapidapi.com/?i=" + ImdbID
// 	console.log(getStreamsURL+"is the ImbdIdURL");
// 	const options = {
// 		method: 'GET',
// 		headers: {
// 			'X-RapidAPI-Key': 'ab5fb0b08dmsh801b30df51c049dp15ea7ejsn09d021675790',
// 			'X-RapidAPI-Host': 'mdblist.p.rapidapi.com'
// 		}
// 	};
// 	fetch(getByImdbIdURL, options)
// 	.then(function (response) {
// 		if (!response.ok) { 
// 			throw response.json();
// 		}
// 		return response.json();
// 	})
// 	.then(function (streamingObject) {
// 		console.log(streamingObject +" is the streamingObject");

// 		streams = streamingObject.streams[0].name
// 		console.log(streams +" is streaming name");
// 		});
// }







	

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
