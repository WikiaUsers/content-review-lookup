/* Any JavaScript code written here will be loaded for all users on every page load. */

// This is for the YouTube Subscriber Count For Templates: YouTuber
mw.loader.load('https://apis.google.com/js/platform.js');

if(wgPageName == 'Special:Upload') {
$('#wpUploadDescription').val('[[Category:Images]]');
}

// LastEdited Settings
window.lastEdited = {
    position: 'bottom',
    size: false,
    comment: false,
    time: true
};