var SocialMediaButtons = { 
	position: 'top',
	colorScheme: 'black',
	buttonSize: '20px'
};
importScriptPage('SocialIcons/code.js','dev');

// Personnalisation de la bordure et des titres de l'infobox
(function() {
	var changeColors = function() {
		var PIs = $('.portable-infobox');
		if (PIs.length) PIs.each(function() {
			var $PI = $(this);
			var color = '',
				classNames = $PI.attr('class').split(' ');
			for (var i = 0; i < classNames.length; i++) {
				if (classNames[i].indexOf('pi-theme-_') !== -1) {
					color = classNames[i].replace('pi-theme-_', '');
					break;
				}
			}
			if (color) {
				$PI.css('border', '2px solid #' + color);
			}
		});
		var PILs = $('.portable-infobox .pi-data-label');
		if (PILs.length) PILs.each(function() {
			var $PIL = $(this);
			var color = '',
				classNames = $PIL.attr('class').split(' ');
			for (var i = 0; i < classNames.length; i++) {
				if (classNames[i].indexOf('pi-data-label .pi-theme-_') !== -1) {
					color = classNames[i].replace('pi-data-label .pi-theme-_', '');
					break;
				}
			}
			if (color) {
				$PIL.css('background', '#' + color);
			}
		});
	};
	// Run it right now
	changeColors();
})();