$( document ).ready( function( $ ) {
	var btnData = $( '.enable-extra-edit-button' );
	if ( btnData.length ) {
		var editPage = btnData.html();
		
		$.getJSON( 'https://minecraft.fandom.com/de/api.php', {
			action: 'parse',
			page: editPage,
			prop: 'sections',
			format: 'json'
		} ).done( function( data ) {
			if ( data.parse.sections ) {
				var sections = data.parse.sections;
				for ( var i = 0; i < sections.length; i++ ) {
					if ( sections[i].anchor.localeCompare( mw.config.get("wgPageName") ) === 0 ) {
						var sectionLink = '/de/index.php?title=' + editPage + '&action=edit&section=';
						$( '#ca-edit a' ).attr( 'href', sectionLink + sections[i].index ).html( 'Bearbeiten' );
						
						var edittopHTML = '<span class="mw-editsection">' +
							'<span class="mw-editsection-bracket" style="margin-right: 0.25em;color: #555555;">[</span>' +
							'<a href="/de/index.php?title=' + mw.config.get("wgPageName") + '&amp;action=edit" title="Diese Seite bearbeiten">Quelltext bearbeiten</a>' +
							'<span class="mw-editsection-bracket" style="margin-left: 0.25em;color: #555555;">]</span>' +
							'</span>';
						
						if ( $( '#ca-ve-edit' ).length ) $( '#ca-ve-edit' ).remove();
						if ( $( '.mw-editsection-visualeditor' ).length ) {
							$( '.mw-editsection-visualeditor' ).remove();
							$( '.mw-editsection-divider' ).remove();
						}
						if ( $( '.mw-editsection a' ).length ) {
							$( '.mw-editsection a' ).each( function(s) {
								$( this ).attr( 'href', sectionLink + ( parseInt(sections[i].index, 10) + s + 1 ) ).html( 'Bearbeiten' );
							} );
						}
						
						$( '#firstHeading' ).append( edittopHTML );
						
						break;
					}
				}
			}
		} );
	}
} );