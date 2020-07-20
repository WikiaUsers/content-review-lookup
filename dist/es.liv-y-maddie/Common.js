/* Any JavaScript here will be loaded for all users on every page load. */
 
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');
 
/* Adding Message Wall buttons */
 
$(function() {
	if (wgCanonicalNamespace == 'Message_Wall' && wgAction != 'history') {
		if (wgTitle == wgUserName) {
			$('.WikiaMainContent').prepend('<div class="UserProfileActionButton"><a accesskey="e" href="/wiki/Message_Wall_Greeting:'+ wgUserName +'?action=edit" class="wikia-button" data-id="edit" id="talkArchiveEditButton" style="padding-left: 5px; padding-right: 8px;"><img alt="" class="sprite edit-pencil" height="16" src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D" width="22"> Edit greeting	</a></div>');
		}
	}
});
 
var index;
var element;
var a = document.getElementsByClassName("thumbcaption");
for (index = 0; index < a.length; ++index) {
    element = a[index];
    element.innerHTML=element.innerHTML + "<small><span style=\"color:#d461fa;\">   Click image for specific details.<br/>LIV AND MADDIE WIKI</span></small>";
}
 
importArticles({
    type: 'script',
    articles: [
        // ...
        'w:c:dev:ReferencePopups/code.js',
        // ...
    ]
});
 
// Special:Upload script by iggyvolz
window.onload=function() {
if (wgPageName == 'Special:Upload')
{
        document.getElementById('mw-htmlform-description').childNodes[0].childNodes[6].style.display="none";  // Remove "licensing" tab
        document.getElementById('mw-htmlform-description').childNodes[0].childNodes[7].style.display="none"; // Remove space that was under "licensing" tab
        document.getElementById('wpUploadDescription').value='{{imagebox\n|source=Please add a source to this image.\n|description=Please add a description of this image.\n}}'; // Preload Template:Imagebox into description
}
}