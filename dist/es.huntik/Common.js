$("section#UploadPhotosWrapper").load(function() {
        $('select[name="wpLicense"]#wpLicense > option:contains(None selected)').attr("value","No license");
});
function preloadUploadDesc() {
if (wgPageName.toLowerCase() != 'especial:subirarchivo') {
return;
}
 
document.getElementById('wpUploadDescription').appendChild(document.createTextNode("{{Fairuse}}"));
 
}
addOnloadHook (preloadUploadDesc)