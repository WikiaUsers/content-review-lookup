/* Any JavaScript here will be loaded for all users on every page load. */

if (wgPageName === 'Special:Upload') {
    $('#wpUploadDescription').val('[[Category:Images]]');
}

window.lastEdited = {
    position: 'bottom',
    size: false,
    comment: false,
    time: true
};