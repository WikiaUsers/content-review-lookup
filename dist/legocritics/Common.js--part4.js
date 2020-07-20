function preloadUploadDesc() {
if (wgPageName.toLowerCase() != 'special:upload') {
return;
}
 
document.getElementById('wpUploadDescription').appendChild(document.createTextNode("{{Fair use rationale\r| Description       = \r| Source            = \r| Portion           = \r| Purpose           = \r| Resolution        = \r| Replaceability    = \r| Other Information = \r| Licensing = \r}}"));
 
}
addOnloadHook (preloadUploadDesc);

/* Add timer to nav bar */
importScriptPage('MediaWiki:Common.js/displayTimer.js'); 

/* Something Mythrun wanted added. */
importScriptPage('MediaWiki:Common.js/Other2.js', 'legouniverse');

/****************************************/
/* Add Popup Script by User:Jgjake2     */
/****************************************/
importScriptPage('User:Jgjake2/js/ElderScrolls/Popups.js', 'deadisland');