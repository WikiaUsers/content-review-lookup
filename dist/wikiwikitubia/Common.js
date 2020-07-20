/* Any JavaScript here will be loaded for all users on every page load. */

/* icons in top right corner */
if ($('.page-header__languages').exists()) {
    $('#icons').addClass('wds-dropdown').insertAfter('.page-header__languages');
} else {
    $('#PageHeader').append($('#icons'));
}

/* multiple upload */
if(wgPageName == 'Special:Upload' || wgPageName == 'Special:MultipleUpload') {
$('#wpUploadDescription').val('[[Category:Images]]');
}