/*<pre><nowiki>*/
/**
 *
 * Custom preload templates for the new Wikia editor
 *
 * @author Grunny
 * @version 0.0.1
 *
 */
 
importArticles({
    type: 'script',
    articles: [
        'MediaWiki:API.js'
    ]
});

/*function customPreloadTemplates() {

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
$( customPreloadTemplates );*/

if($.inArray(wgNamespaceNumber, [2,1200,500]) != -1 || /Spezial:Beiträge\/[A-Za-z_].*/.test(wgPageName) || wgPageName == 'Spezial:Verfolgen') {
    $(function() {
        if($.inArray(wgNamespaceNumber, [2,1200,500]) != -1) {
            var username = wgTitle;
        }
        else if(/Spezial:Beiträge\/[A-Za-z_].*/.test(wgPageName)) {
            var username = wgPageName.replace(/Spezial:Beiträge\/([A-Za-z_].*)/,'$1');
        }
        else if(wgPageName == 'Spezial:Verfolgen') {
            var username = wgUserName;
        }
        username = username.replace('_',' ');
        var rights = {
            'Harry granger' : ['Administratorin','Bürokratin','Inhaltlicher Ansprechpartner', 'Gründerin'],
            'Agent Zuri' : ['Administrator', 'Technischer Ansprechpartner']
        };
        if($.inArray("codeadmin", wgUserGroups) != -1) {
            console.log(rights[username]);
            rights[username] = [];
            rights[username].push('Codeadmin');
        }
        else {
            console.dir(wgUserGroups);
        }
            newrights = rights[username];
 
        if (typeof newrights != 'undefined') {
            // remove old rights
            $('.UserProfileMasthead .masthead-info span.tag').remove();
     
            for (var i in newrights) {
                // add new rights
            $('<span />').attr('class','tag').css('margin-left','10px').text(newrights[i]).appendTo('.masthead-info hgroup');    
            }
        }
    });
}
/*</nowiki></pre>*/