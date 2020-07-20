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
				$PI.css('border', '3px #' + color + 'ridge');
				$PI.find('h2').css('background-color', '#' + color);
			}
		});
	};
	// Run it now
	changeColors();
	// Bind it to TabView loadContent function, so Portable Infoboxes
	// inside TabView can also have fabulous custom backgrounds.
	// - - - -
	// WARNING! This may cause compatibility issues!
	/*
	TabViewClass.prototype.loadContent = function(tabLink) {
		var tabUrl = tabLink.attr('href')
		  , dataTabId = tabLink.parent().attr('data-tab')
		  , containerSelector = $('#' + this.cashedStuff.containersWrapperId).children('div[data-tab-body="' + dataTabId + '"]');
		if (containerSelector.data('loaded') !== true) {
			containerSelector.startThrobbing();
			$.get(tabUrl, {
				action: 'render'
			}, function(html) {
				containerSelector.html(html).data('loaded', true).stopThrobbing();
				mw.hook('wikipage.content').fire(containerSelector);
				changeColors();
			});
		}
	};
	*/
})();
 
var background = [
    '#06030c url(https://vignette.wikia.nocookie.net/yakusokunoneverland/images/5/50/Wiki-background) 50% -30px/cover no-repeat fixed',
    'url("https://vignette.wikia.nocookie.net/yakusokunoneverland/images/8/8a/Wiki-background.jpg") 0 0 / cover no-repeat fixed rgb(6, 3, 12)'
	];
 
var final = background[Math.floor(Math.random() * background.length)];
$('body.skin-oasis').css({
   'background' : final
});