mediaWiki.loader.using('mediawiki.util', function() {
"user strict";
jQuery(function($) {
    var reminder = document.createElement('section');
    reminder.innerHTML = "<h1>REMINDER</h1>";
    if (wgCanonicalNamespace == "Main") {
        $( "#WikiaRail" ).appendChild(reminder);
    }
});
});
/*Leave this stuff alone*/

/* mediaWiki.loader.using('mediawiki.util', function() {
"use strict";
jQuery(function($) {
    var $tabs = $('#WikiaUserPagesHeader ul.tabs');
    if (!$tabs.length) return;
    var newTabs = { // Put the new tabs you want here
        // 'Text on Tab': '/User Subpage when clicked'
        'Infractions': '/Infractions',
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
*/