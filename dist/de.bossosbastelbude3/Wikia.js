/* background Wikia Adventskalender 2013 */
/* $('body').bind('click', function(e) { var obj = (e.target ? e.target : e.srcElement); if (obj.tagName != 'body') return true; window.location.href = 'http://google.com'; return false; });
*/
/***** Any JavaScript here will be applied to the Wikia/Oasis on the entire site. *****/
/* Skin */
/** Legal Info box **/
addOnloadHook(function() {
	if (wgPageName != "Shadow_of_Mordor_Wikia") {
		checkRightRail = setInterval(addLegalModule,100);
	}
});
 
function addLegalModule() {
	if ($("#WikiaRail .loading").length == 0) {
		var legalHTML = '<div class="LegalInfoModule module"><h1 class="header-legalinfo">Legal Info</h1><div class="box-legalinfo"><div class="legal-ESRB"></div><div class="legal-Monolith"></div><div class="legal-WBGames"></div><div class="legal-text">MIDDLE-EARTH: SHADOW OF MORDOR &copy; 2013 Warner Bros. Entertainment Inc. Developed by Monolith. In association with WingNut Films. &copy; 2013 New Line Productions, Inc. &copy; The Saul Zaentz Company. MIDDLE-EARTH: SHADOW OF MORDOR, THE HOBBIT, and the names of the characters, items, events and places therein are trademarks of The Saul Zaentz Company d/b/a Middle-earth Enterprises under license to Warner Bros. Interactive Entertainment. All other trademarks and copyrights are the property of their respective owners. All rights reserved.<br /><br />MONOLITH LOGO, WB GAMES LOGO, WB SHIELD: &trade; &amp; &copy; Warner Bros. Entertainment Inc. (s13)</div></div></div>'
		$('#WikiaRail').append(legalHTML);
		clearInterval(checkRightRail);
	}
}
 
/* Main page */
 
/* General */
/** Language dropdown **/
function appendLanguageDropdown() {
	var borderColor = $('.WikiaPageHeader .comments').css('border-top-color');
	var server = wgServer.replace("http://","");
	var html = '<nav style="border: 1px solid '+borderColor+';" class="wikia-menu-button secondary combined chooselanguage"><span class="drop"><img style="margin-top: 3px; margin-left: 2px; margin-right: 4px;" class="chevron" src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D"></span><ul style="min-width: 42px; margin-top: 1px; border: 1px solid '+borderColor+'; border-top: none; text-align:center;" class="WikiaMenuElement" style="min-width:20px;"></ul></nav>';
	flags = {};
	flags['nl'] = '<img class="nl-image" width="22" height="16" src="https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/2/20/Flag_of_the_Netherlands.svg" alt="Dutch">';
	flags['ja'] = '<img class="ja-image" width="22" height="16" src="https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/9/9e/Flag_of_Japan.svg" alt="Japanese">';
	flags['it'] = '<img class="it-image" width="22" height="16" src="https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/0/03/Flag_of_Italy.svg" alt="Italian">';
	flags['fr'] = '<img class="fr-image" width="22" height="16" src="https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/c/c3/Flag_of_France.svg" alt="French">';
	flags['pl'] = '<img class="pl-image" width="22" height="16" src="https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/1/12/Flag_of_Poland.svg" alt="Polish">';
	flags['de'] = '<img class="de-image" width="22" height="16" src="https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/b/ba/Flag_of_Germany.svg" alt="German">';
	flags['ru'] = '<img class="ru-image" width="22" height="16" src="https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/f/f3/Flag_of_Russia.svg" alt="Russian">';
	flags['zh'] = '<img class="zh-image" width="22" height="16" src="https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/f/fa/Flag_of_the_People%27s_Republic_of_China.svg" alt="Chinese">';
	flags['es'] = '<img class="es-image" width="22" height="16" src="https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/9/9a/Flag_of_Spain.svg" alt="Spanish">';
	flags['en'] = '<img class="en-image" width="22" height="16" src="https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/a/a4/Flag_of_the_United_States.svg" alt="English">';
	$('.WikiaPageHeader .comments').after(html);
 
	languages = [];
	$('.WikiaArticleInterlang ul li a').each(function() {
		var languageFull = $(this).text();
		switch (languageFull) {
			case "English":
				languages.push("en");
				break;
			case "Español":
				languages.push("es");
				break;
			case "中文":
				languages.push("zh");
				break;
			case "Русский":
				languages.push("ru");
				break;
			case "Deutsch":
				languages.push("de");
				break;
			case "Polski":
				languages.push("pl");
				break;
			case "Français":
				languages.push("fr");
				break;
			case "Italiano":
				languages.push("it");
				break;
			case "日本語":
				languages.push("ja");
				break;
			case "Nederlands":
				languages.push("nl");
				break;
		}
	});
 
	var language = wgContentLanguage;
	$.each(flags, function (key, value) {
		if (key == language) {
			$('.WikiaPageHeader .chooselanguage').prepend(flags[key]);
		} 
		else {
			if (languages.indexOf(key) > -1) {
				$('.WikiaPageHeader .chooselanguage ul').prepend('<a style="display: inline; padding: 0; height: 0; line-height: 0;" class="'+ key +'-link" href="http://'+ key +'.'+ server +'"><li style="border-top: 1px solid '+ borderColor +'; padding-top: 3px; padding-bottom: 3px;" class="' + key + '">' + flags[key] + '</li></a>');
			}
		}
	});
 
	$('.WikiaPageHeader .chooselanguage').on('click', function () {
		if ($(this).hasClass('active') == false) {
			$(this).addClass('active');
		} 
		else {
			$(this).removeClass('active');
		}
	});
 
	$('.WikiaPageHeader .chooselanguage').on('mouseleave', function () {
		var that = this;
		var timeOut = setTimeout(function () { $(that).removeClass('active'); }, 500);
 
		$('.chooselanguage').on('mouseenter', function () {
			clearTimeout(timeOut);
		});
	});
}
if( $('.WikiaArticleInterlang').length > 0 ) {
	addOnloadHook(appendLanguageDropdown);
}
 
/*** Click tracking ***/
jQuery( function($) {
	var track = Wikia.Tracker.buildTrackingFunction({
		category: 'interlanguage-nav',
		action: Wikia.Tracker.ACTIONS.CLICK,
		trackingMethod: 'ga'
	});
	/** Wikia Interlanguage Default Link **/
	var $WikiaInterlanguageDefaultLink = $('nav.WikiaArticleInterlang');
	$WikiaInterlanguageDefaultLink.on( 'mousedown', 'a', function(e) {
		track({
			browserEvent: e,
			label: 'interlanguage-deafult-link'
		});
	} );
	/** WikiaInterlanguageCustomLink **/
	var $WikiaInterlanguageCustomLink = $('.WikiaPageHeader');
	$WikiaInterlanguageCustomLink.on( 'mousedown', '.chooselanguage a', function(e) {
		track({
			browserEvent: e,
			label: 'interlanguage-custom-link'
		});
	} );
} );
 
/** Social Media icons **/
var SocialMediaButtonsNamespaces = [0, 6, 14, 500];
var SocialMediaButtons = { 
	position: "top",
	colorScheme: "dark",
	buttonSize: "default",
	wikiTwitterAccount: "default"
};
importScriptPage('SocialIcons/code.js','dev');