/* =================== 
   Places a small module 
   in the right rail, encouraging
   US voter registration.

   Original code by [[User:MarkvA]]
   =================== */

var rightRailModules = {
	config: {
		loadOnNamespaces: [0],
		locales: {
			image: {
				"en": "//images.wikia.nocookie.net/czech-prey-out/images/e/e7/VoteNow.jpg"
			},
			altText: {
				"en": "Register to vote!"
			},
			url: {
				"en": "//vote.gov"
			}
		}
	},
 
	checkRail: 0,
	
	adoptImage: "",
	
	adoptAltText: "",
	
	adoptUrl: "",
	
	localizeModules: function() {
		var	contentLanguage = wgContentLanguage,
			localizedAdoptImage = typeof this.config.locales.image[contentLanguage] !== "undefined" ? this.config.locales.image[contentLanguage] : this.config.locales.image["en"];
			localizedAltText = typeof this.config.locales.altText[contentLanguage] !== "undefined" ? this.config.locales.altText[contentLanguage] : this.config.locales.altText["en"];
			localizedUrl = typeof this.config.locales.url[contentLanguage] !== "undefined" ? this.config.locales.url[contentLanguage] : this.config.locales.url["en"];
			
		this.adoptImage = localizedAdoptImage;
		this.adoptAltText = localizedAltText;
		this.adoptUrl = localizedUrl;
	},
 
	addModules: function() {
		var railHasLoaded = $("#WikiaRail .rail-module").length > 0;
		if (railHasLoaded) {
			clearInterval(this.checkRail);
			this.addCTABanner();
		}		
	},
 
	addCTABanner: function() {
		var	addBefore = $('#wikia-recent-activity'), 
			bannerHTML = '<div class="cta-banner" style="margin: 15px auto; text-align:center;"><a href="' + this.adoptUrl + '"><img alt="' + this.adoptAltText + '" src="' + this.adoptImage + '"></a></div>';
		addBefore.before(bannerHTML);
	},
 
	init: function() {
		var thisObject = this;
		if (($.inArray(mw.config.get('wgNamespaceNumber'), this.config.loadOnNamespaces) > -1) && !mw.config.get('wgIsMainPage')) {
			this.localizeModules();
			this.checkRail = setInterval(function() { thisObject.addModules(); }, 750);
		}		
	}
}
 
$(function() {
	rightRailModules.init();
});