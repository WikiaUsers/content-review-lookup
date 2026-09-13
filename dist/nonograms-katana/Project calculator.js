/*
	This code calculates player's project progression based on the amount of
	projects already completed. But not based on total projects that can be
	completed, but based on total investments that can be completed.
	It is displayed on Projects page.
*/

// Changes every output cell in the table to "0" or "0%".
function delete_table_projects(){
	document.getElementById("investments_completed").innerHTML = "0";
	document.getElementById("investments_needed").innerHTML = "0";
	document.getElementById("percent").innerHTML = "0%";
}

// Calculates how many investments are still needed.
function project_calculator_f(){
	var player_projects_completed = Number(document.getElementById("current_projects").value);
	
	// Calculates the maximum number of inputs, based on the amount of projects.
	var total_projects = document.getElementById("amount_of_projects").innerHTML;
	var total_investments = 0;
	for (let i = 0; i < total_projects; i++) {
	  total_investments = total_investments + 10 + i;
	}
	
	// If the input is not a number or if the number is not between 0 and maximum projects, clears the table.
	if (isNaN(player_projects_completed) || player_projects_completed == ""){
    	document.getElementById("wrong_number").innerHTML = "Please enter a number.";
		delete_table_projects();
		return;
        }
	if (player_projects_completed < 0){
		document.getElementById("wrong_number").innerHTML = "You have enter a number smaller than 0.";
		delete_table_projects();
		return;
	}
	if (player_projects_completed > total_projects){
		document.getElementById("wrong_number").innerHTML = "You have enter a number bigger than " + total_projects + '.';
		delete_table_projects();
		return;
	}
	if (player_projects_completed == total_projects){
		document.getElementById("wrong_number").innerHTML = "Congratulations, you have completed all projects.";
		delete_table_projects();
		return;
	}
	document.getElementById("wrong_number").innerHTML = "";
	
	var player_investments = 0;
	for (let i = 0; i < player_projects_completed; i++) {
	  player_investments = player_investments + 10 + i;
	}
	
	document.getElementById("investments_completed").innerHTML = player_investments;
	document.getElementById("investments_needed").innerHTML = total_investments-player_investments;
	document.getElementById("percent").innerHTML = Math.round(player_investments/total_investments*10000)/100 + "%";
}

// Creates the input box and button on page "Projects".
if (mw.config.get("wgPageName") === "Projects") {
	var inputBox = document.createElement("div");
	var input = document.createElement("input");
	input.id = "current_projects";
	var getAnswer = document.createElement("button");
	getAnswer.innerHTML = "Calculate"; 
	getAnswer.id = "myBtn";
	getAnswer.addEventListener("click", project_calculator_f); 
	inputBox.appendChild(input);
	inputBox.appendChild(getAnswer);
	inputBox.addEventListener("keyup", function(event) {
		if (event.keyCode === 13) {
			event.preventDefault();
			document.getElementById("myBtn").click();
		}
	});
	document.getElementById("project_calculator").appendChild(inputBox); 
}