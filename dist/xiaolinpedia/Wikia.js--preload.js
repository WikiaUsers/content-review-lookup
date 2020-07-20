/* Template Preloads
   by User:Grunny
   Source - w:c:starwars:MediaWiki:Wikia.js
   import into Wikia.js */
 
function customPreloadTemplates() {
 
	if ( ( mw.config.get( 'wgAction' ) !== 'edit' && mw.config.get( 'wgCanonicalSpecialPageName' ) !== 'CreatePage' ) || !$( 'div.module_content' ).length ) {
		return;
	}
 
	var	preloadOptionsHtml = '',
		$preloadOptionsList,
		preloadBaseHtml = '<div id="lf-preload" style="display: block; padding: 10px 0;">Standard preloads:<br /></div>' +
			'<div id="cust-preload" style="padding: 10px 0;">Custom preload pagename:<br /><span id="lf-preload-pagename-w"></span><span id="lf-preload-button-w"></span></div>';
 
	$( 'div.module_content:first' ).append( preloadBaseHtml );
 
	$.get( mw.config.get( 'wgScript' ), { title: 'Template:Stdpreloads', action: 'raw', ctype: 'text/plain' }, function( data ) {
		var lines = data.split( '\n' );
		for( var i = 0; i < lines.length; i++ ) {
			var value = ( lines[i].indexOf( '-- ' ) === 0 ) ? lines[i].substring(3) : "";
			preloadOptionsHtml += '<option value="' + value + '">' + lines[i] + '</option>';
		}
		$preloadOptionsList = $( '<select />' ).attr( 'id', 'stdSummaries' ).html( preloadOptionsHtml ).change( function() {
			var value = $( this ).val();
			if ( value !== '' ) {
				value = 'Template:' + value + '/preload';
				value = value.replace( ' ', '_' );
				$.get( mw.config.get( 'wgScript' ), { title: value, action: 'raw', ctype: 'text/plain' }, function( data ) {
					insertAtCursor( document.getElementById( 'wpTextbox1' ), data );
				} );
			}
		} );
 
		$( 'div#lf-preload' ).append( $preloadOptionsList );
	} );
 
	$( '#lf-preload-pagename-w' ).html( '<input type="text" class="textbox" />' );
	$( '#lf-preload-button-w' ).html( '<input type="button" class="button" value="Insert" onclick="doCustomPreloadOasis()" />' );
 
}
$( customPreloadTemplates );
 
function doCustomPreloadOasis() {
	var value = $( '#lf-preload-pagename-w > input' ).val();
	value = value.replace( ' ', '_' );
	$.get( mw.config.get( 'wgScript' ), { title: value, action: 'raw', ctype: 'text/plain' }, function( data ) {
		insertAtCursor( document.getElementById( 'wpTextbox1' ), data );
	} );
}