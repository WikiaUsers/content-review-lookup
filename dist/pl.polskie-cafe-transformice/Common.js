/* Umieszczony tutaj kod JavaScript zostanie załadowany przez każdego użytkownika, podczas każdego ładowania strony. */

// {{USERNAME}}
// Autorzy: Splarka, Spang, Joeyaa
if (wgUserName != 'null') {
	$('.insertusername').text(wgUserName);
}

// Sandbox
// Likely written by User:Xytl at Animal Jam Wiki
// http://animaljam.wikia.com/wiki/Special:Diff/411495

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

// Inactive usertag
// Autor: Peoces (https://community.wikia.com/wiki/User:Pecoes)

importScriptPage('InactiveUsers/code.js', 'dev');
InactiveUsers = { 
    months: 1,
    text: 'Nieaktywny'
};