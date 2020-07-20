importArticles({
    type: 'script',
    articles: [
        'u:dev:ExtendedNavigation/code.js'
    ]
});
//Languages from http://shadowofmordor.wikia.com/wiki/MediaWiki:Wikia.js by MarkvA
function appendLanguageDropdown() {
	var borderColor = $('.WikiaPageHeader .comments').css('border-top-color');
	var server = wgServer.replace("http://","");
	var html = '<nav style="border: 1px solid '+borderColor+';" class="wikia-menu-button secondary combined chooselanguage"><span class="drop"><img style="margin-top: 3px; margin-left: 2px; margin-right: 4px;" class="chevron" src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D"></span><ul style="min-width: 42px; margin-top: 1px; border: 1px solid '+borderColor+'; border-top: none; text-align:center;" class="WikiaMenuElement" style="min-width:20px;"></ul></nav>';
	flags = {};
	flags['zh'] = '<img class="zh-image" width="22" height="16" src="http://upload.wikimedia.org/wikipedia/commons/f/fa/Flag_of_the_People%27s_Republic_of_China.svg" alt="Chinese">';
	flags['vi'] = '<img class="vi-image" width="22" height="16" src="http://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Vietnam.svg" alt="Vietnamese">';
	flags['uk'] = '<img class="uk-image" width="22" height="16" src="http://upload.wikimedia.org/wikipedia/commons/4/49/Flag_of_Ukraine.svg" alt="Ukrainian">';
	flags['tr'] = '<img class="tr-image" width="22" height="16" src="http://upload.wikimedia.org/wikipedia/commons/b/b4/Flag_of_Turkey.svg" alt="Turkish">';
	flags['ro'] = '<img class="ro-image" width="22" height="16" src="http://upload.wikimedia.org/wikipedia/commons/7/73/Flag_of_Romania.svg" alt="Romanian">';
	flags['pt-br'] = '<img class="pt-br-image" width="22" height="16" src="http://upload.wikimedia.org/wikipedia/commons/0/05/Flag_of_Brazil.svg" alt="Brazilian Portuguese">';
	flags['ja'] = '<img class="ja-image" width="22" height="16" src="http://upload.wikimedia.org/wikipedia/commons/9/9e/Flag_of_Japan.svg" alt="Japanese">';
	flags['id'] = '<img class="id-image" width="22" height="16" src="http://upload.wikimedia.org/wikipedia/commons/9/9f/Flag_of_Indonesia.svg" alt="Indonesian">';
	flags['hu'] = '<img class="hu-image" width="22" height="16" src="http://upload.wikimedia.org/wikipedia/commons/c/c1/Flag_of_Hungary.svg" alt="Hungarian">';
	flags['he'] = '<img class="he-image" width="22" height="16" src="http://upload.wikimedia.org/wikipedia/commons/d/d4/Flag_of_Israel.svg" alt="Hebrew">';
	flags['fi'] = '<img class="fi-image" width="22" height="16" src="http://upload.wikimedia.org/wikipedia/commons/b/bc/Flag_of_Finland.svg" alt="Finnish">';
	flags['fa'] = '<img class="fa-image" width="22" height="16" src="http://upload.wikimedia.org/wikipedia/commons/c/ca/Flag_of_Iran.svg" alt="Persian">';
	flags['ar'] = '<img class="ar-image" width="22" height="16" src="http://upload.wikimedia.org/wikipedia/commons/2/2b/Flag_of_the_Arab_League.svg" alt="Arabic">';
	flags['it'] = '<img class="it-image" width="22" height="16" src="http://upload.wikimedia.org/wikipedia/commons/0/03/Flag_of_Italy.svg" alt="Italian">';
	flags['fr'] = '<img class="fr-image" width="22" height="16" src="http://upload.wikimedia.org/wikipedia/commons/c/c3/Flag_of_France.svg" alt="French">';
	flags['pl'] = '<img class="pl-image" width="22" height="16" src="http://upload.wikimedia.org/wikipedia/commons/1/12/Flag_of_Poland.svg" alt="Polish">';
	flags['ru'] = '<img class="ru-image" width="22" height="16" src="http://upload.wikimedia.org/wikipedia/commons/f/f3/Flag_of_Russia.svg" alt="Russian">';
	flags['es'] = '<img class="es-image" width="22" height="16" src="http://upload.wikimedia.org/wikipedia/commons/9/9a/Flag_of_Spain.svg" alt="Spanish">';
	flags['de'] = '<img class="de-image" width="22" height="16" src="http://upload.wikimedia.org/wikipedia/commons/b/ba/Flag_of_Germany.svg" alt="German">';
	flags['en'] = '<img class="en-image" width="22" height="16" src="http://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg" alt="English">';
	flags['nl'] = '<img class="nl-image" width="22" height="16" src="http://upload.wikimedia.org/wikipedia/commons/2/20/Flag_of_the_Netherlands.svg" alt="Dutch">';
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
			case "Deutsch":
				languages['de'] = href;
				break;
			case "Español":
				languages['es'] = href;
				break;
			case "Русский":
				languages['ru'] = href;
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
			                        case "العربية":
			        languages['ar'] = href;
			        break;
                        			case "فارسی":
                                languages['fa'] = href;
			        break;
			case "Suomi":
				languages['fi'] = href;
				break;
                        case "עברית":
                                languages['he'] = href;
			        break;
                       	case "Magyar":
                                languages['hu'] = href;
                                break;
                       	case "Bahasa Indonesia":
                                languages['id'] = href;
                                break;
			case "日本語":
				languages['ja'] = href;
				break;
			case "Nederlands":
				languages['nl'] = href;
				break;
			case "Português do Brasil":
				languages['pt-br'] = href;
				break;
                       	case "Română":
                                languages['ro'] = href;
                                break;
                       	case "Türkçe":
                                languages['tr'] = href;
                                break;
                       	case "Українська":
                                languages['uk'] = href;
                                break;
                        	case "Tiếng Việt":
                                languages['vi'] = href;
                                break;
			case "中文":
				languages['zh'] = href;
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