/* Skin notification by User:Bola, idea original by User:Ciencia al Poder. */
window.WikiNotification = {
	article: 'Usuario_blog:Pintor_Smeargle/Zacki_de_nuevo',
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
		var sn = $('<li><div data-type="100"><a class="sprite close-notification"></a> ¿Quieres que Zacki vuelva a ser administrador?, <a href="'+wgServer+wgArticlePath.replace('$1',WikiNotification.article.replace(/\s/g,'_'))+'" title="'+WikiNotification.article+'">¡Apoyanos aqui!</a></div></li>');
		nf.append(sn);
		sn.find('a.sprite').eq(0).click(WikiNotification.dismiss);
	},
	dismiss: function(e) {
		$(this).parents('li').eq(0).remove();
		$.cookies.set(WikiNotification.key,'1');
	}
};
 
$(WikiNotification.init);