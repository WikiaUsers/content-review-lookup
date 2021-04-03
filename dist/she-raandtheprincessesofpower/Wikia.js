$(function() {
	function appendLanguageDropdown() {
		var borderColor 
	= $('.WikiaPageHeader .comments').css('border-top-color');
		var server 
	= wgServer.replace("http://","");
		var html 
	= '<nav style="border: 1px solid '+borderColor+';" class="wikia-menu-button secondary combined chooselanguage"><img style="margin-top: 3px; margin-left: 2px; margin-right: 4px;" class="chevron" src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D"><ul style="min-width: 42px; margin-top: 1px; border: 1px solid '+borderColor+'; border-top: none; text-align:center;" class="WikiaMenuElement" style="min-width:20px;"></ul></nav>';
		flags 
	= {};
		flags['de'] 
	= '<img class="de-image" style="width:20px; height:15px; border-radius:3px" src="http://lipis.github.io/flag-icon-css/flags/4x3/de.svg" alt="Alemán">';
		flags['en'] 
	= '<img class="en-image" style="width:20px; height:15px; border-radius:3px" src="http://lipis.github.io/flag-icon-css/flags/4x3/us.svg" alt="Inglés">';
		flags['es'] 
	= '<img class="es-image" style="width:20px; height:15px; border-radius:3px" src="https://vignette.wikia.nocookie.net/central/images/a/a8/Flag_ES-MX.png/revision/latest?cb=20160421140723" alt="Español">';
		flags['fr'] 
	= '<img class="fr-image" style="width:20px; height:15px; border-radius:3px" src="http://lipis.github.io/flag-icon-css/flags/4x3/fr.svg" alt="Francés">';
		flags['ja'] 
	= '<img class="ja-image" style="width:20px; height:15px; border-radius:3px" src="http://lipis.github.io/flag-icon-css/flags/4x3/jp.svg" alt="Japonés">';
	    flags['ko'] 
	= '<img class="ko-image" style="width:20px; height:15px; border-radius:3px" src="http://lipis.github.io/flag-icon-css/flags/4x3/kr.svg" alt="Coreano">';
		flags['pl'] 
	= '<img class="pl-image" style="width:20px; height:15px; border-radius:3px" src="http://lipis.github.io/flag-icon-css/flags/4x3/pl.svg" alt="Polaco">';
		flags['pt'] 
	= '<img class="pt-image" style="width:20px; height:15px; border-radius:3px" src="http://lipis.github.io/flag-icon-css/flags/4x3/pt.svg" alt="Portugués">';
		flags['pt-br'] 
	= '<img class="pt-br-image" style="width:20px; height:15px; border-radius:3px" src="http://lipis.github.io/flag-icon-css/flags/4x3/br.svg" alt="Portugués Brasileño">';
	    flags['ro'] 
	= '<img class="ro-image" style="width:20px; height:15px; border-radius:3px" src="http://lipis.github.io/flag-icon-css/flags/4x3/ro.svg" alt="Rumano">';
		flags['ru'] 
	= '<img class="ru-image" style="width:20px; height:15px; border-radius:3px" src="http://lipis.github.io/flag-icon-css/flags/4x3/ru.svg" alt="Ruso">';
	 
		$('.WikiaPageHeader .comments').after(html);
	 
		languages 
	= {};
		$('.WikiaArticleInterlang ul li a').each(function() {
			var languageFull 
	= $(this).text();
			var href 
	= $(this).attr('href');
			var pageNameArray 
	= href.split('/')
			var pageName 
	= pageNameArray[pageNameArray.length - 1];
			switch (languageFull) {
			    case "Deutsch":
				    languages['de'] 
	= href;
				    break;
				case "English":
					languages['en'] 
	= href;
					break;
				case "Español":
					languages['es'] 
	= href;
					break;
				case "Français":
					languages['fr'] 
	= href;
					break;
				case "日本語":
					languages['ja'] 
	= href;
					break;
				case "한국어":
					languages['ko'] 
	= href;
					break;
	 
				case "Polski":
					languages['pl'] 
	= href;
					break;
				case "Português":
					languages['pt'] 
	= href;
					break;
				case "Português do Brasil":
					languages['pt-br'] 
	= href;
					break;
				case "Русский":
					languages['ru'] 
	= href;
					break;
				case "Română":
					languages['ro'] 
	= href;
					break;
			}
		});
	 
		var language 
	= wgContentLanguage;
		$.each(flags, function (key, value) {
			if (key 
	=== language) {
				$('.WikiaPageHeader .chooselanguage').prepend(flags[key]);
			} 
			else {
				if (languages[key]) {
					$('.WikiaPageHeader .chooselanguage ul').append('<a style="display: inline; padding: 0; height: 0; line-height: 0;" class="'+ key +'-link" href="' + languages[key] + '"><li style="border-top: 1px solid '+ borderColor +'; padding-top: 3px; padding-bottom: 3px;" class="' + key + '">' + flags[key] + '</li></a>');
				}
			}
		});
	 
		$('.WikiaPageHeader .chooselanguage').on('click', function () {
			if ($(this).hasClass('active') 
	=== false) {
				$(this).addClass('active');
			} 
			else {
				$(this).removeClass('active');
			}
		});
	 
		$('.WikiaPageHeader .chooselanguage').on('mouseleave', function () {
			var that 
	= this;
			var timeOut 
	= setTimeout(function () { $(that).removeClass('active'); }, 500);
	 
			$('.chooselanguage').on('mouseenter', function () {
				clearTimeout(timeOut);
			});
		});
	}
	
	if ($('.WikiaArticleInterlang').length > 0) {
		addOnloadHook(appendLanguageDropdown);
	}
});

(window.dev = window.dev || {}).profileTags = { noHideTags: true };