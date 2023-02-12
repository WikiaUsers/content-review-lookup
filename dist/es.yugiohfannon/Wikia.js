/* Agregar una notificación en Oasis. */
window.SkinNotification = {
	article: 'Especial:PáginasRequeridas',
	key: 'NfSkin',
	init: function() {
		if (!document.cookie || document.cookie.length === 0) return;
		var pref = $.cookies.get(SkinNotification.key);
		if (pref) return;
		SkinNotification.render();
	},
	render: function() {
		var tb = $('#WikiaFooter').children('div.toolbar');
		if (!tb.exists()) return;
		var nf = $('#WikiaNotifications');
		if (!nf.exists()) {
			tb.prepend('<ul id="WikiaNotifications" class="WikiaNotifications"><li></li></ul>');
			nf = $('#WikiaNotifications');
			$(document.body).addClass('notifications');
		}
		var sn = $('<div data-type="100"><a class="sprite close-notification"></a>Para crear tus cartas, usa este generador que se encuentra en <a href="http://www.yugiohcardmaker.net" target="_blank">este enlace</a>.</div>');
		nf.children().eq(0).append(sn);
		sn.children().eq(0).click(SkinNotification.dismiss);
	},
	dismiss: function(e) {
		$(e.target).parent().remove();
		$.cookies.set(SkinNotification.key,'1');
	}
};
 
$(SkinNotification.init);

importScriptPage('MediaWiki:ChatOptions.js/es.js','pintorkagamine');