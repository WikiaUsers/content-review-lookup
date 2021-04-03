/* Any JavaScript here will be loaded for all users on every page load. */

/* Makes expand/collapse and hide/show work in comments
Thanks to camphalfbloodroleplay.wikia.com for the code */
$('#WikiaArticleComments').bind('DOMNodeInserted', function () {
    if ($('#WikiaArticleComments .mw-collapsible')) {
        console.log('Comment(s) loaded. Collapsing tables.');
        $('#WikiaArticleComments .mw-collapsible').makeCollapsible();
        $('#WikiaArticleComments .mw-collapsible-toggle').css('float', 'right');
    }
});

/* spoilers by User:Tierrie */
importArticle({
    type: 'script',
    article: 'u:dragonage:MediaWiki:SpoilersToggle.js'
});