function getEffectiveness(t1, t2) {
	var result = new Array(17);
	var i = 0;
	while(i<17) {
		result[i] = t1[i] * t2[i];
		i ++;
	}
	return result;
}

function typeToArray(type) {
	if(type == "Fire") {
		return [0.5, 2, 0.5, 1, 1, 0.5, 1, 2, 0.5, 2, 1, 0.5, 1, 1, 1, 1, 1];
	}
	if(type == "Water") {
		return [0.5, 0.5, 2, 1, 1, 0.5, 2, 1, 1, 1, 2, 0.5, 1, 1, 1, 1, 1];
	}
	if(type == "Plant") {
		return [2, 0.5, 0.5, 0, 2, 2, 0.5, 1, 2, 0.5, 2, 1, 1, 1, 1, 1, 1];
	}
	if(type == "Light") {
		return [0.5, 1, 1, 0.5, 2, 1, 1, 1, 1, 1, 1, 2, 0.5, 0, 1, 1, 1];
	}
	if(type == "Dark") {
		return [2, 1, 1, 2, 0.5, 1, 1, 1, 2, 1, 1, 1, 1, 0.5, 1, 0.5, 1];
	}
	if(type == "Ice") {
		return [2, 1, 1, 1, 1, 0.5, 1, 0.5, 1, 1, 1, 2, 1, 1, 2, 1, 0.5];
	}
	if(type == "Electric") {
		return [1, 2, 1, 1, 1, 1, 0.5, 0.5, 1, 2, 1, 0.5, 1, 1, 1, 1, 1];
	}
	if(type == "Air") {
		return [1, 1, 1, 1, 1, 2, 2, 1, 0.5, 0, 1, 1, 1, 1, 0.5, 1, 1];
	}
	if(type == "Bug") {
		return [1, 1, 0.5, 1, 0.5, 2, 1, 2, 0.5, 0.5, 1, 1, 1, 1, 2, 1, 1];
	}
	if(type == "Earth") {
		return [1, 2, 2, 1, 1, 2, 0, 1, 1, 1, 0.5, 1, 1, 1, 1, 1, 1];
	}
	if(type == "Toxic") {
		return [1, 1, 0.5, 1, 1, 1, 1, 1, 1, 2, 0.5, 1, 1, 1, 0.5, 2, 1];
	}
	if(type == "Metal") {
		return [2, 1, 1, 1, 1, 0.5, 2, 0.5, 0.5, 2, 1, 0.5, 0.5, 1, 2, 0.5, 0.5];
	}
	if(type == "Ancient") {
		return [0.5, 0.5, 0.5, 2, 1, 1, 0.5, 1, 1, 1, 1, 2, 2, 0.5, 1, 1, 1];
	}
	if(type == "Spirit") {
		return [1, 1, 1, 2, 0.5, 1, 0.5, 1, 1, 1, 0.5, 1, 2, 2, 0, 1, 0.5];
	}
	if(type == "Brawler") {
		return [1, 1, 1, 1, 1, 0.5, 1, 2, 0.5, 1, 2, 1, 1, 2, 1, 2, 1];
	}
	if(type == "Mind") {
		return [1, 1, 1, 0.5, 2, 1, 1, 1, 2, 1, 1, 1, 1, 2, 0.5, 0.5, 1];
	}
	if(type == "Typeless") {
		return [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1];
	}
}

function displayType(typeArray) {
	var i = 0;
	var v = i+2;
	while(i<17) {
		if(typeArray[i] == 4) {
			$("td#typeTable-row1 > span.typeDisplay:nth-child("+v+")").show();
			$("#displayTypeNone-row1").hide();
		}
		else if(typeArray[i] == 2) {
			$("td#typeTable-row2 > span.typeDisplay:nth-child("+v+")").show();
			$("#displayTypeNone-row2").hide();
		}
		else if(typeArray[i] == 0.5) {
			$("td#typeTable-row3 > span.typeDisplay:nth-child("+v+")").show();
			$("#displayTypeNone-row3").hide();
		}
		else if(typeArray[i] == 0.25) {
			$("td#typeTable-row4 > span.typeDisplay:nth-child("+v+")").show();
			$("#displayTypeNone-row4").hide();
		}
		else if(typeArray[i] === 0) {
			$("td#typeTable-row5 > span.typeDisplay:nth-child("+v+")").show();
			$("#displayTypeNone-row5").hide();
		}
		else if(typeArray[i] == 1) {
			$("td#typeTable-row6 > span.typeDisplay:nth-child("+v+")").show();
			$("#displayTypeNone-row6").hide();
		}
		i++;
		v=i+2;
	}
}

function hideAll() {
	var i = 1;
	$(".displayTypeNone").show();
	while(i<19) {
		$("td#typeTable-row1 > span.typeDisplay:nth-child("+i+")").hide();
		$("td#typeTable-row2 > span.typeDisplay:nth-child("+i+")").hide();
		$("td#typeTable-row3 > span.typeDisplay:nth-child("+i+")").hide();
		$("td#typeTable-row4 > span.typeDisplay:nth-child("+i+")").hide();
		$("td#typeTable-row5 > span.typeDisplay:nth-child("+i+")").hide();
		$("td#typeTable-row6 > span.typeDisplay:nth-child("+i+")").hide();
		i++;
	}
}

$(document).ready(function() {
	var type1 = null;
	var type2 = null;
	var type1M = null;
	var type2M = null;
	var combinedType = null;
	
    $(".typeButton").click(function() {
		var id = this.id.substring(11);
		
		if(type1 == id || type2 == id) {
			if(type1 == id) {
				document.getElementById("typeButton-" + type1).style.filter = "brightness(100%)";
				if(type2 !== null) {
					document.getElementById("typeButton-" + type2).style.filter = "brightness(100%)";
					type1 = type2;
					document.getElementById("typeButton-" + type1).style.filter = "brightness(50%)";
					type2 = null;
				}
				else {
					type1 = null;
				}
			}
			if(type2 == id) {
				document.getElementById("typeButton-" + type2).style.filter = "brightness(100%)";
				type2 = null;
			}
		}
		else {
			if(type1 === null) {
				type1 = id;
				document.getElementById("typeButton-" + type1).style.filter = "brightness(50%)";
			}
			else if(type2 === null) {
				type2 = id;
				document.getElementById("typeButton-" + type2).style.filter = "brightness(50%)";
			}
		}
		
		hideAll();
		if(type1 !== null && type2 !== null) {
			type1M = typeToArray(type1);
			type2M = typeToArray(type2);
			combinedType = getEffectiveness(type1M, type2M);
			displayType(combinedType);
		}
		else if(type1 !== null) {
			type1M = typeToArray(type1);
			displayType(type1M);
		}
		
		
    });
 
});