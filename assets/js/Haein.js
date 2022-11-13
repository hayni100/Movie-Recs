var remote = document.querySelector("#remote");
var pickGenre = document.querySelector(".pick-genre");
var suggestBtn = document.querySelector("#suggest-movie-btn")
var suggestedMovie = document.querySelector("#your-movie");
var watchMovieBtn = document.querySelector("#watch-movie");
var streamingAvail = document.querySelector("#streaming-avail");
var startOverBtn = document.querySelector("#start-over");
var savedMovieBtn = document.querySelector("#saved-movie");
var modal = document.querySelector(".modal");

// click to view next page//
remote.addEventListener("click", function () {
    pickGenre.scrollIntoView(true);
});

suggestBtn.addEventListener("click", function () {
    suggestedMovie.scrollIntoView(true);
});

watchMovieBtn.addEventListener("click", function () {
    streamingAvail.scrollIntoView(true);
});

//reshreshing page was not scrolling to top//
function scrollTop() {
    if (history.scrollRestoration) {
        history.scrollRestoration = 'manual';
    } else {
        window.onbeforeunload = function () {
            window.scrollTo(0, 0);
        }
    }
}

//opening and closing modal for saved movie history//



//toggle movie suggestion page//
// suggestBtn.addEventListener("click",movieSuggest());

// function movieSuggest() {
//     var posterSection = document.querySelector(".poster-section");

//     posterSection.style.display = "none";


//     // if (posterSection.style.display === "block") {
//     //   posterSection.style.display = "none";
//     // } else {
//     //   posterSection.style.display = "block";
//     // }
//   }

