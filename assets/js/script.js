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
			//console.log(genreObject+"is the genre parsed object")
			//the parsed object is full of information like titles, overviews, and movie posters.
			var randomIndex = Math.floor(Math.random() * genreObject.results.length);
			//the randomIndex is like a bookmark that lets us pick a movie at random from a long list of movies and repeatedly come back to it to collect different pieces of information pertaining to that particular movie- specifically the title, original title, overview (movie summary), and vote average.
			var title = genreObject.results[randomIndex].title;
			var movie_id = genreObject.results[randomIndex].id;
			console.log("the movie ID: "+movie_id);
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
			
			getDetailedResponse(movie_id);
		});
}
//getDetailedResponse will take the regular movie id and give a IMDB movie ID that we need for getStreamsbyIMDBId
function getDetailedResponse(movie_id){
var detailedURL = "https://advanced-movie-search.p.rapidapi.com/movies/getdetails?movie_id="+movie_id
const options3 = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'ab5fb0b08dmsh801b30df51c049dp15ea7ejsn09d021675790',
		'X-RapidAPI-Host': 'advanced-movie-search.p.rapidapi.com'
	}
};
fetch(detailedURL, options3)
.then(function (response) {
	if (!response.ok) {
		throw response.json();
	}
	return response.json();
})
.then(function(detailedObject){
//find the data we need in the object
console.log(detailedObject);
var IMDBID= detailedObject.imdb_id

console.log("The IMDBID IS :"+IMDBID);

getStreamsByIMDBID(IMDBID); //call the final function that gets streaming data given an IMDBID.
})


}

function getStreamsByIMDBID(IMDBID){
	var getByIMDBidURL = 
	"https://mdblist.p.rapidapi.com/?i=" + IMDBID
	console.log(getByIMDBidURL+"is the ImbdIdURL");
	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': 'ab5fb0b08dmsh801b30df51c049dp15ea7ejsn09d021675790',
			'X-RapidAPI-Host': 'mdblist.p.rapidapi.com'
		}
	};
	fetch(getByIMDBidURL, options)
	.then(function (response) {
		if (!response.ok) { 
			throw response.json();
		}
		return response.json();
	})
	.then(function (imdbObject) {
		console.log(imdbObject);
		var firstStreamSource = imdbObject.streams[0].name //this will be undefined if the movie is still in theaters or whatever
		console.log(firstStreamSource +" is the first streaming source"); //console logs the fist stream source, if one exists
		var streams = imdbObject.streams
		for (let i=0; i < streams.length; i++){//should repeatedly add stream sources to #streamSources (please make this in the HTML) . Hopefully it will append each stream source to the text, not everwrite whats there. If I recall correctly this will work correctly.
			
			var streamSources = imdbObject.streams[i].name
			console.log("your movie is available on "+streamSources);
			document.querySelector("#streamSources").textContent = streamSources;
			}
			var trailerPath = imdbObject.trailer
			document.querySelector("#trailerPath").textContent = trailerPath;
		
	});
}


//example code for that will be useful to rhys
			//  document.querySelector("#streamSource").textContent = streamSource;
			//  document.querySelector("#streamPrice").textContent = streamSource;
			// document.querySelector("#ownership").textContent = ownership;

			// for (let i = 0; i < sourcesObject.length; i++) {
			// 	var streamSource = sourcesObject[i].name;

			// 	var streamSentence =
			// 		ownership +
			// 		" this movie on " +
			// 		streamSource +
			// 		"------";
			// 	console.log(streamSentence);
			// 	document.querySelector("#streamSentence").textContent = streamSentence;
			// }
// function searchByTitle(title) {// BAD DATA! search by title seems to not be giving correcct data, so i'm going to abandon this one. 
// 	var whereStreamingURL = //this is the url that we need for the next API call
// 	'https://mdblist.p.rapidapi.com/?s='+title+"'"
// 	const options = {
// 		method: "GET",
// 		headers: {			

// 			'X-RapidAPI-Key': 'ab5fb0b08dmsh801b30df51c049dp15ea7ejsn09d021675790',//Rhys' X-RapidAPI- Key
// 			'X-RapidAPI-Host': 'mdblist.p.rapidapi.com'
// 		},
// 	};
// 	fetch(whereStreamingURL, options)
// 		.then(function (response) {
// 			//console.log(response);// could it be that the response is being sent differently?
// 			if (!response.ok) { 
// 				throw response.json();
// 			}
// 			//return response.body;
// 			return response.json();
// 		})
// 		.then(function (ImdbObject) {
// 			const parseImdbObject = JSON.parse(imdbObject)
// 			var streams = parseImdbObject.streams[0].name
// 		console.log(ImdbObject+"is the Object");
// 		console.log(streams+" is the streams at [0]");

// 			console.log(streams +" is the first streaming source");
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
