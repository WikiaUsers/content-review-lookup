/* add upload photo button to main page - 3/8/11 */
function UploadOnMainPage() {
	$('.mainpage #WikiaPageHeader div:first').append('<div style="float: right; padding-left: 15px;"><a class="uploadimage" title="Upload a new image to this wiki" href="/wiki/Special:Upload"><img height="0" width="0" class="sprite photo" src="' + wgBlankImgUrl + '"></a><a class="uploadimage" title="Special:Upload" href="/wiki/Special:Upload">Upload Image</a></div>');
}

addOnloadHook(UploadOnMainPage);

/* Auto updating recent changes opt-in
  * See w:c:dev:AjaxRC for info & attribution 
  */
 
 AjaxRCRefreshText = 'Auto-Refresh';
 AjaxRCRefreshHoverText = 'Automatically refresh the page';
 ajaxPages = ["Special:RecentChanges","Special:WikiActivity","Special:UncategorizedPages","Special:AllPages"];
 importScriptPage('AjaxRC/code.js', 'dev');