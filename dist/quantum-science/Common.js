/* Any JavaScript here will be loaded for all users on every page load. */

if (wgPageName === 'Special:Upload' || wgPageName === 'Special:MultipleUpload') {
    $('#wpUploadDescription').val('[[Category:Images]]');
}

window.lastEdited = {
    position: 'bottom',
    size: false,
    comment: false,
    time: true
};