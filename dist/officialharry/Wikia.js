//Script Imports
importArticles({
    type: 'script',
    articles: [
        'u:dev:AutoEditDropdown/code.js', //Menus drop without clicking
        'u:dev:WallGreetingButton/code.js', //Adds Edit Greeting button on Message Walls
        'u:dev:Countdown/code.js', //Allows for Countdown Clocks
        'u:dev:SignatureCheck/code.js', //Checks if users sign messages on Talk Pages
        'u:dev:UserRightsRecord/code.js', //Displays list of Promotions
        'u:dev:Tooltips/code.js' //Displays tooltips when hovering over certain elements
        'u:dev:Standard_Edit_Summary/code.js', //Adds a dropdown for easy edit summaries
        'u:dev:TopEditors/code.js', //Adds a list of top editors
    ]
});
 
//User Page Tabs
mediaWiki.loader.using('mediawiki.util', function() {
"use strict";
jQuery(function($) {
    var $tabs = $('#WikiaUserPagesHeader ul.tabs');
    if (!$tabs.length) return;
    var newTabs = {
        'Sandbox': '/Sandbox',
};
    var name = $('#UserProfileMasthead .masthead-info hgroup > h1');
    if (!name.length) return;
    name = name.text();
    var tabs = document.createDocumentFragment(), li, a;
    for (var tab in newTabs) {
        li = document.createElement('li');
        a = document.createElement('a');
        a.title = 'User:' + name + newTabs[tab];
        a.href = mw.util.wikiGetlink(a.title);
        a.appendChild(document.createTextNode(tab));
        li.appendChild(a);
        tabs.appendChild(li);
    }
    $tabs.append(tabs);
});
});

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
	$( '.WikiaPageHeader' ).append( $( '#title-eraicons' ) );
	$( '#title-eraicons' ).css( { 'position' : 'absolute', 'right' : '0', 'bottom' : '-2em' } ).show();
} );
/*</nowiki></pre>*/