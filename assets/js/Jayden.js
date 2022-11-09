var actionButton = document.getElementById("28");
var cardEl = document.getElementsByClassName("movie-card");
function printConsole() {
    console.log("hello");
}

function show() {
    cardEl.style.display = "block";
}

actionButton.addEventListener("click", printConsole, show);

console.log(cardEl);