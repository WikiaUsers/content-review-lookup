// BackToTopModern
window.BackToTopModern = true;

// Automatically categorizes under Images category
if(wgPageName == 'Special:Upload' || wgPageName == 'Special:MultipleUpload') {
     $('#wpUploadDescription').val('[[Category:Images]]');
}

// Fix static GIF thumbnails - Taken from Sonic News Network
window.DynamicImages = {
    gifGalleryImages: true,
    gifImages: false,
    svgGaleryImages: true,
};