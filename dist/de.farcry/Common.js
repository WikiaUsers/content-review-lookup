/* Jedes JavaScript hier wird für alle Benutzer für jede Seite geladen. */

 // Import [[MediaWiki:Onlyifuploading.js]] 


/* Replaces "{{USERNAME}}" with the name of the user browsing the page.
   Requires copying Template:USERNAME. */

function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);

/* End of the {{USERNAME}} replacement */