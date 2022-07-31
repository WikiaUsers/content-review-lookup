;(function(window, $, mw) {
	'use strict';
	
	const config = mw.config.get([
		'wgCanonicalSpecialPageName',
		'wgCanonicalNamespace',
		'wgContentLanguage',
		'wgNamespaceNumber',
		'wgUserLanguage',
		'wgScriptPath',
		'wgTitle',
		'skin'
	]);
	
	if (window.InterwikisOnSpecialPagesLoaded || config.skin !== 'fandomdesktop' || (config.wgNamespaceNumber == -1 && !config.wgCanonicalSpecialPageName) ) return; 
	window.InterwikisOnSpecialPagesLoaded = true;
	
	var pagename = '';
	var langs = [];
	var wiki_lang = 'English';

	if ( [8, 9, 202].includes(config.wgNamespaceNumber)) { // MediaWiki, Discussion, Gamepedia User Profile
		pagename = config.wgCanonicalNamespace + ':' + config.wgTitle;
	} else if ( config.wgNamespaceNumber == -1 ) { // Special pages
		pagename = config.wgCanonicalNamespace + ':' + config.wgCanonicalSpecialPageName;
		var subpageIdx = config.wgTitle.indexOf( '/' );
		if ( subpageIdx >= 0 )
		pagename = pagename + config.wgTitle.substr( subpageIdx );
	}
	
	function addContent(query) {
		// Searching for current-language
		query.languages.forEach(function(entry){
			if(entry.code === config.wgContentLanguage){
				wiki_lang = entry.name;
			}
		});
		
		// Header
		$( '.page-header__top' ).append(
			'<div class="page-header__languages">' +
				'<div class="wds-dropdown">' +
					'<div class="wds-dropdown__toggle">' +
						wiki_lang +
						'<svg class="wds-icon wds-icon-tiny wds-dropdown__toggle-chevron">' +
							'<use xlink:href="#wds-icons-dropdown-tiny"></use>' +
						'</svg>' +
					'</div>' +
					'<div class="wds-dropdown__content">' +
						'<ul class="wds-list wds-is-linked"></ul>' +
					'</div>' +
				'</div>' +
			'</div>'
		);
		
		// Footer
		$( '.page-footer' ).prepend(
			'<div class="wds-collapsible-panel wds-is-collapsed page-footer__languages">' +
				'<header class="wds-collapsible-panel__header iosp-icon-footer">' +
					query.allmessages[0].content +
					'<svg class="wds-icon wds-icon-tiny wds-dropdown__toggle-chevron">' +
						'<use xlink:href="#wds-icons-menu-control-small"></use>' +
					'</svg>' +
					
					'</header>' +
				'<div class="wds-collapsible-panel__content"></div>' +
			'</div>'
		);
		
		// Adding language-entries
		for ( var lang in langs ) {
			const link_ele = '<a href="'+ langs[lang].url.replace('$1', pagename) +'" data-tracking-label="lang-' + langs[lang].prefix + '">' + langs[lang].language + '</a>';
			$( '.page-header__languages .wds-dropdown__content .wds-list' ).append(
				'<li>' + link_ele + '</li>'
			);
			$( '.page-footer__languages .wds-collapsible-panel__content' ).append(
				link_ele
			);
		}
	}
	
	if ( pagename.length && $( '.page-header__languages' ).length === 0 && $( '.article-footer-languages').length === 0 ) {
		$.post(config.wgScriptPath + '/api.php', {
			action: 'query',
			format: 'json',
			meta: 'siteinfo|allmessages',
			formatversion: 2,
			ammessages: 'page-footer-languages-header',
			amlang: config.wgUserLanguage,
			siprop: 'interwikimap|languages',
			sifilteriw: 'local'
		}).done(function (d) {			
			d.query.interwikimap.forEach(function(entry){
				if (entry.language !== undefined) {
					var l = entry.language;
					l = l.charAt(0).toUpperCase() + l.slice(1);
					langs.push({ url: entry.url, language: l, prefix: entry.prefix });
				}
			});
			
			if (langs.length > 0) addContent(d.query);
		});
	}
})(window, window.jQuery, window.mediaWiki);