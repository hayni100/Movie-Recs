var watchItButton = document.getElementById("watch-movie");
var saveMovie = document.getElementById("save-movie");
var theSavedMovie = document.getElementById("saved-movie");
var remoteImg = document.getElementById("remote");
var movieBox = document.getElementById("streaming-avail");
var wholeMovieSection = document.getElementById("poster-section");
var suggestMovieBtn = document.getElementById("suggest-movie-btn");
var startOverBtn = document.getElementById("Start-over");
//Console log test
function printConsole() {
	console.log("test");
}
//Reveals buttons and movie information on remote click
remoteImg.addEventListener("click", function revealMain() {
	var mainBody = document.querySelector("main");
	mainBody.style.display = "block";
	wholeMovieSection.style.display = "none";
	movieBox.style.display = "none";
	pickGenre.scrollIntoView(true);
});

suggestMovieBtn.addEventListener("click", function revealMovies() {
	wholeMovieSection.style.display = "block";
	movieBox.style.display = "block";
	movieBox.style.display = "flex";
	streamingAvail.scrollIntoView(true);
});

startOverBtn.addEventListener("click", function hideMovies() {
	wholeMovieSection.style.display = "none";
	movieBox.style.display = "none";
	sessionStorage.removeItem("genreIds");
	localStorage.setItem("genreIds", "[]");
});

// Fills sidebar with currently selected movie information (Might need to delete later)
function clickWatchButton() {
	var poster = document.getElementById("poster-img").src;
	var title = document.getElementById("original_title").textContent;
	var overview = document.getElementById("overview").textContent;
	var vote = document.getElementById("vote_average").textContent;
	//Reveals the movie box
	movieBox.style.display = "block";
	movieBox.style.display = "flex";

	//Targets the sidebar and fills with their original information above
	document.getElementById("poster-img2").src = poster;
	document.getElementById("original_title2").textContent = title;
	document.getElementById("overview2").textContent = overview;
	document.getElementById("vote_average2").textContent = [
		"Rating: " + vote + "/10",
	];
}

//Stores currently displayed movie into localStorage
function saveMyMovie() {
	// Clears local storage first if it contains previous movie
	if (localStorage !== null) {
		localStorage.clear();
	}
	var captureMovieElements = {
		posterEl: document.getElementById("poster-img2").src,
		titleEl: document.getElementById("original_title2").textContent,
		overviewEl: document.getElementById("overview2").textContent,
		voteEl: document.getElementById("vote_average2").textContent,
	};

	localStorage.setItem("saved movie", JSON.stringify(captureMovieElements));
}

function showMyMovie() {
	var lastMovie = JSON.parse(localStorage.getItem("saved movie"));
	console.log(lastMovie);
	document.getElementById("modal-poster").src = lastMovie.posterEl;
	document.getElementById("modal-movie-name").textContent = lastMovie.titleEl;
	document.getElementById("modal-movie-plot").textContent =
		lastMovie.overviewEl;
	document.getElementById("modal-movie-rating").textContent = lastMovie.voteEl;
}
suggestMovieBtn.addEventListener("click", clickWatchButton);
saveMovie.addEventListener("click", saveMyMovie);
theSavedMovie.addEventListener("click", showMyMovie);
// theSavedMovie.addEventListener("click", showMyMovie);
