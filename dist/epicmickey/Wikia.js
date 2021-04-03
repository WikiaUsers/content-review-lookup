// New Applicable Games template
// Uses Template:Applicable Games to add navigation icons to the article title bar. Height of the icons is 25px and should conform to Fandom's customization guidelines.

var templateExists = $("#applicable-games").length;
var emImg = ["//vignette.wikia.nocookie.net/epicmickey/images/9/91/Em-0.png/revision/latest", "//vignette.wikia.nocookie.net/epicmickey/images/c/ca/Em-1.png/revision/latest"];
var em2Img = ["//vignette.wikia.nocookie.net/epicmickey/images/7/73/Em2-0.png/revision/latest", "//vignette.wikia.nocookie.net/epicmickey/images/a/af/Em2-1.png/revision/latest"]
var poiImg = ["//vignette.wikia.nocookie.net/epicmickey/images/c/ce/Poi-0.png/revision/latest", "//vignette.wikia.nocookie.net/epicmickey/images/7/71/Poi-1.png/revision/latest"]
 
function validateGameInput(val) {
	if(val !== undefined && (val === 1 || val === 0)) {
		return val;
	} else {
		return 0;
	}
}
 
var em = validateGameInput($("#applicable-games").data("one"));
var em2 = validateGameInput($("#applicable-games").data("two"));
var poi = validateGameInput($("#applicable-games").data("poi"));
 
if (templateExists) {
	$(".page-header__contribution div:not([class])").prepend("<div id='applicable-games-container'><a href='/wiki/Epic_Mickey'><div class='applicable-games-icon' style='background-image:url("+emImg[em]+")'></div></a><a href='/wiki/Epic_Mickey_2:_The_Power_of_Two'><div class='applicable-games-icon' style='background-image:url("+em2Img[em2]+")'></div></a><a href='/wiki/Epic_Mickey:_Power_of_Illusion'><div id='applicable-games-poi' class='applicable-games-icon' style='background-image:url("+poiImg[poi]+")'></div></a></div>");
}

// Interactive Wasteland map
// Makes locations in the interactive main page map clickable

document.querySelectorAll("#MP-map .map-location").forEach(function(location) {
    const id = location.id;
    location.addEventListener("click", function() {
        if (id === "location-lm") {
            window.location = "/wiki/Lonesome_Manor";
        }
        if (id === "location-potw") {
            window.location = "/wiki/Pirates_of_the_Wasteland";
        }
        if (id === "location-ms") {
            window.location = "/wiki/Mean_Street";
        }
        if (id === "location-gv") {
            window.location = "/wiki/Gremlin_Village";
        }
        if (id === "location-dbc") {
            window.location = "/wiki/Dark_Beauty_Castle";
        }
        if (id === "location-ot") {
            window.location = "/wiki/OsTown";
        }
        if (id === "location-mjm") {
            window.location = "/wiki/Mickeyjunk_Mountain";
        }
        if (id === "location-tc") {
            window.location = "/wiki/Tomorrow_City";
        }
    });
});