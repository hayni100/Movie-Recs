var remote = document.querySelector("#remote");
var pickGenre = document.querySelector(".pick-genre");
var movieTicket = document.querySelector("#suggest-movie-btn")
var suggestedMovie = document.querySelector("#your-movie");

// clickable buttons
remote.addEventListener("click", function() {
pickGenre.scrollIntoView(true);
});

movieTicket.addEventListener("click", function() {
    suggestedMovie.scrollIntoView(true);
    });

    