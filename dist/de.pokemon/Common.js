/* Jedes JavaScript hier wird f�r alle Benutzer f�r jede Seite geladen. */

 // Import [[MediaWiki:Onlyifuploading.js]] 

/* Skript f�r die USERNAME-Vorlage (ersetzt Inhalt der Vorlage durch den Namen des Lesers) */
 
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);
 
/* Ende des Username-Skripts */