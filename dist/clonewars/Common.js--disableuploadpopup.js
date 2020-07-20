$(function() {
	if (skin == "oasis" || skin == "wikia") {
		if (window.UploadPhotos && window.UploadPhotos.showDialog) {
			$('a.wikia-button.upphotos').unbind('click',UploadPhotos.showDialog);
		}
	}
});