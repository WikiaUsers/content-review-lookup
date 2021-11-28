/*<pre><nowiki>*/
/**
 *
 * Custom preload templates for the new Wikia editor
 *
 * @author Grunny
 * @version 0.2
 * Retrieved from [[starwars:MediaWiki:Wikia.js]
 *
 */
 
function customPreloadTemplates() {
 
	if ( ( mw.config.get( 'wgAction' ) !== 'edit' && mw.config.get( 'wgCanonicalSpecialPageName' ) !== 'CreatePage' ) || !$( 'div.module_content' ).length ) {
		return;
	}
 
	var preloadBaseHtml = '<div id="lf-preload" class="edit-widemode-hide" style="padding: 10px;">Standard preloads:<br /></div>' +
			'<div class="edit-widemode-hide" style="padding: 10px;">Custom preload pagename:<br /><span id="lf-preload-pagename-w"></span><span id="lf-preload-button-w"></span></div>';
 
	$( 'div.module_content:first' ).append( preloadBaseHtml );
 
	$.get( mw.config.get( 'wgScript' ), { title: 'Template:Stdpreloads', action: 'raw', ctype: 'text/plain' } ).done( function( data ) {
		var	$preloadOptionsList,
			lines = data.split( '\n' );
 
		$preloadOptionsList = $( '<select />' ).attr( 'id', 'stdSummaries' ).change( function() {
			var templateName = $( this ).val();
			if ( templateName !== '' ) {
				templateName = 'Template:' + templateName + '/preload';
				templateName = templateName.replace( ' ', '' );
				$.get( mw.config.get( 'wgScript' ), { title: templateName, action: 'raw', ctype: 'text/plain' } ).done( function( data ) {
					insertAtCursor( document.getElementById( 'wpTextbox1' ), data );
				} );
			}
		} );
 
		for ( var i = 0; i < lines.length; i++ ) {
			var templateText = ( lines[i].indexOf( '-- ' ) === 0 ) ? lines[i].substring(3) : '';
			$preloadOptionsList.append( $( '<option>' ).val( templateText ).text( lines[i] ) );
		}
 
		$( 'div#lf-preload' ).append( $preloadOptionsList );
	} );
 
	$( '#lf-preload-pagename-w' ).html( '<input type="text" class="textbox" />' );
	$( '#lf-preload-button-w' ).html( '<input type="button" class="button" value="Insert" onclick="doCustomPreloadOasis()" />' );
 
}
 
$( customPreloadTemplates );
 
function doCustomPreloadOasis() {
	var value = $( '#lf-preload-pagename-w > input' ).val();
	value = value.replace( ' ', '_' );
	$.get( mw.config.get( 'wgScript' ), { title: value, action: 'raw', ctype: 'text/plain' } ).done( function( data ) {
		insertAtCursor( document.getElementById( 'wpTextbox1' ), data );
	} );
}
/*</nowiki></pre>*/