/*<pre><nowiki>*/
/**
 *
 * Custom preload templates for the new Wikia editor
 *
 * @author Grunny
 * @version 0.2
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
				templateName = templateName.replace( ' ', '_' );
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
// Add clickable skin to Instant Expert: The Force Awakens page (temporary)
if(mw.config.get('wgPageName') === "Instant_Expert:The_Force_Awakens") {
    var targetURL = 'http://ow.ly/W5KxR';
    $('body').prepend('<a href="' + targetURL + '"><div class="clickable-skin"></div></a>');
    $('.clickable-skin').css({
        'height': '100%',
        'position': 'absolute',
        'width': '100%',
        'z-index': '1'
    });
}

function showEras(elem) {
    var icons = $('.header-title #title-eraicons');
    if(icons.length === 0) {
        if($('.header-title h2').length === 0) $('.header-title').append('<h2 />');
        icons = $('<div id="title-eraicons" />').appendTo('.header-title h2').css({'height': '23px', 'float': 'right', 'margin': '4px 10px -1px'});
    }
    $(elem).children().appendTo(icons);
    $(elem).remove();
}
$(function() {
    showEras('#mw-content-text [id=title-eraicons]');
});

/*</nowiki></pre>*/