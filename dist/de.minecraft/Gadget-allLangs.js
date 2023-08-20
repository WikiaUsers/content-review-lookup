(function($, mw) {
	'use strict';
	var pagename = '';
	const config = mw.config.get([
		'wgNamespaceNumber',
		'wgCanonicalNamespace',
		'wgCanonicalSpecialPageName',
		'wgTitle'
	]);

	if ( [8, 9, 202].includes(config.wgNamespaceNumber)) { // MediaWiki, Diskussion, Profil
		pagename = config.wgCanonicalNamespace + ':' + config.wgTitle;
	} 
	else if ( config.wgNamespaceNumber === -1 ) { // Spezialseiten
		pagename = config.wgCanonicalNamespace + ':' + config.wgCanonicalSpecialPageName;
		const subpageIdx = config.wgTitle.indexOf( '/' );
		if ( subpageIdx >= 0 )
		pagename = pagename + config.wgTitle.substr( subpageIdx );
	}
	
	if (pagename === 'Special:AllMaps') return;

	const langs = {
		'technik': 'Technik Wiki',
		'cs': 'Čeština',
		// 'de': 'Deutsch',
		'el': 'Ελληνικά',
		'en': 'English',
		'es': 'Español',
		'fr': 'Français',
		'hu': 'Magyar',
		'it': 'Italiano',
		'ja': '日本語',
		'ko': '한국어',
		'lzh': '文言',
		'nl': 'Nederlands',
		'pl': 'Polski',
		'pt': 'Português',
		'ru': 'Русский',
		'th': 'ไทย',
		'tr': 'Türkçe',
		'uk': 'Українська',
		'zh': '中文'
	};

	if ( pagename.length ) {
		$( '.page-header__top' ).append(
			'<div class="page-header__languages">' +
				'<div class="wds-dropdown">' +
					'<div class="wds-dropdown__toggle iosp-icon-header">Deutsch</div>' +
					'<div class="wds-dropdown__content">' +
						'<ul class="wds-list wds-is-linked"></ul>' +
					'</div>' +
				'</div>' +
			'</div>'
		);
		
		for ( var lang in langs ) {
			$( '.page-header__languages .wds-dropdown__content .wds-list' ).append(
				'<li>' +
					'<a href="https://minecraft' + ( lang === 'technik' ? '-technik.fandom.com/de' : '.fandom.com' + (lang === 'en' ? '' : '/' + lang ) ) + '/wiki/' + pagename + '">' + langs[lang] + '</a>' +
				'</li>'
			);
		}
	}
})(window.jQuery, window.mediaWiki);