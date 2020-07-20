/* Any JavaScript here will be loaded for all users on every page load. */
/* Ajax Auto-Refresh (courtesy pcj) */
/* Auto updating recent changes opt-in
 * See w:c:dev:AjaxRC for info & attribution 
 */
 
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');

// Image upload text
window.onload=function() {
if (mw.config.get('wgCanonicalSpecialPageName') == 'Upload' || mw.config.get('wgCanonicalSpecialPageName') == 'MultipleUpload')
{
        $(".mw-htmlform-field-Licenses").hide();
        $("#wpUploadDescription").html("{{Infobox File\n|description    = \n|source      = \n|author      = \n|other versions = \n}}\n\n[[Category:]]");
}
}