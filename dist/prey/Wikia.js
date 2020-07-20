/* Add modules to the right rail */
/* Commenting Out Per BizDev Request Temporarily
var rightRailModules = {
	config: {
		loadOnNamespaces: [0]
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
		var	addBefore = $('#wikia-recent-activity'), 
			bannerHTML = '<div class="cta-banner" style="margin: 15px 0;"><a href="http://bs.serving-sys.com/serving/adServer.bs?cn=trd&mc=click&pli=20628738&PluID=0&ord=%%CACHEBUSTER%%"><img alt="Pre-order now" src="https://vignette.wikia.nocookie.net/prey/images/d/de/PreyPreOrder.png/revision/latest?cb=20170227213249"><a></div>';
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
*/