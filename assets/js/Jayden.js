// var sectionEl = document.getElementsByClassName("poster");
// var watchItButton = document.getElementById("watch-movie");
// function printConsole() {
// 	console.log("test");
// }

// watchItButton.addEventListener("click", printConsole);

// var save = localStorage.setItem("saved_show");


///Proposed expansion of genre buttons////////////////////////////////////////////////// Rhys thinks it would be cool to recommend movies based on multiple preferred genres. the following is a possible expanded version of grabData. instead of just running our program on one genre button, it will allow the user to select multiple genre buttons before submitting them. It could use buttons that toggle colors when pressed and unpressed. maybe it should use local storage to store the genre values.
//localStorage.clear(); //start with a clean slate is optional in case buttons are not toggles. 
function createEmptyStorage() {
	localStorage.setItem("genreIds","[]")
	}
	createEmptyStorage();
	
	
	buttonContainerEl.addEventListener("click", grabData);
	function grabData(event) 
	{ 
	var localGenreIds= JSON.parse(localStorage.getItem("genreIds"));//this an array made from the string in local storage
			var genreID = event.target.dataset.genreid;
			localGenreIds.push(genreID)//this will push genreID onto the end of the array. 
			console.log("genreID after a click:  "+ genreID);
				localStorage.setItem("genreIds", JSON.stringify(localGenreIds));//localGenreIds is an array data typ
	}
	
	//build a string from whats in local storage
	