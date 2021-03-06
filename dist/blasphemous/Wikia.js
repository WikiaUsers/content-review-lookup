    /* Language dropdown */
function appendLanguageDropdown() {
	var borderColor = $('.WikiaPageHeader .comments').css('border-top-color');
	server = wgServer.replace("http://", "");
	html = '<nav style="border: 1px solid ' + borderColor + ';" class="wikia-menu-button secondary combined chooselanguage"><span class="drop"><img style="margin-top: 3px; margin-left: 2px; margin-right: 4px;" class="chevron" src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D"></span><ul style="min-width: 42px; margin-top: 1px; border: 1px solid ' + borderColor + '; border-top: none; text-align:center;" class="WikiaMenuElement" style="min-width:20px;"></ul></nav>';
	c = '<img class="';
    a = '"-image" style="width:20px; height:15px; border-radius:3px" src="http://lipis.github.io/flag-icon-css/flags/4x3/';
	flags = {};
	flags['de'] = c + 'de' + a + 'de.svg" alt="German" title="German">';
	flags['en'] = c + 'en' + a + 'us.svg" alt="English" title="English">';
	flags['es'] = c + 'es' + a + 'es.svg" alt="Spanish" title="Spanish">';
	flags['ja'] = c + 'ja' + a + 'jp.svg" alt="Japanese" title="Japanese">';
	flags['pl'] = c + 'pl' + a + 'pl.svg" alt="Polish" title="Polish">';
	flags['pt'] = c + 'pt' + a + 'pt.svg" alt="Portuguese" title="Portuguese">';
	flags['pt-br'] = c + 'pt-br' + a + 'br.svg" alt="Brazilian Portuguese" title="Brazilian Portuguese">';
	flags['ru'] = c + 'ru' + a + 'ru.svg" alt="Russian" title="Russian">';
	flags['ar'] = c + 'ar' + a + 'ae.svg" alt="Arabic" title="Arabic">';
	flags['tr'] = c + 'tr' + a + 'tr.svg" alt="Turkish" title="Turkish">';
	flags['vi'] = c + 'vi' + a + 'vn.svg" alt="Vietnamese" title="Vietnamese">';
	flags['ro'] = c + 'ro' + a + 'ro.svg" alt="Romanian" title="Romanian">';
	flags['it'] = c + 'it' + a + 'it.svg" alt="Italian" title="Italian">';
	flags['fi'] = c + 'fi' + a + 'fi.svg" alt="Finnish" title="Finnish">';
	flags['fr'] = c + 'fr' + a + 'fr.svg" alt="French" title="French">';
	flags['hu'] = c + 'hu' + a + 'hu.svg" alt="Hungarian" title="Hungarian">';
	flags['id'] = c + 'id' + a + 'id.svg" alt="Indonesian" title="Indonesian">';
	flags['nl'] = c + 'nl' + a + 'nl.svg" alt="Dutch" title="Dutch">';
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
			case "العربية":
				languages['ar'] = href;
				break;
			case "Tiếng Việt":
				languages['vi'] = href;
				break;
			case "Română":
				languages['ro'] = href;
				break;
			case "Italiano":
				languages['it'] = href;
				break;
			case "Suomi":
				languages['fi'] = href;
				break;
			case "Français":
				languages['fr'] = href;
				break;
			case "Magyar":
				languages['hu'] = href;
				break;
			case "Bahasa Indonesia":
				languages['id'] = href;
				break;
			case "Nederlands":
				languages['nl'] = href;
				break;
		}
	});
	var language = wgContentLanguage;
	$.each(flags, function(key, value) {
		if (key === language) {
			$('.WikiaPageHeader .chooselanguage').prepend(flags[key]);
		} else {
			if (languages[key]) {
				$('.WikiaPageHeader .chooselanguage ul').append('<a style="display: inline; padding: 0; height: 0; line-height: 0;" class="' + key + '-link" href="' + languages[key] + '"><li style="border-top: 1px solid ' + borderColor + '; padding-top: 3px; padding-bottom: 3px;" class="' + key + '">' + flags[key] + '</li></a>');
			}
		}
	});
	$('.WikiaPageHeader .chooselanguage').on('click', function() {
		if ($(this).hasClass('active') === false) {
			$(this).addClass('active');
		} else {
			$(this).removeClass('active');
		}
	});
	$('.WikiaPageHeader .chooselanguage').on('mouseleave', function() {
		var that = this;
		var timeOut = setTimeout(function() {
			$(that).removeClass('active');
		}, 500);
		$('.chooselanguage').on('mouseenter', function() {
			clearTimeout(timeOut);
		});
	});
}
if ($('.WikiaArticleInterlang').length > 0) {
	addOnloadHook(appendLanguageDropdown);
}


/* --- Special:Upload template preload --- */
 
    var matches = window.location.href.match(/wpForReUpload/);
 
    if( matches && matches.length ) {
    	var mwct;
    } else {
    	$("#mw-content-text #mw-upload-form fieldset #mw-htmlform-description tbody .mw-htmlform-field-HTMLTextAreaField .mw-input #wpUploadDescription").html("{{infobox file\n|description = \n|source      = \n}}\n\n[[Category:]]");
    	$("#mw-upload-form fieldset table#mw-htmlform-description tbody tr.mw-htmlform-field-Licenses").hide();
    }