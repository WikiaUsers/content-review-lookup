/* ここにあるすべてのJavaScriptは携帯機器版サイトの利用者に影響します */
/* MF broke the mobile styles loading in 1.31 */
mw.loader.load( 'mobile.site.styles' );

/* Add "current revision" and "undo" links to Special:MobileDiff on old skin */
$(function() {
    var urlRegex = /.*特別:携帯機器差分\/([0-9]+).*/;
    var currentID = decodeURI(location.href).replace(urlRegex, '$1');
    var prevID = $('#content #mw-mf-diffarea .revision-history-prev a[href]').attr('href').replace(urlRegex, '$1');

    var pagelink = $('#content #mw-mf-diffarea a[href*="oldid"]');
    pagelink.after('<br>(<a href="/' + pagelink.text().replace(/ /g, '_') + '" style="color:#36c">現在の版を閲覧</a>)');

    $('#content #mw-mf-diffarea').append('<a class="mw-ui-button" href="/' + pagelink.text().replace(/ /g, '_') + '?action=edit&amp;undoafter=' + prevID + '&amp;undo=' + currentID + '">元に戻す</a>');
});