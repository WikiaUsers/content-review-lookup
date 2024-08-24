/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */

var SocialMediaButtonsNamespaces = [0, 6, 14, 500];
var SocialMediaButtons = {
position: "top",
colorScheme: "DarkRed",
buttonSize: "26px",
wikiTwitterAccount: "wikia_es"
};
importScriptPage('SocialIcons/code.js','dev');

/*<pre> MediaWiki:Wikia.js v1.4 */
/* Skin notification by User:Bola, idea original by User:Ciencia al Poder. */
window.WikiNotification = {
	article: 'Akatsuki Afterlife: Academia Shirizu',
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
		var sn = $('<li><div data-type="100"><a class="sprite close-notification"></a>Bienvenido a Akatsuki Afterlife,Recuerda ingresar y ver tus misiones en   <a href="'+wgServer+wgArticlePath.replace('$1',WikiNotification.article.replace(/\s/g,'_'))+'" title="'+WikiNotification.article+'">Akatsuki Afterlife: Academia Shirizu</a>.</div></li>');
		nf.append(sn);
		sn.find('a.sprite').eq(0).click(WikiNotification.dismiss);
	},
	dismiss: function(e) {
		$(this).parents('li').eq(0).remove();
		$.cookies.set(WikiNotification.key,'1');
	}
};
 
$(WikiNotification.init);
 
// Etiqueta para usuarios inactivos por mas de 3 meses
InactiveUsers = { text: 'Inactivo' };
importScriptPage('InactiveUsers/code.js', 'dev');
 
// No ocultar TOC por defecto para anónimos
window.TOCimprovementsEnabled = undefined;

// Enlaces en el menú de usuario 
function subeEnlacesUtiles(){$('ul.AccountNavigation li:first-child ul.subnav li:first-child').after('<li><a href="/wiki/Especial:Contribuciones/'+ encodeURIComponent(wgUserName) +'">Contribuciones</a></li>');$('.WikiaHeader nav ul li:first-child');}addOnloadHook(subeEnlacesUtiles);