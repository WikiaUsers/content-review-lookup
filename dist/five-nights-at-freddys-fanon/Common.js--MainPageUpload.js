/* add upload photo button to main page - 3/8/11 */
function UploadOnMainPage() {
	var wgBlankImgUrl = 'data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D';
	$('.mainpage #WikiaPageHeader div:first').append('<div style="float: right; padding-left: 15px;"><a class="uploadimage" title="Upload a new image to this wiki" href="/wiki/Special:Upload"><img height="0" width="0" class="sprite photo" src="' + wgBlankImgUrl + '"></a><a class="uploadimage" title="Special:Upload" href="/wiki/Special:Upload">Upload Image</a></div>');
}
 
addOnloadHook(UploadOnMainPage);