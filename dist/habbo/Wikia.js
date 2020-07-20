// 15:27, August 17, 2014 (UTC)
if(wgNamespaceNumber != 401 && !window.AccLinksLoad)
    addOnloadHook(addAccLinks);
var AccLinksLoad = true;
 
function addAccLinks () {
    $('<li id="Contribs"><a href="/wiki/Special:MyContributions">Contributions</a></li>').appendTo('.AccountNavigation > li > ul.subnav');
}

$(function() {
    $('.WikiHeader nav ul li.marked ul').append('<li class="subnav-2-item"><a class="subnav-2a" href="/wiki/HabboWiki:Application">Jobs</a></li>');
});

/* Only oasis scripts here ~ Rest are found on common.js */
importArticles({
    type: "script",
    articles: [
        "w:dev:AutoEditDropdown/code.js"
    ]
});

/* Footer for fansite notice */
if($('#WikiaFooter').length)
    $('#WikiaFooter').before('<table style="margin: 0 auto; border: 2px solid #B8B296; color: #000; background-color: #F4F3EE; font-size: 75%; overflow: auto; padding: 1em; width: 500px; text-align: center; clear: both;"><tbody><tr><td>Habbo Wiki is not affiliated with, endorsed, sponsored, or specifically approved by Sulake Corporation Oy or its Affiliates. Habbo Wiki may use the trademarks and other intellectual property of Habbo, which is permitted under Habbo Fan Site Policy.</td></tr></tbody></table>');