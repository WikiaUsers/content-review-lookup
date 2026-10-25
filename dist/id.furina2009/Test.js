

/**
 * Collapsible tables
 *
 * Allows tables to be collapsed, showing only the header. See [[Wikipedia:NavFrame]].
 * @maintainer [[User:R. Koot]] (on Wikipedia)
 */

var autoCollapse = 2;
var collapseCaption = 'hide';
var expandCaption = 'show';

function hasClass( element, className ) {
	var Classes = ( element && element.className && element.className.split( " " ) ) || [];
	for ( var i = 0; i < Classes.length; i++ ) {
		if ( Classes[i] == className ) {
			return true;
		}
	}
	return false;
}

function collapseTable( tableIndex ) {
	var i;
	var Button = document.getElementById( 'collapseButton' + tableIndex );
	var Table = document.getElementById( 'collapsibleTable' + tableIndex );

	if ( !Table || !Button ) {
		return false;
	}

	var Rows = Table.getElementsByTagName( 'tr' );

	if ( Button.firstChild.data == collapseCaption ) {
		for ( i = 1; i < Rows.length; i++ ) {
			Rows[i].style.display = 'none';
		}
		Button.firstChild.data = expandCaption;
	} else {
		for ( i = 1; i < Rows.length; i++ ) {
			Rows[i].style.display = Rows[0].style.display;
		}
		Button.firstChild.data = collapseCaption;
	}
}

function createCollapseButtons() {
	var i;
	var tableIndex = 0;
	var NavigationBoxes = {};
	var Tables = document.getElementsByTagName( 'table' );

	for ( i = 0; i < Tables.length; i++ ) {
		if ( hasClass( Tables[i], 'collapsible' ) ) {
			NavigationBoxes[ tableIndex ] = Tables[i];
			Tables[i].setAttribute( 'id', 'collapsibleTable' + tableIndex );

			var Button = document.createElement( 'span' );
			var ButtonLink = document.createElement( 'a' );
			var ButtonText = document.createTextNode( collapseCaption );

			Button.style.styleFloat = 'right';
			Button.style.cssFloat = 'right';
			Button.style.fontWeight = 'normal';
			Button.style.textAlign = 'right';
			Button.style.width = '6em';

			ButtonLink.setAttribute( 'id', 'collapseButton' + tableIndex );
			ButtonLink.setAttribute( 'href', 'javascript:collapseTable(' + tableIndex + ');' );
			ButtonLink.appendChild( ButtonText );

			Button.appendChild( document.createTextNode( '[' ) );
			Button.appendChild( ButtonLink );
			Button.appendChild( document.createTextNode( ']' ) );

			var Header = Tables[i].getElementsByTagName( 'tr' )[0].getElementsByTagName( 'th' )[0];
			/* only add button and increment count if there is a header row to work with */
			if (Header) {
				Header.insertBefore( Button, Header.childNodes[0] );
				tableIndex++;
			}
		}
	}

	for ( i = 0; i < tableIndex; i++ ) {
		if ( hasClass( NavigationBoxes[i], 'collapsed' ) || ( tableIndex >= autoCollapse && hasClass( NavigationBoxes[i], 'autocollapse' ) ) ) {
			collapseTable( i );
		}
	}
}

$( createCollapseButtons );

// Shuffle for election candidates
function dshuf() {
	var shufsets = {};
	var rx = new RegExp('dshuf' + '\\s+(dshufset\\d+)', 'i');
	var divs = document.getElementsByTagName('div');
	var i = divs.length;
	while (i--) {
		if (rx.test(divs[i].className)) {
			if (typeof shufsets[RegExp.$1] === 'undefined') {
				shufsets[RegExp.$1] = {};
				shufsets[RegExp.$1].inner = [];
				shufsets[RegExp.$1].member = [];
			}
			shufsets[RegExp.$1].inner.push({
				key: Math.random(),
				html: divs[i].innerHTML
			});
			shufsets[RegExp.$1].member.push(divs[i]);
		}
	}
	for (shufset in shufsets) {
		shufsets[shufset].inner.sort(function(a, b) {
			return a.key - b.key;
		});
		i = shufsets[shufset].member.length;
		while (i--) {
			shufsets[shufset].member[i].innerHTML = shufsets[shufset].inner[i].html;
			shufsets[shufset].member[i].style.display = 'block';
		}
	}
}
$(dshuf);

// Import local or interwiki page as script
//
// Use of custom 'lang' parameter is deprecated. Use mw.loader.load(url) instead.
var _importScript = window.importScript;
window.importScript = function importScript(page, lang) {
    if (!lang) {
    	return _importScript(page);
    }
	var query = '?title=' + encodeURIComponent(page.replace(' ','_')) + '&action=raw&ctype=text/javascript';
	mw.loader.load('//' + lang + '.wikipedia.org/w/index.php' + query);
};

( function () {
	var conf = mw.config.get( [
		'wgCanonicalSpecialPageName',
		'wgUserGroups',
		'wgPageName',
		'wgUserName'
	] );

	// Multilingual description.js from commons
	mw.loader.load('//commons.wikimedia.org/w/index.php?title=MediaWiki:Gadget-LanguageSelect.js&action=raw&ctype=text/javascript');

	// Tabs
	mw.loader.load('//meta.wikimedia.org/w/index.php?title=MediaWiki:Tabs.js&action=raw&ctype=text/javascript');
}() );

/**
 * Snippets/Load JS and CSS by URL
 * @source https://www.mediawiki.org/wiki/Snippets/Load_JS_and_CSS_by_URL
 * @revision 5022668 dated 2022-01-17
 */
mw.loader.using( ['mediawiki.util'], function () {
	var extraCSS = mw.util.getParamValue( 'withCSS' ),
		extraJS = mw.util.getParamValue( 'withJS' ),
	extraModule = mw.util.getParamValue( 'withModule' );

	if ( extraCSS ) {
		// WARNING: DO NOT REMOVE THIS "IF" - REQUIRED FOR SECURITY (against XSS/CSRF attacks)
		if ( /^MediaWiki:[^&<>=%#]*\.css$/.test( extraCSS ) ) {
			mw.loader.load( '/w/index.php?title=' + encodeURIComponent( extraCSS ) + '&action=raw&ctype=text/css', 'text/css' );
		} else {
			mw.notify( 'Only pages from the MediaWiki namespace are allowed.', { title: 'Invalid withCSS value' } );
		}
	}

	if ( extraJS ) {
		// WARNING: DO NOT REMOVE THIS "IF" - REQUIRED FOR SECURITY (against XSS/CSRF attacks)
		if ( /^MediaWiki:[^&<>=%#]*\.js$/.test( extraJS ) ) {
			mw.loader.load( '/w/index.php?title=' + encodeURIComponent( extraJS ) + '&action=raw&ctype=text/javascript' );
		} else {
			mw.notify( 'Only pages from the MediaWiki namespace are allowed.', { title: 'Invalid withJS value' } );
		}
	}

	if ( extraModule ) {
		if ( /^ext\.gadget\.[^,\|]+$/.test( extraModule ) ) {
			mw.loader.load( extraModule );
		} else {
			mw.notify( 'Only gadget modules are allowed.', { title: 'Invalid withModule value' } );
		}
	}
});