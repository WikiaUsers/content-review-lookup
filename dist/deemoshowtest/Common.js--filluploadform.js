function preloadUploadDesc() {
if (wgPageName.toLowerCase() != 'special:upload') {
return;
}

document.getElementById('wpUploadDescription').appendChild(document.createTextNode("Description ="));
 
}
addOnloadHook (preloadUploadDesc)