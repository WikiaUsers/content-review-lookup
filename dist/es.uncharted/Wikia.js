/*<pre> MediaWiki:Wikia.js v1.4 */
/*SkinNotification: Agrega una notificación para los que usen oasis. */
window.SkinNotification = {
	article: 'Especial:PáginasRequeridas',
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
		var sn = $('<div data-type="100"><a class="sprite close-notification"></a>Ayuda a la Uncharted Pedia a completar todo sobre la saga Uncharted<a href="'+wgServer+wgArticlePath.replace('$1',SkinNotification.article.replace(/\s/g,'_'))+'" title="'+SkinNotification.article+'">, ayúdanos a crear o mejorar los artículos</a>.</div>');
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
	$('#WikiaFooter').children('div.toolbar').eq(0).children('ul.tools').eq(0).append('<li><a href="'+surl+'"><img width="15" height="15" class="monobook-icon" src="'+stylepath+'/common/blank.gif"/></a> <a href="'+surl+'" id="ca-changeskin" title="Ver Wiki Uncharted con la piel Monobook">Cambiar la apariencia a Monobook</a></li>');
 
	$('#ca-changeskin').click(function(){
		alert('La apariencia cambiará temporalmente a Monobook. Para ver el estilo por defecto deberás quitar el "useskin=monobook" de la dirección de la página que aparece en el navegador. Es recomendable que sólo uses esta herramienta en los artículos de cartas.');
	});
}
 
function Wiki_Uncharted_WikiaSkinLoad() {
	var ug = '';
	if (window.wgUserGroups) {
		ug = wgUserGroups.join(',').toLowerCase();
	}
	if (ug.indexOf('s'+'taf'+'f') == -1 && ug.indexOf('h'+'elp'+'er') == -1) {
		$(SkinNotification.init);
		$(agregarEnlaceSkin);
	}
}
 
Wiki_Uncharted_WikiaSkinLoad();