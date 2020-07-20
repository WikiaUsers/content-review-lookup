/** Magic editintros ****************************************************
 *
 *  Description: Adds editintros on disambiguation pages and BLP pages.
 *  From: [[w:c:dev:Magic editintros]]
 *  Maintainers: [[wikipedia:User:RockMFR]]
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
 
		if( el ) {
			el.href += '&editintro=' + name;
		}
 
		// Section links
		var spans = document.getElementsByTagName('span');
		for ( var i = 0; i < spans.length; i++ ) {
			el = null;
 
			if ( spans[i].className == 'editsection' ) {
				el = spans[i].getElementsByTagName('a')[0];
				if (el)
					el.href += '&editintro=' + name;
			} else if ( spans[i].className == 'editsection-upper' ) {
				el = spans[i].getElementsByTagName('a')[0];
				if( el ) {
					el.href += '&editintro=' + name;
				}
			}
		}
	}
}
 
if (wgNamespaceNumber == 0) {
	addOnloadHook( function () {
		if (document.getElementById('disambigbox'))
			addEditIntro('Template:Disambig_editintro');
	} );
 
	addOnloadHook( function () {
		var cats = document.getElementById('mw-normal-catlinks');
		if (!cats)
			return;
		cats = cats.getElementsByTagName('a');
		for (var i = 0; i < cats.length; i++) {
			if (cats[i].title == 'Category:Living people' || cats[i].title == 'Category:Possibly living people') {
				addEditIntro('Template:BLP_editintro');
 				break;
			}
		}
	} );
}