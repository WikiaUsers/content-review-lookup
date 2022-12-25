importArticle({
    type: "style",
    article: "MediaWiki:Common.css"
});

var SocialMediaButtonsNamespaces = [0, 6, 14, 500, 1201];
var SocialMediaButtons = { 
	position: "top",
	colorScheme: "dark",
	buttonSize: "40px",
};
importScriptPage('SocialIcons/code.js','dev');

// Verhindert, dass vorhandene Tags ausgeblendet werden
(window.dev = window.dev || {}).profileTags = { noHideTags: true };

/* AjaxRC */
window.ajaxPages = [
    "Special:WikiActivity",
    "Special:RecentChanges",
    "Special:Watchlist",
    "Special:Log",
    "Special:Contributions",
    "Special:Images",
    "Special:Contributions"
];
window.ajaxIndicator = 'https://vignette.wikia.nocookie.net/sonicwiki/images/e/e1/Loading_ring.gif/revision/latest?cb=20190326202016&path-prefix=de';
window.ajaxRefresh = 30000;
window.AjaxRCRefreshText = 'Auto-Aktualisierung';
window.AjaxRCRefreshHoverText = 'Die Seite automatisch aktualisieren';
 
//—————————————————————————————— ! ! ! ———————————————————————————————//
/* Import scripts. HINWEIS: Platziere Skriptkonfigurationen über dieser Zeile */
/* Importe in MediaWiki:ImportJS                               */

/*More JS*/
$(".image-resize").each(function() {
	var a = $(this).children(".image-resize-new").text().split("_");
		img = $(this).find("img");
	if (!isNaN(Number(a[1])) && !isNaN(Number(a[1]))) {
		img.attr({
			width: a[0],
			height: a[1]
		});
	}
});

/* Tabber-Funktion */
(function($) {
    // Aktiviert den Tabber-Tab basierend auf dem Seitennamen und dem Tabber-Inhalt    
    var $tabber = $('#navb .tabber');
    if (!$tabber.length) return;
    $(function(){
        setTimeout(function() {
            $tabber.find('.tabbertab').each(function() {
                var $this = $(this),
                    $selflink = $this.find('.selflink'),
                    target = $selflink.closest('.tabbertab').attr('title'),
                    $tab2activate = $this.closest('.tabber').find('.tabbernav>Li>a[title="' + target + '"]');
                $tab2activate.click();
            });// each .tabbertab
        }, 100);// settimeout
    });// doc.rdy    
})(jQuery);