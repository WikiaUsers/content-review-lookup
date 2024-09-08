/*<pre><nowiki>*/
$(document).ready(function()
{
	// Restores normal upload form since the popup one ignores source and license policy. Adapted from http://es.pokemon.wikia.com/wiki/MediaWiki:Wikia.js.
	$('a.wikia-button.upphotos').unbind('click',UploadPhotos.showDialog);
});

/*SkinNotification: Muestra aviso permanente en la piel de Wikia. */

window.WikiNotification = {
	article: 'Prueba',
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
		var sn = $('<li><div data-type="100"><a class="sprite close-notification"></a>Hola, Siéntase libre para editar o modificar los artículos, respetando las políticas de Físicos Wiki. ¡Edita! Si quieres realizar varias ediciones pero siempre con respeto y de buena fe. <a href="'+wgServer+wgArticlePath.replace('$1',WikiNotification.article.replace(/\s/g,'_'))+'" title="'+WikiNotification.article+'">Experimenta aquí</a>.</div></li>');
		nf.append(sn);
		sn.find('a.sprite').eq(0).click(WikiNotification.dismiss);
	},
	dismiss: function(e) {
		$(this).parents('li').eq(0).remove();
		$.cookies.set(WikiNotification.key,'1');
	}
};
 
$(WikiNotification.init);