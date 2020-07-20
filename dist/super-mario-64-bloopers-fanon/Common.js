/* Any JavaScript here will be loaded for all users on every page load. */

////////////////////////////////////////////////////////////////////////////////
///////////////// START CODES TAKEN FROM ONETWOTHREEFALL'S GLOBAL JS ///////////
////////////////////////////////////////////////////////////////////////////////
 
// Adds links to Special:WhatLinksHere to edit pages linked on it.
 
if (mw.config.get('wgCanonicalSpecialPageName') === 'Whatlinkshere') {
    $('#mw-whatlinkshere-list > li').each(function (ignore, element) {
        var link = new mw.Uri($(element).children('a').attr('href'));
        link.extend({action: 'edit'});
        $(element).find('.mw-whatlinkshere-tools > a:last-child')
            .after(' | ', $('<a>').attr('href', link.toString()).text('edit'));
    });
}
 
// Adds separate list of uncreated categories on Special:Categories.
 
if (mw.config.get('wgCanonicalSpecialPageName') === 'Categories') {
    var $newCats = $('<div>').css('float', 'right').text('Uncreated categories:');
    var $newCatsList = $('<ul>').appendTo($newCats);
    $('.mw-spcontent > ul').before($newCats);
    $('.mw-spcontent > ul > li').has('.newcategory').clone().appendTo($newCatsList);
}
 
// Adds a button to clear Deletion reasons
 
if (mw.config.get('wgAction') === 'delete') {
    $('#wpReason').after(' <span id="wpClearReason" class="button">\u232b</span>');
    $('#wpClearReason').click(function () {
        $('#wpReason').val('').focus();
    });
}
 
// Expand collapsed information on Recent Changes and Watchlist
 
if ($.inArray(mw.config.get('wgCanonicalSpecialPageName'), ['Recentchanges', 'Recentchangeslinked', 'Watchlist']) !== -1) {
    $(window).load(function () {
        $('.mw-collapsible-toggle-collapsed').click();
    });
}
 
////////////////////////////////////////////////////////////////////////////////
///////////////// END CODES TAKEN FROM ONETWOTHREEFALL'S GLOBAL JS /////////////
////////////////////////////////////////////////////////////////////////////////
 
// Test if an element has a certain class.
// Increases general performance.
 
var hasClass = (function () {
    var reCache = {};
    return function (element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();

// AjaxRC Configuration
 
window.ajaxSpecialPages = [
    "Recentchanges", 
    "Recentchangeslinked", 
    "WikiActivity", 
    "Watchlist", 
    "Log", 
    "Contributions", 
    "NewPages", 
    "Images", 
    "Following", 
    "UncategorizedPages",
    "Categories",
    "BlockList",
    "ListFiles",
    "Withoutimages",
    "DoubleRedirects",
    "Whatlinkshere"];
window.ajaxPages = ["Blog:Recent posts"];
window.ajaxRefresh = 30000;
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxIndicator = 'https://vignette.wikia.nocookie.net/dev/images/b/ba/Snake_throbber_dark-bg.gif/revision/latest?cb=20140519203615';

// Allows one to update file-links across all pages when renaming an image
 
window.LIRoptions = {
    bottomMessage: '',
    editSummary: 'Updating file links after renaming of image (automatic)',
    singleButtonText: 'Rename and update',
    queueButtonText: 'Add to queue',
    delay: 1000
};
 
if (wgPageName.indexOf('Special:MovePage/File:') !== -1 || (wgCanonicalNamespace === 'File' && Storage)) {
    importScriptPage('FileUsageAuto-update/code.js', 'dev');
}

// Allows text to be hidden in other text and revealed with a click
 
$(".container").click(function() {
  $div = $(this).find("div");
  $($div).toggleClass("active");
});