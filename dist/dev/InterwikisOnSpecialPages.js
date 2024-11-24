/**
 * InterwikisOnSpecialPages.js
 * Adds interwiki links to special pages.
 * @summary Interwikis on special pages.
 * @see https://dev.fandom.com/wiki/InterwikisOnSpecialPages
 * @author Magiczocker
 * @author Magiczocker01
 */

(function($, mw) {
	'use strict';
	
	var config = mw.config.get([
		'wgCanonicalSpecialPageName',
		'wgCanonicalNamespace',
		'wgNamespaceNumber',
		'wgContentLanguage',
		'wgTitle'
	]);
	
	if (window.InterwikisOnSpecialPagesLoaded || (config.wgNamespaceNumber === -1 && !config.wgCanonicalSpecialPageName) ) return; 
	window.InterwikisOnSpecialPagesLoaded = true;

	var pagename = '',
		langs = [];

	if ( [8, 9, 202].includes(config.wgNamespaceNumber)) { // MediaWiki, Discussion, Gamepedia User Profile
		pagename = config.wgCanonicalNamespace + ':' + config.wgTitle;
	} else if ( config.wgNamespaceNumber === -1 ) { // Special pages
		pagename = config.wgCanonicalNamespace + ':' + config.wgCanonicalSpecialPageName;
		var subpageIdx = config.wgTitle.indexOf( '/' );
		if ( subpageIdx >= 0 )
		pagename += config.wgTitle.substr( subpageIdx );
	}

	if (pagename === 'Special:AllMaps') return;

	/**
	 * Add dropdown to page header and list to footer.
	 */
	function addContent() {
		// Header
		$( '.page-header__top' ).append(
			'<div class="page-header__languages">' +
				'<div class="wds-dropdown">' +
					'<div class="wds-dropdown__toggle">' +
						new Intl.DisplayNames([config.wgContentLanguage], {type:'language'}).of(config.wgContentLanguage) +
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
				'<header class="wds-collapsible-panel__header" aria-controls="collapsible-content-languages">' +
					mw.msg('page-footer-languages-header') +
					'<svg class="wds-icon wds-icon-small">' +
						'<use xlink:href="#wds-icons-menu-control-small"></use>' +
					'</svg>' +
					'</header>' +
				'<div class="wds-collapsible-panel__content" id="collapsible-content-languages"></div>' +
			'</div>'
		);
		
		// Adding language-entries
		for ( var lang in langs ) {
			if (langs.hasOwnProperty(lang)) {
				var linkEle = '<a href="'+ langs[lang].url.replace('$1', pagename) +'" data-tracking-label="lang-' + langs[lang].prefix + '">' + langs[lang].language + '</a>';
				$( '.page-header__languages .wds-dropdown__content .wds-list' ).append('<li>' + linkEle + '</li>');
				$( '.page-footer__languages .wds-collapsible-panel__content' ).append(linkEle);
			}
		}
	}

	if ( pagename.length && $( '.page-header__languages' ).length === 0 && $( '.article-footer-languages').length === 0 ) {
		mw.loader.using( ['mediawiki.api'] ).then(function () {
			return new mw.Api().loadMessagesIfMissing([
				'page-footer-languages-header'
			]);
		}).then(function() {
			new mw.Api().get({
				action: 'query',
				meta: 'siteinfo',
				formatversion: 2,
				siprop: 'interwikimap',
				sifilteriw: 'local'
			}).done(function (d) {
				if (!d.query) return;
				d.query.interwikimap.forEach(function(entry){
					if (entry.language !== undefined) {
						var l = entry.language;
						l = l.charAt(0).toUpperCase() + l.slice(1);
						langs.push({ url: entry.url, language: l, prefix: entry.prefix });
					}
				});
				if (langs.length > 0) addContent(d.query);
			});
		});
	}
})(window.jQuery, window.mediaWiki);