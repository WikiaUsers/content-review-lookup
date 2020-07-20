function preloadUploadDesc() {
if (window.wgPageName.toLowerCase() != 'special:upload') {
return;
}
document.getElementById('wpUploadDescription').appendChild(document.createTextNode("{{Fair use rationale\r| Description       = \r| Source           = \r| Purpose           = \r| Resolution        = \r| Replaceability    = \r| Other Information = \r}}"));
}
addOnloadHook (preloadUploadDesc);