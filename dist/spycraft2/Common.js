/* 
This code is loaded on all skins.
*/
importArticle({
    type: "style",
    article:"MediaWiki:StaffHighlight.css"
});
importArticles({
    type: "script",
    articles: [
        "w:dev:ShowHide/code.js",
        "w:dev:LockOldBlogs/code.js"
    ]
});

/** Archive edit tab disabling *************************************
 * Disables the edit tab on old forum topic pages to stop new people bumping old topics.
 * Page can still be edited by going via the edit tab on the history etc, or by 
 * typing the edit address manually.
 * By [[User:Spang|Spang]]
 * Monaco support by [[User:Uberfuzzy|Uberfuzzy]]
 * Oasis support by [[User:Uberfuzzy|Uberfuzzy]]
 */

if(wgNamespaceNumber == 110 ||wgNamespaceNumber === 114 ) {

function disableOldForumEdit() {
	if( typeof( enableOldForumEdit ) != 'undefined' && enableOldForumEdit ) {
		return;
	}
	if( !document.getElementById('old-forum-warning') ) {
		return;
	}

if(skin == 'oasis') {
  $('#WikiaPageHeader .wikia-menu-button > a').html('Archived').removeAttr('href');
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
}


/* Opens chat in a new window for homepage */

$(".openchat a").click(function() {
   window.open('/wiki/Special:Chat', 'wikiachat', 'width=600,height=600,menubar=no,status=no,location=no,toolbar=no,scrollbars=no,resizable=yes');
   return false;
});

/*
$(function(){
	if ( wgNamespaceNumber === 112 || wgNamespaceNumber === 113 ||wgNamespaceNumber === 114 || wgNamespaceNumber === 115 ) {
		var FEurl = wgScript + '?title=Admin_Central:Main_Page';
		$('h1.wordmark.medium.graphic > a').attr('href', FEurl);
	}
});
*/