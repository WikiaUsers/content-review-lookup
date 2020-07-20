 
importScriptPage('FastDelete/code.js', 'dev');
var fdButtons = [];
fdButtons[fdButtons.length] = {
  'summary': 'spam',
  'label': 'spam'};
fdButtons[fdButtons.length] = {
  'summary': 'vandalism',
  'label': 'vandalism'}
  fdButtons[fdButtons.length] = {
  'summary': 'Housekeeping',
  'label': 'Housekeeping'}

// Add Special:Contributions, Special:Watchlist, & Special:Following to AccountNavigation in Wikia skin
importScript('MediaWiki:Wikia.js/accountNavigation.js');
// END Add Special:Contributions, Special:Watchlist, & Special:Following to AccountNavigation in Wikia skin

// Add CANCEL Button for new RTE
importScript('MediaWiki:Wikia.js/cancelButton.js');
// END Add CANCEL Button for new RTE

//Custom user rights icons on userpages
importScript('MediaWiki:Wikia.js/userRightsIcons.js');

$(function() {
    $(".WikiHeaderRestyle > nav li").not(".subnav-2.accent li").mouseenter(function() {
        $(this).addClass("marked");
        $(".WikiHeaderRestyle > nav li").not(this).removeClass();
    });
});

$(function() {
    var olds = $(".tabs-container > ul.tabs").html();
    var address = "http://ben10.wikia.com/wiki/Special:Editcount/" + wgTitle;
    var adds = "<li data-id='editcount'><a href='" + address + "'>Editcount</a></li>";
    var news = olds + adds;
    $(".tabs-container > ul.tabs").html(news);
});

// Extended Navigation

importArticles({
    type: 'script',
    articles: [
        'u:dev:ExtendedNavigation/code.js'
    ]
});