function preloadUploadDesc() {
if (wgPageName.toLowerCase() != 'specjalna:prześlij') {
return;
}
 
document.getElementById('wpUploadDescription').appendChild(document.createTextNode("{{Fair Use Rationale\r| Description       = \r| Source            = \r| Portion           = \r| Purpose           = \r| Resolution        = \r| Replaceability    = \r| Other Information = \r}}"));
 
}
addOnloadHook (preloadUploadDesc);