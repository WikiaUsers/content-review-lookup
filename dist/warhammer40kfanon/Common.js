/* Any JavaScript here will be loaded for all users on every page load. */

function preloadUploadDesc() {
if (wgPageName.toLowerCase() != 'special:upload') {
return;
}
 
document.getElementById('wpUploadDescription').appendChild(document.createTextNode("{{Information\r| attention      = \r| description    = \r| source         = \r| author         = \r| filespecs      = \r| licensing      = \r| other versions = \r}}"));
 
}
addOnloadHook (preloadUploadDesc)