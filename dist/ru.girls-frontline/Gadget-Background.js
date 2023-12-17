$(document).ready(function() {
	background_elements = {
		"background-character": "character",
		"background-rarity": "rarity",
	};
	for (var id in background_elements) {
		element = document.getElementById(id);
		if (element !== null) {
			generate_bg_element(element, background_elements[id]);
			element.remove();
		}
	}
});

function generate_bg_element(bg_element, type) {
	if (bg_element === null) {
		return;
	}
	var style = "";
	var file = "";
	for (var i = 0; i < bg_element.classList.length; i++) {
		var currentClass = bg_element.classList.item(i);
		if (currentClass.startsWith("file=")) {
			file = currentClass.replace("file=", "");
		} else if (currentClass.startsWith("style=")) {
			style = currentClass.replace("style=", "");
		}
	}
	if (file === "") {
		return;
	}
	requestUrl = "/api.php?action=query&titles=File:" + file + "&format=json&prop=imageinfo&iiprop=url";
	var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
        	response = JSON.parse(xmlHttp.responseText).query.pages;
        	for (var key in response) {
        		newUrl = response[key].imageinfo[0].url;
        	}
            create_bg_element(newUrl, style, type);
        }
    };
    xmlHttp.open("GET", requestUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

function create_bg_element(imageUrl, style, type) {
	$("#mw-navigation").append("<img src=\"" + imageUrl + "\" id=\"bg-" + type + "\" class=\"bg-" + type + " nomobile\" style=\"" + style + "\"/>");
	$("#bg-" + type).fadeIn().css('user-select', 'none');
}