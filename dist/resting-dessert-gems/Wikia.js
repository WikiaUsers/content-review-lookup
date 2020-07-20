/* AjaxRC */
window.ajaxPages = ["Blog:Recent_posts", "Special:Chat", "Special:WikiActivity", "Special:RecentChanges", "Special:Watchlist", "Special:Log", "Special:Contributions"];
window.ajaxIndicator = 'https://vignette.wikia.nocookie.net/dev/images/8/82/Facebook_throbber.gif';
window.ajaxRefresh = 30000;
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
/** Language dropdown **/
function appendLanguageDropdown() {
	var borderColor = $('.WikiaPageHeader .comments').css('border-top-color');
	var server = wgServer.replace("http://", "");
	var html = '<nav style="border: 1px solid ' + borderColor + ';" class="wikia-menu-button secondary combined chooselanguage"><span class="drop"><img style="margin-top: 3px; margin-left: 2px; margin-right: 4px;" class="chevron" src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D"></span><ul style="min-width: 42px; margin-top: 1px; border: 1px solid ' + borderColor + '; border-top: none; text-align:center;" class="WikiaMenuElement" style="min-width:20px;"></ul></nav>';
	flags = {};
	flags['de'] = '<img class="de-image" style="width:20px; height:15px; border-radius:3px" src="http://lipis.github.io/flag-icon-css/flags/4x3/de.svg" alt="German" title="German">';
	flags['en'] = '<img class="en-image" style="width:20px; height:15px; border-radius:3px" src="http://lipis.github.io/flag-icon-css/flags/4x3/us.svg" alt="English" title="English">';
	flags['es'] = '<img class="es-image" style="width:20px; height:15px; border-radius:3px" src="http://lipis.github.io/flag-icon-css/flags/4x3/es.svg" alt="Spanish" title="Spanish">';
	flags['ja'] = '<img class="ja-image" style="width:20px; height:15px; border-radius:3px" src="http://lipis.github.io/flag-icon-css/flags/4x3/jp.svg" alt="Japanese" title="Japanese">';
	flags['pl'] = '<img class="pl-image" style="width:20px; height:15px; border-radius:3px" src="http://lipis.github.io/flag-icon-css/flags/4x3/pl.svg" alt="Polish" title="Polish">';
	flags['pt'] = '<img class="pt-image" style="width:20px; height:15px; border-radius:3px" src="http://lipis.github.io/flag-icon-css/flags/4x3/pt.svg" alt="Portuguese" title="Portuguese">';
	flags['pt-br'] = '<img class="pt-br-image" style="width:20px; height:15px; border-radius:3px" src="http://lipis.github.io/flag-icon-css/flags/4x3/br.svg" alt="Brazilian Portuguese" title="Brazilian Portuguese">';
	flags['ru'] = '<img class="ru-image" style="width:20px; height:15px; border-radius:3px" src="http://lipis.github.io/flag-icon-css/flags/4x3/ru.svg" alt="Russian" title="Russian">';
	flags['ar'] = '<img class="ar-image" style="width:20px; height:15px; border-radius:3px" src="https://lipis.github.io/flag-icon-css/flags/4x3/ae.svg" alt="Arabic" title="Arabic">';
	flags['tr'] = '<img class="tr-image" style="width:20px; height:15px; border-radius:3px" src="http://lipis.github.io/flag-icon-css/flags/4x3/tr.svg" alt="Turkish" title="Turkish">';
	flags['vi'] = '<img class="vi-image" style="width:20px; height:15px; border-radius:3px" src="http://lipis.github.io/flag-icon-css/flags/4x3/vn.svg" alt="Vietnamese" title="Vietnamese">';
	flags['ro'] = '<img class="vi-image" style="width:20px; height:15px; border-radius:3px" src="http://lipis.github.io/flag-icon-css/flags/4x3/ro.svg" alt="Romanian" title="Romanian">';
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
/*** Click tracking ***/
jQuery(function($) {
	var track = Wikia.Tracker.buildTrackingFunction({
		category: 'interlanguage-nav',
		action: Wikia.Tracker.ACTIONS.CLICK,
		trackingMethod: 'ga'
	});
	/** Wikia Interlanguage Default Link **/
	var $WikiaInterlanguageDefaultLink = $('nav.WikiaArticleInterlang');
	$WikiaInterlanguageDefaultLink.on('mousedown', 'a', function(e) {
		track({
			browserEvent: e,
			label: 'interlanguage-deafult-link'
		});
	});
	/** WikiaInterlanguageCustomLink **/
	var $WikiaInterlanguageCustomLink = $('.WikiaPageHeader');
	$WikiaInterlanguageCustomLink.on('mousedown', '.chooselanguage a', function(e) {
		track({
			browserEvent: e,
			label: 'interlanguage-custom-link'
		});
	});
});

/* Users blocked infinite */
window.addEventListener('load', function() {
	// Timeouts are always a terrible way to go, but UserTags has no event dispatched when it finished loading.
	setTimeout(function() {
		if (document.getElementById('UserProfileMasthead') === null) return;
		var blockTag = document.querySelector('.tag.usergroup-blocked.blocked-user');
		if (blockTag === null) return;
		new mw.Api().get({
			action: 'query',
			list: 'blocks',
			bkprop: 'expiry',
			bktimestamp: new Date().getTime(),
			bkusers: wgTitle
		}).done(function(d) {
			if (d.query.blocks[0] && d.query.blocks[0].expiry == 'infinity') {
				blockTag.innerHTML = 'Shattered';
			}
		});
	}, 250);
});

/* Portable infoboxes colors */
(function() {
	// Function to check for Portable Infoboxes, and change their color
	var changeColors = function() {
		var PIs = $('.portable-infobox');
		if (PIs.length) PIs.each(function() {
			var $PI = $(this);
			var color = '',
				classNames = $PI.attr('class').split(' ');
			for (var i = 0; i < classNames.length; i++) {
				if (classNames[i].indexOf('pi-theme-_') !== -1) {
					color = classNames[i].replace('pi-theme-_', '');
					break;
				}
			}
			if (color) {
				$PI.css('border', '1px solid #' + color);
				$PI.find('h2').css('background-color', '#' + color);
			}
		});
	};
	// Run it right now
	changeColors();
	// Bind it to TabView loadContent function, so Portable Infoboxes
	// inside TabView can also have fabulous custom backgrounds.
	// - - - -
	// WARNING! This may cause compatibility issues!
	/*
	TabViewClass.prototype.loadContent = function(tabLink) {
		var tabUrl = tabLink.attr('href')
		  , dataTabId = tabLink.parent().attr('data-tab')
		  , containerSelector = $('#' + this.cashedStuff.containersWrapperId).children('div[data-tab-body="' + dataTabId + '"]');
		if (containerSelector.data('loaded') !== true) {
			containerSelector.startThrobbing();
			$.get(tabUrl, {
				action: 'render'
			}, function(html) {
				containerSelector.html(html).data('loaded', true).stopThrobbing();
				mw.hook('wikipage.content').fire(containerSelector);
				changeColors();
			});
		}
	};
	*/
})();