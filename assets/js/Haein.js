var remote = document.querySelector("#remote");
var pickGenre = document.querySelector(".pick-genre");
var suggestBtn = document.querySelector("#suggest-movie-btn")
var suggestedMovie = document.querySelector("#your-movie");
var watchMovieBtn = document.querySelector("#watch-movie");
var streamingAvail = document.querySelector("#streaming-avail");
var startOverBtn = document.querySelector("#start-over");
var savedMovieBtn = document.querySelector("#saved-movie");
var modal = document.querySelector(".modal");
var closeModal = document.querySelector("#close-modal");
var buttons = document.querySelector("button")

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

savedMovieBtn.addEventListener("click", function () {
    console.log("open modal");
    modal.classList.add("is-active");
    modal.classList.add("is-clipped");
});

closeModal.addEventListener("click", function () {
    console.log("close modal");
    modal.classList.remove("is-active");
    modal.classList.remove("is-clipped");
});

 