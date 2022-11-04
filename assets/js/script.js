//Outline for Movie Recs
// 1. User selects some genres
//Using a form submit
// 2. A queryURL specifying those genres fetches titles from the ADVANCED MOVIE SEARCH API
// 3. A new queryURL specifying those titles fetches watchmode ID's from WATCHMODE API
// 4. A new queryURL specifying those movie ID's fetches "where to stream" info from WATCHMODE API
//"Where to stream" appears in the DOM

//Advanced Movie Search
var genreCode; // will be a number, for example comedy= 35
var genreURL =
	"https://advanced-movie-search.p.rapidapi.com/discover/movie?with_genres=" +
	genreCode +
	"&page=1"; //ADVANCED MOVIE SEARCH API

const options = {
	method: "GET",
	headers: {
		"X-RapidAPI-Key": "ab5fb0b08dmsh801b30df51c049dp15ea7ejsn09d021675790",
		"X-RapidAPI-Host": "advanced-movie-search.p.rapidapi.com",
	},
};

fetch(getTitle, options)
	.then((response) => response.json())
	.then((response) => console.log(response))
	.catch((err) => console.error(err));

//Watchmode OTT STREAMING SERVICE AVAILABILITY
////////////////////////////////////////////////
const options2 = {
	method: "GET",
	headers: {
		"X-RapidAPI-Key": "ab5fb0b08dmsh801b30df51c049dp15ea7ejsn09d021675790",
		"X-RapidAPI-Host": "watchmode.p.rapidapi.com",
	},
};

var movie1 = ""; //individual source ID for Watchmode
var movie2 = ""; //individual source ID for Watchmode
var movie3 = ""; //individual source ID for Watchmode

var getWatchId =
	"https://watchmode.p.rapidapi.com/list-titles/?types=movie&regions=US&source_types=sub%2Cfree&source_ids=" +
	movie1 +
	"%2C" +
	movie2 +
	"%2C+" +
	movie3 +
	"&page=1&limit=10&genres=4%2C9&sort_by=relevance_desc&network_ids=1%2C8%2C12&release_date_start=20010101&release_date_end=20201211"; //this URL takes 3 movie titles into the fetch URL

fetch(getWatchId, options2) //uses the fetch URL from above
	.then((response) => response.json())
	.then((response) => console.log(response))
	.catch((err) => console.error(err));
