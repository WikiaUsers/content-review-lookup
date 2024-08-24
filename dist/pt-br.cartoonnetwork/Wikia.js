/* Main page */

/* General */
/** Language dropdown **/
function appendLanguageDropdown() {
	var borderColor = $('.WikiaPageHeader .comments').css('border-top-color');
	var server = wgServer.replace("http://","");
	var html = '<nav style="border: 1px solid '+borderColor+';" class="wikia-menu-button secondary combined chooselanguage"><span class="drop"><img style="margin-top: 3px; margin-left: 2px; margin-right: 4px;" class="chevron" src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D"></span><ul style="min-width: 42px; margin-top: 1px; border: 1px solid '+borderColor+'; border-top: none; text-align:center;" class="WikiaMenuElement" style="min-width:20px;"></ul></nav>';
	flags = {};
	flags['en'] = '<img class="en-image" width="22" height="16" src="https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/a/a4/Flag_of_the_United_States.svg" alt="English">';
	flags['es'] = '<img class="es-image" width="22" height="16" src="https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/9/9a/Flag_of_Spain.svg" alt="Spanish">';
	flags['pl'] = '<img class="pl-image" width="22" height="16" src="https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/1/12/Flag_of_Poland.svg" alt="Polish">';
	flags['pt-br'] = '<img class="pt-br-image" width="22" height="16" src="https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/0/05/Flag_of_Brazil.svg" alt="Brazilian Portuguese">';


	$('.WikiaPageHeader .comments').after(html);
 
	languages = {};
	$('.WikiaArticleInterlang ul li a').each(function() {
		var languageFull = $(this).text();
		var href = $(this).attr('href');
		var pageNameArray = href.split('/')
		var pageName = pageNameArray[pageNameArray.length - 1];
		switch (languageFull) {
			case "English":
				languages['en'] = href;
				break;
			case "Español":
				languages['es'] = href;
				break;
			case "Polski":
				languages['pl'] = href;
				break;
			case "Português do Brasil":
				languages['pt-br'] = href;
				break;
		}
	});
 
	var language = wgContentLanguage;
	$.each(flags, function (key, value) {
		if (key === language) {
			$('.WikiaPageHeader .chooselanguage').prepend(flags[key]);
		} 
		else {
			if (languages[key]) {
				$('.WikiaPageHeader .chooselanguage ul').append('<a style="display: inline; padding: 0; height: 0; line-height: 0;" class="'+ key +'-link" href="' + languages[key] + '"><li style="border-top: 1px solid '+ borderColor +'; padding-top: 3px; padding-bottom: 3px;" class="' + key + '">' + flags[key] + '</li></a>');
			}
		}
	});
 
	$('.WikiaPageHeader .chooselanguage').on('click', function () {
		if ($(this).hasClass('active') === false) {
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