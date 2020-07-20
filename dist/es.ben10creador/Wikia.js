importScriptPage('MediaWiki:Concursos.js');
importScriptPage('MediaWiki:Wikia.js/commentslikes.js');

/* Skin notification by User:Bola, idea original by User:Ciencia al Poder. */
window.WikiNotification = {
	article: 'Ben 10: Universo Alienígena',
	key: 'WNotif',
	init: function() {
		if (!document.cookie || document.cookie.length == 0) return;
		var pref = $.cookies.get(WikiNotification.key);
		if (pref) return;
		WikiNotification.render();
	},
	render: function() {
		var tb = $('#WikiaFooter').children('div.toolbar');
		if (!tb.exists()) return;
		var nf = $('#WikiaNotifications');
		if (!nf.exists()) {
			tb.prepend('<ul id="WikiaNotifications" class="WikiaNotifications"></ul>');
			nf = $('#WikiaNotifications');
			$(document.body).addClass('notifications');
		}
		var sn = $('<li><div data-type="100"><a class="sprite close-notification"></a>Mañana, Maratón de <a href="'+wgServer+wgArticlePath.replace('$1',WikiNotification.article.replace(/\s/g,'_'))+'" title="'+WikiNotification.article+'">Ben 10: Universo Alienígena!</a>, <a href="http://es.ben10creador.wikia.com/wiki/Ben_10:_Universo_Alienígena">No te lo Pierdas!</a>.</div></li>');
		nf.append(sn);
		sn.find('a.sprite').eq(0).click(WikiNotification.dismiss);
	},
	dismiss: function(e) {
		$(this).parents('li').eq(0).remove();
		$.cookies.set(WikiNotification.key,'1');
	}
};
 
$(WikiNotification.init);

/* Enlaces en la navegación de la cuenta */
function subeEnlacesUtiles(){$('ul.AccountNavigation li:first-child ul.subnav li:first-child').after('<li><a href="/wiki/Especial:Contribuciones/'+ encodeURIComponent(wgUserName) +'">Contribuciones</a></li>');$('.WikiaHeader nav ul li:first-child');$('.WikiHeaderRestyle .buttons .contribute ul li:last-child').before('<li><a href="/wiki/Ben_10_fanon_Wiki:Adopci%C3%B3n_de_series">Adopción de series</a></li><li><a href="/wiki/Ben_10_fanon_Wiki:Comisar%C3%ADa">Denunciar a alguien</a></li>');}addOnloadHook(subeEnlacesUtiles);

$(function() {
    $('p.chat-name').html('<a href="/wiki/Ben_10_fanon_Wiki:Reglas#Chat">Normas de uso</a>');
});