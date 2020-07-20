/* Restores the Special:Upload functionality. This does not block core functionality
 * by: [[w:c:starwars:User:Green tentacle|Green tentacle]]
 */
 
$(function() {
	if (window.UploadPhotos && window.UploadPhotos.showDialog) {
		$('a.wikia-button.upphotos').unbind('click',UploadPhotos.showDialog);
	}
});