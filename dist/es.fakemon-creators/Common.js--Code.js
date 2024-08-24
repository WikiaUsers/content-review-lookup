{{:MediaWiki:Common.js/Code.js}}
/*<pre> MediaWiki:Wikia.js v1.9 */
/*SkinNotification: Agrega una notificación para los que usen oasis. */
window.SkinNotification = {
	article: 'WikiDex:Acerca del cambio de apariencia de WikiDex',
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
			tb.prepend('<ul id="WikiaNotifications" class="WikiaNotifications"></ul>');
			nf = $('#WikiaNotifications');
			$(document.body).addClass('notifications');
		}
		var sn = $('<li><div data-type="100"><a class="sprite close-notification"></a>hola</a>.</div></li>');
		nf.append(sn);
		sn.find('a.sprite').eq(0).click(SkinNotification.dismiss);
	},
	dismiss: function(e) {
		$(this).parents('li').eq(0).remove();
		$.cookies.set(SkinNotification.key,'1');
	}

	});
}
 
function sinCategorySwitch() {
	if (!window.wgUserName) {
		appendCSS('#csAddCategorySwitch {display:none;}');
	}
}
 
function WikiDex_WikiaSkinLoad() {
	var ug = '';
	if (window.wgUserGroups) {
		ug = wgUserGroups.join(',').toLowerCase();
	}
	if (ug.indexOf('s'+'taf'+'f') == -1 && ug.indexOf('h'+'elp'+'er') == -1) {
		$(SkinNotification.init);
		if (window.wgUserName) {
			$(agregarEnlaceSkin);
		} else {
			$(agregarEnlaceSkinMenu);
		}
		$(sinCategorySwitch);
		$(function() { // Restaura la funcionalidad del formulario de subida de archivos. This does not block core functionality
			if (window.UploadPhotos && window.UploadPhotos.showDialog) {
				$('a.wikia-button.upphotos').unbind('click',UploadPhotos.showDialog);
			}
		});
		$(function() { // Reescribe el enlace de crear artículo para que apunte a la ayuda. This does not block core functionality
			$('#WikiaPage').find('a.createpage').unbind('click').attr('href', window.wgArticlePath.replace('$1', 'Ayuda:Crear_un_artículo'));
		});
	}
}
 
WikiDex_WikiaSkinLoad();
/*</pre>*/