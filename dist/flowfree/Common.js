//Make level grid work
$('#level-grid-random-card').click(function() {
var hashes = $('.mw-headline').map(function() {
    return $(this).attr('id');
});
location.hash = hashes[Math.round(Math.random() * (hashes.length - 1))];
});

//By default add category for new images for Flow Free

if(wgPageName == 'Special:Upload' || wgPageName == 'Special:MultipleUpload') {
$('#wpUploadDescription').val('[[Category:Images]]');
}

//Configuration for AjaxRC
window.ajaxPages = ["Some Frequently Updated Page"];
window.ajaxSpecialPages = ["Recentchanges", "WikiActivity", "Watchlist", "Log", "Contributions"];
window.ajaxIndicator = 'https://images.wikia.nocookie.net/software/images/a/a9/Indicator.gif';
window.ajaxRefresh = 30000;
$.extend(true, window, {dev: {i18n: {overrides: {AjaxRC: {
    'ajaxrc-refresh-text': 'AJAX',
    'ajaxrc-refresh-hover': 'Enable page auto-refresh',
}}}}});