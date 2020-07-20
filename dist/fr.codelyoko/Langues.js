// Interwiki links
//Taken from http://shadowofmordor.wikia.com/wiki/MediaWiki:Wikia.js by MarkvA
function appendLanguageDropdown() {
	var borderColor = $('.WikiaPageHeader .comments').css('border-top-color');
	var server = wgServer.replace("http://","");
	var html = '<nav style="border: 1px solid '+borderColor+';" class="wikia-menu-button secondary combined chooselanguage"><span class="drop"><img style="margin-top: 3px; margin-left: 2px; margin-right: 4px;" class="chevron" src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D"></span><ul style="min-width: 42px; margin-top: 1px; border: 1px solid '+borderColor+'; border-top: none; text-align:center;" class="WikiaMenuElement" style="min-width:20px;"></ul></nav>';
	flags = {};
	flags['sr'] = '<img class="sr-image" width="16" height="11" src="https://images.wikia.nocookie.net/codigo-lyoko/es/images/2/21/Flag_SR.png" alt="Serbian">';
	flags['ru'] = '<img class="ru-image" width="16" height="11" src="https://images.wikia.nocookie.net/wolfenstein/images/f/fd/Flag_RU.png" alt="Russian">';
	flags['ro'] = '<img class="ro-image" width="16" height="11" src="https://images.wikia.nocookie.net/codigo-lyoko/es/images/f/f4/Flag_RO.png" alt="Romanian">';
	flags['pt'] = '<img class="pt-image" width="16" height="11" src="https://images.wikia.nocookie.net/codigo-lyoko/es/images/8/82/Flag_PT.png" alt="Portuguese">';
	flags['pl'] = '<img class="pl-image" width="16" height="11" src="https://images.wikia.nocookie.net/wolfenstein/images/3/31/Flag_PL.png" alt="Polish">';
	flags['nl'] = '<img class="nl-image" width="16" height="11" src="https://images.wikia.nocookie.net/wolfenstein/images/3/3a/Flag_NL.png" alt="Dutch">';
	flags['it'] = '<img class="it-image" width="16" height="11" src="https://images.wikia.nocookie.net/codigo-lyoko/es/images/a/a1/Flag_IT.png" alt="Italian">';
	flags['gl'] = '<img class="gl-image" width="16" height="11" src="https://images.wikia.nocookie.net/codigo-lyoko/es/images/6/6c/Flag_GL.png" alt="Galician">';
	flags['fr'] = '<img class="fr-image" width="16" height="11" src="https://images.wikia.nocookie.net/wolfenstein/images/e/e8/Flag_FR.png" alt="French">';
	flags['fi'] = '<img class="fi-image" width="16" height="11" src="https://images.wikia.nocookie.net/codigo-lyoko/es/images/4/42/Flag_FI.png" alt="Finnish">';
	flags['es'] = '<img class="es-image" width="16" height="11" src="https://images.wikia.nocookie.net/wolfenstein/images/1/1c/Flag_ES.png" alt="Spanish">';
	flags['el'] = '<img class="el-image" width="16" height="11" src="https://images.wikia.nocookie.net/codigo-lyoko/es/images/2/2c/Flag_EL.png" alt="Greek">';
	flags['de'] = '<img class="de-image" width="16" height="11" src="https://images.wikia.nocookie.net/wolfenstein/images/1/15/Flag_DE.png" alt="German">';
	flags['ca'] = '<img class="ca-image" width="16" height="11" src="https://images.wikia.nocookie.net/wolfenstein/images/e/e6/Flag_CA.png" alt="Catalan">';
	flags['en'] = '<img class="en-image" width="16" height="11" src="https://images.wikia.nocookie.net/wolfenstein/images/5/5d/Flag_EN.png" alt="English">';
	$('.WikiaPageHeader .comments').after(html);
 
	languages = {};
	$('.WikiaArticleInterlang ul li a').each(function() {
		var languageFull = $(this).text();
		var href = $(this).attr('href');
		var pageNameArray = href.split('/')
		var pageName = pageNameArray[pageNameArray.length - 1];
		switch (languageFull) {
			case "Српски / Srpski":
				languages['sr'] = href;
				break;
			case "Русский":
				languages['ru'] = href;
				break;
			case "Română":
				languages['ro'] = href;
				break;
			case "Português":
				languages['pt'] = href;
				break;
			case "Polski":
				languages['pl'] = href;
				break;
			case "Nederlands":
				languages['nl'] = href;
				break;
			case "Italiano":
				languages['it'] = href;
				break;
			case "Galego":
				languages['gl'] = href;
				break;
			case "Français":
				languages['fr'] = href;
				break;
			case "Suomi":
				languages['fi'] = href;
				break;
			case "Español":
				languages['es'] = href;
				break;
			case "English":
				languages['en'] = href;
				break;
			case "Ελληνικά":
				languages['el'] = href;
				break;
			case "Deutsch":
				languages['de'] = href;
				break;
			case "Català":
				languages['ca'] = href;
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