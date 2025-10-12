/* Any JavaScript here will be loaded for all users on every page load. */

/* Rail WAM */
window.railWAM = {
    logPage:"Project:WAM Log"
};

/* Add .activetab to the active tab - By Fujimaru-kun from Fairy-Tail Fr Wiki  */
$( '.pi-theme-tab .pi-header .selflink').parent().addClass('activetab');

/* Change color of infoboxes title and headers 
depending of background color */
function piColor() {
	if ($('.pi-title').length) {
		var rgb = $('.pi-title').css('backgroundColor');
		var colors = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
		
		var r = colors[1];
		var g = colors[2];
		var b = colors[3];
		var yiq = ((r*299)+(g*587)+(b*114))/1000;
		
		if (yiq >= 128) {
			/* Dark text */
			$('.pi-title').css('color', '#0e191a');
			$('.pi-header').css('color', '#0e191a');
		} else {
			/* Light text */
			$('.pi-title').css('color', '#fff');
			$('.pi-header').css('color', '#fff');
		}
	}
}

/* Update each function together */
function updateList() {
	/* Update for color editor like DevTools (works only for title) */
	piColor();
}

setInterval( updateList, 500 );