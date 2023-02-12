$(function () {
    $('#WikiaRail').prepend("<div style='width:100%;padding:20px 0'><a href='https://www.fanatical.com/en/game/hogwarts-legacy-digital-deluxe-edition'><img src='//images.wikia.nocookie.net/czech-prey-out/images/2/2e/HogwartsFanatical.jpg'</a></div>");
});

/* =================== 
   Specific right rai CTA module

   Based on [[w:c:dev:AdoptMe.js]]
   =================== */


var rightRailModules = {
	config: {
		loadOnNamespaces: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14],
		locales: {
			image: {
				"en": "//images.wikia.nocookie.net/czech-prey-out/images/2/2e/HogwartsFanatical.jpg"
			},
			altText: {
				"en": "Go to school at Hogwarts!"
			},
			url: {
				"en": "https://www.fanatical.com/en/game/hogwarts-legacy-digital-deluxe-edition"
			}
		}
	},
 
	checkRail: 0,
	
	adoptImage: "",
	
	adoptAltText: "",
	
	adoptUrl: "",
/*	
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
		var railHasLoaded = $("#WikiaRail").length > 0;
		if (railHasLoaded) {
			clearInterval(this.checkRail);
			this.addCTABanner();
		}		
	},
 */
	addCTABanner: function() {
		var	addBefore = $('#WikiaRail'), 
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