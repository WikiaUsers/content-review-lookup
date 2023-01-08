/****
 ===========================================================
 # Start codes taken from OneTwoThreeFall's Global JS
 ===========================================================
**/
 
// *****************************************************************
// Adds links to Special:WhatLinksHere to edit pages linked on it.
// *****************************************************************
 
if (mw.config.get('wgCanonicalSpecialPageName') === 'Whatlinkshere') {
    $('#mw-whatlinkshere-list > li').each(function (ignore, element) {
        var link = new mw.Uri($(element).children('a').attr('href'));
        link.extend({action: 'edit'});
        $(element).find('.mw-whatlinkshere-tools > a:last-child')
            .after(' | ', $('<a>').attr('href', link.toString()).text('edit'));
    });
}
 
// ********************************************************************
// Adds separate list of uncreated categories on Special:Categories.
// *********************************************************************
 
window.ajaxCallAgain.push(function() {
    if (wgPageName === "Special:Categories") {
    var $newCats =  $('<div>')
            .css('float', 'right')
            .text('Uncreated categories:')
            .attr('id', 'EmptyCats');
    var $newCatsList = $('<ul>').appendTo($newCats);
    $('.mw-spcontent > ul').before($newCats);
    $('.mw-spcontent > ul > li')
        .has('.newcategory')
        .clone()
        .appendTo($newCatsList);}
});
 
// ******************************************
// Adds a button to clear Deletion reasons
// ******************************************
 
if (mw.config.get('wgAction') === 'delete') {
    $('#wpReason').after(' <span id="wpClearReason" class="button">\u232b</span>');
    $('#wpClearReason').click(function() {$('#wpReason').val('').focus();});
}
 
// *************************************************************
// Expand collapsed information on Recent Changes and Watchlist
// *************************************************************
 
if ($.inArray(mw.config.get('wgCanonicalSpecialPageName'), 
    ['Recentchanges', 'Recentchangeslinked', 'Watchlist']) !== -1) {
        $(window).on("load", function() {
            $('.mw-collapsible-toggle-collapsed').click();});
}
 
/****
 ===========================================================
 # End codes taken from OneTwoThreeFall's Global JS
 ===========================================================
**/

// ***************************************************
// Highlight changed whitespace characters in diffs.
// By UltimateSupreme, taken from their Global JS 
// ****************************************************

if ($.getUrlVar('diff')) {
    $('.diffchange-inline').each(function() {
        if (!(new RegExp('\\S+').test($(this).text()))) {
            $(this).css('background-color', 'red')}
    });
}

// *****************************************
// Allows more in-depth resizing of images
// *****************************************
 
$(".image-resize").each(function() {
    var a = $(this).children(".image-resize-new").text().split("_");
        img = $(this).find("img");
    if (!isNaN(Number(a[1])) && !isNaN(Number(a[1]))) {
        img.attr({
            width: a[0],
            height: a[1]
        });
    }
});