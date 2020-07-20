/** <nowiki>
 * @Name                    Onlyifuploading.js
 * @Description             The following code preloads
 *                          [[Template:Image Info|Image Info]] into the
 *                          description input box when uploading images.
 */
function setSpecialUploadTemplate() {
    var editbox = document.getElementById('wpUploadDescription');
    if (wgCanonicalSpecialPageName !== 'Upload' || !editbox || editbox.value !== '') return;
    editbox.value = "{{Image Info\n"
    + "|Description =\n"
    + "|Author      =\n"
    + "|Source      =\n"
    + "|License     =\n"
    + "}}";
}
addOnloadHook(setSpecialUploadTemplate);