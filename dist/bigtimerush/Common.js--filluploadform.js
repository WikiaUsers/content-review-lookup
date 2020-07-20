function preloadUploadDesc() {
if (wgPageName.toLowerCase() != 'special:upload') {
return;
}
 
document.getElementById('wpUploadDescription').appendChild(document.createTextNode("{{Imagebox\r| description       = \r| source            = \r}}"));
 
}
addOnloadHook (preloadUploadDesc)