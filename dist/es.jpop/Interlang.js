function appendLanguageDropdown() {
	var doOnce = false;
	var borderColor = $('.WikiaPageHeader .comments').css('border-top-color');
	var server = wgServer.replace("http://es.","");
	var html = '<nav style="border: 1px solid '+borderColor+';" class="wikia-menu-button secondary combined chooselanguage"><span class="drop"><img style="margin-top: 3px; margin-left: 2px; margin-right: 4px;" class="chevron" src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D"></span><ul style="min-width: 42px; margin-top: 1px; border: 1px solid '+borderColor+'; border-top: none; text-align:center;" class="WikiaMenuElement" style="min-width:20px;"></ul></nav>';
	flags = {};
	flags['nl'] = '<span style="padding:5px;">Nederlands</span>';
	flags['ja'] = '<span style="padding:5px;">日本語</span>';
	flags['it'] = '<span style="padding:5px;">Italiano</span>';
	flags['fr'] = '<span style="padding:5px;">Français</span>';
	flags['pl'] = '<span style="padding:5px;">Polski</span>';
	flags['de'] = '<span style="padding:5px;">Deutsch</span>';
	flags['ru'] = '<span style="padding:5px;">Русский</span>';
	flags['zh'] = '<span style="padding:5px;">中文</span>';
	flags['es'] = '<span style="padding:5px;">Español</span>';
	flags['en'] = '<span style="padding:5px;">English</span>';
	if (doOnce == false) {
		$('.WikiaPageHeader .comments').after(html);
		var doOnce = true;
	}	
	
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
				if (key == "en") {
					$('.WikiaPageHeader .chooselanguage ul').prepend('<a style="display: inline; padding: 0; height: 0; line-height: 0;" class="'+ key +'-link" href="http://'+ server +'"><li style="border-top: 1px solid '+ borderColor +'; padding-top: 3px; padding-bottom: 3px;" class="' + key + '">' + flags[key] + '</li></a>');				
				}
				else {
					$('.WikiaPageHeader .chooselanguage ul').prepend('<a style="display: inline; padding: 0; height: 0; line-height: 0;" class="'+ key +'-link" href="http://'+ key +'.'+ server +'"><li style="border-top: 1px solid '+ borderColor +'; padding-top: 3px; padding-bottom: 3px;" class="' + key + '">' + flags[key] + '</li></a>');
				}
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