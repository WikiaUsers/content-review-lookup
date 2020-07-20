function preloadUploadDesc() {
if (wgPageName.toLowerCase() != 'special:upload') {
return;
}
 
document.getElementById('wpUploadDescription').appendChild(document.createTextNode("[[Category:Images]][[Category:{{SUBST:" + "REVISIONUSER}}]]"));
 
}
addOnloadHook (preloadUploadDesc)