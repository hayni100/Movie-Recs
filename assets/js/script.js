console.log("THIS IS THE START OF THE SCRIPT RHYS IS WORKING ON");
var buttonContainerEl = document.querySelector("#all-buttons");
var posterPath = null; //posterPath gets used during getTitleByGenre but needs to be global, so its up here.
//localStorage.clear(); //clears all local storage on page load. 
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
console.log("ABOUT TO START FUNCTION THAT CALLS ADVANCED MOVIE SEARCH WITH GENRES");
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
			console.log("ABOUT TO START THE FETCH FUNCTION THAT CALLS ADVANCED MOVIE SEARCH WITH A REGULAR MOVIE ID");
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

//if the IMDBID is null, then start over!
console.log("The IMDBID IS :"+IMDBID);
console.log("ABOUT TO START THE FETCH FUNCTION THAT GETS STREAM SOURCES FROM MBDLIST USING MBDID");
getStreamsByIMDBID(IMDBID); //call the final function that gets streaming data given an IMDBID.
})
}
function getStreamsByIMDBID(IMDBID)
{//uses Get by IMDb ID which is an option from the MDBList API (paid for by Rhys)
	var getByIMDBidURL = 
	"https://mdblist.p.rapidapi.com/?i=" + IMDBID 
	//console.log(getByIMDBidURL+"is the ImbdIdURL");
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
		//if the imdbObject is not an object for some weird (but weirdly frequent) reason, maybe start over with getTitleByGenre
			console.log(imdbObject+" is the IMBDObject");
			//console.log(imdbObject.streams[0]+"is the first stream source");
			//if streams.length is not defined, start over
			// if (typeof(imdbObject.streams[0].name) === null) {//if there is no first stream source (movie isn't streaming yet)
			// 	getTitleByGenre(genreString);//does getTitleByGenre have access to genreString here?? or do we need to pass it to getStream
			// }else {
			// for (let i=0; i < streams.length; i++){//should repeatedly add stream sources to #streamSources (please make this in the HTML) . Hopefully it will append each stream source to the text, not everwrite whats there. If I recall correctly this will work correctly.
			// var streamSources = imdbObject.streams[i].name
			// console.log("your movie is available on "+streamSources);
			// document.querySelector("#streamSentence").textContent = streamSources;
			// }
			
			// }
		var trailerPath = imdbObject.trailer
		console.log(trailerPath);
			document.querySelector("#streaming-content").textContent = trailerPath;
	});
}
