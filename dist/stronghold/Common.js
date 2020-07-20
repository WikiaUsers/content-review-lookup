/* Any JavaScript here will be loaded for all users on every page load. */

/*auto refresh*/
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];

/* For SHC:Buildings_Slide template */
function showtext(about) {
	var placetext = document.getElementById("textbox");
	placetext.innerHTML = about;
}

function changeallslide (destination) {
	var slideto = document.getElementById(destination);
	var slide = [];
	slide[0] = document.getElementById("UI1");
	slide[1] = document.getElementById("UI1_2");
	slide[2] = document.getElementById("UI1_3");
	slide[3] = document.getElementById("UI2");
	slide[4] = document.getElementById("UI3");
	slide[5] = document.getElementById("UI4");
	slide[6] = document.getElementById("UI5");
	slide[7] = document.getElementById("UI6");
	for (var i = 0; i < 8; i++) {
		slide[i].style.display = "none";
	}
	slideto.style.display = "initial";
}