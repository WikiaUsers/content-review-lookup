/* Add modules to the right rail
var rightRailModules = {
	config: {
		loadOnArticleId: [138]
	},
 
	checkRail: 0,
 
	addModules: function() {
		var railHasLoaded = $("#WikiaRail .rail-module").length > 0;
		if (railHasLoaded) {
			clearInterval(this.checkRail);
			this.addCTABanner();
		}		
	},
 
	addCTABanner: function() {
		var	addAfter = $('.chat-module'), 
			bannerHTML = '<div class="cta-banner" style="margin: 15px 0;"><a href="https://bit.ly/2ghPG6O"><img alt="Download now" src="https://images.wikia.nocookie.net/czechout/images/d/de/BlankPic.png"><a></div>';
		addAfter.after(bannerHTML);
	},
 
	init: function() {
		var thisObject = this;
		if (($.inArray(mw.config.get('wgArticleId'), this.config.loadOnArticleId) > -1)) {
			this.checkRail = setInterval(function() { thisObject.addModules(); }, 750);
		}		
	}
}
 
$(function() {
	rightRailModules.init();
});

*/