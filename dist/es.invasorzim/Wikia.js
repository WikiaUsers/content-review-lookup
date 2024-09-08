/*<pre> MediaWiki:Wikia.js v1.4 */
/*SkinNotification: Agrega una notificación para los que usen oasis. */
window.SkinNotification = {
	article: 'Usuario_Blog:Gabu333/El_imperio_irken',
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
		var sn = $('<div data-type="100"><a class="sprite close-notification"></a> <a href="'+wgServer+wgArticlePath.replace('$1',SkinNotification.article.replace(/\s/g,'_'))+'" title="'+SkinNotification.article+'">¿Quieres ser un invasor?, entra en esta pagina y estaras al tanto de como serlo</div>');
		nf.children().eq(0).append(sn);
		sn.children().eq(0).click(SkinNotification.dismiss);
	},
	dismiss: function(e) {
		$(e.target).parent().remove();
		$.cookies.set(SkinNotification.key,'1');
	}
};
 
function agregarEnlaceSkin() {
	if (!window.SkinPropagation) return;
	var url = SkinPropagation.parseURL(window.location.href);
	url.query.useskin = 'monobook';
	var surl = SkinPropagation.getURL(url);
	$('#WikiaFooter').children('div.toolbar').eq(0).children('ul.tools').eq(0).append('<li><a href="'+surl+'"><img width="15" height="15" class="monobook-icon" src="'+stylepath+'/common/blank.gif"/></a> <a href="'+surl+'" id="ca-changeskin" title="Ver Ben 10 Wiki con la piel Monobook">Cambiar la apariencia a Monobook</a></li>');
 
	$('#ca-changeskin').click(function(){
		alert('La apariencia cambiará temporalmente a Monobook. Para ver el estilo por defecto deberás quitar el "useskin=monobook" de la dirección de la página que aparece en el navegador.');
	});
}
 
function IZ_WikiaSkinLoad() {
	var ug = '';
	if (window.wgUserGroups) {
		ug = wgUserGroups.join(',').toLowerCase();
	}
	if (ug.indexOf('s'+'taf'+'f') == -1 && ug.indexOf('h'+'elp'+'er') == -1) {
		$(SkinNotification.init);
		$(agregarEnlaceSkin);
	}
}
 
IZ_WikiaSkinLoad();
 /* Enlaces en el menú de usuario */
 
 
function subeEnlacesUtiles(){$('ul.AccountNavigation li:first-child ul.subnav li:first-child').after('<li><a href="/wiki/Especial:Contribuciones/'+ encodeURIComponent(wgUserName) +'">Contribuciones</a></li>');$('ul.AccountNavigation li:first-child ul.subnav li:first-child').after('<li><a href="/wiki/Usuario_Blog:'+ encodeURIComponent(wgUserName) +'" title="Mis entradas de blog">Blogs de entrada</a></li>');$('ul.AccountNavigation li:first-child ul.subnav li:first-child').after('<li><a href="/wiki/Usuario:'+ encodeURIComponent(wgUserName) +'/wikia.css" title="Tu apariencia personal">Mi apariencia</a></li>');$('.WikiaHeader nav ul li:first-child');}addOnloadHook(subeEnlacesUtiles);



var sn = $('<div data-type="100"><a class="sprite close-notification"></a> <a href="'+wgServer+wgArticlePath.replace('$1',SkinNotification.article.replace(/\s/g,'_'))+'" title="'+SkinNotification.article+'">Reunión de Administradores este Domingo</a>!</div>');

// 23:19, January 5, 2012 (UTC)
// <source lang="JavaScript">
// Additional UserRights Icons in profile mastheads
importScript('MediaWiki:Wikia.js/userRightsIcons.js');
// END Additional UserRights Icons in profile mastheads
// </source>