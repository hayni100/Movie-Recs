var sectionEl = document.getElementsByClassName("poster");
var watchItButton = document.getElementById("watch-movie");
function printConsole() {
	console.log("test");
}

watchItButton.addEventListener("click", printConsole);

var save = localStorage.setItem("saved_show");


