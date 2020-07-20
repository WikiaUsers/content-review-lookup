/* operate for Template:EmbedMusic */ 
$(".swf-cp-domain").each(function() { if (String(Number($(this).attr("data-src"))) != "NaN") { $(this).html('<embed src="https://icer.ink/media1.clubpenguin.com/play/v2/content/global/music/' + $(this).attr("data-src") + '.swf' + '" style="display: inline; width: 0px; height: 0px; margin: 0px; padding: 0px;" />'); } });

/* Auto-refrescar WikiActivitad */

var AjaxRCRefreshText = 'Act. automát.';
var AjaxRCRefreshHoverText = 'Refrescar automáticamente';
var ajaxPages = ["Especial:CambiosRecientes","Especial:WikiActivity","Especial:Registro"];
var ajaxIndicator = '//images.wikia.nocookie.net/clubpenguin/images/thumb/6/68/D_CP_MEM_Loader_34.gif/16px-D_CP_MEM_Loader_34.gif';
var ajaxRefresh = 10000;
importScriptPage('AjaxRC/code.js', 'dev');

/* Tarjeta de jugador que se actualiza sola

(function() {
	function foo() {
		$("span.player-card-image").each(function() {
			var a = $.parseJSON($(this).attr("data-search")),
				b = Number(a.size) > 0 && Number(a.size) <= 600 ? Number(a.size) : 60;
			if (a.id != "undefined") {
				$(this).replaceWith(
					'<img src="http://cdn.avatar.clubpenguin.com/%7B' + a.id + '%7D/cp?size=600&language=' + a.lang + '&photo=' + a.bg + '&flag=' + a.pin + '" width="' + b + '" height="' + b + '" />'
				);
			} else {
				$(this).replaceWith('<span style="color: red; font-family: monospace, arial, calibri; font-weight: bold;">Thumb error</span>');
			}
		});
	}
	foo();
	if (window.mediaWiki.config.get('skin') === 'oasis' && window.mediaWiki.config.get('wgAction') === 'edit') { // aply on editor by [[User:UltimateSupreme]]
		$(window).on('EditPageAfterRenderPreview', function() {
			foo();
		});
	}
}());
*/