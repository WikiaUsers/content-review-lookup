//Script Imports
importArticles({
    type: 'script',
    articles: [
        'u:dev:AjaxUndo/code.js', //Allows for quick edit undoing
        'u:dev:BackToTopButton/code.js', //Adds a button to the Toolbar bring the user to the top of the page
        'u:dev:UserTags/code.js' //Adds UserTags to profile mastheads
    ]
});

//Adds extra tabs to profiles
mediaWiki.loader.using('mediawiki.util', function() {
    "use strict";
    jQuery(function($) {
        var $tabs = $('#WikiaUserPagesHeader ul.tabs');
        if (!$tabs.length) return;
        var newTabs = { // Put the new tabs you want here
            // 'Text on Tab': '/User Subpage when clicked'
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