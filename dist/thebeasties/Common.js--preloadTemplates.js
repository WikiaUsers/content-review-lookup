// ================================
//     Custom preload templates
// ================================
/* @author Grunny 
   @version 0.0.1 
   From http://harrypotter.wikia.com/wiki/MediaWiki:Wikia.js

   Template list loaded from MediaWiki:PreloadTemplates,
   each syntax is loaded from the /preload subpage of the
   template.
*/

function customPreloadTemplates() {

	if( wgAction !== 'edit' || (!$( 'div.module_content' ).length && skin === 'oasis') || (!$( 'div.editButtons' ).length && skin === 'monobook') ) {
		return;
	}
 
	var	preloadOptionsHtml = '',
		$preloadOptionsList;

        $(function() {
	           if( skin === 'oasis' ) {
		           $( 'div.module_content:first' ).append( '<div id="lf-preload" style="display:block; padding:10px;">Precarica un template:<br /></div>' );
	           } else if( skin === 'monobook' ) {
		                  $( 'div.editButtons' ).append( '<div id="lf-preload" style="display:block; float:right; padding:10px;">Precarica un template:&nbsp;</div>' );
	                  }
        });
 
	$.get( wgScript, { title: 'MediaWiki:PreloadTemplates', action: 'raw', ctype: 'text/plain' }, function( data ) {
		var lines = data.split( '\n' );
		for( var i in lines ) {
			var value = ( lines[i].indexOf( '-- ' ) === 0 ) ? lines[i].substring(3) : "";
			preloadOptionsHtml += '<option value="' + value + '">' + lines[i] + '</option>';
		}
		$preloadOptionsList = $( '<select />' ).attr( 'id', 'stdSummaries' ).html( preloadOptionsHtml ).change( function() {
			var value = $( this ).val();
			if ( value !== '' ) {
				value = 'Template:' + value + '/preload';
				value = value.replace( ' ', '_' );
				$.get( wgScript, { title: value, action: 'raw', ctype: 'text/plain' }, function( data ) {
					if ( document.getElementById( 'wpTextbox1' ) ) {
                                             insertAtCursor( document.getElementById( 'wpTextbox1' ), data );
				        } else { 
                                             // Visual editor
                                             insertAtCursor( document.getElementsByClassName( 'cke_source' )[0], data ); 
                                               }
                                } );
			}
		} );
 
		$( 'div#lf-preload' ).append( $preloadOptionsList );
	} );
 
}
$( customPreloadTemplates );

/**
 * Inserts text at the cursor's current position
 * Originally from Wookieepedia
 */
function insertAtCursor( myField, myValue ) {
	//IE support
	if ( document.selection ) {
		myField.focus();
		sel = document.selection.createRange();
		sel.text = myValue;
	}
	//MOZILLA/NETSCAPE support
	else if( myField.selectionStart || myField.selectionStart == '0' ) {
		var startPos = myField.selectionStart;
		var endPos = myField.selectionEnd;
		myField.value = myField.value.substring(0, startPos)
		+ myValue
		+ myField.value.substring(endPos, myField.value.length);
	} else {
		myField.value += myValue;
	}
}