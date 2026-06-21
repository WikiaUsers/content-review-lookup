mw.loader.load('https://apis.google.com/js/platform.js');
 
if(mw.config.get('wgPageName') == 'Special:Upload' || mw.config.get('wgPageName') == 'Special:MultipleUpload') {
$('#wpUploadDescription').val('[[Category:Images]]');
}
 
// change label
$('.pi-data-label:contains("Username")').replaceWith('<h3 class="pi-data-label pi-secondary-font">Subscribers</h3>');
 
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
 
function doCustomPreloadOasis() {
	var value = $( '#lf-preload-pagename-w > input' ).val();
	value = value.replace( ' ', '_' );
	$.get( mw.config.get( 'wgScript' ), { title: value, action: 'raw', ctype: 'text/plain' } ).done( function( data ) {
		insertAtCursor( document.getElementById( 'wpTextbox1' ), data );
	} );
}
 
function insertAtCursor(myField, myValue) {
	//IE support
	if (document.selection)
	{
		myField.focus();
		sel = document.selection.createRange();
		sel.text = myValue;
	}
	//MOZILLA/NETSCAPE support
	else if(myField.selectionStart || myField.selectionStart == '0')
	{
		var startPos = myField.selectionStart;
		var endPos = myField.selectionEnd;
		myField.value = myField.value.substring(0, startPos)
		+ myValue
		+ myField.value.substring(endPos, myField.value.length);
	}
	else
	{
		myField.value += myValue;
	}
}

mw.loader.load('https://en.wikipedia.org/w/index.php?title=MediaWiki:Gadget-ReferenceTooltips.js&action=raw&ctype=text/javascript');

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:MassCategorization/code.js',
    ]
});

/* Ejen Ali custom audio button */

$(function () {

    $(".audio-clip").each(function () {

        var container = $(this);
        var audio = container.find("audio").get(0);

        if (!audio) {
            return;
        }

        var button = $("<span></span>")
            .addClass("audio-clip-button");

        container.prepend(button);

        button.on("click", function () {

            $(".audio-clip audio").each(function () {
                this.pause();
                this.currentTime = 0;
            });

            $(".audio-clip-button")
                .removeClass("now-playing");

            if (audio.paused) {

                audio.play();
                button.addClass("now-playing");

            } else {

                audio.pause();
                audio.currentTime = 0;
            }

        });

        audio.onended = function () {
            button.removeClass("now-playing");
        };

    });

});