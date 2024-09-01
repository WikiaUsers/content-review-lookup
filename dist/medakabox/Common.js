/* Any JavaScript here will be loaded for all users on every page load. */

// BEGINNING: JavaScript for placing the fair use rationale template inside the summary box on [[Special:Upload]]. Code by "[[wikipedia:User:Pinky49]]", created and coded specifically for [[wikia:c:cdnmilitary|Duty & Valour]]. Modified by Yyp for use on Bleach Wiki.
 
function preloadUploadDesc() {
if (wgPageName.toLowerCase() != 'special:upload') {
return;
}
 
document.getElementById('wpUploadDescription').appendChild(document.createTextNode("{{Fair use rationale\r| Description       = \r| Source            = \r| Portion           = \r| Purpose           = \r| Resolution        = \r| Replaceability    = \r| Other Information = \r}}"));
 
}
addOnloadHook (preloadUploadDesc)
 
// ****** END: JavaScript for [[Special:Upload]] ******