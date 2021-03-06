window.ajaxPages = [
    "Special:WikiActivity",
    "Special:RecentChanges",
    "Special:Watchlist",
    "Special:Log",
    "Special:Contributions",
    "Special:Images"
];
window.ajaxIndicator = ;
window.ajaxRefresh = 30000;
window.AjaxRCRefreshText = 'Update content';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';

mediaWiki.loader.using('mediawiki.util', function() {
    "use strict";
    jQuery(function($) {
        var $tabs = $('#WikiaUserPagesHeader ul.tabs');
        if (!$tabs.length) return;
        var newTabs = {
            'Sandbox': '/Sandbox',
        };
        var name = $('#UserProfileMasthead .masthead-info hgroup > h1');
        if (!name.length) return;
        name = name.text();
        var tabs = document.createDocumentFragment(), li, a;
        for (var tab in newTabs) {
            li = document.createElement('li');
            a = document.createElement('a');
            a.title = 'User:' + name + newTabs[tab];
            a.href = mw.util.wikiGetlink(a.title);
            a.appendChild(document.createTextNode(tab));
            li.appendChild(a);
            tabs.appendChild(li);
        }
        $tabs.append(tabs);
    });
});