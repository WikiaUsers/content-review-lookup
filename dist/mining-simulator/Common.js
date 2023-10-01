// Imports. KEEP AT TOP!
// -----------------------[ User Page Notice ]---
// Script for adding a notice to user sub-pages that the current page is not a main wiki article.
mw.loader.getScript('https://mining-simulator.fandom.com/index.php?title=MediaWiki:UserPageNotice.js&action=raw&ctype=text/javascript');

// -----------------------[ Default Upload Summary ]---
// Set a default value for file upload summaries on Special:Upload. Also allows the user to define a custom summary that applies to all uploads on the page.
mw.loader.getScript('https://mining-simulator.fandom.com/index.php?title=MediaWiki:DefaultUploadSummary.js&action=raw&ctype=text/javascript');



// Other scripts.
// -----------------------[ UserTags | Custom Role Tags ]---
window.UserTagsJS = {
	modules: {},
	tags: {
		verified: { u: 'Verified', order: 1/0 },
	}
};
UserTagsJS.modules.custom = {
	'HammieJammie': ['verified'] 
};
UserTagsJS.modules.custom = {
	'Arlemie': ['verified'] 
};
// -----------------------[ BackToTopButton | Modernization option ]---
window.BackToTopModern = true;

// -----------------------[ Page Theme Styling | Change BG image via category ]---
var categories = document.querySelector(".page-header__categories-links");
var getcategories = categories.getElementsByTagName("a");
var ahref;
var ahrefc = 0;

while (ahrefc < getcategories.length) {
    ahref = getcategories[ahrefc].href;
    switch (ahref) {
    case "https://mining-simulator.fandom.com/wiki/Category:Halloween":
        document.body.classList.add("halloweenbg");
        break;
    case "https://mining-simulator.fandom.com/wiki/Category:Christmas":
        document.body.classList.add("christmasbg");
        break;
    }
    ahrefc += 1;
}

// -----------------------[ Link Fixer ]---
// Fixes links to Thread and File namespaces on Special:WhatLinksHere and File pages. Suggestion from User:DestroyerTau.
if (mw.config.get('wgPageName').replace(/\/.+/, '') === 'Special:WhatLinksHere' || mw.config.get('wgNamespaceNumber') === 6) {
    $('#mw-whatlinkshere-list>>[title^="Thread:"],.mw-imagepage-linkstoimage-ns1201>').each(function(_, elem) {
        elem.innerHTML = elem.title;
    });
    console.log('Fixed link(s) to Thread or File namespaces on current page.');
}