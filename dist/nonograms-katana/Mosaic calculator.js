/*
	This code calculates how many mosaic fragments are still missing for 
	completing the currect mosaic. It also shows, which number of mosaic
	is currently in progress, how many fragments are already in this
	mosaic and the percentage of copmletion for this mosaic.
	It is displayed on the Mosaic page.
*/

//Changes every output cell in the table to "0" or "#0".
function delete_table_m(){
	document.getElementById("mosaic").innerHTML = "#0";
	document.getElementById("collected").innerHTML = "0";
	document.getElementById("needed").innerHTML = "0";
	document.getElementById("percent").innerHTML = "0";
}

//Calculates how many fragments are still needed to complete a mosaic, plus some other useful information.
function mosaic_calculator_f(){
	//var mosaic_sizes = [368, 640, 640, 640, 1280, 2560, 2560, 2560, 2560, 2560, 2040, 2040, 2040, 2040];
	var mosaic_sizes = document.getElementById('mosaic_sizes').innerHTML.split(',');
	var mosaics_f = [0];
	var fragment_counter = 0;
	for (i = 0; i < mosaic_sizes.length; i++){
		fragment_counter = fragment_counter + parseInt(mosaic_sizes[i]);
		mosaics_f.push(fragment_counter);
	}
	//var mosaics_f = [0, 368, 1008, 1648, 2288, 3568, 6128, 8688, 11248, 13808, 16368, 18408, 20448, 22488];
	
	var max_fragments = mosaics_f[mosaics_f.length - 1];
	var fragments = document.getElementById("fragments").value;
	
	//If the input is not a number or if the number is not between 0 and last mosaic fragment, clears the table.
	if(isNaN(fragments)){
    	document.getElementById("wrong_number").innerHTML = "Please enter a number.";
		delete_table_m();
		return;
        }
	if (fragments < 0){
		document.getElementById("wrong_number").innerHTML = "You have enter a number smaller than 0.";
		delete_table_m();
		return;
	}
	if (fragments > max_fragments){
		document.getElementById("wrong_number").innerHTML = "You have enter a number bigger than " + max_fragments + '.';
		delete_table_m();
		return;
	}
	if (fragments == max_fragments){
		document.getElementById("wrong_number").innerHTML = "Congratulations, you have completed all mosaics.";
		delete_table_m();
		return;
	}
	document.getElementById("wrong_number").innerHTML = "";
	
	//Logic of the calculator.
	for (i = 1; i < mosaics_f.length; i++){
		if (fragments < mosaics_f[i]){
			document.getElementById("mosaic").innerHTML = "#" + i;
			var collected = document.getElementById("collected").innerHTML = fragments - mosaics_f[i-1];
			document.getElementById("needed").innerHTML = mosaics_f[i] - fragments;
			document.getElementById("percent").innerHTML = Math.round((collected/(mosaics_f[i] - mosaics_f[i-1])) * 10000)/100 + "%";
			break;
		}
	}
}

//Creates the input box and button on page "Mosaic".
if (mw.config.get("wgPageName") === "Mosaic") {
	var inputBox = document.createElement("div");
	var input = document.createElement("input");
	input.id = "fragments";
	var getAnswer = document.createElement("button");
	getAnswer.innerHTML = "Calculate"; 
	getAnswer.id = "myBtn";
	getAnswer.addEventListener("click", mosaic_calculator_f); 
	inputBox.appendChild(input);
	inputBox.appendChild(getAnswer);
	inputBox.addEventListener("keyup", function(event) {
		if (event.keyCode === 13) {
			event.preventDefault();
			document.getElementById("myBtn").click();
		}
	});
	document.getElementById("mosaic_calculator").appendChild(inputBox); 
}