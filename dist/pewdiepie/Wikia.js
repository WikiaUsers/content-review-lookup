//Custom user rights icons on userpages
importScript('MediaWiki:Wikia.js/userRightsIcons.js');

/** Automatically drops down the menu when you hover the edit button **/

importArticles({
    type: 'script',
    articles: [
        'w:c:dev:AutoEditDropdown/code.js'
    ]
});



// Namespaces in header
$(function NamespacesInHeader() {
	if(wgCanonicalNamespace != '' && wgCanonicalNamespace != 'Talk') {
		$('#WikiaPageHeader h1').html(wgFormattedNamespaces[wgNamespaceNumber] + ':' + wgTitle);
	}
});

/* <pre> */
 
/* Fixes user wikia.js and wikia.css files not loading in Oasis after upgrade to MediaWiki 1.19 (from rs.wikia.com) */
if (!$('script[src*="title=User:'+wgUserName+'/wikia.js"]').length) {
    importScript('User:' + wgUserName + '/wikia.js');
}
 
if (!$('link[href*="title=User:'+wgUserName+'/wikia.css"]').length) {
    importStylesheet('User:' + wgUserName + '/wikia.css');
}

/* </pre> */