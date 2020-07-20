/*<pre><nowiki>*/
/**
 *
 * Custom preload templates for the new Wikia editor
 *
 * @author Grunny
 * @version 0.2
 *
 * For Template:Eras
 */
 
 
// Copied from http://avatar.wikia.com/wiki/MediaWiki:Common.js/icons.js
$( function eraIconsOasis() {
    if ( $( '.wds-community-header' ).length ) {
        $( '#PageHeader' ).prepend(
            $( '#title-eraicons' ).attr( 'style', 'position: absolute; right: 0px;' )
        );
    } else {
        $( '.WikiaPageHeader' ).append( $( '#title-eraicons' ) );
        $( '#title-eraicons' ).css( { 'position' : 'absolute', 'right' : '0', 'bottom' : '-2em' } ).show();
    }
} );
/*</nowiki></pre>*/
/** Magic editintros ****************************************************
 *
 *  Description: Adds editintros on disambiguation pages and living person pages.
 *  Wikipedia Maintainers: [[User:RockMFR]]
 *  Modified by [[User:Grunny]] and [[User:Sikon]] for use in both Monobook and Monaco on Wikia
 *  Added section edit functionality by [[User:Green tentacle]]
 *  Fix for new edit button next to the title by [[User:Grunny]]
 *  New Wikia skin support by Grunny
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
if (wgNamespaceNumber === 0) {
	jQuery( function( $ ) {
		var cats = document.getElementById('mw-normal-catlinks');
		if (!cats)
			return;
		cats = cats.getElementsByTagName('a');
		for (var i = 0; i < cats.length; i++) {
			if (cats[i].title == 'Category:Canon articles with Legends counterparts') {
				addEditIntro('Template:Canon_editintro');
				break;
			}
			else if ( cats[i].title === 'Category:Legends articles with canon counterparts' ) {
				addEditIntro( 'Template:Legends_editintro' );
				break;
			}
		}
	} );
}