//Outline for Movie Recs
// 1. User selects some genres using a form submit
// 2. A queryURL specifying those genres fetches titles and ID's from the ADVANCED MOVIE SEARCH API
// 4. A new queryURL specifying those movie ID's fetches "where to stream" info from WATCHMODE API
//"Where to stream" appears in the DOM

//Advanced Movie Search

var genreCode = 35; // will be a number, for example comedy= 35

function getByGenre() {
	//gets a number of title IDs'
	var genreCode = "35, 14, 12"; //this will be passed here from user input any number of genre codes written as a string with commas
	var genreURL =
		"https://advanced-movie-search.p.rapidapi.com/discover/movie?with_genres=" +
		genreCode +
		"&page=1";

	const options = {
		method: "GET",
		headers: {
			"X-RapidAPI-Key": "ab5fb0b08dmsh801b30df51c049dp15ea7ejsn09d021675790",
			"X-RapidAPI-Host": "advanced-movie-search.p.rapidapi.com",
		},
	};

	fetch(genreURL, options)
		// 	.then((response) => response.json())
		// 	.then((response) => console.log(response))
		// 	.catch((err) => console.error(err));

		.then(function (response) {
			if (!response.ok) {
				throw response.json();
			}
			return response.json();
		})
		.then(function (genreObject) {
			console.log(genreObject);
			var numOfTitles = 10; //how many titles and id numbers do we want to see? this might need to be passed in from another function.
			for (let i = 0; i < numOfTitles; i++) {
				//var titleCode = genreObject.results[i].id;
				var title = genreObject.results[i].title;
				//console.log(titleCode);
				console.log(title);
			}
			//probably we should pass the title codes to the next function somehow
		});
}
getByGenre(); //don't forget to call the function!
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Watchmode OTT STREAMING SERVICE AVAILABILITY this takes a title and gives a list of related watch mode ID's for example "shrek" gives 1346023 , 1346024, 1346026, 1346029, 1668153
function getWatchModeId() {
	const options2 = {
		method: "GET",
		headers: {
			"X-RapidAPI-Key": "ab5fb0b08dmsh801b30df51c049dp15ea7ejsn09d021675790",
			"X-RapidAPI-Host": "watchmode.p.rapidapi.com",
		},
	};
	var movieName = "Shrek";
	var watchIdURL =
		"https://watchmode.p.rapidapi.com/search/?search_field=name&search_value=" +
		movieName;
	fetch(watchIdURL, options2) //returns an object with two keys- title results and people results
		.then(function (response) {
			if (!response.ok) {
				throw response.json();
			}
			return response.json();
		})
		.then(function (watchIdObject) {
			console.log(watchIdObject);
			for (let i = 0; i < 5; i++) {
				//i<5 is not good. we need title_results.length ahead of time
				var watchModeId = watchIdObject.title_results[i].id;
				console.log(watchModeId);
			}
		});
}
getWatchModeId(); //don't forget to call the function!
