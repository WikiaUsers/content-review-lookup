function importScriptPage (page, server) {
var url = '/index.php?title=' + encodeURIComponent(page.replace(/ /g,'_')).replace('%2F','/').replace('%3A',':') + '&action=raw&ctype=text/javascript';
if (typeof server == "string") url = (server.indexOf('://') == -1)?'http://' + server + '.wikia.com' + url:server + url;
return importScriptURI(url);
}

/* Clickable tables: pick up table rows in a table with "clickable-tables" class. Toggle completed class to flip content formatting to green and strikethrough to indicate completion*/
mw.loader.using(['jquery', 'mediawiki.util']).then(function() {
    $(document).ready(function() {
        $(document).on('click', '.clickable-tables tr', function() {
            $(this).toggleClass('completed');
        });
    });
});


// Commented the below out on 04/03/2025 - outdated javascript throwing console errors regarding cross scripting and unset variables. Console logs suggest this is being blocked anyway so shouldn't impact page functionalities

// ShowHide - causing console errors as of 04/03/2025 (seemed to be data security)
// var ShowHideConfig = { autoCollapse: Infinity };
// importScriptPage('ShowHide/code.js', 'dev');

/** Archive edit tab disabling *************************************
 * Disables the edit tab on old forum topic pages to stop new people bumping old topics.
 * Page can still be edited by going via the edit tab on the history etc, or by 
 * typing the edit address manually.
 * By [[User:Spang|Spang]]
 * Monaco support by [[User:Uberfuzzy|Uberfuzzy]]
 * Oasis support by [[User:Uberfuzzy|Uberfuzzy]]
 */
 /* wgNamespaceNumber is an unset variable, this is causing errors and breaking the rest of this file, commenting out the rest as this likely won't be hit otherwise? Commented out 04/03/2025
if(wgNamespaceNumber == 110) { 
	function disableOldForumEdit() {
		if( typeof( enableOldForumEdit ) != 'undefined' && enableOldForumEdit ) {
			return;
		}
		if( !document.getElementById('old-forum-warning') ) {
			return;
		}
	 
		if( skin == 'oasis' )
		{
			$("#WikiaPageHeader .wikia-menu-button li a:first").html('Archived').removeAttr('href' );
			$('#WikiaPageHeader .wikia-button').html('Archived').removeAttr('href');
			return;
		}
	 
		if( !document.getElementById('ca-edit') ) {
			return;
		}
		var editLink = null;
		if( skin == 'monaco' )
		{
			editLink = document.getElementById('ca-edit');
		}
		else if( skin == 'monobook' )
		{
			editLink = document.getElementById('ca-edit').firstChild;
		}
		else
		{
			return;
		}
	 
	 
		editLink.removeAttribute('href', 0);
		editLink.removeAttribute('title', 0);
		editLink.style.color = 'gray';
		editLink.innerHTML = 'Archived';
	 
		$('span.editsection-upper').remove();
	 
	}
	addOnloadHook( disableOldForumEdit );
}*/