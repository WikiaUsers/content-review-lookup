/* Change la couleur du texte du titre et des entêtes des infoboxes 
en fonction la couleur de fond */
function piColor() {
	var rgb = $('.pi-title').css('backgroundColor');
	var colors = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
	
	var r = colors[1];
	var g = colors[2];
	var b = colors[3];
	var yiq = ((r*299)+(g*587)+(b*114))/1000;
	
	if (yiq >= 128) {
		/* Si le fond est clair, le texte est foncé */
		$('.pi-title').css('color', '#0e191a');
		$('.pi-header').css('color', '#0e191a');
	} else {
		/* Si le fond est foncé, le texte est clair */
		$('.pi-title').css('color', '#fff');
		$('.pi-header').css('color', '#fff');
	}
}
/* Màj en cas de changement de couleur */
setInterval(piColor, 200);