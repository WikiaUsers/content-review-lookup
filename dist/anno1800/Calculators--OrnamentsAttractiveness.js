//Set up the id used to call the calculator
var container = $('#ornamentsattractiveness_calculator');

//Defining elements of the calculator: labels and input boxes
var Label_tiles=$("<label class='calculator_input_label'></label>").text("Tiles occupied by ornaments: ").css({"width":"250px","float":"left"});
var Input_tiles=$("<input type=number class='calculator_input_amount' id='calculator_ornamentsattractiveness_tiles'>");
var Label_population=$("<label class='calculator_input_label'></label>").text("Maximum population: ").css({"width":"250px","float":"left"});
var Input_population=$("<input type=number class='calculator_input_amount' id='calculator_ornamentsattractiveness_population'>");

//Defining buttons and the placeholder of the calculator's result
var button_calc = $("<button class='calculator_button'></button>").text("Calculate");
var button_clear = $("<button class='calculator_button'></button>").text("Clear").css({"margin-left":"2.5em"});
var value=$("<p class='calculator_finaloutput' id='calculator_ornamentsattractiveness_value'>Result:</p>");

//Adding the contents of the calculator onto a page where there is an element with container's id
container.append(Label_tiles, Input_tiles, "<br><br>",Label_population, Input_population);
container.append("<br><br>", button_calc, button_clear);
container.append("<br>",value);

//Programming the calculation button
button_calc.click( function() {
	//Defining and getting input values
	var Tiles = Number(document.getElementById('calculator_ornamentsattractiveness_tiles').value);
	var Pop = Number(document.getElementById('calculator_ornamentsattractiveness_population').value);
	
	//Checking if input is correct
	if (isNaN(Tiles) || isNaN(Pop) ) {
		$("#calculator_ornamentsattractiveness_value").html("Error! Please insert numerical values");
    } else if (Tiles<=0 || Pop<=0) {
    	$("#calculator_ornamentsattractiveness_value").html("Result: You gain 0 attractiveness points from ornaments");
    } else {
    	//When input is correct, calculate and show the final result
    	var attractiveness = Tiles * Pop / (5 *(Tiles + Pop * 2));
    	var finalresult = "Result: You gain " +Math.floor(attractiveness)+ " attractiveness points from ornaments (non-rounded value: " + attractiveness +")";
    	$("#calculator_ornamentsattractiveness_value").html(finalresult);
    }
}); //Programming calculation button is finished

//Programming button to clear the input boxes and the output
button_clear.click( function() {
	$("#calculator_ornamentsattractiveness_tiles").val("");
	$("#calculator_ornamentsattractiveness_population").val("");
	$("#calculator_ornamentsattractiveness_value").html("Result:");
});