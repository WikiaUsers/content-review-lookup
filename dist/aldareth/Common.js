/* Any JavaScript here will be loaded for all users on every page load. */


var element = document.getElementById("OpacitySlider");
if(element != null){
	var input = document.createElement("input");
	input.type = "range";
	input.min = "1";
	input.max = "100";
	input.value = "50";
	input.classList.add("OpacitySliderClass");
	element.appendChild(input);
	input.oninput = function(){ChangeOpacity(this.value)};
	input.onchange = function(){ChangeOpacity(this.value)};

}

function ChangeOpacity(newOpacity){
	var topElement = document.getElementById("OpacityImgTop");
	topElement.style.opacity = newOpacity/100;

}