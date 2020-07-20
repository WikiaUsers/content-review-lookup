// <pre><nowiki>
/* Any JavaScript here will be loaded for all users on every page load.
 /* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */

function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);

/* End of the {{USERNAME}} replacement */

/* Edit Link remover */
function EditLink() {
	if( wgPageName != 'Gruntipedia:CGAP' && wgIsLogin ) {
		return;
	}

	editlinks = document.getElementsByTagName( 'span' );
	for( i = 0; i < editlinks.length; i++ ) {
		if( editlinks[i].className != 'editor' ) {
			continue;
		}
		editlinks[i].parentNode.removeChild( editlinks[i] );
	}
}
addOnloadHook( EditLink );

// </nowiki></pre>