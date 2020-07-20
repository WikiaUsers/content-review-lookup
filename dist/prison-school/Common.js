// auto refresh
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
PurgeButtonText = 'Imprison';
importArticles({
    type: 'script',
    articles: [
        "u:dev:AjaxRC/code.js",
        "u:dev:WallGreetingButton/code.js",
        "u:dev:BackToTopButton/code.js",
        "u:dev:ShowHide/code.js",
        "u:dev:PurgeButton/code.js"
    ]
});
// portable infobox caption accent coloring for {{Infobox game}}
$(function() {
	var accentcolor = $('.pi-title').css('background-color');
	if ($('.pi-theme-game').length) {
		mw.util.addCSS(
        '.pi-theme-game .pi-image {' +
            'border-color:' + accentcolor +
        '}' +
        '.pi-theme-game .pi-caption {' +
            'background:' + accentcolor +
        '}'
        )
	}
});