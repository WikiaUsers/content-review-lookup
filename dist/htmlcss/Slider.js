(function(window, mw, $) {
	"use strict";
	
	if (window.sliderLoaded) return;
	window.sliderLoaded = true;
	
	const slider = {
		mw: mw.config.get(),
		dependencies: ["mediawiki.util", "mediawiki.api"],
		target: ".mp-navigation",
		start: function() {
			mw.loader.using(this.dependencies)
				.then(this.init.bind(this));
		},
		init: function() {
			
		}
	};
	
	window.mpSlider = slider;
})(window, mediaWiki, jQuery);