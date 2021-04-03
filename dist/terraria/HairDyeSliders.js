function colorSpeed(slidervalue) {
	num = slidervalue * 0.1;
	num2 = 10;
	num3 = num / num2;
	num4 = 1 - num3;
	playerHairColor = { "R": 215, "G": 90, "B": 55 };
	newColor = { "R": 255, "G": 255, "B": 255 };
	newColor.R = (75 * num3 + playerHairColor.R * num4);
	newColor.G = (255 * num3 + playerHairColor.G * num4);
	newColor.B = (200 * num3 + playerHairColor.B * num4);
	return "rgb(" + newColor.R + "," + newColor.G + "," + newColor.B + ")";
}

function colorTime(slidervalue) {
	time = slidervalue*864 + 16200;
	time -= (time > 86400 ? 86400 : 0);
	
	color4 = { "R": 1, "G": 142, "B": 255 };
	color5 = { "R": 255, "G": 255, "B": 0 };
	color6 = { "R": 211, "G": 45, "B": 127 };
	color7 = { "R": 67, "G": 44, "B": 118 };
	newColor = { "R": 255, "G": 255, "B": 255 };
	
	if (time >= 16200 && time < 70200) {
		if (time < 43200) {
			num5 = time / 43200;
			num6 = 1 - num5;
			newColor.R = (color4.R * num6 + color5.R * num5);
			newColor.G = (color4.G * num6 + color5.G * num5);
			newColor.B = (color4.B * num6 + color5.B * num5);
		} else {
			num7 = 43200;
			num8 = ((time - num7) / (70200 - num7));
			num9 = 1 - num8;
			newColor.R = (color5.R * num9 + color6.R * num8);
			newColor.G = (color5.G * num9 + color6.G * num8);
			newColor.B = (color5.B * num9 + color6.B * num8);
		}
	} else {
		if (time >= 70200 && time < 86400) {
			num10 = (time / 86400);
			num11 = 1 - num10;
			newColor.R = (color6.R * num11 + color7.R * num10);
			newColor.G = (color6.G * num11 + color7.G * num10);
			newColor.B = (color6.B * num11 + color7.B * num10);
		} else {
			num12 = 0;
			num13 = ((time - num12) / (16200 - num12));
			num14 = 1 - num13;
			newColor.R = (color7.R * num14 + color4.R * num13);
			newColor.G = (color7.G * num14 + color4.G * num13);
			newColor.B = (color7.B * num14 + color4.B * num13);
		}
	}
	return "rgb(" + newColor.R + "," + newColor.G + "," + newColor.B + ")";
}

function textTime(slidervalue) {
	time = slidervalue*864 + 16200;
	time -= (time > 86400 ? 86400 : 0);
	if (time < 3600) {
		return Math.floor(time/3600 + 12) + ":" + Math.round((time/3600 + 12 - Math.floor(time/3600 + 12))*60).toString().padStart(2,0) + "&nbsp;AM";
	} else if (time < 43200) {
		return Math.floor(time/3600) + ":" + Math.round((time/3600 - Math.floor(time/3600))*60).toString().padStart(2,0) + "&nbsp;AM";
	} else if (time < 46800) {
		return Math.floor(time/3600) + ":" + Math.round((time/3600 - Math.floor(time/3600))*60).toString().padStart(2,0) + "&nbsp;PM";
	} else {
		return Math.floor(time/3600 - 12) + ":" + Math.round((time/3600 - 12 - Math.floor(time/3600 - 12))*60).toString().padStart(2,0) + "&nbsp;PM";
	}
}

colorFunctions = {
	"health": function(slidervalue) { return "rgb(" + (slidervalue * 0.01 * 235 + 20) + ",20,20)"; },
	"mana": function(slidervalue) { return "rgb(" + ((1-slidervalue * 0.01) * 200 + 50) + "," + ((1-slidervalue * 0.01) * 180 + 75) + ",255)"; },
	"speed": colorSpeed,
	"time": colorTime
};

textFunctions = {
	"speed": function(slidervalue) { return ((slidervalue == 100) ? "≥ 51" : Math.round(slidervalue/10 * 3.75*(15/11))); },
	"time": textTime
};

function colorFunc(id) {
	// return the function from the colorFunctions table if the id is correct
	// otherwise, return a fallback function that just returns white
	return ((id in colorFunctions) ? colorFunctions[id] : function() { return "#0ff"; });
}

function textFunc(id) {
	// return the function from the textFunctions table if the id is correct
	// otherwise, return a fallback function that just returns the raw, unchanged slider value
	return ((id in textFunctions) ? textFunctions[id] : function(slidervalue) { return slidervalue; });
}

$(document).ready(function() {
	// create all sliders and make them visible
	formsliderElem = document.createElement("input");
	$(formsliderElem)
		.addClass("formslider")
		.css({"margin-left": "0.5em", "margin-right": "0.5em"})
		.attr("type", "range");
	formElem = document.createElement("form");
	formElem.appendChild(formsliderElem);
	$(".slider-wrapper .slider").append(formElem);
	$(".slider-wrapper").removeAttr("style"); // remove the 'style="display:none;"'
	
	// set the initial values of all sliders
	$(".slider-wrapper").each(function(index) {
		baseselector = "#" + this.id + ".slider-wrapper ";
		
		initialValue = $(baseselector + ".inputvalue").text(); // get initial value
		
		$(baseselector + ".slider .formslider")
			.attr("id", "formslider-" + this.id)
			// set initial value on slider
			.val(initialValue);
		
		// set initial color value
		$(baseselector + ".output .color-box").css('background-color', colorFunc(this.id)(initialValue));
		// set initial text value
		$(baseselector + ".inputvalue").html(textFunc(this.id)(initialValue));
	});
	
	// bind the sliders to the respective outputs
	$(".slider-wrapper .slider .formslider").on('input', function() {
		id = this.id.substring(11);
		baseselector = "#" + id + ".slider-wrapper ";
		colorsliderValue = parseInt($(this).val());
		// update color display
		$(baseselector + ".output .color-box").css('background-color', colorFunc(id)(colorsliderValue));
		// update text display
		$(baseselector + ".inputvalue").html(textFunc(id)(colorsliderValue));
	});
});