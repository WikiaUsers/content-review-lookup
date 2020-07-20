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
		var	addBefore = $('#wikia-recent-activity'), 
			bannerHTML = '<div class="cta-banner" style="margin: 15px 0;"><a href="https://bit.ly/2ghPG6O"><img alt="Download now" src="https://images.wikia.nocookie.net/czechout/images/d/de/BlankPic.png"><a></div>';
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