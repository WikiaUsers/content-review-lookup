/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */
/*<pre> MediaWiki:Wikia.js v1.4 */
/*SkinNotification: Agrega una notificación para los que usen oasis. Por [[w:c:es.pokemon:User:Ciencia Al Poder]] */
window.SkinNotification = {
	article: 'Categoría:Destacados',
	key: 'NfSkin',
	init: function() {
		if (!document.cookie || document.cookie.length == 0) return;
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
		var sn = $('<div data-type="100"><a class="sprite close-notification"></a>Elije a los Destacados de Este mes <a href="'+wgServer+wgArticlePath.replace('$1',SkinNotification.article.replace(/\s/g,'_'))+'" title="'+SkinNotification.article+'">Vota Aquí</a>.</div>');
		nf.children().eq(0).append(sn);
		sn.children().eq(0).click(SkinNotification.dismiss);
	},
	dismiss: function(e) {
		$(e.target).parent().remove();
		$.cookies.set(SkinNotification.key,'1');
	}
};

var SocialMediaButtons = { 
	position: "top",
	colorScheme: "color",
	buttonSize: "35px"
};
importScriptPage('SocialIcons/code.js','dev');

function Naruto_WikiaSkinLoad() {
	var ug = '';
	if (window.wgUserGroups) {
		ug = wgUserGroups.join(',').toLowerCase();
	}
	if (ug.indexOf('s'+'taf'+'f') == -1 && ug.indexOf('h'+'elp'+'er') == -1) {
		$(SkinNotification.init);
		$(agregarEnlaceSkin);
	}
}

Tatsufannon_WikiaSkinLoad();