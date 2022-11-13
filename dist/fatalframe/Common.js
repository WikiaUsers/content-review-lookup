importScriptPage( 'PurgeButton/code.js', 'dev' );

var ArchiveToolConfig = { 
   archiveListTemplate: '',
   archivePageTemplate: 'ArchivePage',
   archiveSubpage: 'Archive',
   userLang: true
};
importScriptPage('ArchiveTool/code.js', 'dev');

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);
 
/* End of the {{USERNAME}} replacement */