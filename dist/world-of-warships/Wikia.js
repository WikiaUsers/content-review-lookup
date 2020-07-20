/* Add modules to the right rail */
var rightRailModules = {
	config: {
		loadOnNamespaces: [0]
	},
 
	checkRail: 0,
 
	addModules: function() {
		var railHasLoaded = $("#WikiaRail .module").length > 0;
		if (railHasLoaded) {
			clearInterval(this.checkRail);
			this.addCTABanner();
		}		
	},
 
	addCTABanner: function() {
		var	addBefore = $('#WikiaRail #WikiaRecentActivity'), 
			bannerHTML = '<div class="cta-banner" style="margin: 15px 0;"><a href="http://cpm.wargaming.net/7v6lk353/?pub_id=communityspiff"><img alt="Play For Free" src="https://vignette.wikia.nocookie.net/world-of-warships/images/e/ec/Play_For_Free_CTA.jpg/revision/latest?cb=20161109192853"><a></div>';
		addBefore.before(bannerHTML);
	},
 
	init: function() {
		var thisObject = this;
		if (($.inArray(mw.config.get('wgNamespaceNumber'), this.config.loadOnNamespaces) > -1) && !mw.config.get('wgIsMainPage')) {
			this.checkRail = setInterval(function() { thisObject.addModules(); }, 750);
		}		
	}
}
 
$(function() {
	rightRailModules.init();
});