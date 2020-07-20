$().log("MediaWiki:Wikia.js loaded");
$().log("updated");

mediaWiki.loader.using('mediawiki.util', function() {
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

/*$( function () {
	if ( !document.getElementById( 'ca-skins' ) ) {
		if ( skin === 'oasis' || skin === 'wikia' ) {
			$( '<li id="ca-skins"><a href="/index.php?title=' + encodeURIComponent( wgPageName ) + '&useskin=monobook">MB</a></li>' ).appendTo( '#AccountNavigation' ); $( '<li id="ca-skins"><a href="/index.php?title=' + encodeURIComponent( wgPageName ) + '&useskin=vector">Print</a></li>' ).appendTo( '#AccountNavigation' );
		} else {
			$( '<li id="ca-skins"><a href="/index.php?title=' + encodeURIComponent( wgPageName ) + '&useskin=wikia">Oasis</a></li>' ).appendTo( '#p-cactions > .pBody > ul' ); $( '<li id="ca-skins"><a href="/index.php?title=' + encodeURIComponent( wgPageName ) + '&useskin=vector">Print</a></li>' ).appendTo( '#p-cactions > .pBody > ul' );
		} 
	}
} );

};
*/
importArticles({
    type: 'script',
    articles: [
        'u:dev:AutoEditDropdown/code.js',
        'u:dev:WallGreetingButton/code.js',
        'u:dev:Countdown/code.js',
        'u:dev:SignatureCheck/code.js',
        'u:dev:Standard_Edit_Summary/code.js',
        'u:dev:TopEditors/code.js',
        'u:dev:ExtendedNavigation/code.js'
    ]
});

SpoilerAlert = {
    question: 'This page contains spoilers. Do you wish to continue to view this page?',
    yes: 'Yes, I do',
    no: 'No, I do not',
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Spoiler');
    }
};
importScriptPage('ChatHacks.js', 'minecraft-computer');
importScriptPage('SpoilerAlert/code.js', 'dev');

$.getScript("http://s51.sitemeter.com/js/counter.asp?site=s51minecraftpc");