importArticles({
   type: 'script',
   articles: [
       'u:dev:FloatingToc/code.js',
       'u:dev:PurgeButton/code.js',
       'u:dev:ReferencePopups/code.js',
       'u:dev:WallGreetingButton/code.js',
   ]
});
function appendLanguageDropdown() {
	var borderColor = $('.WikiaPageHeader .comments').css('border-top-color');
	var server = wgServer.replace("http://","");
	var html = '<nav style="border: 1px solid '+borderColor+';" class="wikia-menu-button secondary combined chooselanguage"><span class="drop"><img style="margin-top: 3px; margin-left: 2px; margin-right: 4px;" class="chevron" src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D"></span><ul style="min-width: 42px; margin-top: 1px; border: 1px solid '+borderColor+'; border-top: none; text-align:center;" class="WikiaMenuElement" style="min-width:20px;"></ul></nav>';
	flags = {};
	flags['de'] = '<img class="de-image" style="width:20px; height:15px; border-radius:3px" src="http://lipis.github.io/flag-icon-css/flags/4x3/de.svg" alt="German">';
	flags['en'] = '<img class="en-image" style="width:20px; height:15px; border-radius:3px" src="http://lipis.github.io/flag-icon-css/flags/4x3/us.svg" alt="English">';
	flags['es'] = '<img class="es-image" style="width:20px; height:15px; border-radius:3px" src="http://lipis.github.io/flag-icon-css/flags/4x3/es.svg" alt="Spanish">';
	flags['ja'] = '<img class="ja-image" style="width:20px; height:15px; border-radius:3px" src="http://lipis.github.io/flag-icon-css/flags/4x3/jp.svg" alt="Japanese">';
	flags['pl'] = '<img class="pl-image" style="width:20px; height:15px; border-radius:3px" src="http://lipis.github.io/flag-icon-css/flags/4x3/pl.svg" alt="Polish">';
	flags['pt'] = '<img class="pt-image" style="width:20px; height:15px; border-radius:3px" src="http://lipis.github.io/flag-icon-css/flags/4x3/pt.svg" alt="Portuguese">';
	flags['pt-br'] = '<img class="pt-br-image" style="width:20px; height:15px; border-radius:3px" src="http://lipis.github.io/flag-icon-css/flags/4x3/br.svg" alt="Brazilian Portuguese">';
	flags['ru'] = '<img class="ru-image" style="width:20px; height:15px; border-radius:3px" src="http://lipis.github.io/flag-icon-css/flags/4x3/ru.svg" alt="Russian">';
    flags['tr'] = '<img class="tr-image" style="width:20px; height:15px; border-radius:3px" src="http://lipis.github.io/flag-icon-css/flags/4x3/tr.svg" alt="Turkish">';
	$('.WikiaPageHeader .comments').after(html);
	languages = {};
	$('.WikiaArticleInterlang ul li a').each(function() {
		var languageFull = $(this).text();
		var href = $(this).attr('href');
		var pageNameArray = href.split('/')
		var pageName = pageNameArray[pageNameArray.length - 1];
		switch (languageFull) {
		    case "Deutsch":
			    languages['de'] = href;
			    break;
			case "English":
				languages['en'] = href;
				break;
			case "Español":
				languages['es'] = href;
				break;
			case "日本語":
				languages['ja'] = href;
				break;
			case "Polski":
				languages['pl'] = href;
				break;
			case "Português":
				languages['pt'] = href;
				break;
			case "Português do Brasil":
				languages['pt-br'] = href;
				break;
			case "Русский":
				languages['ru'] = href;
				break;
			case "Türkçe":
				languages['tr'] = href;
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