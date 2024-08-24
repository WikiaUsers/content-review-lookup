{{:MediaWiki:Common.js/Code.js}} 
/*<pre> MediaWiki:Wikia.js v1.16 */
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
		var sn = $('<li><div data-type="100"><a class="sprite close-notification"></a>Wikia ha forzado el cambio de apariencia a WikiDex. Descubre <a href="'+wgServer+wgArticlePath.replace('$1',SkinNotification.article.replace(/\s/g,'_'))+'" title="'+SkinNotification.article+'">cómo volver a verla como antes</a>.</div></li>');
		nf.append(sn);
		sn.find('a.sprite').eq(0).click(SkinNotification.dismiss);
	},
	dismiss: function(e) {
		$(this).parents('li').eq(0).remove();
		$.cookies.set(SkinNotification.key,'1',{hoursToLive:8640});
	}
};

function agregarEnlaceSkin() {
	if (!window.SkinPropagation) return;
	var url = SkinPropagation.parseURL(window.location.href);
	url.query.useskin = 'monobook';
	var surl = SkinPropagation.getURL(url);
	$('#WikiaFooter').children('div.toolbar').eq(0).children('ul.tools').eq(0).append('<li><a href="'+surl+'"><img width="15" height="15" class="monobook-icon" src="'+stylepath+'/common/blank.gif"/></a> <a href="'+surl+'" id="ca-changeskin" title="Ver WikiDex con la piel Monobook">Cambiar la apariencia a Monobook</a></li>');
	
	$('#ca-changeskin').click(function(){
		alert('La apariencia cambiará temporalmente a Monobook. Para ver el estilo por defecto deberás quitar el "useskin=monobook" de la dirección de la página que sale en el navegador');
	});
}

function agregarEnlaceSkinMenu() {
	if (!window.SkinPropagation) return;
	var url = SkinPropagation.parseURL(window.location.href);
	url.query.useskin = 'monobook';
	var surl = SkinPropagation.getURL(url);
	$('#WikiHeader').children('nav').children('ul').append('<li><a href="'+surl+'" id="mn-changeskin" title="Ver WikiDex con la piel Monobook">Usar Monobook</a></li>');
	$('#mn-changeskin').click(function(){
		return confirm('La apariencia cambiará temporalmente a Monobook, el estilo anterior, pero con muchas más funcionalidades y más accesible. Si quieres volverlo a ver como ahora tendrás que quitar el useskin=monobook que aparece en la barra de direcciones del navegador.');
	});
}

function sinCategorySwitch() {
	if (!window.wgUserName) {
		appendCSS('#csAddCategorySwitch {display:none;}');
	}
}

function WikiDex_WikiaSkinLoad() {
	var ug = '', loadsafe = (typeof(window.safeOnLoadHook)=='function'?safeOnLoadHook:$);
	if (window.wgUserGroups) {
		ug = wgUserGroups.join(',').toLowerCase();
	}
	if (ug.indexOf('s'+'taf'+'f') == -1 && ug.indexOf('h'+'elp'+'er') == -1) {
		loadsafe(SkinNotification.init);
		if (window.wgUserName) {
			loadsafe(agregarEnlaceSkin);
		} else {
			loadsafe(agregarEnlaceSkinMenu);
		}
		loadsafe(sinCategorySwitch);
		loadsafe(function() { // Restaura la funcionalidad del formulario de subida de archivos. This does not block core functionality
			if (window.UploadPhotos && window.UploadPhotos.showDialog) {
				$('a.wikia-button.upphotos').unbind('click',UploadPhotos.showDialog);
			}
		});
		loadsafe(function() { // Reescribe el enlace de crear artículo para que apunte a la ayuda. This does not block core functionality
			$('#WikiaPage').find('a.createpage').unbind('click').attr('href', window.wgArticlePath.replace('$1', 'Ayuda:Crear_un_artículo'));
		});
	}
}

// Parche para la búsqueda
(typeof(window.safeOnLoadHook)=='function'?safeOnLoadHook:$)(function() {
	var f = $('#WikiaSearch');
	if (f && f.attr('action') && f.attr('action').indexOf('index.php') == 0) {
		f.attr('action', wgScript);
		f.prepend('<input type="hidden" name="title" value="Especial:Buscar"/>');
	}
});

try {
	if (window.CreaEnlacesDex) {
		CreaEnlacesDex.registerRenderFn(function() {
			$('#WikiaRail').append('<section class="dexlinks module" id="p-dexlinks"><h1>Otras Pokédex</h1><ul></ul></section>');
		});
		CreaEnlacesDex.registerLinkFn(function(url, text, caption) {
			$('#p-dexlinks').find('ul').eq(0).append($('<li></li>').append($('<a class="external"></a>').attr({href:url, title:caption}).text(text)));
		});
		(typeof(window.safeOnLoadHook)=='function'?safeOnLoadHook:$)(CreaEnlacesDex.init);
	}
} catch(e) {
	typeof(window.trataError)=='function'&&trataError(e);
}

try {
	WikiDex_WikiaSkinLoad();
} catch(e) {
	typeof(window.trataError)=='function'&&trataError(e);
}
/*</pre>*/