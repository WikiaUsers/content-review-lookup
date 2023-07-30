/* Any JavaScript here will be loaded for users using the mobile site */
/* MF broke the mobile styles loading in 1.31 */
mw.loader.load( 'mobile.site.styles' );

/* Add "current revision" and "undo" links to Special:MobileDiff */
$(function() {
    var urlRegex = /.*Special:MobileDiff\/([0-9]+).*/;
    var currentID = location.href.replace(urlRegex, '$1');
    var prevID = $('#mw-mf-diffarea .revision-history-prev a[href]').attr('href').replace(urlRegex, '$1');

    var pagelink = $('#mw-mf-diffarea a[href*="oldid"]');
    pagelink.after('<br>(<a href="/' + pagelink.text().replace(/ /g, '_') + '" style="color:#36c">View current page</a>)');

    $('#mw-mf-diffarea').append('<a class="mw-ui-button" href="/' + pagelink.text().replace(/ /g, '_') + '?action=edit&amp;undoafter=' + prevID + '&amp;undo=' + currentID + '">Undo</a>');
});