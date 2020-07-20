/*<pre><nowiki>*/
/**
 *
 * Custom preload templates for the new Wikia editor
 *
 * @author Grunny
 * @version 0.0.1
 *
 */

function customPreloadTemplates() {

	if ( mw.config.get( 'wgAction' ) !== 'edit' || !$( 'div.module_content' ).length ) {
		return;
	}

	$( 'div.module_content:first' ).append( '<div id="lf-preload" class="edit-widemode-hide" style="padding: 10px;">Standard preloads:<br /></div>' );

	$.get( mw.config.get( 'wgScript' ), { title: 'Template:Stdpreloads', action: 'raw', ctype: 'text/plain' } ).done( function( data ) {
		var	$preloadOptionsList,
			lines = data.split( '\n' );

		$preloadOptionsList = $( '<select />' ).attr( 'id', 'stdSummaries' ).change( function() {
			var templateName = $( this ).val();
			if ( templateName !== '' ) {
				templateName = 'Template:' + templateName + '/preload';
				templateName = templateName.replace( ' ', '_' );
				$.get( mw.config.get( 'wgScript' ), { title: templateName, action: 'raw', ctype: 'text/plain' } ).done( function( data ) {
					var editTextBox = document.getElementById( 'cke_wpTextbox1' ) ? document.getElementsByClassName( 'cke_source' )[0] : document.getElementById( 'wpTextbox1' );
					if ( editTextBox ) {
						insertAtCursor( editTextBox, data );
					}
				} );
			}
		} );

		for ( var i = 0; i < lines.length; i++ ) {
			var templateText = ( lines[i].indexOf( '-- ' ) === 0 ) ? lines[i].substring(3) : '';
			$preloadOptionsList.append( $( '<option>' ).val( templateText ).text( lines[i] ) );
		}

		$( 'div#lf-preload' ).append( $preloadOptionsList );
	} );

}
$( customPreloadTemplates );
/*</nowiki></pre>*/