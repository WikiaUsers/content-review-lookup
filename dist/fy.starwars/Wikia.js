/* Any JavaScript here will be loaded for all users using the Wikia skin on every page load. */
importScriptPage('MediaWiki:Common.js/spreport.js', 'runescape');

// INACTIVE USER
InactiveUsers = {text: 'ynaktyf' };
// Scripts
importArticles({
	type: 'script',
	articles: [
		"u:dev:InactiveUsers/code.js"
	]
});

/* language dropdown */
function appendLanguageDropdown() {
	var borderColor = $('.WikiaPageHeader .comments').css('border-top-color');
	var server = wgServer.replace("http://","");
	var html = '<nav style="border: 1px solid '+borderColor+';" class="wikia-menu-button secondary combined chooselanguage"><span class="drop"><img style="margin-top: 3px; margin-left: 2px; margin-right: 4px;" class="chevron" src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D"></span><ul style="min-width: 42px; margin-top: 1px; border: 1px solid '+borderColor+'; border-top: none; text-align:center;" class="WikiaMenuElement" style="min-width:20px;"></ul></nav>';
	pn = {};
	languages = {};
	$('#p-lang .pBody ul li a').each(function() {
		var languageFull = $(this).text();
		var href = $(this).attr('href');
		var pageNameArray = href.split('/');
		var pageName = pageNameArray[pageNameArray.length - 1];
		switch (languageFull) {
			case "English":
				languages['en'] = href;
				pn['en'] = pageName.replace(/_/g, " ");;
				break;
			case "Nederlands":
				languages['nl'] = href;
				pn['nl'] = pageName.replace(/_/g, " ");;
				break;
			case "Frysk":
				languages['fy'] = href;
				pn['fy'] = pageName.replace(/_/g, " ");;
				break;
		}
	});
	
	flags = {};
	flags['en'] = 'English - ' + pn['en'];
	flags['nl'] = 'Nederlands - ' + pn['nl'];
	flags['fy'] = 'Frysk';
 
 
	$('.WikiaPageHeader .comments').after(html);
 
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
	
	if ($('#p-lang').length > 0 ) {
	    $('.WikiaPageHeader .chooselanguage ul').append('<a style="display: inline; padding: 0; height: 0; line-height: 0;" href="#p-lang"><li style="border-top: 1px solid '+ borderColor +'; padding-top: 3px; padding-bottom: 3px;" class="interlang-more">Mear</li></a>');
	}
 
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
if( $('#p-lang').length > 0 ) {
	addOnloadHook(appendLanguageDropdown);
}