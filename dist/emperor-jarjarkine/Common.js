/* Magic edit intro. Copied from Wikipedia's MediaWiki:Common.js
 * modified for use in both Monaco and Monobook skins by Sikon
 * Section edit links added by Green tentacle
 * New Wikia skin support by Grunny
 */
function addEditIntro(name) {
	// Top link
	if( skin == 'oasis' ) {
		$('a[data-id="edit"]').attr('href',$('a[data-id="edit"]').attr('href') + '&editintro=' + name);
		$('span.editsection > a').each( function () {
			$(this).attr('href',$(this).attr('href') + '&editintro=' + name);
		} );
	} else {
		var el = document.getElementById('ca-edit');
 
		if( typeof(el.href) == 'undefined' ) {
			el = el.getElementsByTagName('a')[0];
		}
 
		if (el)
			el.href += '&editintro=' + name;
 
		// Section links
		var spans = document.getElementsByTagName('span');
		for ( var i = 0; i < spans.length; i++ ) {
			el = null;
 
			if (spans[i].className == 'editsection') {
				el = spans[i].getElementsByTagName('a')[0];
				if (el)
					el.href += '&editintro=' + name;
			} else if (spans[i].className == 'editsection-upper') {
				el = spans[i].getElementsByTagName('a')[0];
				if (el)
					el.href += '&editintro=' + name;
			}
		}
	}
}
 
$( function () {
	if ( wgNamespaceNumber === 0 ) {
		var cats = document.getElementById( 'catlinks' );
		if ( !cats ) {
			return;
		}
		cats = cats.getElementsByTagName( 'a' );
		for ( var i = 0; i < cats.length; i++ ) {
			if ( cats[i].title === 'Category:Articles de Qualité' ) {
				addEditIntro( 'Template:Featured_editintro' );
				break;
			} else if ( cats[i].title === 'Category:Wookieepedia good articles' ) {
				addEditIntro( 'Template:Good_editintro' );
				break;
			} else if ( cats[i].title === 'Category:Wookieepedia comprehensive articles' ) {
				addEditIntro( 'Template:Comprehensive_editintro' );
				break;
			} else if ( cats[i].title === 'Category:Articles undergoing major edits' || cats[i].title === 'Category:Works in progress' ) {
				addEditIntro( 'Template:Inuse_editintro' );
				break;
			} else if ( cats[i].title === 'Category:Legends articles with canon counterparts' ) {
				addEditIntro( 'Template:Legends_editintro' );
				break;
			} else if ( cats[i].title === 'Category:Canon articles with Legends counterparts' ) {
				addEditIntro( 'Template:Canon_editintro' );
				break;
			} else if ( wgPageName === 'Template:DYK editintro' ) {
				addEditIntro( 'Template:Good_editintro' );
				break;
			}
		}
	} else if ( wgPageName === 'Template:DidYouKnow' ) {
		addEditIntro( 'Template:DYK_editintro' );
	}
} );