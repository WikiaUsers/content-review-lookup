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

/* Audio Button Handler */
mw.loader.using(['mediawiki.util'], function() {
    mw.hook('wikipage.content').add(function($content) {
        var currentAudio = null;
        var currentButton = null;

        $(document).off('click.audiobutton').on('click.audiobutton', '.audio-button', function() {
            var $btn = $(this);
            var fileName = $btn.data('audio');

            console.log('Audio button clicked:', fileName);

            if (!fileName) return;

            if (currentButton && currentButton.is($btn)) {
                currentAudio.pause();
                currentAudio.currentTime = 0;
                $btn.removeClass('now-playing');
                currentAudio = null;
                currentButton = null;
                return;
            }

            if (currentAudio) {
                currentAudio.pause();
                currentAudio.currentTime = 0;
                currentButton.removeClass('now-playing');
            }

            $.getJSON(mw.util.wikiScript('api'), {
                action: 'query',
                titles: 'File:' + fileName,
                prop: 'imageinfo',
                iiprop: 'url',
                format: 'json'
            }).done(function(data) {
                console.log('API response:', data);
                var pages = data.query.pages;
                var page = pages[Object.keys(pages)[0]];
                if (!page.imageinfo) {
                    console.log('No imageinfo found!');
                    return;
                }

                var audioUrl = page.imageinfo[0].url;
                console.log('Playing:', audioUrl);
                var audio = new Audio(audioUrl);

                audio.play();
                $btn.addClass('now-playing');
                currentAudio = audio;
                currentButton = $btn;

                audio.addEventListener('ended', function() {
                    $btn.removeClass('now-playing');
                    currentAudio = null;
                    currentButton = null;
                });
            });
        });
    });
});