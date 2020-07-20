// 04:22, January 29, 2012 (UTC)
// <source lang="JavaScript">

// Restoring Special:Upload functionality
$(function() {
if (window.UploadPhotos && window.UploadPhotos.showDialog) {
$('a.wikia-button.upphotos').unbind('click',UploadPhotos.showDialog);
}
});
// END Restoring Special:Upload functionality

// Disable the button to add images to existing galleries
// $(function(){
// 	$('#bodyContent .wikia-gallery-add a').unbind('click').click(function(){return false;});
// });
// END Disable the button to add images to existing galleries

// Placeholders link to Special:Upload
// function PlaceholderLink() {
//	$('.wikiaPlaceholder a').attr('href', '/wiki/Special:Upload').unbind('click');
// }
// $(PlaceholderLink);
// END Placeholders link to Special:Upload

// </source>