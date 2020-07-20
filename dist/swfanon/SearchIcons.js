/**
 * Search icons -- icons in the search bar, above the input field for users
 * of the MonoBook skin.
 *
 * To use this on a different wiki, you need to include this script
 * (SearchIcons.js), and then override iconMap with your own search icons,
 * like this:
SearchIcons_iconMap = [
	// URL to image, then one space, then the name of the article
	'http://example.com/path/to/some/search_icon.png Foo Bar',
	'http://example.com/path/to/another_search_icon.png Baz'
];
 *
 * Finally add the following CSS to your wiki's [[MediaWiki:Monobook.css]]:
#search-icon-wrapper {
	cursor: pointer;
}

#search-popup {
	position: absolute;
	background: #f2f5f9;
	text-align: left;
	z-index: 8;
}
 *
 * Original code by Sikon
 * Object-oriented version with internationalization support by
 * Jack Phoenix <jack@countervandalism.net> on 10 October 2011
 * Internationalization (i18n) by various different authors
 */
var SearchIcons = {
	/**
	 * Kinda like MediaWiki's internationalization (i18n) stuff
	 * Don't use this directly, use getMsg() instead.
	 */
	internationalizationMap: {
		/** English */
		'en': {
			'searchicons-advanced-search': 'Advanced search',
			'searchicons-close': 'Close',
			'searchicons-no-desc-caps': 'NO DESCRIPTION',
			'searchicons-no-desc': 'No description exists for this search icon. Please contact the administrators to resolve this problem.',
			'searchicons-search': 'Search',
			'searchicons-whats-this': "What's this? ($1)"
		},
		/** Afrikaans (Afrikaans) */
		'af': {
			'searchicons-close': 'Sluit'
		},
		/** Old English (Ænglisc) */
		'ang': {
			'searchicons-close': 'Betȳnan'
		},
		/** Belarusian (Taraškievica orthography) (‪Беларуская (тарашкевіца)‬) */
		'be-tarask': {
			'searchicons-close': 'закрыць'
		},
		/** Bulgarian (Български) */
		'bg': {
			'searchicons-close': 'затваряне'
		},
		/** Breton (Brezhoneg) */
		'br': {
			'searchicons-close': 'Serriñ'
		},
		/** Catalan (Català) */
		'ca': {
			'searchicons-close': 'Tanca'
		},
		/** Czech (Česky) */
		'cs': {
			'searchicons-close': 'Zavřít'
		},
		/** Welsh (Cymraeg) */
		'cy': {
			'searchicons-close': 'Cau'
		},
		/** German (Deutsch) */
		'de': {
			'searchicons-close': 'Schließen'
		},
		/** Spanish (Español) */
		'es': {
			'searchicons-close': 'Cerrar'
		},
		/** Basque (Euskara) */
		'eu': {
			'searchicons-close': 'Itxi'
		},
		/** Finnish (Suomi) */
		'fi': {
			'searchicons-advanced-search': 'Kehittynyt haku',
			'searchicons-close': 'Sulje',
			'searchicons-no-desc-caps': "EI KUVAUSTA",
			'searchicons-no-desc': 'Tälle hakukuvakkeelle ei ole olemassa kuvausta. Otathan yhteyttä ylläpitäjiin ratkaistaksesi tämän ongelman.',
			'searchicons-search': 'Hae',
			'searchicons-whats-this': 'Mikä tämä on? ($1)'
		},
		/** French (Français) */
		'fr': {
			'searchicons-advanced-search': 'Recherche avancée',
			'searchicons-close': 'Fermer',
			'searchicons-no-desc-caps': 'AUCUNE DESCRIPTION',
			'searchicons-search': 'Rechercher',
			'searchicons-whats-this': "Qu'est-ce que c'est ? ($1)"
		},
		/** Galician (Galego) */
		'gl': {
			'searchicons-close': 'Pechar'
		},
		/** Hebrew (עברית) */
		'he': {
			'searchicons-close': 'סגירה'
		},
		/** Hungarian (Magyar) */
		'hu': {
			'searchicons-close': 'Bezárás'
		},
		/** Interlingua (Interlingua) */
		'ia': {
			'searchicons-close': 'Clauder'
		},
		/** Indonesian (Bahasa Indonesia) */
		'id': {
			'searchicons-close': 'Tutup'
		},
		/** Italian (Italiano) */
		'it': {
			'searchicons-close': 'Chiudi'
		},
		/** Japanese (日本語) */
		'ja': {
			'searchicons-close': '閉じる'
		},
		/** Luxembourgish (Lëtzebuergesch) */
		'lb': {
			'searchicons-close': 'Zoumaachen'
		},
		/** Macedonian (Македонски) */
		'mk': {
			'searchicons-close': 'затвори'
		},
		/** Malay (Bahasa Melayu) */
		'ms': {
			'searchicons-close': 'Tutup'
		},
		/** Maltese (Malti) */
		'mt': {
			'searchicons-close': 'Agħlaq'
		},
		/** Burmese (မြန်မာဘာသာ) */
		'my': {
			'searchicons-close': 'ပိတ်ရန်'
		},
		/** Dutch (Nederlands) */
		'nl': {
			'searchicons-close': 'Sluiten'
		},
		/** Norwegian (bokmål)‬ (‪Norsk (bokmål)‬) */
		'no': {
			'searchicons-close': 'Lukk'
		},
		/** Deitsch (Deitsch) */
		'pdc': {
			'searchicons-close': 'Zumache'
		},
		/** Piedmontese (Piemontèis) */
		'pms': {
			'searchicons-close': 'Sara'
		},
		/** Pashto (پښتو) */
		'ps': {
			'searchicons-close': 'تړل'
		},
		/** Portuguese (Português) */
		'pt': {
			'searchicons-close': 'Fechar'
		},
		/** Brazilian Portuguese (Português do Brasil) */
		'pt-br': {
			'searchicons-close': 'Fechar'
		},
		/** Russian (Русский) */
		'ru': {
			'searchicons-close': 'закрыть'
		},
		/** Serbian (Cyrillic script) (‪Српски (ћирилица)‬) */
		'sr-ec': {
			'searchicons-close': 'затвори'
		},
		/** Swedish (Svenska) */
		'sv': {
			'searchicons-close': 'Stäng'
		},
		/** Telugu (తెలుగు) */
		'te': {
			'searchicons-close': 'మూసివేయి'
		}
		// Every entry EXCEPT THE LAST ONE MUST have a comma after the closing bracket!
	},

	_iconMap: [
		// URL to image, then one space, then the name of the article
		'//upload.wikimedia.org/wikipedia/commons/9/94/Empty_search_icon.png Emptiness'
	],

	/**
	 * If there is a translation of the given message in the user's language,
	 * return it; otherwise return the English default.
	 *
	 * @param key String: message key name
	 * @return String: translated message or English default
	 */
	getMsg: function( key ) {
		if ( typeof( SearchIcons.internationalizationMap[wgUserLanguage] ) !== 'undefined' ) {
			return SearchIcons.internationalizationMap[wgUserLanguage][key];
		} else {
			return SearchIcons.internationalizationMap['en'][key];
		}
	},

	replaceSearchIcon: function() {
		var innerDiv = document.createElement( 'div' );
		var searchbox = document.getElementById( 'searchBody' );

		if( searchbox ) {
			/* In MediaWiki 1.16, the search area HTML looks something like this:
			<div id="searchBody" class="pBody">
				<form action="/w/index.php" id="searchform">
					<input type='hidden' name="title" value="Special:Search"/>
					<input id="searchInput" title="Search Darthipedia" accesskey="f" type="search" name="search" />
					<input type='submit' name="go" class="searchButton" id="searchGoButton"	value="Go" title="Go to a page with this exact name if exists" />&nbsp;
					<input type='submit' name="fulltext" class="searchButton" id="mw-searchButton" value="Search" title="Search the pages for this text" />
				</form>
			</div>
			In older MediaWikis, there was a <div> inside the <form>, before any
			<input>s.
			We're faking it up by creating a div element (innerDiv declaration at
			the start of this function) and inserting it via insertBefore before
			any <input>s. It ain't pretty, but hey, it works.
			(14 April 2011)
			*/
			var input = searchbox.getElementsByTagName( 'input' )[0];
			input.parentNode.insertBefore( innerDiv, input );

			if ( innerDiv.getElementsByTagName( 'a' ) ) {
				var link = innerDiv.getElementsByTagName( 'a' )[0];
				if( link ) {
					innerDiv.removeChild( link );
				}
			}
		}
		SearchIcons.onArrival( innerDiv );
	},

	/**
	 * Generate a random number.
	 * @param n Integer: multiply our random number by this
	 * @return Integer: a random number
	 */
	rand: function( n ) {
		return Math.round( Math.random() * n );
	},

	/**
	 * This function is called whenever the user clicks on the search image.
	 * DO NOTE THAT YOU ALSO NEED SOME CSS TO MAKE THE BOX PROPERLY STYLED!
	 * The styles defined here are NOT good enough to display the box as it
	 * should be displayed.
	 */
	openSearchPopup: function( event ) {
		var div = document.getElementById( 'search-popup' );
		var e = event || window.event;

		div.style.display = ( div.style.display === 'none' ) ? 'block' : 'none';
		div.style.left = e.clientX + 'px';
		div.style.top = ( e.clientY + document.documentElement.scrollTop ) + 'px';
	},

	/**
	 * This function is called when the user clicks on the "Close" link on the
	 * search popup box. This then dismisses the popup by setting its display
	 * to 'none'.
	 */
	closeSearchPopup: function() {
		document.getElementById( 'search-popup' ).style.display = 'none';
	},

	/**
	 * This function is called if a search icon lacks a description and the user
	 * clicks on the "What's this?" link.
	 */
	emptySearchDesc: function() {
		alert( SearchIcons.getMsg( 'searchicons-no-desc' ) );
	},

	onArrival: function( searchDiv ) {
		// Check for local customizations.
		// Checks for global variable window.SearchIcons_iconMap first,
		// then fallback to the default SearchIcons._iconMap
		var lines = ( window.SearchIcons_iconMap || SearchIcons._iconMap );

		var line = lines[SearchIcons.rand( lines.length - 1 )];
		var pos = line.indexOf( ' ' );

		var link = document.createElement( 'div' );
		link.id = 'search-icon-wrapper';
		var img = document.createElement( 'img' );
		img.alt = SearchIcons.getMsg( 'searchicons-search' );
		img.src = ( pos === -1 ) ? line : line.substring( 0, pos );
		link.appendChild( img );

		searchDiv.insertBefore( link, searchDiv.firstChild );

		var div = document.createElement( 'div' );
		div.id = 'search-popup';
		div.style.display = 'none';
		var ul = document.createElement( 'ul' );

		var li;
		var a;

		li = document.createElement( 'li' );
		a = document.createElement( 'a' );
		a.href = wgScriptPath + '/index.php?title=Special:Search&adv=1';
		a.appendChild( document.createTextNode( SearchIcons.getMsg( 'searchicons-advanced-search' ) ) );
		li.appendChild( a );
		ul.appendChild( li );

		li = document.createElement( 'li' );
		a = document.createElement( 'a' );
		a.href = ( pos === -1 ) ? 'javascript:SearchIcons.emptySearchDesc()' : wgArticlePath.replace( '$1', line.substring( pos + 1 ) );
		a.appendChild( document.createTextNode(
			SearchIcons.getMsg( 'searchicons-whats-this' ).replace( '$1',
				( ( pos === -1 ) ?
					SearchIcons.getMsg( 'searchicons-no-desc-caps' ) : line.substring( pos + 1 ) )
			)
		) );
		li.appendChild( a );
		ul.appendChild( li );

		li = document.createElement( 'li' );
		a = document.createElement( 'a' );
		a.href = 'javascript:SearchIcons.closeSearchPopup()';
		a.appendChild( document.createTextNode( SearchIcons.getMsg( 'searchicons-close' ) ) );
		li.appendChild( a );
		ul.appendChild( li );

		var container = document.getElementById( 'globalWrapper' );
		if( !container ) {
			container = document.getElementById( 'container' );
		}

		div.appendChild( ul );
		container.appendChild( div );
		link.onclick = SearchIcons.openSearchPopup;
	}
};

addOnloadHook( SearchIcons.replaceSearchIcon );