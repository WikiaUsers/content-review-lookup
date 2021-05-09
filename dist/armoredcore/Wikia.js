// Adds copyright notice to siderail in Oasis
importScript('MediaWiki:Wikia.js/copyright.js');
// END Adds copyright notice to siderail in Oasis

// Add Special:Contributions, Special:Watchlist, & Special:Following to AccountNavigation in Wikia skin
importScript('MediaWiki:Wikia.js/accountNavigation.js');
// END Add Special:Contributions, Special:Watchlist, & Special:Following to AccountNavigation in Wikia skin

//Custom user rights icons on userpages
importScript('MediaWiki:Wikia.js/userRightsIcons.js');

//Counter scrolling
importScriptPage('BackToTopButton/code.js', 'dev');

$(function () {
    $(".WikiHeaderRestyle > nav li").not(".subnav-2.accent li").mouseenter(function () {
        $(this).addClass("marked");
        $(".WikiHeaderRestyle > nav li").not(this).removeClass();
    });
});

$(function () {
    var olds = $(".tabs-container > ul.tabs").html();
    var address = "http://armoredcore.wikia.com/wiki/Special:Editcount/" + wgTitle;
    var adds = "<li data-id='editcount'><a href='" + address + "'>Edit count</a></li>";
    var news = olds + adds;
    $(".tabs-container > ul.tabs").html(news);
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                       //
// END OF CODE                                                                                           //
//                                                                                                       //
///////////////////////////////////////////////////////////////////////////////////////////////////////////

// Chat statement
var statement = 'Read the <a href="http://armoredcore.wikia.com/wiki/Project:Chat">chat rules</a> before joining';

function chatStatement() {
    if ($('section.ChatModule').size() > 0 && $('p.chat-name').html() != statement) {
        $('p.chat-name').html(statement);
        setTimeout(chatStatement, 1);
    }
}

$(chatStatement);