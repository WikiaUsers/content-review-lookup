/*** Хотфикс для сворачиваемых таблиц ***/
$('.collapsible').addClass('mw-collapsible');
$('.collapsed').addClass('mw-collapsed');



AjaxRCRefreshText = 'Автоматическое обновление';  
AjaxRCRefreshHoverText = 'Автоматически обновлять эту страницу';  

importArticles({
    type: "script",
    articles: [
        "MediaWiki:Buttons.js",
        "MediaWiki:BackToTop.js",
        "w:c:dev:AjaxRC/code.js",
        "u:dev:PurgeButton/code.js"
    ]
});

/*** Страницы с автоматическим обновлением ***/
var ajaxPages =["Служебная:RecentChanges", "Служебная:WikiActivity"];

/*** Всплывающие сноски ***/
mw.loader.load( 'http://en.wikipedia.org/w/index.php?title=MediaWiki:Gadget-ReferenceTooltips.js&action=raw&ctype=text/javascript' );
mw.loader.load( 'http://en.wikipedia.org/w/index.php?title=MediaWiki:Gadget-ReferenceTooltips.css&action=raw&ctype=text/css', 'text/css' );
/* mw.util.addCSS( '.referencetooltip > li > sup { display: none; }' ); */

/*** Требуемые файлы: Добавляем ссылки на файлы на английской вики ***/
(function ($, undefined) {
	var links = $('.mw-special-Wantedfiles').find('.new').each(function() { 
		var image = document.createElement('a');
		image.innerHTML = 'открыть';
		image.href = this.href.replace("ru.", "").replace("?action=edit&redlink=1", "").replace("%D0%A4%D0%B0%D0%B9%D0%BB:", "File:");
		image.target = '_blank';
		$(this).after(image).after(' ');
	});
})(jQuery);