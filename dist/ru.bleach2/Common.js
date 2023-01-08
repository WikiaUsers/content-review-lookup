
// =====================================================================
// Pagetitle rewrite
//
// Rewrites the page's title, used by Template:Title
// by Sikon
//
// The script was found incompatable when imported as other scripts are
// =====================================================================
 
function rewriteTitle() {
    if(typeof(SKIP_TITLE_REWRITE) != 'undefined' && SKIP_TITLE_REWRITE)
        return;
 
    var titleDiv = document.getElementById('title-meta');
    if(titleDiv == null || titleDiv == undefined)
        return;
 
    // For the title in the Monaco masthead
    if (skin == "monaco" && (wgCanonicalNamespace == "User" || wgCanonicalNamespace == "User_talk")) {
        var mastheadUser = document.getElementById("user_masthead_head");
        var mastheadSince = document.getElementById("user_masthead_since");
 
        var titleString = '<h2>' + titleDiv.innerHTML;
        titleString += '<small id="user_masthead_since">' + mastheadSince.innerHTML;
        titleString += '</small></h2>';
 
        mastheadUser.innerHTML = titleString;
    } else {
        var cloneNode = titleDiv.cloneNode(true);
        var firstHeading = $('h1.firstHeading').get(0);
        var node = firstHeading.childNodes[0];
 
        // new, then old!
        firstHeading.replaceChild(cloneNode, node);
        cloneNode.style.display = "inline";
 
        var titleAlign = document.getElementById('title-align');
        firstHeading.style.textAlign = titleAlign.childNodes[0].nodeValue;
    }
}
addOnloadHook(rewriteTitle, false);
/* End of the JavaScript title rewrite/alignment */


/** Archive edit tab disabling *************************************
 * Disables the edit tab on old forum topic pages to stop new people bumping old topics.
 * Page can still be edited by going via the edit tab on the history etc, or by 
 * typing the edit address manually.
 * By [[User:Spang|Spang]]
 * Monaco support by [[User:Uberfuzzy|Uberfuzzy]]
 * Oasis support by [[User:Uberfuzzy|Uberfuzzy]]
 */
 
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
}


// =====================================================================
// Replaces {{USERNAME}} with the name of the user browsing the page.
// Requires copying Template:USERNAME.
// =====================================================================
 
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);


// =====================================================================
// Моя попытка переписывания наименования статьи, а я программист тот еще :)
// =====================================================================
 
function TitleReplace() {
    if(typeof(disableTitleReplace) != 'undefined' && disableTitleReplace || wgPageName == null) return;
    $("span.inserttitle").html(wgPageName);
 }
 addOnloadHook(TitleReplace);