/* ###################### */
/* ### Local scripts  ### */
/* ###################### */
 
// Image upload text
window.onload=function() {
if (mw.config.get('wgCanonicalSpecialPageName') == 'Upload' || mw.config.get('wgCanonicalSpecialPageName') == 'MultipleUpload')
{
        $(".mw-htmlform-field-Licenses").hide();
        $("#wpUploadDescription").html("{{Infobox File\n|description = \n|source      = \n|author      = \n}}\n\n[[Category:]]");
}
}