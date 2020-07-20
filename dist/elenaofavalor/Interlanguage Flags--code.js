/*
    Author: MarkvA
    Version : 1.2
*/

function appendLanguageDropdown() {
	var borderColor = $('.WikiaPageHeader .comments').css('border-top-color'),
        server = wgServer.replace("http://",""),
        html = '<nav style="border: 1px solid ' + borderColor + ';" class="wikia-menu-button secondary combined chooselanguage"><span class="drop"><img style="margin-top: 3px; margin-left: 2px; margin-right: 4px;" class="chevron" src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D"></span><ul style="min-width: 42px; margin-top: 1px; border: 1px solid ' + borderColor + '; border-top: none; text-align:center;" class="WikiaMenuElement" style="min-width:20px;"></ul></nav>',
	// Two variables to make the lines below shorter
        a = '-image" width="22" height="16" src="https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/',
        c = '<img class="',
        flags = {};
	flags.en = c + 'en' + a + 'a/a4/Flag_of_the_United_States.svg" alt="English">';
	flags.de = c + 'de' + a + 'b/ba/Flag_of_Germany.svg" alt="German">';
	flags.es = c + 'es' + a + '9/9a/Flag_of_Spain.svg" alt="Spanish">';
	flags.ar = c + 'ar' + a + 'f/fe/Flag_of_Egypt.svg" alt="Arabic">';
	flags.fi = c + 'fi' + a + 'b/bc/Flag_of_Finland.svg" alt="Suomi">';
	flags.fr = c + 'fr' + a + 'c/c3/Flag_of_France.svg" alt="French">';
	flags.it = c + 'it' + a + '0/03/Flag_of_Italy.svg" alt="Italian">';
	flags.ja = c + 'ja' + a + '9/9e/Flag_of_Japan.svg" alt="Japanese">';
	flags.nl = c + 'nl' + a + '2/20/Flag_of_the_Netherlands.svg" alt="Dutch">';
	flags.pl = c + 'pl' + a + '1/12/Flag_of_Poland.svg" alt="Polish">';
	flags.pt = c + 'pt' + a + '5/5c/Flag_of_Portugal.svg" alt="Portuguese">';
	flags['pt-br'] = c + 'pt-br' + a +'0/05/Flag_of_Brazil.svg" alt="Brazilian Portuguese">';
	flags.ko = c + 'ko' + a + '0/09/Flag_of_South_Korea.svg" alt="Korean">';
	flags.ro = c + 'ro' + a + '7/73/Flag_of_Romania.svg" alt="Romanian">';
	flags.ru = c + 'ru' + a + 'f/f3/Flag_of_Russia.svg" alt="Russian">';
	flags.tr = c + 'tr' + a + 'b/b4/Flag_of_Turkey.svg" alt="Turkish">';
	flags.vi = c + 'vi' + a + '2/21/Flag_of_Vietnam.svg" alt="Vietnamese">';
	flags.zh = c + 'zh' + a + 'f/fa/Flag_of_the_People%27s_Republic_of_China.svg" alt="Chinese">';


	$('.WikiaPageHeader .comments').after(html);
 
	languages = {};
	$('.WikiaArticleInterlang ul li a').each(function() {
		var languageFull = $(this).text(),
            href = $(this).attr('href'),
            pageNameArray = href.split('/'),
            pageName = pageNameArray[pageNameArray.length - 1];
		switch (languageFull) {
			case "English":
				languages.en = href;
				break;
			case "Deutsch":
				languages.de = href;
				break;
			case "Español":
				languages.es = href;
				break;
			case "العربية":
                languages.ar = href;
                break;
			case "Suomi":
                languages.fi = href;
                break;
			case "Français":
				languages.fr = href;
				break;
			case "Italiano":
				languages.it = href;
				break;
			case "日本語":
				languages.ja = href;
				break;
			case "Nederlands":
				languages.nl = href;
				break;
			case "Polski":
				languages.pl = href;
				break;
			case "Português":
				languages.pt = href;
				break;
			case "Português do Brasil":
				languages['pt-br'] = href;
				break;
			case "한국어":
                languages.ko = href;
                break;
            case "Română":
                languages.ro = href;
                break;
			case "Русский":
				languages.ru = href;
				break;
			case "Türkçe":
                languages.tr = href;
                break;
            case "Tiếng Việt":
                languages.vi = href;
                break;
			case "中文":
				languages.zh = href;
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
		if (!$(this).hasClass('active')) {
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