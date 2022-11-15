var watchItButton = document.getElementById("watch-movie");
var saveMovie = document.getElementById("save-movie");
var theSavedMovie = document.getElementById("the-saved-movie");
var remoteImg = document.getElementById("remote");
var movieBox = document.getElementById("streaming-avail");
var wholeMovieSection = document.getElementById("poster-section");
var suggestMovieBtn = document.getElementById("suggest-movie-btn");
var startOverBtn = document.getElementById("Start-over");
//Console log test
function printConsole() {
	console.log("test");
}
//Reveals buttons and movie information on remote click (button needs to be clicked twice to move UI down, find a fix??)
remoteImg.addEventListener("click", function revealMain() {
	var mainBody = document.querySelector("main");
	mainBody.style.display = "block";
	wholeMovieSection.style.display = "none";
	movieBox.style.display = "none";
	pickGenre.scrollIntoView(true);
})

suggestMovieBtn.addEventListener("click", function revealMovies() {
	wholeMovieSection.style.display = "block";
	movieBox.style.display = "block";
	movieBox.style.display = "flex";
	streamingAvail.scrollIntoView(true);
})

startOverBtn.addEventListener("click", function hideMovies() {
	wholeMovieSection.style.display = "none";
	movieBox.style.display = "none";
	sessionStorage.removeItem("genreIds");
	localStorage.setItem("genreIds", "[]");
})


// Fills sidebar with currently selected movie information (Might need to delete later)
function clickWatchButton() {

	var poster = document.getElementById("poster-img").src;
	var title = document.getElementById("original_title").textContent;
	var overview = document.getElementById("overview").textContent;
	var vote = document.getElementById("vote_average").textContent;
//Reveals the movie box
	movieBox.style.display = "block";
	movieBox.style.display =  "flex";

//Targets the sidebar and fills with their original information above
	document.getElementById("poster-img2").src = poster;
	document.getElementById("original_title2").textContent = title;
	document.getElementById("overview2").textContent = overview;
	document.getElementById("vote_average2").textContent = vote;
}


//Stores currently displayed movie into localStorage
function saveMyMovie() {
	// Clears local storage first if it contains previous movie
	if (localStorage !== null) {
		localStorage.clear();
	}
	var captureMovieElements = {
		posterEl: document.getElementById("poster-img").src,
		titleEl: document.getElementById("original_title").textContent,
		overviewEl: document.getElementById("overview").textContent,
		voteEl: document.getElementById("vote_average").textContent
	}
	
	localStorage.setItem("saved movie", JSON.stringify(captureMovieElements));
}

function showMyMovie() {
	var lastMovie = JSON.parse(localStorage.getItem("saved movie"));
	document.getElementById("poster-img2").src = lastMovie.posterEl;
	document.getElementById("original_title2").textContent = lastMovie.titleEl;
	document.getElementById("overview2").textContent = lastMovie.overviewEl;
	document.getElementById("vote_average2").textContent = lastMovie.voteEl;
}
suggestMovieBtn.addEventListener("click", clickWatchButton);
saveMovie.addEventListener("click", saveMyMovie);
theSavedMovie.addEventListener("click", showMyMovie);

