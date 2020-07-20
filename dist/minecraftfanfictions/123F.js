/**----------------------------------------------**/
/** Codes taken from OneTwoThreeFall's Global JS **/
/**----------------------------------------------**/

//=========================================================================
// Adds separate list of uncreated categories on Special:Categories.
//========================================================================
 
if (mw.config.get('wgCanonicalSpecialPageName') === 'Categories') {
    var $newCats = $('<div>')
        .css('float', 'right')
        .text('Uncreated categories:');
    var $newCatsList = $('<ul>').appendTo($newCats);
    $('.mw-spcontent > ul').before($newCats);
    $('.mw-spcontent > ul > li').has('.newcategory')
        .clone()
        .appendTo($newCatsList);
}

//====================================================    
// Adds a button to clear Deletion reasons
//====================================================

if (mw.config.get('wgAction') === 'delete') {
    $('#wpReason')
        .after(' <span id="wpClearReason" class="button">\u232b</span>');
    $('#wpClearReason').click(function () {
        $('#wpReason').val('').focus();});
}

//====================================================================
// Adds links to Special:WhatLinksHere to edit pages linked on it.
//==================================================================== 
 
if (mw.config.get('wgCanonicalSpecialPageName') === 'Whatlinkshere') {
    $('#mw-whatlinkshere-list > li').each(function (ignore, element) {
        var link = new mw.Uri($(element).children('a').attr('href'));
        link.extend({action: 'edit'});
        $(element).find('.mw-whatlinkshere-tools > a:last-child')
            .after(' | ', $('<a>').attr('href', link.toString()).text('edit'));
    });
}

//=================================================================== 
// Expand collapsed information on Recent Changes and Watchlist
//===================================================================

if ($.inArray(mw.config.get('wgCanonicalSpecialPageName'), [
    'Recentchanges',
    'Recentchangeslinked',
    'Watchlist']) !== -1) {
    $(window).load(function () {
     $('.mw-collapsible-toggle-collapsed').click();});
}