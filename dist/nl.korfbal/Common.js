/* JavaScript die hier wordt geplaatst heeft invloed op alle pagina's voor alle gebruikers */

/* Auto Refresh */
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];

function onloadhookcustom() {
    var replace = document.getElementById("OnlineChat");
    if (replace !== null) {
        var getvalue = replace.getAttribute("class");
    }
}

/* Imports */
importArticles({
	type: 'script',
	articles: [
        'u:dev:AjaxRC/code.js',             // AjaxRC
        'u:dev:BackToTopButton/code.js',    // Back to top button
        'u:dev:LastEdited/code.js',         // Last Edit Information
        'u:dev:SearchSuggest/code.js',      // SearchSuggest
        'u:zh.pad:MediaWiki:CountDown.js'   // Countdown
	]
}, {
	type: 'style',
	article: 'u:zh.pad.wikia.com:MediaWiki:CountDown.css'
});

window.lastEdited = {
    avatar: true,
    position: 'top',
    size: true,
    diff: true,
    comment: false,
    time: true
};