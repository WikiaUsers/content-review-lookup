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

// BEGINNING: JavaScript for placing the fair use rationale template inside the summary box on [[Special:Upload]]. Code by "[[wikipedia:User:Pinky49]]", created and coded specifically for [[wikia:c:cdnmilitary|Duty & Valour]].
 
function FairUseRationale() {
        if((wgPageName == 'Special:Upload' || wgPageName == 'Special:MultipleUpload') && document.getElementById('wpDestFile').value == '') {
                document.getElementById('wpUploadDescription').value = '== Source ==\n\n== Licensing ==\n\n[[Category:';
        }
}
addOnloadHook(FairUseRationale);
 
// ****** END: JavaScript for [[Special:Upload]] ******

// ============================================================
//                       Imports
// ============================================================
importArticles({
	type: 'script',
	articles: [
		// ...
		'w:c:dev:SignatureCheck/code.js',
		'w:c:dev:RevealAnonIP/code.js',
		'w:c:dev:View_Source/code.js',
		'w:c:dev:EditIntroButton/code.js',
		'w:c:dev:Thread Inspection/code.js',
		'w:c:dev:FixWantedFiles/code.js',
		'w:c:dev:CacheCheck/code.js',
                'w:c:dev:WallGreetingButton/code.js',
		'w:c:dev:MiniComplete/code.js'
		// ...
	]
});
 
/* Auto Refresh */
AjaxRCRefreshText = 'Auto-Refresh';
AjaxRCRefreshHoverText = 'Automatically Refreshing This Page.';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');
 
/* InactiveUsers */
InactiveUsers = { months: 1 };
 
importScriptPage('InactiveUsers/code.js', 'dev');
 
/* FileLinksAutoUpdate */
if (wgPageName.indexOf("Special:MovePage/File:") != -1 || (wgCanonicalNamespace == "File" && Storage)){
   importScriptPage("FileUsageAuto-update/code.js/min.js", "dev");
}