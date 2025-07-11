// Interwiki links
//Taken from http://shadowofmordor.wikia.com/wiki/MediaWiki:Wikia.js by MarkvA
function appendLanguageDropdown() {
	var borderColor = $('.WikiaPageHeader .comments').css('border-top-color');
	var server = wgServer.replace("http://","");
	var html = '<nav style="border: 1px solid '+borderColor+';" class="wikia-menu-button secondary combined chooselanguage"><span class="drop"><img style="margin-top: 3px; margin-left: 2px; margin-right: 4px;" class="chevron" src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D"></span><ul style="min-width: 42px; margin-top: 1px; border: 1px solid '+borderColor+'; border-top: none; text-align:center;" class="WikiaMenuElement" style="min-width:20px;"></ul></nav>';
	flags = {};
	flags['nl'] = '<img class="nl-image" width="22" height="16" src="https://static.wikia.nocookie.net/clashroyale/images/d/d9/Flag_of_Netherlands.png" alt="Dutch">';
	flags['ja'] = '<img class="ja-image" width="22" height="16" src="https://static.wikia.nocookie.net/clashroyale/images/6/60/Flag_of_Japan.png" alt="Japanese">';
	flags['it'] = '<img class="it-image" width="22" height="16" src="https://static.wikia.nocookie.net/clashroyale/images/b/b3/Flag_of_Italy.png" alt="Italian">';
	flags['fr'] = '<img class="fr-image" width="22" height="16" src="https://static.wikia.nocookie.net/clashroyale/images/6/62/Flag_of_France.png" alt="French">';
	flags['pl'] = '<img class="pl-image" width="22" height="16" src="https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/1/12/Flag_of_Poland.svg" alt="Polish">';
	flags['de'] = '<img class="de-image" width="22" height="16" src="https://static.wikia.nocookie.net/clashroyale/images/e/e6/Flag_of_Germany.png" alt="German">';
	flags['ru'] = '<img class="ru-image" width="22" height="16" src="https://static.wikia.nocookie.net/clashroyale/images/d/d4/Flag_of_Russia.png" alt="Russian">';
	flags['zh'] = '<img class="zh-image" width="22" height="16" src="https://static.wikia.nocookie.net/clashroyale/images/2/2e/Flag_of_China.png" alt="Chinese">';
	flags['es'] = '<img class="es-image" width="22" height="16" src="https://static.wikia.nocookie.net/clashroyale/images/4/41/Flag_of_Spain.png" alt="Spanish">';
	flags['en'] = '<img class="en-image" width="22" height="16" src="https://static.wikia.nocookie.net/clashroyale/images/0/0c/Flag_of_US.png" alt="English">';
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
			case "中文":
				languages['zh'] = href;
				break;
			case "Русский":
				languages['ru'] = href;
				break;
			case "Deutsch":
				languages['de'] = href;
				break;
			case "Polski":
				languages['pl'] = href;
				break;
			case "Français":
				languages['fr'] = href;
				break;
			case "Italiano":
				languages['it'] = href;
				break;
			case "日本語":
				languages['ja'] = href;
				break;
			case "Nederlands":
				languages['nl'] = href;
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
				$('.WikiaPageHeader .chooselanguage ul').prepend('<a style="display: inline; padding: 0; height: 0; line-height: 0;" class="'+ key +'-link" href="' + languages[key] + '"><li style="border-top: 1px solid '+ borderColor +'; padding-top: 3px; padding-bottom: 3px;" class="' + key + '">' + flags[key] + '</li></a>');
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
 
$(document).ready(function() {
	if(!mediaWiki.config.get('wgUserName')) { // If username is not set (the user is logged out), hide the "Flags" dropdown options
		$('.wikia-menu-button .flags-access-class').parent().remove();
	}
});